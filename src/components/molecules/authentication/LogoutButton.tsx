import React from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedInAtom, userIndexAtom } from "../../../../atom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "@react-native-seoul/kakao-login";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

export const LogOutWithKakao = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const userIdx = useRecoilValue(userIndexAtom);
  const logOutDelete = () => {
    axios
      .delete(`https://jaksimfriend.site/users/${userIdx}/logout`)
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
