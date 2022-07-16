import React, { useEffect, useRef, useState } from "react";
import { Animated, ScrollView, StatusBar, Text, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { SearchIcon } from "../../../components/TabIcon";
import { CategoryHeader } from "./Home/CategoryHeader";
import { Challenges } from "./Home/Challenges";
import { GradientButtons } from "../../../components/GradientButtons";
import auth from "@react-native-firebase/auth";
import {
  appleAuth,
  appleAuthAndroid,
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import { v4 as uuid } from "uuid";
import { KakaoLogin } from "../../auth/KakaoLogin";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Home = React.memo(() => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("유저");
  const goToSearch = () => navigation.navigate("Search");
  const goToOpenChallenge = () => navigation.navigate("Category");

  // 페이지 이동시 scrollTo top
  const isFocused = useIsFocused();
  const scrollViewRef = useRef<ScrollView>(null);
  if (isFocused) {
    scrollViewRef.current?.scrollTo({ x: 5, y: 5, animated: false });
  }
  // 검색바 애니메이션
  const upValue = useState(new Animated.Value(0))[0];
  const MoveSearchBarUp = () => {
    Animated.timing(upValue, {
      toValue: 78,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      Animated.timing(upValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, 400);
  };

  // 카테고리 애니메이션
  const iconValue = useState(new Animated.Value(0))[0];
  const MoveIconUp = () => {
    Animated.timing(iconValue, {
      toValue: 40,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      Animated.timing(iconValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, 250);
  };
  // xcode()=>ios 13버전으로 애플로그인 확인(시뮬레이터 문제이므로 바꾸면 될것) + 안드로이드 apple login 세팅 마치기
  // 카카오 로그인
  // 알림, 공유
  // 광고
  // 나머지 서버
  async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw "Apple Sign-In failed - no identify token returned";
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  }
  async function onAppleAndroidButtonPress() {
    // Generate secure, random values for state and nonce
    const rawNonce = uuid();
    const state = uuid();

    // Configure the request
    appleAuthAndroid.configure({
      // The Service ID you registered with Apple
      clientId: "org.reactjs.native.jaksimfriend",

      // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
      // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
      redirectUri: "https://jaksimfriend.site/users/apple-login",

      // The type of response requested - code, id_token, or both.
      responseType: appleAuthAndroid.ResponseType.ALL,

      // The amount of user information requested from Apple.
      scope: appleAuthAndroid.Scope.ALL,

      // Random nonce value that will be SHA256 hashed before sending to Apple.
      nonce: rawNonce,

      // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
      state,
    });

    // Open the browser window for user sign in
    const response = await appleAuthAndroid.signIn();

    // Send the authorization code to your backend for verification
  }
  useEffect(() => {
    AsyncStorage.getItem("userIdx", (err, result: any) => {
      const userIdx = parseInt(result);
      axios
        .get(`https://jaksimfriend.site/profiles/${userIdx}`)
        .then(function (response) {
          setUserName(response.data.result[0].nickName);
        })
        .catch(function (error) {
          console.warn(error);
        });
    });
  }, []);

  return (
    <HomeWrapper>
      <StatusBar barStyle={"dark-content"}></StatusBar>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <Title>
          환영합니다. {userName}님!{"\n"}새로운 챌린지를 찾아보세요!
        </Title>
        <Animated.View
          style={{
            bottom: upValue,
          }}
        >
          <InputWrapper
            onPress={() => {
              MoveSearchBarUp();
              goToSearch();
            }}
          >
            <InputBox>
              <InputText>다양한 챌린지를 검색해보세요!</InputText>
            </InputBox>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </InputWrapper>
        </Animated.View>
        <Animated.View
          style={{
            bottom: iconValue,
          }}
        >
          <CategoryHeader />
        </Animated.View>
        <KakaoLogin />
        {appleAuthAndroid.isSupported && (
          <AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            onPress={() => onAppleAndroidButtonPress()}
          />
        )}
        <AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160,
            height: 45,
            borderWidth: 1,
            borderColor: "#000000",
          }}
          onPress={() => onAppleButtonPress().then(() => console.log("Apple sign-in complete!"))}
        />
        <Challenges />
      </ScrollView>
      <OpenChallenge>
        <GradientButtons
          onPress={() => {
            MoveIconUp();
            goToOpenChallenge();
          }}
          Title="도전작심 개설하기"
        />
      </OpenChallenge>
    </HomeWrapper>
  );
});

const HomeWrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  height: 100%;
`;
const Title = styled.Text`
  color: #000000;
  font-size: 20px;
  font-weight: 400;
  margin: 10px 0px 0 25px;
`;
const InputWrapper = styled.TouchableOpacity`
  align-items: flex-start;
  flex-direction: row;
  margin-top: 30px;
  margin-left: 10px;
`;
const InputBox = styled.View`
  background-color: #f6f5fb;
  border-radius: 10px;
  padding: 15px;
  width: 83%;
  margin-left: 12px;
`;
const InputText = styled.Text`
  color: #6b7ba2;
`;
const SearchIconWrapper = styled.View`
  margin: 12px 0 0 5px;
`;
const OpenChallenge = styled.View`
  align-self: center;
  width: 70%;
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
`;
