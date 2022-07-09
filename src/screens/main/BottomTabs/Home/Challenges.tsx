import React from "react";
import { useState } from "react";
import { EmptyChallengeList } from "../Home/EmptyChallengeList";
import { ChallengeData } from "../Home/ChallengesDummyData";
import { HomeCalendar, HomeClock, HomeUser } from "../../../../components/TabIcon";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity } from "react-native";
import { categoryIndexAtom } from "../../../../../atom";
import { useRecoilValue } from "recoil";

export const Challenges = () => {
  const categoryIndex = useRecoilValue(categoryIndexAtom); //서버데이터
  const [ListEmpty, setListEmpty] = useState(false); // 서버데이터

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
            {ChallengeData[categoryIndex].map((item, index) => {
              //선택된 categoryindex에 따라 challenge데이터 불러오기:
              const Members = [1, 2, 3, 4, 5, 6];
              const selected = Members.slice(0, item.members);
              const common = Members.concat(selected);
              const Others = common.filter(function (v) {
                return common.indexOf(v) == common.lastIndexOf(v);
              });
              return (
                <ChallengeBox key={index}>
                  <TouchableOpacity>
                    <ChallengeCategory>
                      <ChallengeCategoryText>{item.category}</ChallengeCategoryText>
                    </ChallengeCategory>
                    <ChallengeTitle>{item.title}</ChallengeTitle>
                    <ChallengeTags>{item.tags}</ChallengeTags>
                    <DateWrapper>
                      <HomeCalendar />
                      <InfoText>{item.date}</InfoText>
                    </DateWrapper>
                    <ScheduleWrapper>
                      <HomeClock />
                      <InfoText>{item.schedule}</InfoText>
                    </ScheduleWrapper>
                    <MembersWrapper>
                      <HomeUser />
                      {/* 선택된맴버수 예시:4명 */}
                      {Members.slice(0, item.members).map((item, index) => {
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
  margin: 5px 0 0 18px;
  font-size: 20px;
  font-weight: 600;
`;
const ChallengeBox = styled.View`
  padding: 20px 10px;
  background-color: #f6f5fb;
  border-radius: 12px;
  margin: 15px 10px 0px 5px;
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
