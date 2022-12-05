import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Alarm from "react-native-vector-icons/MaterialCommunityIcons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components/native";

import {
  onDevelopModalAtom,
  progressIndexAtom,
  reportModalOne,
  userIdxAtom,
} from "../../../../../common/atom";
import OnDevelopModal from "../../../../../components/organisms/Modal/OnDevelopModal";
import ReportModalOne from "../../../../../components/organisms/Modal/ReportModalOne";
import ReportModalTwo from "../../../../../components/organisms/Modal/ReportModalTwo";

export const ProgressNotification = () => {
  const progressIndex = useRecoilValue(progressIndexAtom);
  const setModalOneVisible = useSetRecoilState(reportModalOne);
  const setModalTwoVisible = useSetRecoilState(onDevelopModalAtom);
  const userIdx = useRecoilValue(userIdxAtom);
  const [notificationData, setNotificationData]: any = useState([]);
  const [listEmpty, setListEmpty] = useState(false);

  const Report = () => {
    setModalOneVisible(true);
  };
  const getData = () => {
    axios
      .get(`https://eddy-pl.com/api/alerts/${progressIndex}/${userIdx}`)
      .then((response) => {
        if (response.data.code === 1000) {
          setListEmpty(false);
          setNotificationData(response.data.result);
        } else {
          setListEmpty(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setListEmpty(true);
      });
  };
  const deleteNotification = (item: any) => {
    axios
      .patch(`https://eddy-pl.com/api/alerts/${item}/delete/${userIdx}`)
      .then(function (response) {
        console.log(response.data);
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Wrapper>
          {/* TODO */}
          {listEmpty || notificationData.length === 0 ? (
            <EmptyText>확인하실 알림이 없어요</EmptyText>
          ) : (
            <>
              {notificationData.map((item: any, index: number) => {
                return (
                  <View key={index}>
                    <Text>{item.date}</Text>
                    {item.alerts?.map((items: any, index: number) => {
                      return (
                        <View key={index}>
                          <NoticeBox>
                            <UpBox>
                              <NoticeIcon>
                                <Image
                                  resizeMode="contain"
                                  source={{ uri: items.image }}
                                  style={{ width: 25, height: 25 }}
                                />
                                <NoticeText>{items.alert}</NoticeText>
                              </NoticeIcon>
                              <TouchableOpacity
                                onPress={() => {
                                  deleteNotification(items.alertIdx);
                                }}
                              >
                                <DeleteText>X</DeleteText>
                              </TouchableOpacity>
                            </UpBox>
                            <DownBox>
                              <View>
                                <Logo
                                  resizeMode="contain"
                                  source={{ uri: items.certificationPhoto }}
                                />
                              </View>
                              <View style={{ flexDirection: "row" }}>
                                {items.reportStatus === 0 ? (
                                  <AlarmWrapper onPress={Report}>
                                    <Alarm name="alarm-light" size={25} color={"#054de4"} />
                                  </AlarmWrapper>
                                ) : (
                                  <></>
                                )}
                                <ReactionButton
                                  onPress={() => {
                                    setModalTwoVisible(true);
                                  }}
                                >
                                  <ReactionButtonText>리액션 하기</ReactionButtonText>
                                </ReactionButton>
                              </View>
                            </DownBox>
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
      </ScrollView>
      <ReportModalOne />
      <ReportModalTwo />
      <OnDevelopModal />
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 50px 25px 0 25px;
`;
const EmptyText = styled.Text`
  font-size: 16px;
  font-weight: 600;
`;
const NoticeBox = styled.View`
  margin-top: 10px;
  padding: 10px 10px 15px 10px;
  border-radius: 10px;
  background-color: #f6f5fb;
`;
const NoticeIcon = styled.View`
  flex-direction: row;
`;
const NoticeText = styled.Text`
  max-width: 70%;
  margin-left: 5%;
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
const Logo = styled.Image`
  width: 45px;
  height: 45px;
  background-color: #000000;
  border-radius: 5px;
  margin-left: 25%;
`;
const UpBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const DownBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 10px;
`;
const AlarmWrapper = styled.TouchableOpacity`
  padding: 7px 7px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-right: 10px;
  align-self: center;
`;
const ReactionButton = styled.TouchableOpacity`
  background-color: #054de4;
  border-radius: 10px;
  padding: 10px 25px;
  align-self: center;
`;
const ReactionButtonText = styled.Text`
  color: #ffffff;
`;
