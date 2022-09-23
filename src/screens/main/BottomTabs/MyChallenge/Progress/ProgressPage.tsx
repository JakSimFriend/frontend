import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import {
  HomeCalendarBlue,
  HomeClockBlue,
  HomeUserBlue,
  HomeCamera,
} from "../../../../../components/atoms/TabIcon";
import "moment/locale/ko";
import moment from "moment";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { GradientButtons } from "../../../../../components/atoms/GradientButtons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { progressIndexAtom, userIdxAtom } from "../../../../../common/atom";

export const ProgressPage = () => {
  const progressIndex = useRecoilValue(progressIndexAtom);
  const userIdx = useRecoilValue(userIdxAtom);
  const navigation: any = useNavigation();
  const [data, setData]: any = useState([]);
  useEffect(() => {
    axios
      .get(`https://jaksimfriend.site/my-challenges/${progressIndex}/${userIdx}/progress-info`)
      .then(function (response) {
        setData(response.data.result[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  LocaleConfig.locales["fr"] = {
    monthNames: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    monthNamesShort: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
    dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    today: "today",
  };
  LocaleConfig.defaultLocale = "fr";
  const markedDates = data.dateLists?.map((item: any) => {
    return item.certificationDate;
  });
  let dates: any = {};
  markedDates?.forEach((val: string) => {
    dates[val] = {
      customStyles: {
        container: {
          backgroundColor: "#054DE4",
          borderRadius: 10,
        },
        text: {
          color: "#ffffff",
        },
      },
    };
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Wrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Calendar
            firstDay={1}
            initialDate={data.startDate}
            minDate={data.startDate}
            maxDate={moment(data.startDate).add(14, "days").format(`YYYY-MM-DD`)}
            markingType={"custom"}
            hideDayNames
            markedDates={dates}
            monthFormat={"yyyy/MM"}
            theme={{
              todayTextColor: "#054DE4",
            }}
          />
          <View style={styles.spendingDateBox}>
            <Text style={styles.spendingDateText}>
              {data.remainingDay > 0
                ? `${data.remainingDay}일 안에 ${data.remainingCount}회 더 인증하셔야 해요`
                : `챌린지가 종료되었어요`}
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
          <Text style={styles.membersTitle}>작심친구 6</Text>
          <View style={{ marginBottom: "15%" }}>
            {data.members?.map((item: any, index: number) => {
              return (
                <Friends key={index}>
                  <Friend>
                    <View style={styles.friendLeft}>
                      <Logo
                        style={{ borderRadius: 15 }}
                        resizeMode="contain"
                        source={{ uri: item.profile }}
                      />
                      {/* 내부 리액션 연결 */}
                      <View>
                        <View style={styles.reactionButton}>
                          <Logo
                            style={{ width: 25, height: 25 }}
                            resizeMode="contain"
                            source={require("../../../../../assets/images/Emo.png")}
                          />
                        </View>
                      </View>
                      <UserInfo>
                        <Name>{item.nickName}</Name>
                        <Promise>{item.promise}</Promise>
                      </UserInfo>
                    </View>
                    <PercentageInfo>
                      {item.percent === 100 ? (
                        <Percentage style={{ color: "#676de8" }}>{item.percent}%</Percentage>
                      ) : (
                        <Percentage style={{ color: "#000" }}>{item.percent}%</Percentage>
                      )}
                      <LastCertified>{item.certification}</LastCertified>
                    </PercentageInfo>
                  </Friend>
                </Friends>
              );
            })}
          </View>
        </ScrollView>
        {/* 종료 = 빈코드 */}
        {data.remainingDay < 1 ? (
          <></>
        ) : (
          <>
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
                      certification: data.certificationStatus,
                    });
                  }}
                  Title="사진으로 인증하기"
                />
              </OpenChallenge>
            )}
          </>
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
  width: 45px;
  height: 45px;
  margin-right: 20px;
`;
const UserInfo = styled.View`
  flex-direction: column;
  margin-left: -20px;
`;
const PercentageInfo = styled.View`
  align-items: flex-end;
  margin-right: 10px;
`;
const Percentage = styled.Text`
  font-size: 25px;
  font-weight: 600;
`;
const LastCertified = styled.Text`
  color: #bfc7d7;
  margin-top: 5px;
`;
const Name = styled.Text`
  font-weight: 600;
  font-size: 18px;
`;
const Promise = styled.Text`
  margin-top: 10px;
  color: #6f81a9;
  font-weight: 600;
`;
const OpenChallenge = styled.View`
  align-self: center;
  width: 80%;
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
    paddingHorizontal: 80,
    paddingVertical: 15,
    backgroundColor: "#BFC7D7",
    borderRadius: 15,
    alignSelf: "center",
  },
  completedButtonText: {
    color: "#ffffff",
  },
  friendLeft: {
    flexDirection: "row",
  },
  picture: {
    padding: 20,
    backgroundColor: "#F6F5FB",
    borderRadius: 50,
  },
  reactionButton: {
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderRadius: 50,
    top: 24,
    justifyContent: "center",
    alignSelf: "center",
    right: 35,
  },
});
