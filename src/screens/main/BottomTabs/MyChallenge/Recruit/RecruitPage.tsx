import React, { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
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
import {
  recruitContentInfoAtom,
  recruitMembersInfoAtom,
  recruitScheduleInfoAtom,
  recruitStartDateInfoAtom,
  recruitTitleInfoAtom,
  recruitWaitingInfoAtom,
} from "../../../../../../atom";
import { useSetRecoilState } from "recoil";
import { a } from "../../../../../assets/images";

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
export const RecruitPage = ({ route }: RouteParams) => {
  const { title, startDate, schedule, members, content, waiting } = route.params;
  const setRecruitTitleData = useSetRecoilState(recruitTitleInfoAtom);
  const setRecruitContentData = useSetRecoilState(recruitContentInfoAtom);
  const setRecruitStartDateData = useSetRecoilState(recruitStartDateInfoAtom);
  const setRecruitScheduleData = useSetRecoilState(recruitScheduleInfoAtom);
  const setRecruitMembersData = useSetRecoilState(recruitMembersInfoAtom);
  const setRecruitWaitingData = useSetRecoilState(recruitWaitingInfoAtom);
  useEffect(() => {
    setRecruitTitleData(title);
    setRecruitContentData(content);
    setRecruitStartDateData(startDate);
    setRecruitScheduleData(schedule);
    setRecruitMembersData(members);
    setRecruitWaitingData(waiting);
  }, []);

  return (
    <Wrapper>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.title}>정보</Text>
        <Calendar
          firstDay={1}
          initialDate={startDate}
          minDate={startDate}
          hideDayNames
          maxDate={moment(startDate).add(14, "days").format(`YYYY-MM-DD`)}
        />
        <View style={styles.spendingDateBox}>
          <Text style={styles.spendingDateText}>
            {moment(startDate, "YYYYMMDD").fromNow()}에 시작해요
          </Text>
        </View>
        <View style={styles.infoBox}>
          <View style={styles.infoWrapper}>
            <Text style={{ color: "#6F81A9" }}>
              <HomeCalendarBlue /> {moment(startDate).format(`M월 D일`)} ~{" "}
              {moment(startDate).add(14, "days").format(`M월 D일`)}
            </Text>
            <Text style={{ marginTop: 10, color: "#6F81A9" }}>
              <HomeClockBlue /> {schedule}
            </Text>
          </View>
          <View style={styles.infoWrapper}>
            <Text style={{ color: "#6F81A9" }}>
              <HomeUserBlue /> {members} 명
            </Text>
            <Text style={{ color: "#6F81A9", marginTop: 10 }}>
              <HomeCamera /> 11시 30분 마감
            </Text>
          </View>
        </View>
        <Text style={styles.membersTitle}>신규 신청 {waiting}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Waitings>
            <WaitingWrapper>
              <WaitingImage resizeMode="contain" source={a} />
              <PercentageWrapper>
                <Text>달성률 100%</Text>
              </PercentageWrapper>
              <View>
                <WaitingName>이름</WaitingName>
                <WaitingPromise>작심</WaitingPromise>
              </View>
              <WaitingButtonWrapper>
                <DeclineButton>
                  <ButtonText>거절</ButtonText>
                </DeclineButton>
                <AcceptButton>
                  <ButtonText>승인</ButtonText>
                </AcceptButton>
              </WaitingButtonWrapper>
            </WaitingWrapper>
            <WaitingWrapper>
              <WaitingImage resizeMode="contain" source={a} />
              <PercentageWrapper>
                <Text>달성률 100%</Text>
              </PercentageWrapper>
              <View>
                <WaitingName>이름</WaitingName>
                <WaitingPromise>작심</WaitingPromise>
              </View>
              <WaitingButtonWrapper>
                <DeclineButton>
                  <ButtonText>거절</ButtonText>
                </DeclineButton>
                <AcceptButton>
                  <ButtonText>승인</ButtonText>
                </AcceptButton>
              </WaitingButtonWrapper>
            </WaitingWrapper>
          </Waitings>
        </ScrollView>
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
  padding: 50px 4% 0 4%;
`;
const Waitings = styled.View`
  flex-direction: row;
  padding: 0;
`;
const WaitingWrapper = styled.View`
  background-color: #f6f5fb;
  border-radius: 15px;
  padding: 20px;
  margin: 20px 20px 0 0;
  align-items: center;
`;
const WaitingImage = styled.Image`
  width: 45px;
  height: 45px;
`;
const PercentageWrapper = styled.View`
  background-color: #ffffff;
  border-radius: 15px;
  padding: 5px;
  margin: 10px 0;
`;
const WaitingName = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const WaitingPromise = styled.Text`
  color: #6f81a9;
  align-self: center;
  margin-bottom: 10px;
`;
const WaitingButtonWrapper = styled.View`
  flex-direction: row;
`;
const DeclineButton = styled.TouchableOpacity`
  padding: 10px 30px;
  background-color: #bfc7d7;
  border-radius: 10px;
  margin-right: 3px;
`;
const AcceptButton = styled.TouchableOpacity`
  padding: 10px 30px;
  background-color: #054de4;
  border-radius: 10px;
  margin-left: 3px;
`;
const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: 800;
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
