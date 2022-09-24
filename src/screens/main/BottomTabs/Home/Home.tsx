import React, { useRef, useState } from "react";
import { Animated, ScrollView, StatusBar } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { SearchIcon } from "@src/components/atoms/TabIcon";
import { GradientButtons } from "@src/components/atoms/GradientButtons";
import auth from "@react-native-firebase/auth";
import { appleAuth, appleAuthAndroid } from "@invertase/react-native-apple-authentication";
import { v4 as uuid } from "uuid";
import { useRecoilValue } from "recoil";
import { userInfoAtom } from "@src/common/atom";
import { HomeCategory } from "@src/components/molecules/categories/HomeCategory";
import { HomeLists } from "@src/components/molecules/challengeLists/HomeLists";
import { useUserInfo } from "@src/hook/useUserInfo";

export const Home = React.memo(() => {
  useUserInfo();
  const navigation = useNavigation();
  const userInfo = useRecoilValue(userInfoAtom);
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
      toValue: 88,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      Animated.timing(upValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, 300);
  };

  // 카테고리 애니메이션
  const iconValue = useState(new Animated.Value(0))[0];
  const MoveIconUp = () => {
    Animated.timing(iconValue, {
      toValue: 50,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      Animated.timing(iconValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, 300);
  };
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

  return (
    <HomeWrapper>
      <StatusBar barStyle={"dark-content"}></StatusBar>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <Title>
          어서 오세요, {userInfo?.nickName || "유저"}님!{"\n"}천 리 길의 한 걸음도 작심친구와 함께!
        </Title>
        <Animated.View
          style={{
            bottom: upValue,
          }}
        >
          <InputBox
            onPress={() => {
              MoveSearchBarUp();
              goToSearch();
            }}
          >
            <SearchIcon />
            <InputText>다양한 도전작심을 검색해 보세요!</InputText>
          </InputBox>
        </Animated.View>
        <Animated.View
          style={{
            bottom: iconValue,
          }}
        >
          <HomeCategory />
        </Animated.View>
        {/* 애플로그인 (안드,ios) */}
        {/* {appleAuthAndroid.isSupported && (
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
        /> */}
        <HomeLists />
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
  margin: 20px 0 0 6%;
`;
const InputBox = styled.TouchableOpacity`
  background-color: #f6f5fb;
  border-radius: 15px;
  flex-direction: row;
  padding: 10px;
  width: 88%;
  margin-top: 30px;
  margin-left: 6%;
`;
const InputText = styled.Text`
  color: #6b7ba2;
  align-self: center;
  margin-left: 15px;
`;
const OpenChallenge = styled.View`
  align-self: center;
  width: 70%;
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
`;
