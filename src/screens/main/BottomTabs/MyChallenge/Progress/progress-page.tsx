import "moment/locale/ko";

import { useNavigation } from "@react-navigation/native";
import { Color } from "@src/assets/color";
import { Calender as CalendarIcon, Camera, Timer, User } from "@src/assets/images/images";
import { progressIndexAtom, userIdxAtom } from "@src/common/atom";
import { GradientButtons } from "@src/components/atoms/GradientButtons";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";

export const ProgressPage = () => {
  const progressIndex = useRecoilValue(progressIndexAtom);
  const userIdx = useRecoilValue(userIdxAtom);
  const navigation: any = useNavigation();
  const [data, setData]: any = useState([]);
  useEffect(() => {
    axios
      .get(`https://eddy-pl.com/api/my-challenges/${progressIndex}/progress-info/${userIdx}`)
      .then(function (response) {
        console.log(response);
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
  const dates: any = {};
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
                <Image source={CalendarIcon} /> {data.date}
              </Text>
              <Text style={styles.textBottomColor}>
                <Image source={Camera} /> {data.certificationInfo}
              </Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={styles.textColor}>
                <Image source={User} /> {data.memberCount} 명
              </Text>
              <Text style={styles.textBottomColor}>
                <Image source={Timer} /> {data.deadline}
              </Text>
            </View>
          </View>
          <Text style={styles.membersTitle}>작심친구 {data.memberCount}</Text>
          <View style={{ marginTop: 20 }}>
            {/* TODO */}
            {data.members?.map((item: any, index: number) => {
              return (
                <Friend key={index}>
                  <MemberInfoWrapper>
                    <View style={{ position: "relative" }}>
                      <Logo source={{ uri: item.profile }} />
                      <EmojiWrapper>
                        <Emoji source={require("@src/assets/images/Emo.png")} />
                      </EmojiWrapper>
                    </View>

                    <UserInfo>
                      <Name>{item.nickName}</Name>
                      <Promise>{item.promise}</Promise>
                    </UserInfo>
                  </MemberInfoWrapper>
                  <PercentageInfo>
                    {item.percent === 100 ? (
                      <Percentage style={{ color: "#676de8" }}>{item.percent}%</Percentage>
                    ) : (
                      <Percentage style={{ color: "#000" }}>{item.percent}%</Percentage>
                    )}
                    <LastCertified>{item.certification}</LastCertified>
                  </PercentageInfo>
                </Friend>
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
  padding: 0 20px 100px 20px;
`;
const Friend = styled.View`
  flex-direction: row;
  border-bottom-color: #f6f5fb;
  border-bottom-width: 1px;
  justify-content: space-between;
  padding: 9px 0;
`;
const Logo = styled.Image`
  width: 54px;
  height: 54px;
  border-radius: 100px;
`;
const EmojiWrapper = styled.View`
  padding: 6px;
  position: absolute;
  bottom: 0px;
  right: -7px;
  border-radius: 100px;
  background-color: ${Color.white[200]};
`;

const Emoji = styled.Image`
  width: 16px;
  height: 16px;
`;
const UserInfo = styled.View`
  flex-direction: column;
  margin-left: 14px;
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
const MemberInfoWrapper = styled.View`
  flex-direction: row;
`;

const styles = StyleSheet.create({
  spendingDateBox: {
    paddingVertical: 20,
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
  picture: {
    padding: 20,
    backgroundColor: "#F6F5FB",
    borderRadius: 50,
  },
});
