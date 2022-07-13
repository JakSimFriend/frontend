import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState } from "react";
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKaakaoProfile,
  login,
  logout,
  unlink,
} from "@react-native-seoul/kakao-login";

export const KakaoLogin = () => {
  const [data, setData] = useState("");
  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    // axios로 우리서버에 token 보내기

    // axios로 서버 요청할때마다 헤더에 access토큰 추가하기
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.warn(JSON.stringify(token));
  };

  const signOutWithKakao = async (): Promise<void> => {
    const message = await logout();

    console.warn(message);
  };

  const getKakaoProfile = async (): Promise<void> => {
    const profile: KakaoProfile = await getKaakaoProfile();

    console.warn(JSON.stringify(profile));
  };


  const unlinkKakao = async (): Promise<void> => {
    const message = await unlink();

    console.warn(message);
  };

  return (
    <View>
      <Button title="회원가입 /로그인" onPress={signInWithKakao} />
      <Button title="로그아웃" onPress={signOutWithKakao} />
      <Button title="정보 불러오기" onPress={getKakaoProfile} />
      <Button title="탈퇴" onPress={unlinkKakao} />
    </View>
  );
}
