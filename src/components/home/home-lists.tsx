import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Color } from "@src/assets/color";
import { categoryIndexAtom } from "@src/common/atom";
import { HomeCalendar, HomeClock, HomeUser } from "@src/components/atoms/TabIcon";
import axios from "axios";
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import React, { useEffect } from "react";
import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";

import { HomeEmptyLists } from "./home-empty-lists";
import { Challenge, HomeViewRecommendChangeRequest } from "./interface/recommend-challenge";

export type StackParamList = {
  HomeChallengeInfo: {
    title: string;
    schedule: string;
    members: number;
    challengeIdx: number;
  };
};

export const HomeLists = () => {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const categoryIndex = useRecoilValue(categoryIndexAtom);
  const [ListEmpty, setListEmpty] = useState(false);
  const [challengeHomeData, setChallengeHomeData] = useState<Challenge[]>();

  useEffect(() => {
    AsyncStorage.getItem("userIdx").then((value) => {
      const userIdx = value;
      axios
        .get(`/challenges/home/${categoryIndex + 1}/${userIdx}`)
        .then(({ data }: { data: HomeViewRecommendChangeRequest }) => {
          if (data.result === undefined) {
            setListEmpty(true);
          } else {
            setListEmpty(false);
            setChallengeHomeData(data.result);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, [categoryIndex]);

  return (
    <>
      {ListEmpty ? (
        <HomeEmptyLists />
      ) : (
        <ChallengeWrapper>
          <ChallengeHeader>추천 도전작심</ChallengeHeader>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {RA.isArray(challengeHomeData) &&
              challengeHomeData.map((item: Challenge, index) => {
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
                        {R.reverse(item.tags)
                          .map((tag, index) => index < 3 && `#${tag}`)
                          .filter((res) => res != false)
                          .join(" ")}
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
                        {/* 참여한 맴버 수 */}
                        {Members.slice(0, item.accept).map((item, index) => {
                          return (
                            <LinearGradient
                              style={{ marginLeft: 3, width: 16, height: 16, borderRadius: 4 }}
                              key={index}
                              colors={["#947BEA", "#1151E5"]}
                            ></LinearGradient>
                          );
                        })}
                        {/* 전체 맴버 수 */}
                        {Others.map((item, index) => {
                          return <NonSelectedWrapper key={index} />;
                        })}
                      </MembersWrapper>
                    </TouchableOpacity>
                  </ChallengeBox>
                );
              })}
          </ScrollView>
        </ChallengeWrapper>
      )}
    </>
  );
};

const ChallengeWrapper = styled.View`
  margin-bottom: 50px;
`;

const ChallengeHeader = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const ChallengeBox = styled.View`
  width: 192px;
  padding: 30px 16px;
  background-color: ${Color.white[100]};
  border-radius: 12px;
  margin-right: 10px;
`;
const ChallengeTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  margin: 36px 0 15px 0;
`;
const ChallengeCategory = styled.View`
  background-color: #ffffff;
  border-radius: 20px;
  position: absolute;
`;
const ChallengeCategoryText = styled.Text`
  text-align: center;
  padding: 5px 15px;
  border-radius: 20px;
`;
const ChallengeTags = styled.Text`
  margin: 0 0 40px 0;
  color: ${Color.blue[900]};
`;
const DateWrapper = styled.View`
  flex-direction: row;
`;
const ScheduleWrapper = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;
const MembersWrapper = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;
const NonSelectedWrapper = styled.View`
  background-color: ${Color.gray[100]};
  border-radius: 4px;
  margin-left: 3px;
  width: 16px;
  height: 16px;
`;
const InfoText = styled.Text`
  padding: 0 5px;
  font-size: 15px;
  font-weight: 400;
`;
