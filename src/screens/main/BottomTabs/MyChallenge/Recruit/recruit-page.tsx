import "moment/locale/ko";

import { useNavigation } from "@react-navigation/native";
import { Color } from "@src/assets/color";
import { userIdxAtom } from "@src/common/atom";
import axios from "axios";
import moment from "moment";
import * as R from "ramda";
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
import { Calendar } from "react-native-calendars";
import LinearGradient from "react-native-linear-gradient";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";

import { members, MyChallenges, waitings } from "./interface/my-challenges.interface";

type RouteParams = {
  route: {
    params: {
      challengeIdx: number;
    };
  };
};

const GetChallenge = (challengeId: number, userId: number) =>
  axios.get<MyChallenges>(
    `https://jaksimfriend.site/my-challenges/${challengeId}/${userId}/recruitment-info`,
  );
const PatchUserStatus = (waitingUserId: number, userId: number, type: "accept" | "refuse") =>
  axios.patch(`https://jaksimfriend.site/challenges/${waitingUserId}/${userId}/${type}`);

export const RecruitPage = ({ route }: RouteParams) => {
  const { challengeIdx } = route.params;
  const userIdx = useRecoilValue(userIdxAtom);

  const [recruitPageData, setRecruitPageData]: any = useState([]);

  const getChallengePipe = () => {
    GetChallenge(challengeIdx, userIdx as number)
      .then((response) => {
        setRecruitPageData(R.head(response.data.result));
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    if (challengeIdx && userIdx) getChallengePipe();
  }, []);

  const acceptJoin = (waitingUserId: number) => {
    PatchUserStatus(waitingUserId, userIdx as number, "accept")
      .then(() => getChallengePipe())
      .catch((error) => {
        console.log(error);
      });
  };
  const refuseJoin = (waitingUserId: number) => {
    PatchUserStatus(waitingUserId, userIdx as number, "refuse")
      .then(() => getChallengePipe())
      .catch((error) => {
        console.log(error);
      });
  };

  const navigation: any = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.topView}>
        <View style={styles.topTextWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#101647" />
          </TouchableOpacity>
          <Text style={styles.topText}>{recruitPageData.title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RecruitPageInfo", {
              challengeIdx: challengeIdx,
            });
          }}
        >
          <Ionicons name="information-circle-outline" size={24} />
        </TouchableOpacity>
      </View>
      <Wrapper>
        <Text style={{ color: Color.blue[1100], fontSize: 22, fontWeight: "bold" }}>정보</Text>
        <ScrollView
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 34 }}
        >
          <Calendar
            firstDay={1}
            initialDate={recruitPageData.startDate}
            minDate={recruitPageData.startDate}
            hideDayNames
            maxDate={moment(recruitPageData.startDate).add(14, "days").format(`YYYY-MM-DD`)}
            monthFormat={"yyyy/MM"}
          />
          {recruitPageData.memberCount >= 4 ? (
            <LinearGradient
              colors={["#947BEA", "#1151E5"]}
              style={{ marginTop: 30, marginBottom: 20, borderRadius: 13 }}
            >
              <Text style={styles.spendingDateText}>
                {moment(recruitPageData.startDate, "YYYYMMDD").fromNow()}에 시작해요
              </Text>
            </LinearGradient>
          ) : (
            <View
              style={{
                marginTop: 30,
                marginBottom: 20,
                borderRadius: 13,
                backgroundColor: Color.gray[100],
              }}
            >
              <Text style={styles.spendingDateText}>
                {moment(recruitPageData.startDate, "YYYYMMDD").fromNow()}까지 모집할 수 있어요
              </Text>
            </View>
          )}

          <View style={styles.infoContainer}>
            <View style={styles.infoWrapper}>
              <View style={styles.infoText}>
                <Feather name="calendar" size={16} />
                <Text style={{ color: Color.blue[1100], marginLeft: 6 }}>
                  {recruitPageData.date}
                </Text>
              </View>
              <View style={{ ...styles.infoText, marginLeft: 16 }}>
                <AntDesign name="user" size={16} />
                <Text style={{ color: Color.blue[1100], marginLeft: 6 }}>
                  {recruitPageData.limited} 명
                </Text>
              </View>
            </View>

            <View style={{ ...styles.infoWrapper, marginTop: 10 }}>
              <View style={styles.infoText}>
                <Ionicons name="camera-outline" size={16} />
                <Text style={{ color: Color.blue[1100], marginLeft: 6 }}>
                  {recruitPageData.certification}
                </Text>
              </View>

              <View style={{ ...styles.infoText, marginLeft: 16 }}>
                <AntDesign name="clockcircleo" size={16} />
                <Text style={{ color: Color.blue[1100], marginLeft: 6 }}>
                  {recruitPageData.deadline}
                </Text>
              </View>
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
                {recruitPageData.waitings?.map((item: waitings, index: number) => {
                  return (
                    <WaitingWrapper key={index}>
                      {item.profile ? (
                        <WaitingImage
                          resizeMode="contain"
                          source={{
                            uri: item.profile,
                          }}
                        />
                      ) : (
                        <View
                          style={{
                            width: 76,
                            height: 76,
                            backgroundColor: "#FFFFFF",
                            borderRadius: 100,
                          }}
                        />
                      )}
                      <PercentageWrapper>
                        <PercentageText>{item.achievement}</PercentageText>
                      </PercentageWrapper>
                      <WaitingUserInfoWrapper>
                        <WaitingName>{item.nickName}</WaitingName>
                        <WaitingPromise>{item.promise}</WaitingPromise>
                      </WaitingUserInfoWrapper>
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
                          <LinearGradient
                            colors={["#947BEA", "#1151E5"]}
                            style={{
                              paddingLeft: 30,
                              paddingRight: 30,
                              paddingTop: 10,
                              paddingBottom: 10,
                              borderRadius: 10,
                            }}
                          >
                            <ButtonText>승인</ButtonText>
                          </LinearGradient>
                        </AcceptButton>
                      </WaitingButtonWrapper>
                    </WaitingWrapper>
                  );
                })}
              </Waitings>
            </ScrollView>
          )}
          <Text style={styles.membersTitle}>작심친구 {recruitPageData.memberCount}</Text>
          <View style={styles.friendList}>
            {recruitPageData.members?.map((item: members, index: number) => (
              <View key={index} style={styles.friendWrapper}>
                <Image style={styles.friendProfileImage} source={{ uri: item.profile }} />
                <View style={styles.friendInformation}>
                  <Text style={styles.friendName}>{item.nickName}</Text>
                  <Text style={styles.friendPromise}>{item.promise}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </Wrapper>
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  margin-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
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
  justify-content: center;
`;
const WaitingImage = styled.Image`
  width: 76px;
  height: 76px;
  border-radius: 100px;
`;

const PercentageWrapper = styled.View`
  background-color: #ffffff;
  border-radius: 15px;
  padding: 5px 15px;
  margin: 10px 0;
`;
const PercentageText = styled.Text`
  font-size: 12px;
  color: ${Color.blue[1100]};
`;
const WaitingUserInfoWrapper = styled.View`
  margin-top: 10px;
`;
const WaitingName = styled.Text`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;
const WaitingPromise = styled.Text`
  color: #6f81a9;
  align-self: center;
  text-align: center;
  margin-top: 4px;
  font-size: 13px;
`;
const WaitingButtonWrapper = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;
const DeclineButton = styled.TouchableOpacity`
  padding: 10px 30px;
  background-color: #bfc7d7;
  border-radius: 10px;
  margin-right: 3px;
`;
const AcceptButton = styled.TouchableOpacity`
  border-radius: 10px;
  margin-left: 3px;
`;
const ButtonText = styled.Text`
  color: #ffffff;
  font-weight: 800;
`;

const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  topTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  topText: {
    color: "#101647",
    fontSize: 18,
    marginLeft: 20,
    fontWeight: "600",
  },
  spendingDateText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    paddingTop: 20,
    paddingBottom: 20,
  },
  infoContainer: {
    flexDirection: "column",
    paddingHorizontal: 16,
  },
  infoWrapper: {
    flexDirection: "row",
  },
  infoText: {
    width: "50%",
    flexDirection: "row",
  },
  membersTitle: {
    marginTop: 40,
    fontSize: 20,
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
  friendList: {
    marginTop: 20,
    marginBottom: 30,
  },
  friendWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 9,
    paddingBottom: 9,
  },
  friendProfileImage: {
    width: 45,
    height: 45,
    borderRadius: 100,
  },
  friendInformation: {
    marginLeft: 14,
  },
  friendName: {
    fontSize: 17,
    fontWeight: "600",
    color: Color.blue[1100],
  },
  friendPromise: {
    fontSize: 13,
    color: Color.blue[900],
    marginTop: 4,
  },
});
