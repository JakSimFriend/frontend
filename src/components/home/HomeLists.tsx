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
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";

import { HomeEmptyLists } from "./home-empty-lists";
import { Challenge, HomeViewRecommendChangeRequest } from "./interface/recommend-challenge";

type StackParamList = {
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
        .get(`challenges/${categoryIndex + 1}/${userIdx}/home`)
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
                  // "15px 10px 0px 10px"
                  <ChallengeBox
                    key={index}
                    // style={index === 1 && { marginTop: 15, marginRight: 10, marginLeft: 10 }}
                  >
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
                        {/* 선택된맴버수 예시:4명 */}
                        {Members.slice(0, item.accept).map((item, index) => {
                          return <SelectedWrapper key={index} />;
                        })}
                        {/* 전체 맴버수 예시:6명 */}
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

const ChallengeWrapper = styled.View``;

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
  margin: 10px 0 15px 0;
`;
const ChallengeCategory = styled.View`
  background-color: ${Color.white[0]};
  border-radius: 15px;
  padding: 5px 15px;
  margin: 6px 0;
  width: 50%;
`;
const ChallengeCategoryText = styled.Text`
  text-align: center;
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

const SelectedWrapper = styled.View`
  background-color: ${Color.blue[200]}; // 그라데이션
  border-radius: 4px;
  margin-left: 3px;
  width: 16px;
  height: 16px;
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
