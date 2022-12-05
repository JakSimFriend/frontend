import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";

import { userIdxAtom } from "../../../common/atom";
import AlertItem from "./alert-item";

export const Alert = () => {
  const userIdx = useRecoilValue(userIdxAtom);
  const navigation = useNavigation();

  const [notificationData, setNotificationData] = useState([]);
  const getNotificationData = () => {
    axios
      .get(`https://eddy-pl.com/api/alerts/home/${userIdx}`)
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={styles.topView}>
        <Text style={styles.topText}>알림</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#101647" />
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
