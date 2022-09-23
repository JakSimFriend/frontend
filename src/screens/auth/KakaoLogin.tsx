import { TouchableOpacity, Text, StyleSheet, Dimensions, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { KakaoOAuthToken, login, logout } from "@react-native-seoul/kakao-login";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedInAtom, isUserStatusAtom, userIdxAtom } from "../../common/atom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const KakaoSignIn = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setIsUser = useSetRecoilState(isUserStatusAtom);
  const [fcmToken, setFcmToken]: any = useState();

  // useEffect(() => {
  //   AsyncStorage.getItem("fcmtoken").then((value) => {
  //     setFcmToken(value);
  //   });
  // }, []);

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login();
    
    axios
      .post(
        "https://jaksimfriend.site/users/kakao-login",
        {},
        {
          headers: {
            "KAKAO-ACCESS-TOKEN": JSON.stringify(token.accessToken),
            // "DEVICE-TOKEN": fcmToken,
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
            if (response.data.result[0].nickName === null) {
              setIsUser('none');
            } else {
              setIsUser('success');
            }
            setIsLoggedIn(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <TouchableOpacity onPress={signInWithKakao} style={styles.kakaoButton}>
      <Image
        resizeMode="contain"
        source={require("../../assets/images/KakaoLogo.png")}
        style={styles.logo}
      />
      <Text style={{ fontSize: 16, marginLeft: "23%" }}>카카오 로그인</Text>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get("window");
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
  kakaoButton: {
    flexDirection: "row",
    backgroundColor: "#FEE500",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
  },
  logo: {
    width: width * 0.06,
    height: width * 0.06,
    marginLeft: width * 0.06,
  },
});
