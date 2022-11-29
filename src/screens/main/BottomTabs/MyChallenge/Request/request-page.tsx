import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components/native";

import { cancelModalAtom, onDevelopModalAtom, userIdxAtom } from "../../../../../common/atom";
import {
  CalendarIcon,
  ClockIconTwo,
  DiamondIconTwo,
  FlagIcon,
  UserIconTwo,
} from "../../../../../components/atoms/TabIcon";
import ChallengeCancelModal from "../../../../../components/organisms/Modal/ChallengeCancelModal";
import OnDevelopModal from "../../../../../components/organisms/Modal/OnDevelopModal";

type RouteParams = {
  route: {
    params: {
      challengeIdx: number;
      waitingIdx: number;
    };
  };
};

export const RequestPage = ({ route }: RouteParams) => {
  const { challengeIdx, waitingIdx } = route.params;
  const userIdx = useRecoilValue(userIdxAtom);

  const [data, setData]: any = useState([]);
  useEffect(() => {
    axios
      .get(`https://eddy-pl.com/api/challenges/${challengeIdx}/${userIdx}`)
      .then(function (response) {
        setData(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const cancelChallenge = () => {
    axios
      .patch(`https://eddy-pl.com/api/challenges/${waitingIdx}/${userIdx}/cancel`)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const navigation = useNavigation();
  const setCancelModal = useSetRecoilState(cancelModalAtom);
  const setModalTwoVisible = useSetRecoilState(onDevelopModalAtom);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F5FB" }}>
      <StatusBar barStyle={"dark-content"} backgroundColor="#F6F5FB"></StatusBar>
      <View style={styles.topView}>
        <Text style={styles.topText}>{data.title}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#101647" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            cancelChallenge();
            setCancelModal(true);
          }}
        >
          <Text style={{ color: "#054de4", fontSize: 16 }}>신청 취소</Text>
        </TouchableOpacity>
      </View>
      <Wrapper>
        <Title>{data.title}</Title>
        <Content>{data.content}</Content>
        <Infos>
          <InfoWrapper>
            <IconWrapper>
              <FlagIcon />
            </IconWrapper>
            <TextWrapper>
              <TopText>완주시 최대</TopText>
              <Text>2,000 캐시와 1,000 경험치</Text>
            </TextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <IconWrapper>
              <CalendarIcon />
            </IconWrapper>
            <TextWrapper>
              <Text style={{ marginTop: 11 }}>{data.date}</Text>
            </TextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <IconWrapper>
              <ClockIconTwo />
            </IconWrapper>
            <TextWrapper>
              <Text style={{ marginTop: 9 }}>{data.certification}씩 인증</Text>
            </TextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <IconWrapper>
              <UserIconTwo />
            </IconWrapper>
            <TextWrapper>
              <Text style={{ marginTop: 9 }}>
                신청 인원 {data.accept}명, 대기자 수 {data.waiting}명
              </Text>
            </TextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <IconWrapper>
              <DiamondIconTwo />
            </IconWrapper>
            <TextWrapper>
              <TopText>팀원 평균</TopText>
              <Text>{data.tier}</Text>
            </TextWrapper>
          </InfoWrapper>
        </Infos>
        <View style={styles.cashWrapper}>
          {/* 그림자 */}
          <ChallengeCash>
            <ChallengeCashText>도전 캐시</ChallengeCashText>
            <ChallengeCashText>{data.pee}C</ChallengeCashText>
          </ChallengeCash>
          <MyCash>
            <Text>내 캐시</Text>
            <Text>{data.myPoint}C</Text>
          </MyCash>
        </View>
        <Buttons>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => {
              setModalTwoVisible(true);
            }}
          >
            <Text>공유할래요</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.CompletedButton} disabled>
            <Text style={{ color: "#ffffff" }}>이미 신청했어요</Text>
          </TouchableOpacity>
        </Buttons>
        <ChallengeCancelModal />
      </Wrapper>
      <OnDevelopModal />
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #f6f5fb;
  padding: 0px 5%;
  margin-top: 20px;
`;
const Title = styled.Text`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 30px;
`;
const Content = styled.Text`
  color: #6f81a9;
  margin-bottom: 30px;
`;
const Infos = styled.View`
  flex-direction: column;
`;
const InfoWrapper = styled.View`
  margin-bottom: 15px;
  flex-direction: row;
`;
const IconWrapper = styled.View`
  padding: 8px;
  background-color: #ffffff;
  border-radius: 10px;
`;
const TextWrapper = styled.View`
  margin-left: 20px;
`;
const ChallengeCash = styled.View`
  background-color: #101647;
  padding: 22px;
  border-radius: 15px;
  flex-direction: row;
  justify-content: space-between;
`;
const ChallengeCashText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
`;
const MyCash = styled.View`
  background-color: #ffffff;
  padding: 22px;
  border-radius: 15px;
  flex-direction: row;
  justify-content: space-between;
`;
const Buttons = styled.View`
  flex-direction: row;
  align-self: center;
`;
const TopText = styled.Text`
  font-size: 12px;
  color: #6f81a9;
  margin-bottom: 3px;
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
  shareButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    marginRight: 5,
    paddingHorizontal: "15%",
    borderRadius: 15,
  },
  CompletedButton: {
    backgroundColor: "#BFC7D7",
    paddingVertical: 20,
    marginLeft: 5,
    paddingHorizontal: "12%",
    borderRadius: 15,
  },
  cashWrapper: {
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginTop: 20,
    marginBottom: 30,
  },
});
