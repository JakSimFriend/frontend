//TODO: google login logic
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { isLoggedInAtom, isUserStatusAtom } from "@src/common/atom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSetRecoilState } from "recoil";

export const GoogleSignIn = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setIsUser = useSetRecoilState(isUserStatusAtom);
  const [fcmToken, setFcmToken] = useState<string>();

  useEffect(() => {
    AsyncStorage.getItem("fcmtoken").then((value) => {
      setFcmToken(value as string);
    });
  }, []);

  const googleLogin = async () => {
    // firebas auth 연결 & 저장
    await GoogleSignin.hasPlayServices();
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    auth().signInWithCredential(googleCredential);

    await GoogleSignin.signIn()
      .then(() => {
        GoogleSignin.getTokens().then((res) => {
          axios
            .post(
              "https://jaksimfriend.site/users/google-login",
              {},
              {
                headers: {
                  "GOOGLE-ACCESS-TOKEN": res.accessToken,
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

              return axios
                .get(`https://jaksimfriend.site/profiles/${response.data.result.userIdx}`)
                .then((response) => {
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
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <TouchableOpacity onPress={googleLogin} style={styles.kakaoButton}>
        <Image
          resizeMode="contain"
          source={require("../../assets/images/GoogleButton.png")}
          style={styles.logo}
        />
        <Text style={styles.buttonText}>Google로 로그인</Text>
      </TouchableOpacity>
    </>
  );
};

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  kakaoButton: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D5D5D5",
  },
  logo: {
    width: width * 0.12,
    height: width * 0.12,
    marginLeft: width * 0.03,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "300",
    marginLeft: width * 0.12,
    alignSelf: "center",
  },
});
