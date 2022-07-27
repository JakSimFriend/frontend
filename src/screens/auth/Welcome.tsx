import React, { useEffect } from "react";
import { Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import { useSetRecoilState } from "recoil";
import styled from "styled-components/native";
import { isLoggedInAtom, isUserAtom } from "../../../atom";
import { GradientButtons } from "../../components/GradientButtons";
import { KakaoSignIn } from "./KakaoLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleSignIn } from "./GoogleLogin";
import messaging from "@react-native-firebase/messaging";

const Welcome = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setIsUser = useSetRecoilState(isUserAtom);
  const googleSigninConfigure = () => {
    GoogleSignin.configure({
      webClientId: "1089968001443-hhtv80b2qgauhm32e9bor0s22g8oq5nd.apps.googleusercontent.com",
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  };
  const getFCMToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem("fcmtoken", fcmToken);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // 자동로그인
    AsyncStorage.getItem("jwt").then((value) => {
      if (value != null) {
        // jwt 불러오기
        const getJwt = async () => {
          try {
            const savedJwt: any = await AsyncStorage.getItem("jwt");
            axios.defaults.headers.common["X-ACCESS-TOKEN"] = savedJwt;
          } catch (error) {
            console.log(error);
          }
        };
        getJwt();

        setIsLoggedIn(true);
        setIsUser(true);
      } else {
        console.log("jwt없음");
      }
    });
    // 구글로그인-파이어베이스 연동
    googleSigninConfigure();
    getFCMToken();
  }, []);

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
