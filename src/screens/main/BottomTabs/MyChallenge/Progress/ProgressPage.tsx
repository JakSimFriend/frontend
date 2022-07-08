import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { HomeCalendar, HomeClock, HomeUser, HomeCameraBlue } from "../../../../../components/TabIcon";
import "moment/locale/ko";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { a } from "../../../../../assets/images";
import { GradientButtons } from "../../../../../components/GradientButtons";

const DetailInfo = { title: "제목", startDate: "2022-07-05", schedule: "1주일에 2회", members: 5 };
const markedDate = [
  "2022-07-05",
  "2022-07-06",
  "2022-07-07",
  "2022-07-08",
  "2022-07-09",
  "2022-07-10",
  "2022-07-11",
];

// startDate이 오늘 이후인 data만 fetch
export const ProgressPage = () => {
  const [certified, setCertified] = useState(false); //data
  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 캘린더 */}
        <Calendar
          firstDay={1}
          initialDate={DetailInfo.startDate}
          minDate={DetailInfo.startDate}
          maxDate={moment(DetailInfo.startDate).add(14, "days").format(`YYYY-MM-DD`)}
          markingType={"period"}
          hideDayNames
          markedDates={{
            [`${markedDate[0]}`]: {
              startingDay: true,
              endingDay: true,
              color: "#054DE4",
              textColor: "#ffffff",
            },
            [`${markedDate[1]}`]: {
              startingDay: true,
              endingDay: true,
              color: "#054DE4",
              textColor: "#ffffff",
            },
            [`${markedDate[2]}`]: {
              startingDay: true,
              endingDay: true,
              color: "#054DE4",
              textColor: "#ffffff",
            },
            [`${markedDate[3]}`]: {
              startingDay: true,
              endingDay: true,
              color: "#054DE4",
              textColor: "#ffffff",
            },
            [`${markedDate[4]}`]: {
              startingDay: true,
              endingDay: true,
              color: "#054DE4",
              textColor: "#ffffff",
            },
          }}
        />
        {/* 개설 시 정해준 총 인증횟수가 앞으로 남은 시간동안 몇 회 남았는가 */}
        <View style={styles.spendingDateBox}>
          <Text style={styles.spendingDateText}>3일 안에 2회 더 인증하셔야 해요</Text>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.infoWrapper}>
            <Text style={styles.textColor}>
              <HomeCalendar /> {moment(DetailInfo.startDate).format(`M월 D일`)} ~{" "}
              {moment(DetailInfo.startDate).add(14, "days").format(`M월 D일`)}
            </Text>
            <Text style={styles.textBottomColor}>
              <HomeClock /> {DetailInfo.schedule}
            </Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={styles.textColor}>
              <HomeUser /> {DetailInfo.members} 명
            </Text>
            <Text style={styles.textBottomColor}>
              <HomeCameraBlue /> 11시 30분 마감
            </Text>
          </View>
        </View>
        <Text style={styles.membersTitle}>작심친구 {DetailInfo.members}</Text>
        <Friends>
          <Friend>
            <View style={styles.friendLeft}>
              <Logo resizeMode="contain" source={a} />
              <UserInfo>
                <Name>이름</Name>
                <Promise>작심</Promise>
              </UserInfo>
            </View>
            <PercentageInfo>
              <Percentage>100%</Percentage>
              {/* percentage가 0이면 "인증 내역 없음" */}
              <LastCertified>14일 전 인증</LastCertified>
            </PercentageInfo>
          </Friend>
          <Friend>
            <View style={styles.friendLeft}>
              <Logo resizeMode="contain" source={a} />
              <UserInfo>
                <Name>이름</Name>
                <Promise>작심</Promise>
              </UserInfo>
            </View>
            <PercentageInfo>
              <Percentage>100%</Percentage>
              <LastCertified>14일 전 인증</LastCertified>
            </PercentageInfo>
          </Friend>
        </Friends>
      </ScrollView>

      {/* 인증한 날 중에 오늘 날이 있으면 certified=true */}
      {certified ? (
        <OpenChallenge>
          <TouchableOpacity style={styles.completedButton}>
            <Text style={styles.completedButtonText}>오늘 인증 완료했어요!</Text>
          </TouchableOpacity>
        </OpenChallenge>
      ) : (
        <OpenChallenge>
          <GradientButtons
            onPress={() => {
              console.warn("인증 페이지로 이동하기~~");
            }}
            Title="사진으로 인증하기"
          />
        </OpenChallenge>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 0 25px;
`;
const Friends = styled.View`
  flex-direction: column;
  margin-top: 15px;
`;
const Friend = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  border-bottom-color: #f6f5fb;
  border-bottom-width: 1px;
  padding-bottom: 10px;
  justify-content: space-between;
`;
const Logo = styled.Image`
  width: 35px;
  height: 35px;
  margin-right: 20px;
`;
const UserInfo = styled.View`
  flex-direction: column;
`;
const PercentageInfo = styled.View`
  align-items: flex-end;
  margin-right: 10px;
`;
const Percentage = styled.Text`
  color: #676de8;
  font-size: 25px;
  font-weight: 600;
`;
const LastCertified = styled.Text`
  color: #bfc7d7;
  margin-top: 5px;
`;
const Name = styled.Text`
  font-weight: 600;
`;
const Promise = styled.Text`
  margin-top: 10px;
`;
const OpenChallenge = styled.View`
  align-self: center;
  width: 70%;
  position: absolute;
  bottom: 0;
  margin-bottom: 30px;
`;

const styles = StyleSheet.create({
  spendingDateBox: {
    paddingVertical: 20,
    marginHorizontal: 15,
    backgroundColor: "#F6F5FB",
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 20,
  },
  spendingDateText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#6F81A9",
    textAlign: "center",
  },
  infoBox: {
    flexDirection: "row",
  },
  infoWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  membersTitle: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: "600",
  },
  textColor: {
    color: "#6F81A9",
  },
  textBottomColor: {
    color: "#6F81A9",
    marginTop: 10,
  },
  completedButton: {
    paddingHorizontal: 55,
    paddingVertical: 15,
    backgroundColor: "#BFC7D7",
    borderRadius: 15,
    alignSelf: "center",
    marginBottom: 20,
  },
  completedButtonText: {
    color: "#ffffff",
  },
  friendLeft: {
    flexDirection: "row",
  },
});
