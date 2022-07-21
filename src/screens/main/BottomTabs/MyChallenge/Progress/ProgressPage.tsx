import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import {
  HomeCalendarBlue,
  HomeClockBlue,
  HomeUserBlue,
  HomeCamera,
} from "../../../../../components/TabIcon";
import "moment/locale/ko";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { GradientButtons } from "../../../../../components/GradientButtons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { progressIndexAtom } from "../../../../../../atom";

export const ProgressPage = () => {
  const progressIndex = useRecoilValue(progressIndexAtom);
  const navigation: any = useNavigation();

  const [data, setData]: any = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("userIdx").then((value) => {
      const userIdx = value;
      axios
        .get(`https://jaksimfriend.site/my-challenges/${progressIndex}/${userIdx}/progress-info`)
        .then(function (response) {
          setData(response.data.result[0]);
        })
        .catch(function (error) {
          console.warn(error);
        });
    });
  }, []);
  const markedDate = [
    "2022-07-05",
    "2022-07-06",
    "2022-07-07",
    "2022-07-08",
    "2022-07-09",
    "2022-07-10",
    "2022-07-11",
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Wrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <Text>
            {data.dateLists?.map((item: any, index: number) => {
              {
                item.certificationDate;
              }
            })}
          </Text> */}
          <Calendar
            firstDay={1}
            initialDate={data.startDate}
            minDate={data.startDate}
            maxDate={moment(data.startDate).add(14, "days").format(`YYYY-MM-DD`)}
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
          <View style={styles.spendingDateBox}>
            <Text style={styles.spendingDateText}>
              {data.remainingDay}일 안에 {data.remainingCount}회 더 인증하셔야 해요
            </Text>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.infoWrapper}>
              <Text style={styles.textColor}>
                <HomeCalendarBlue /> {data.date}
              </Text>
              <Text style={styles.textBottomColor}>
                <HomeClockBlue /> {data.certificationInfo}
              </Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.textColor}>
                <HomeUserBlue /> {data.limited} 명
              </Text>
              <Text style={styles.textBottomColor}>
                <HomeCamera /> {data.deadline}
              </Text>
            </View>
          </View>
          <Text style={styles.membersTitle}>작심친구 {data.memberCount}</Text>
          {data.members?.map((item: any, index: number) => {
            return (
              <Friends key={index}>
                <Friend>
                  <View style={styles.friendLeft}>
                    <Logo
                      resizeMode="contain"
                      source={{ uri: item.profile }}
                      style={{ borderRadius: 15 }}
                    />
                    <UserInfo>
                      <Name>{item.nickName}</Name>
                      <Promise>{item.promise}</Promise>
                    </UserInfo>
                  </View>
                  <PercentageInfo>
                    <Percentage>{item.percent}%</Percentage>
                    <LastCertified>{item.certification}</LastCertified>
                  </PercentageInfo>
                </Friend>
              </Friends>
            );
          })}
        </ScrollView>

        {data.certificationStatus === 1 ? (
          <OpenChallenge>
            <TouchableOpacity style={styles.completedButton} disabled>
              <Text style={styles.completedButtonText}>오늘 인증 완료했어요!</Text>
            </TouchableOpacity>
          </OpenChallenge>
        ) : (
          <OpenChallenge>
            <GradientButtons
              onPress={() => {
                navigation.navigate("ProgressCertified", {
                  challengeIdx: progressIndex,
                });
              }}
              Title="사진으로 인증하기"
            />
          </OpenChallenge>
        )}
      </Wrapper>
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 0 4%;
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
