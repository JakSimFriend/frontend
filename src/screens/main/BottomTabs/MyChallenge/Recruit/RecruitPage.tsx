import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import {
  HomeCalendarBlue,
  HomeClockBlue,
  HomeUserBlue,
  HomeCamera,
} from "../../../../../components/atoms/TabIcon";
import "moment/locale/ko";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRecoilValue } from "recoil";
import { userIdxAtom } from "../../../../../common/atom";

type RouteParams = {
  route: {
    params: {
      challengeIdx: number;
    };
  };
};

export const RecruitPage = ({ route }: RouteParams) => {
  const { challengeIdx } = route.params;
  const userIdx = useRecoilValue(userIdxAtom);

  const [recruitPageData, setRecruitPageData]: any = useState([]);
  useEffect(() => {
    axios
      .get(`https://jaksimfriend.site/my-challenges/${challengeIdx}/${userIdx}/recruitment-info`)
      .then(function (response) {
        setRecruitPageData(response.data.result[0]);
      })
      .catch((error) => console.log(error.message));
  }, []);
  const acceptJoin = (item: any) => {
    axios
      .patch(`https://jaksimfriend.site/challenges/${item}/${userIdx}/accept`)
      .then(function (response) {
        console.warn(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const refuseJoin = (item: any) => {
    axios
      .patch(`https://jaksimfriend.site/challenges/${item}/${userIdx}/refuse`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.topView}>
        <Text style={styles.topText}>{recruitPageData.title}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#101647" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RecruitPageInfo", {
              challengeIdx: challengeIdx,
            });
          }}
        >
          <Text style={{ color: "#054de4", fontSize: 16 }}>정보</Text>
        </TouchableOpacity>
      </View>
      <Wrapper>
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
          <Calendar
            firstDay={1}
            initialDate={recruitPageData.startDate}
            minDate={recruitPageData.startDate}
            hideDayNames
            maxDate={moment(recruitPageData.startDate).add(14, "days").format(`YYYY-MM-DD`)}
            monthFormat={"yyyy/MM"}
          />
          <View style={styles.spendingDateBox}>
            <Text style={styles.spendingDateText}>
              {moment(recruitPageData.startDate, "YYYYMMDD").fromNow()}에 시작해요
            </Text>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.infoWrapper}>
              <Text style={{ color: "#6F81A9" }}>
                <HomeCalendarBlue /> {recruitPageData.date}
              </Text>
              <Text style={{ marginTop: 10, color: "#6F81A9" }}>
                <HomeClockBlue /> {recruitPageData.certification}
              </Text>
            </View>
            <View style={styles.infoWrapper}>
              <Text style={{ color: "#6F81A9" }}>
                <HomeUserBlue /> {recruitPageData.limited} 명
              </Text>
              <Text style={{ color: "#6F81A9", marginTop: 10 }}>
                <HomeCamera /> {recruitPageData.deadline}
              </Text>
            </View>
          </View>
          <Text style={styles.membersTitle}>신규 신청 {recruitPageData.waiting}</Text>
          {recruitPageData.waiting === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>신규 신청이 없습니다</Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Waitings>
                {recruitPageData.waitings?.map((item: any, index: number) => {
                  return (
                    <WaitingWrapper key={index}>
                      <WaitingImage
                        resizeMode="contain"
                        source={{
                          uri: item.profile,
                        }}
                      />
                      <PercentageWrapper>
                        <Text>{item.achievement}</Text>
                      </PercentageWrapper>
                      <View>
                        <WaitingName>{item.nickName}</WaitingName>
                        <WaitingPromise>{item.promise}</WaitingPromise>
                      </View>
                      <WaitingButtonWrapper>
                        <DeclineButton
                          onPress={() => {
                            refuseJoin(item.waitingIdx);
                          }}
                        >
                          <ButtonText>거절</ButtonText>
                        </DeclineButton>
                        <AcceptButton
                          onPress={() => {
                            acceptJoin(item.waitingIdx);
                          }}
                        >
                          <ButtonText>승인</ButtonText>
                        </AcceptButton>
                      </WaitingButtonWrapper>
                    </WaitingWrapper>
                  );
                })}
              </Waitings>
            </ScrollView>
          )}
          <Text style={styles.membersTitle}>작심친구 {recruitPageData.memberCount}</Text>
          {recruitPageData.members?.map((item: any, index: number) => {
            return (
              <Friends key={index}>
                <Friend>
                  <Logo
                    resizeMode="contain"
                    source={{
                      uri: item.profile,
                    }}
                  />
                  <UserInfo>
                    <Name>{item.nickName}</Name>
                    <Promise>{item.promise}</Promise>
                  </UserInfo>
                </Friend>
              </Friends>
            );
          })}
        </ScrollView>
      </Wrapper>
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 0px 4%;
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
  border-radius: 15px;
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
  width: 45px;
  height: 45px;
  margin-right: 20px;
  border-radius: 5px;
`;
const UserInfo = styled.View`
  flex-direction: column;
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

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  topText: {
    color: "#101647",
    fontSize: 18,
    position: "absolute",
    width: width,
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 10,
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
  emptyBox: {
    marginTop: 20,
    backgroundColor: "#f6f5fb",
    paddingVertical: 25,
    borderRadius: 15,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
