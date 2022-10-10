import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";

import { userIdxAtom } from "../../../common/atom";
import AlertItem, { Alert as AlertInterface } from "./alert-item";

export const Alert = () => {
  const userIdx = useRecoilValue(userIdxAtom);
  const navigation = useNavigation();

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
    }
  };
  const getFCMToken = async () => {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, "new token");
        await AsyncStorage.setItem("fcmtoken", fcmToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [notificationData, setNotificationData] = useState([]);
  const getNotificationData = () => {
    axios
      .get(`https://jaksimfriend.site/alerts/${userIdx}`)
      .then((response) => {
        setNotificationData(response.data.result || []);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    getNotificationData();
  }, []);

  const cancelChallenge = (item: any) => {
    axios
      .patch(`https://jaksimfriend.site/alerts/${item}/${userIdx}/delete`)
      .then(function (response) {
        console.log(response.data);
        getNotificationData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deleteAllAlerts = () => {
    axios
      .patch(`https://jaksimfriend.site/alerts/${userIdx}/delete-all`)
      .then(function (response) {
        console.log(response.data);
        getNotificationData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.topView}>
        <Text style={styles.topText}>알림</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#101647" />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteAllAlerts}>
          <Text style={{ color: "#054de4", fontSize: 16 }}>삭제</Text>
        </TouchableOpacity>
      </View>
      <Wrapper>
        {notificationData.length === 0 ? (
          <EmptyText>확인하실 알림이 없어요</EmptyText>
        ) : (
          <>
            {notificationData.map((item: AlertInterface, index: number) => {
              return <AlertItem alert={item} cancel={() => console.log("TOdo")} key={index} />;
            })}
          </>
        )}
      </Wrapper>
    </SafeAreaView>
  );
};

const Wrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
  padding: 20px 5% 0 5%;
`;
const EmptyText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;
const NoticeBox = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 16px 10px 15px 10px;
  border-radius: 10px;
  background-color: #f6f5fb;
  justify-content: space-between;
`;
const NoticeIcon = styled.View`
  flex-direction: row;
`;
const NoticeText = styled.Text`
  margin-left: 30px;
  max-width: 70%;
`;
const DeleteText = styled.Text`
  font-weight: 600;
  font-size: 20px;
`;
const Time = styled.Text`
  margin-top: 5px;
  color: #b4bac9;
  align-self: flex-end;
`;

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  topText: {
    color: "#101647",
    fontSize: 17,
    position: "absolute",
    width: width,
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 10,
    fontWeight: "500",
  },
});
