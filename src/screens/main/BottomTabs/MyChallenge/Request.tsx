import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import { HomeCalendar, HomeClock, HomeUser } from "../../../../components/TabIcon";
import { StackNavigationProp } from "@react-navigation/stack";
import { RecruitData, RequestData } from "./ChallengeData";
import moment from "moment";

type StackParamList = {
  RecruitPage: {
    title: string;
    content: string;
    startDate: string;
    schedule: string;
    members: number;
    waiting: number;
  };
  RequestPage: {
    title: string;
    content: string;
    startDate: string;
    schedule: string;
    members: number;
  };
};
type NavigationProps = StackNavigationProp<StackParamList>;

export const Request = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <RequestWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 모집 중 */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>모집 중</Text>
          <Text style={styles.number}>{RecruitData.length}</Text>
        </View>
        {RecruitData.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>모집하고 있는 도전작심이 없어요</Text>
          </View>
        ) : (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {RecruitData.map((item, index) => {
              return (
                <TouchableOpacity
                  style={styles.recruitBox}
                  key={index}
                  onPress={() => {
                    navigation.navigate("RecruitPage", {
                      title: item.title,
                      content: item.content,
                      startDate: item.startDate,
                      schedule: item.schedule,
                      members: item.members,
                      waiting: item.waiting,
                    });
                  }}
                >
                  <RecruitWrapper>
                    <Text style={styles.recruitTitle}>{item.title}</Text>
                    <View style={styles.recruitInfo}>
                      <HomeCalendar />
                      <RecruitText>
                        D-
                        {Math.ceil(
                          moment.duration({ from: new Date(), to: item.startDate }).asDays(),
                        )}
                      </RecruitText>
                      <HomeUser />
                      <RecruitText>{item.members}명</RecruitText>
                    </View>
                    <View style={styles.newInfo}>
                      <Text style={styles.newInfoText}>신규 신청이 {item.waiting}건 있어요!</Text>
                    </View>
                  </RecruitWrapper>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        {/* 신청 중 */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>신청 중</Text>
          <Text style={styles.number}>{RequestData.length}</Text>
        </View>
        {RequestData.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>신청한 도전작심이 없어요</Text>
          </View>
        ) : (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {RequestData.map((item, index) => {
              return (
                <ChallengeBox key={index}>
                  <Image
                    source={require("../../../../assets/Art.png")}
                    blurRadius={10}
                    style={{ backgroundColor: "#000000", width: 100, height: 300 }}
                  />
                  <TouchableOpacity
                    activeOpacity={0}
                    onPress={() => {
                      navigation.navigate("RequestPage", {
                        title: item.title,
                        content: item.content,
                        startDate: item.startDate,
                        schedule: item.schedule,
                        members: item.members,
                      });
                    }}
                  >
                    {item.approve ? (
                      <ChallengeCategory>
                        <ChallengeCategoryText>승인</ChallengeCategoryText>
                      </ChallengeCategory>
                    ) : (
                      <ChallengeCategoryTwo>
                        <ChallengeCategoryTextTwo>승인 대기</ChallengeCategoryTextTwo>
                      </ChallengeCategoryTwo>
                    )}
                    <ChallengeTitle>{item.title}</ChallengeTitle>
                    <ChallengeTags>{item.tags}</ChallengeTags>
                    <DateWrapper>
                      <HomeCalendar />
                      <InfoText>
                        D-
                        {Math.ceil(
                          moment.duration({ from: new Date(), to: item.startDate }).asDays(),
                        )}
                      </InfoText>
                    </DateWrapper>
                    <ScheduleWrapper>
                      <HomeClock />
                      <InfoText>{item.schedule}</InfoText>
                    </ScheduleWrapper>
                    <MembersWrapper>
                      <HomeUser />
                      <InfoText>{item.members}명</InfoText>
                    </MembersWrapper>
                    {item.members < 4 ? (
                      <View style={styles.moreMembersButton}>
                        <Text>{4 - item.members}명 더 필요해요</Text>
                      </View>
                    ) : (
                      <></>
                    )}
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
  margin: 15px 10px 30px 5px;
  z-index: 1000000;
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
const ChallengeCategoryTwo = styled.View`
  background-color: #4f65e7;
  border-radius: 15px;
  padding: 8px 0;
  margin: 6px 0;
  width: 50%;
`;
const ChallengeCategoryText = styled.Text`
  text-align: center;
`;
const ChallengeCategoryTextTwo = styled.Text`
  text-align: center;
  color: #ffffff;
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
const InfoText = styled.Text`
  padding: 0 5px;
`;

const styles = StyleSheet.create({
  textWrapper: {
    marginTop: 20,
    flexDirection: "row",
    paddingLeft: 10,
  },
  title: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "600",
  },
  recruitBox: {
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
  moreMembersButton: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginTop: 10,
  },
});
