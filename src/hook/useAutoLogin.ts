import { isLoggedInAtom, isUserStatusAtom, jwtAtom } from "@src/common/atom";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAutoLogin = () => {
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
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setIsUser = useSetRecoilState(isUserStatusAtom);
  useEffect(() => {
    // 자동로그인
    AsyncStorage.getItem("jwt").then((value) => {
      if (value != null) {
        // jwt 불러오기
        const getJwt = async () => {
          try {
            const savedJwt: any = await AsyncStorage.getItem("jwt");
            //axios setting
            axios.defaults.headers.common["X-ACCESS-TOKEN"] = savedJwt;
            axios.defaults.baseURL = "https://jaksimfriend.site/";
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
};
