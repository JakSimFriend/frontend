import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import Camera from "react-native-vector-icons/MaterialCommunityIcons";
import CameraOff from "react-native-vector-icons/MaterialCommunityIcons";
import Happy from "react-native-vector-icons/Ionicons";
import Alarm from "react-native-vector-icons/MaterialCommunityIcons";
import { a } from "../../../../../assets/images";
import ReportModalOne from "../../../../../components/organisms/ReportModalOne";
import ReportModalTwo from "../../../../../components/organisms/ReportModalTwo";
import { useSetRecoilState } from "recoil";
import { reportModalOne, reportModalTwo } from "../../../../../../atom";

const data = [
  {
    index: 1,
    title: "제목1",
    date: "5월 21일",
    time: "11 : 00 ",
    icon: "camera",
  },
  {
    index: 2,
    title: "제목2",
    date: "5월 22일",
    time: "10 : 20 ",
    icon: "camera-off",
  },
  {
    index: 3,
    title: "제목3",
    date: "5월 23일",
    time: "10 : 05 ",
    icon: "happy",
  },
];

export const ProgressNotification = () => {
  const setModalOneVisible = useSetRecoilState(reportModalOne);
  const setModalTwoVisible = useSetRecoilState(reportModalTwo);
  const Delete = () => {
    console.warn("삭제~");
  };
  const Report = () => {
    setModalOneVisible(true);
  };
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
                    {item.icon === "happy" ? (
                      <Left>
                        <Happy name={item.icon} size={25} color={"#054de4"} />
                        <NoticeText>
                          ㅇㅇㅇㅇ님이{"\n"}만두님께{"\n"}멋져요 리액션을 남기셨어요
                        </NoticeText>
                      </Left>
                    ) : item.icon === "camera-off" ? (
                      <Left>
                        <CameraOff name={item.icon} size={25} color={"#054de4"} />
                        <NoticeText>만두님의{"\n"}인증이 신고되었어요</NoticeText>
                      </Left>
                    ) : (
                      <Left>
                        <Camera name={item.icon} size={25} color={"#054de4"} />
                        <NoticeText>만두님이{"\n"}도전작심을 인증하셨어요</NoticeText>
                      </Left>
                    )}
                    <DeleteButton onPress={Delete}>
                      <DeleteText>X</DeleteText>
                    </DeleteButton>
                  </NoticeIcon>
                  {item.icon === "camera" ? (
                    <DownBox>
                      <TouchableOpacity>
                        <Logo resizeMode="contain" source={a} />
                      </TouchableOpacity>
                      <View style={{ flexDirection: "row" }}>
                        <AlarmWrapper onPress={Report}>
                          <Alarm name="alarm-light" size={25} color={"#054de4"} />
                        </AlarmWrapper>
                        <ReactionButton>
                          <ReactionButtonText>리액션 하기</ReactionButtonText>
                        </ReactionButton>
                      </View>
                    </DownBox>
                  ) : (
                    <></>
                  )}
                </NoticeBox>
                <Time>오후 {item.time}</Time>
              </View>
            );
          })}
        </>
      )}
      <ReportModalOne />
      <ReportModalTwo />
    </Wrapper>
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
  padding: 16px 10px 15px 10px;
  border-radius: 10px;
  background-color: #f6f5fb;
`;
const NoticeIcon = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const Left = styled.View`
  flex-direction: row;
`;
const NoticeText = styled.Text`
  margin-left: 15px;
`;
const DeleteButton = styled.TouchableOpacity``;
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
  width: 40px;
  height: 40px;
  background-color: #000000;
  border-radius: 5px;
`;
const DownBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 10px;
`;
const AlarmWrapper = styled.TouchableOpacity`
  padding: 5px 7px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-right: 10px;
`;
const ReactionButton = styled.TouchableOpacity`
  background-color: #054de4;
  border-radius: 10px;
  padding: 10px 25px;
`;
const ReactionButtonText = styled.Text`
  color: #ffffff;
`;
