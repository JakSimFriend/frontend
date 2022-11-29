import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { logout } from "@react-native-seoul/kakao-login";
import axios from "axios";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { isLoggedInAtom, userIdxAtom } from "../../../common/atom";

export const LogOutWithKakao = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const userIdx = useRecoilValue(userIdxAtom);
  const logOutDelete = () => {
    axios
      .delete(`https://eddy-pl.com/api/users/${userIdx}/logout`)
      .then(function (response) {
        console.log(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const logOut = async () => {
    logOutDelete();
    AsyncStorage.removeItem("jwt");
    AsyncStorage.removeItem("userIdx");
    // AsyncStorage.removeItem("fcmtoken");
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.log(error);
    }
    setIsLoggedIn(false);
  };
  return (
    <TouchableOpacity onPress={logOut} style={styles.confirmButton}>
      <Text style={styles.confirmButtonText}>로그아웃</Text>
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
