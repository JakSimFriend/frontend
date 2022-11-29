import AsyncStorage from "@react-native-async-storage/async-storage";
import { KakaoOAuthToken, login } from "@react-native-seoul/kakao-login";
import kakaologo from "@src/assets/images/KakaoLogo.png";
import { isLoggedInAtom, isUserStatusAtom, userIdxAtom } from "@src/common/atom";
import { useGetFcmTokenByGoogle } from "@src/hook/useFcm";
import axios from "axios";
import * as RA from "ramda-adjunct";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSetRecoilState } from "recoil";

export const KakaoSignInButton = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setIsUser = useSetRecoilState(isUserStatusAtom);
  const setIsUserStatus = useSetRecoilState(isUserStatusAtom);
  const setUserIdx = useSetRecoilState(userIdxAtom);
  const [fcmToken, setFcmToken] = useState<string>();

  useEffect(() => {
    AsyncStorage.getItem("fcmtoken").then((value) => {
      if (RA.isNilOrEmpty(value))
        useGetFcmTokenByGoogle().then((token: string) => setFcmToken(token));
      else setFcmToken(value as string);
    });
  }, []);

  const signInWithKakao = async (): Promise<void> => {
    let token: KakaoOAuthToken | null;
    try {
      token = await login();
    } catch (error) {
      console.log(error);
      return;
    }
    if (token)
      axios
        .post(
          "https://eddy-pl.com/api/users/kakao-login",
          {},
          {
            headers: {
              "KAKAO-ACCESS-TOKEN": JSON.stringify(token.accessToken),
              "DEVICE-TOKEN": fcmToken as string,
            },
          },
        )
        .then((response) => {
          AsyncStorage.multiSet([
            ["jwt", response.data.result.jwt],
            ["userIdx", JSON.stringify(response.data.result.userIdx)],
          ]);
          axios.defaults.headers.common["X-ACCESS-TOKEN"] = response.data.result.jwt;

          setUserIdx(response.data.result.userIdx);
          return axios
            .get(`https://eddy-pl.com/api/profiles/${response.data.result.userIdx}`)
            .then((response) => {
              // nick name에 따라 유저의 가입 완료 여부 체크
              console.log(response)
              if (response.data.result[0].nickName === null) {
                setIsUser("none");
              } else {
                setIsUser("success");
              }
              setIsLoggedIn(true);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
  };
  return (
    <TouchableOpacity onPress={signInWithKakao} style={styles.kakaoButton}>
      <Image resizeMode="contain" source={kakaologo} style={styles.logo} />
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
