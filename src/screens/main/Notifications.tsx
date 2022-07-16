import React, { useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import Bells from "react-native-vector-icons/MaterialCommunityIcons";
import Flag from "react-native-vector-icons/FontAwesome";
import Clock from "react-native-vector-icons/AntDesign";
import messaging from '@react-native-firebase/messaging';

const data = [
  {
    index: 1,
    title: "제목1",
    date: "5월 21일",
    time: "11 : 00 ",
    icon: "bell",
  },
  {
    index: 2,
    title: "제목2",
    date: "5월 22일",
    time: "10 : 20 ",
    icon: "flag",
  },
  {
    index: 3,
    title: "제목3",
    date: "5월 23일",
    time: "10 : 05 ",
    icon: "clockcircle",
  },
];

export const Notifications = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.warn('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <Wrapper>
      {data.length === 0 ? (
        <EmptyText>확인하실 알림이 없어요</EmptyText>
      ) : (
        <>
          <Text>5월 5일</Text>
          {data.map((item, index) => {
            return (
              <View key={index}>
                <NoticeBox>
                  <NoticeIcon>
                    {item.icon === "bell" ? (
                      <>
                        <Bells name={item.icon} size={25} color={"#054de4"} />
                        <NoticeText>ㅇㅇㅇㅇ 도전작심 참여 신청이{"\n"}승인되었어요!</NoticeText>
                      </>
                    ) : item.icon === "flag" ? (
                      <>
                        <Flag name={item.icon} size={20} color={"#054de4"} />
                        <NoticeText>인원 미달로 ㅇㅇㅇㅇ{"\n"}도전작심이 폐지되었어요.</NoticeText>
                      </>
                    ) : (
                      <>
                        <Clock name={item.icon} size={20} color={"#054de4"} />

                        <NoticeText>ㅇㅇㅇㅇ 도전작심 마감이{"\n"}1시간 남았어요!</NoticeText>
                      </>
                    )}
                  </NoticeIcon>
                  <TouchableOpacity
                    onPress={() => {
                      console.warn("삭제?");
                    }}
                  >
                    <DeleteText>X</DeleteText>
                  </TouchableOpacity>
                </NoticeBox>
                <Time>오후 {item.time}</Time>
              </View>
            );
          })}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 100px 25px 0 25px;
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
