import React, { useEffect } from "react";
import { useState } from "react";
import { EmptyChallengeList } from "../Home/EmptyChallengeList";
import { HomeCalendar, HomeClock, HomeUser } from "../../../../components/TabIcon";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity } from "react-native";
import { categoryIndexAtom } from "../../../../../atom";
import { useRecoilValue } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type StackParamList = {
  HomeChallengeInfo: {
    title: string;
    schedule: string;
    members: number;
    challengeIdx: number;
  };
};
type NavigationProps = StackNavigationProp<StackParamList>;

export const Challenges = () => {
  const navigation = useNavigation<NavigationProps>();
  const categoryIndex = useRecoilValue(categoryIndexAtom);
  const [ListEmpty, setListEmpty] = useState(false);
  const [challengeHomeData, setChallengeHomeData] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("userIdx").then((value) => {
      const userIdx = value;
      axios
        .get(`https://jaksimfriend.site/challenges/${categoryIndex + 1}/${userIdx}/home`)
        .then(function (response) {
          if (response.data.result === undefined) {
            setListEmpty(true);
          } else {
            setListEmpty(false);
            setChallengeHomeData(response.data.result);
          }
        })
        .catch(function (error) {
          console.warn(error);
        });
    });
  }, [categoryIndex]);

  return (
    <>
      {ListEmpty ? (
        <EmptyChallengeList />
      ) : (
        <>
          <ChallegeHeader>추천 챌린지</ChallegeHeader>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginLeft: 15, marginBottom: 80 }}
          >
            {challengeHomeData.map((item: any, index) => {
              const Members = [1, 2, 3, 4, 5, 6];
              const selected = Members.slice(0, item.accept);
              const common = Members.concat(selected);
              const Others = common.filter(function (v) {
                return common.indexOf(v) == common.lastIndexOf(v);
              });
              return (
                <ChallengeBox key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("HomeChallengeInfo", {
                        title: item.title,
                        schedule: item.certification,
                        members: item.accept,
                        challengeIdx: item.challengeIdx,
                      });
                    }}
                  >
                    <ChallengeCategory>
                      <ChallengeCategoryText>{item.categoryName}</ChallengeCategoryText>
                    </ChallengeCategory>
                    <ChallengeTitle>{item.title}</ChallengeTitle>
                    <ChallengeTags>
                      {item.tags[2] ? `#${item.tags[2]}` : ""}{" "}
                      {item.tags[1] ? `#${item.tags[1]}` : ""}{" "}
                      {item.tags[0] ? `#${item.tags[0]}` : ""}
                    </ChallengeTags>
                    <DateWrapper>
                      <HomeCalendar />
                      <InfoText>{item.startDate}</InfoText>
                    </DateWrapper>
                    <ScheduleWrapper>
                      <HomeClock />
                      <InfoText>{item.certification}</InfoText>
                    </ScheduleWrapper>
                    <MembersWrapper>
                      <HomeUser />
                      {/* 선택된맴버수 예시:4명 */}
                      {Members.slice(0, item.accept).map((item, index) => {
                        return (
                          <SelectedWrapper key={index}>
                            <ButtonText>{item}</ButtonText>
                          </SelectedWrapper>
                        );
                      })}
                      {/* 전체 맴버수 예시:6명 */}
                      {Others.map((item, index) => {
                        return (
                          <NonSelectedWrapper key={index}>
                            <ButtonText>{item}</ButtonText>
                          </NonSelectedWrapper>
                        );
                      })}
                    </MembersWrapper>
                  </TouchableOpacity>
                </ChallengeBox>
              );
            })}
          </ScrollView>
        </>
      )}
    </>
  );
};

const ChallegeHeader = styled.Text`
  margin: 20px 4% 0 4%;
  font-size: 20px;
  font-weight: 600;
`;
const ChallengeBox = styled.View`
  padding: 20px 10px;
  background-color: #f6f5fb;
  border-radius: 12px;
  margin: 30px 10px 0px 5px;
`;
const ChallengeTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin: 10px 0 15px 0;
`;
const ChallengeCategory = styled.View`
  background-color: #ffffff;
  border-radius: 15px;
  padding: 8px 0;
  margin: 6px 0;
  width: 50%;
`;
const ChallengeCategoryText = styled.Text`
  text-align: center;
`;
const ChallengeTags = styled.Text`
  margin: 0 0 20px 0;
  color: #6f81a9;
`;
const DateWrapper = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;
const ScheduleWrapper = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;
const MembersWrapper = styled.View`
  flex-direction: row;
  margin-top: 3px;
`;

const SelectedWrapper = styled.View`
  background-color: #054de4;
  border-radius: 4px;
  margin-left: 3px;
`;
const NonSelectedWrapper = styled.View`
  background-color: #bfc7d7;
  border-radius: 4px;
  margin-left: 3px;
`;
const InfoText = styled.Text`
  padding: 0 5px;
`;
const ButtonText = styled.Text`
  padding: 0 5px;
  color: transparent;
`;
