import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export const Notifications = () => {
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

  const [cancelIndex, setCancelIndex] = useState(0);
  const cancelChallenge = () => {
    AsyncStorage.getItem("userIdx").then((value) => {
      const userIdx = value;
      axios
        .patch(`https://jaksimfriend.site/alerts/${cancelIndex}/${userIdx}/delete`)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };
  const deleteAllAlerts = () => {
    AsyncStorage.getItem("userIdx").then((value) => {
      const userIdx = value;
      axios
        .patch(`https://jaksimfriend.site/alerts/${userIdx}/delete-all`)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  const [notificationData, setNotificationData]: any = useState([]);
  const [listEmpty, setListEmpty] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("userIdx").then((value) => {
      const userIdx = value;
      axios
        .get(`https://jaksimfriend.site/alerts/${userIdx}`)
        .then((response) => {
          if (response.data.result === undefined) {
            setListEmpty(true);
          } else {
            setListEmpty(false);
            setNotificationData(response.data.result);
          }
        })
        .catch((error) => {
          console.log(error.message);
          setListEmpty(true);
        });
    });
    // 맨처음에 가입하고 접속할때만
    // requestUserPermission();
    // getFCMToken();
  }, [cancelIndex]);

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.topView}>
        <Text style={styles.topText}>알림</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#101647" />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteAllAlerts}>
          <Text style={{ color: "#054de4", fontSize: 16 }}>전체 삭제</Text>
        </TouchableOpacity>
      </View>
      <Wrapper>
        {listEmpty || notificationData.length === 0 ? (
          <EmptyText>확인하실 알림이 없어요</EmptyText>
        ) : (
          <>
            {notificationData.map((item: any, index: number) => {
              return (
                <View key={index}>
                  <Text>{item.date}</Text>
                  {item.notifications?.map((items: any, index: number) => {
                    return (
                      <View key={index}>
                        <NoticeBox>
                          <NoticeIcon>
                            <>
                              <Image
                                resizeMode="contain"
                                source={{ uri: items.image }}
                                style={{ width: 25, height: 25 }}
                              />
                              <NoticeText>{items.alert}</NoticeText>
                            </>
                          </NoticeIcon>
                          <TouchableOpacity
                            onPress={() => {
                              setCancelIndex(items.alertIdx);
                              cancelChallenge();
                            }}
                          >
                            <DeleteText>X</DeleteText>
                          </TouchableOpacity>
                        </NoticeBox>
                        <Time>{items.time}</Time>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </>
        )}
      </Wrapper>
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
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
