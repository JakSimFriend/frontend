import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { isLoggedInAtom, isUserStatusAtom, userIdxAtom, userInfoAtom } from "@src/common/atom";
import { UserInfo } from "@src/screens/main/BottomTabs/Profile/interface/user.interface";
import axios from "axios";
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { useFcmTokenSaveLocalStorage } from "./useFcm";

const getUserInfo = (userId: number) => axios.get(`/profiles/${userId}`);
const getUserIdx = () => axios.get("/users/idx");

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
      await useFcmTokenSaveLocalStorage(fcmToken);
    }
  } catch (error) {
    console.log(error);
  }
};

export const useAutoLogin = () => {
  axios.defaults.baseURL = "https://jaksimfriend.site";
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setIsUserStatus = useSetRecoilState(isUserStatusAtom);
  const setUserIdx = useSetRecoilState(userIdxAtom);
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const getJwt = async () => {
    try {
      const jwt: string | null = await AsyncStorage.getItem("jwt");
      if (RA.isNotNilOrEmpty(jwt)) {
        axios.defaults.headers.common["X-ACCESS-TOKEN"] = jwt as string;
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getIdx = async () => {
    try {
      const idx: string | null = await AsyncStorage.getItem("userIdx");

      if (RA.isNilOrEmpty(idx)) {
        //userIdx가 없을 경우
        getUserIdx().then(({ data }) => {
          setUserIdx(Number(data.result));
          getUserInfo(Number(data.result)).then(({ data }) => {
            const userInfo: UserInfo = R.head(data.result) as unknown as UserInfo;

            if (RA.isNilOrEmpty(userInfo.nickName)) {
              setIsUserStatus("pending");
            } else {
              setIsUserStatus("success");
            }
            setUserInfo(userInfo);
          });
        });
      } else {
        setUserIdx(Number(idx));
        getUserInfo(Number(idx)).then(({ data }) => {
          const userInfo: UserInfo = R.head(data.result) as unknown as UserInfo;
          if (RA.isNilOrEmpty(userInfo.nickName)) {
            setIsUserStatus("pending");
          } else {
            setIsUserStatus("success");
          }

          setUserInfo(userInfo);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 자동로그인
    AsyncStorage.getItem("jwt").then((value) => {
      if (RA.isNotNilOrEmpty(value)) {
        getJwt();
        getIdx();

        // 구글로그인-파이어베이스 연동
        googleSigninConfigure();
        getFCMToken();
      }
    });
  }, []);
};
