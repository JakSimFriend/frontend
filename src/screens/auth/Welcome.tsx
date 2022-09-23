import React, { useEffect } from "react";
import { Platform, SafeAreaView, StatusBar, View } from "react-native";

import styled from "styled-components/native";
import { KakaoSignIn } from "./KakaoLogin";
import LinearGradient from "react-native-linear-gradient";

import { GoogleSignIn } from "./GoogleLogin";
import { useAutoLogin } from "@src/hook/useAutoLogin";

const Welcome = () => {
  // 자동 로그인
  useAutoLogin();
  return (
    <>
      <StatusBar barStyle={"default"} backgroundColor={"#947BEA"}></StatusBar>
      <LinearGradient
        colors={["#947BEA", "#1151E5"]}
        style={{ flex: 1, paddingTop: 90, paddingHorizontal: "6%" }}
      >
        <StatusBar barStyle={"dark-content"} />
        <SafeAreaView style={{ flex: 1 }}>
          <Title>어서오세요!</Title>
          <SubTitle>작심친구입니다!</SubTitle>
          <Detail>함께 챌린지할 친구들을 찾아보세요!</Detail>
          <ButtonWrapper>
            <KakaoSignIn />
            <View style={{ marginTop: 10 }}>
              <GoogleSignIn />
            </View>
            {/* <View style={{ marginTop: 10 }}>
              <GradientButtons onPress={() => {}} Title="애플 계정으로 시작하기" />
            </View> */}
          </ButtonWrapper>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};
export default Welcome;

const Title = styled.Text`
  color: #ffffff;
  font-size: 30px;
`;
const SubTitle = styled.Text`
  color: #ffffff;
  font-size: 30px;
  font-weight: 900;
`;
const Detail = styled.Text`
  padding-top: 20px;
  color: #ffffff;
  padding-bottom: ${Platform.OS === "ios" ? "250px" : "150px"};
`;
const ButtonWrapper = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  align-self: center;
  margin-bottom: 20%;
`;
