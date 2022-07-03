import React, { useCallback, useMemo, useRef } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { HomeCalendar, HomeClock, HomeUser } from "../../../../components/TabIcon";
import { ChallengeData } from "./ChallengeData";

export const MojibData = [
  {
    title: "제목1",
    day: 6,
    people: 6,
    newRequest: 6,
  },
  {
    title: "제목2",
    day: 5,
    people: 5,
    newRequest: 5,
  },
  {
    title: "제목3",
    day: 4,
    people: 4,
    newRequest: 4,
  },
  {
    title: "제목4",
    day: 3,
    people: 3,
    newRequest: 3,
  },
];

export const Request = () => {
  return (
    <RequestWrapper>
      <ScrollView>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>모집 중</Text>
          <Text style={styles.number}>{MojibData.length}</Text>
        </View>
        {MojibData.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>모집하고 있는 도전작심이 없어요</Text>
          </View>
        ) : (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {MojibData.map((item, index) => {
              return (
                <TouchableOpacity style={styles.mojibBox} key={index}>
                  <RecruitWrapper>
                    <Text style={styles.recruitTitle}>{item.title}</Text>
                    <View style={styles.recruitInfo}>
                      <HomeCalendar />
                      <RecruitText>D-{item.day}</RecruitText>
                      <HomeUser />
                      <RecruitText>{item.people}명</RecruitText>
                    </View>
                    <View style={styles.newInfo}>
                      <Text style={styles.newInfoText}>
                        신규 신청이 {item.newRequest}건 있어요!
                      </Text>
                    </View>
                  </RecruitWrapper>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>신청 중</Text>
          <Text style={styles.number}>{ChallengeData.length}</Text>
        </View>
        {ChallengeData.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>신청한 도전작심이 없어요</Text>
          </View>
        ) : (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {ChallengeData.map((item, index) => {
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
        )}
      </ScrollView>
    </RequestWrapper>
  );
};

const RequestWrapper = styled.View`
  flex: 1;
  padding: 0px 10px;
  background-color: #ffffff;
`;
const RecruitWrapper = styled.View`
  background-color: #f6f5fb;
  padding: 15px;
  border-radius: 15px;
  margin: 15px 15px 0 0;
`;
const RecruitText = styled.Text`
  margin: 0 10px 10px 5px;
`;
const ChallengeBox = styled.View`
  padding: 20px 10px;
  background-color: #f6f5fb;
  border-radius: 12px;
  margin: 15px 10px 100px 5px;
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
  width: 50px;
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
  margin-top: 5px;
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  textWrapper: {
    marginTop: 40,
    flexDirection: "row",
  },
  title: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "600",
  },
  mojibBox: {
    flexDirection: "row",
  },
  number: {
    fontSize: 20,
    color: "blue",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 3,
  },
  emptyBox: {
    backgroundColor: "#F6F5FB",
    padding: 45,
    borderRadius: 15,
    marginTop: 20,
    alignItems: "center",
  },
  emptyText: {
    color: "#6F81A9",
  },
  recruitTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recruitInfo: {
    flexDirection: "row",
  },
  newInfo: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginVertical: 5,
  },
  newInfoText: {
    color: "#054DE4",
    alignSelf: "center",
  },
});
