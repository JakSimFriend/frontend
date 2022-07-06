import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { HomeCalendar, HomeClock, HomeUser, HomeCamera } from "../../../../components/TabIcon";
import "moment/locale/ko";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import { useSetRecoilState } from "recoil";
import {
  BeforeStartContentInfoAtom,
  BeforeStartMembersInfoAtom,
  BeforeStartScheduleInfoAtom,
  BeforeStartStartDateInfoAtom,
  BeforeStartTitleInfoAtom,
  BeforeStartWaitingInfoAtom,
} from "../../../../../atom";
import { a } from "../../../../assets/images";

type RouteParams = {
  route: {
    params: {
      title: string;
      content: string;
      startDate: string;
      schedule: string;
      members: number;
      waiting: number;
    };
  };
};

// startDate이 오늘 이후인 data만 fetch
export const BeforeStartPage = ({ route }: RouteParams) => {
  const { title, startDate, schedule, members, content, waiting } = route.params;
  const setBeforeStartTitleData = useSetRecoilState(BeforeStartTitleInfoAtom);
  const setBeforeStartContentData = useSetRecoilState(BeforeStartContentInfoAtom);
  const setBeforeStartStartDateData = useSetRecoilState(BeforeStartStartDateInfoAtom);
  const setBeforeStartScheduleData = useSetRecoilState(BeforeStartScheduleInfoAtom);
  const setBeforeStartMembersData = useSetRecoilState(BeforeStartMembersInfoAtom);
  const setBeforeStartWaitingData = useSetRecoilState(BeforeStartWaitingInfoAtom);
  useEffect(() => {
    setBeforeStartTitleData(title);
    setBeforeStartContentData(content);
    setBeforeStartStartDateData(startDate);
    setBeforeStartScheduleData(schedule);
    setBeforeStartMembersData(members);
    setBeforeStartWaitingData(waiting);
  }, []);
  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.title}>정보</Text>
        <Calendar
          firstDay={1}
          initialDate={startDate}
          minDate={startDate}
          maxDate={moment(startDate).add(14, "days").format(`YYYY-MM-DD`)}
        />
        <View style={styles.spendingDateBox}>
          <Text style={styles.spendingDateText}>
            {moment(startDate, "YYYYMMDD").fromNow()}에 시작해요
          </Text>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.infoWrapper}>
            <Text>
              <HomeCalendar /> {moment(startDate).format(`M월 D일`)} ~{" "}
              {moment(startDate).add(14, "days").format(`M월 D일`)}
            </Text>
            <Text>
              <HomeClock /> {schedule}
            </Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text>
              <HomeUser /> {members} 명
            </Text>
            <Text>
              <HomeCamera /> 11시 30분 마감
            </Text>
          </View>
        </View>
        <Text style={styles.membersTitle}>작심친구 {members}</Text>
        <Friends>
          <Friend>
            <Logo resizeMode="contain" source={a} />
            <UserInfo>
              <Name>이름</Name>
              <Promise>작심</Promise>
            </UserInfo>
          </Friend>
        </Friends>
      </ScrollView>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 80px 25px 0 25px;
`;
const Friends = styled.View`
  flex-direction: column;
  margin-top: 15px;
`;
const Friend = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;
const Logo = styled.Image`
  width: 35px;
  height: 35px;
  margin-right: 20px;
`;
const UserInfo = styled.View`
  flex-direction: column;
`;
const Name = styled.Text`
  font-weight: 600;
`;
const Promise = styled.Text`
  margin-top: 10px;
`;

const styles = StyleSheet.create({
  headerTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  title: {
    marginTop: 25,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "600",
  },
  spendingDateBox: {
    paddingVertical: 20,
    marginHorizontal: 15,
    backgroundColor: "#6F81A9",
    borderRadius: 15,
    marginBottom: 20,
    marginTop: 20,
  },
  spendingDateText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
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
});
