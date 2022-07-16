import { View, Button, Alert, TouchableOpacity, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKaakaoProfile,
  login,
  logout,
} from "@react-native-seoul/kakao-login";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { isLoggedInAtom, isUserAtom } from "../../../atom";
import { GradientButtons } from "../../components/GradientButtons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const KakaoLogin = () => {
  const [userIndex, setUserIndex] = useState(0);
  AsyncStorage.getItem("userIdx", (err, result: any) => {
    setUserIndex(parseInt(result));
  });
  const getProfile = () => {
    axios
      .get(`https://jaksimfriend.site/profiles/${userIndex}`)
      .then(function (response) {
        console.warn(response.data.result);
      })
      .catch(function (error) {
        console.warn(error);
      });
  };

  const createChallenge = () => {
    axios
      .post("https://jaksimfriend.site/challenges", {
        title: "테스트1",
        content: "content",
        startDate: "2022-08-01",
        cycle: 7,
        count: 4,
        deadline: "24:00:00",
        categoryIdx: 3,
        userIdx: userIndex,
        tags: ["태그1"],
      })
      .then(function (response) {
        console.warn(response.data);
      })
      .catch(function (error) {
        console.warn(error);
      });
  };

  const showChallenges = () => {
    axios
      .get(`https://jaksimfriend.site/my-challenges/${userIndex}/application`, {})
      .then((response) => {
        console.warn(response.data);
      })
      .catch((error) => console.log(error.message));
  };

  // 카카오 프로필 정보 불러오기
  // const getKakaoProfile = async (): Promise<void> => {
  //   const profile: KakaoProfile = await getKaakaoProfile();

  //   console.warn(JSON.stringify(profile));
  // };

  return (
    <View>
      <Button title="프로필홈 정보 불러오기" onPress={getProfile} />
      {/* <Button title="카카오프로필정보 불러오기" onPress={getKakaoProfile} /> */}
      <Button title="챌린지 정보 보여주기" onPress={showChallenges} />
      <Button title="챌린지 개설하기post" onPress={createChallenge} />
    </View>
  );
};

export const KakaoSignIn = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setIsUser = useSetRecoilState(isUserAtom);

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    axios
      .post(
        "https://jaksimfriend.site/users/kakao-login",
        {},
        {
          headers: {
            "KAKAO-ACCESS-TOKEN": JSON.stringify(token.accessToken),
          },
        },
      )
      .then(async function (response) {
        AsyncStorage.multiSet([
          ["jwt", response.data.result.jwt],
          ["userIdx", JSON.stringify(response.data.result.userIdx)],
        ]);

        axios.defaults.headers.common["X-ACCESS-TOKEN"] = response.data.result.jwt;

        await axios
          .get(`https://jaksimfriend.site/profiles/${response.data.result.userIdx}`)
          .then(function (response) {
            if (response.data.result[0].nickName?.length > 0) {
              setIsUser(true);
            }
            setIsLoggedIn(true);
          })
          .catch(function (error) {
            console.warn(error);
          });
      })
      .catch(function (error) {
        console.warn(error);
      });
  };

  return <GradientButtons onPress={signInWithKakao} Title="카카오 계정으로 시작하기" />;
};

// 닉네임 설정 후 바로 안뜨고
// 로그아웃한다음 다른 계정으로 로그인하면 닉네임페이지가 아예안뜸(isuser가 true인듯)
export const LogOutWithKakao = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  const logOut = async (): Promise<void> => {
    const message = await logout();
    console.log(message);
    AsyncStorage.removeItem("jwt");
    AsyncStorage.removeItem("userIdx");

    setIsLoggedIn(false);
  };
  return (
    <TouchableOpacity onPress={logOut} style={styles.confirmButton}>
      <Text style={styles.confirmButtonText}>로그아웃</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  confirmButton: {
    borderRadius: 10,
    marginLeft: 4,
    backgroundColor: "#044DE4",
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});
