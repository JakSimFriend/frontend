import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import Camera from "react-native-vector-icons/AntDesign";
import { GradientButtons } from "../../../../../components/GradientButtons";
import { useNavigation } from "@react-navigation/native";

type RouteParams = {
  route: {
    params: {
      challengeIdx: number;
    };
  };
};

export const ProgressCertified = ({ route }: RouteParams) => {
  const { challengeIdx } = route.params;
  const navigation: any = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Wrapper>
        <Title>사진 등록하기</Title>
        <SubTitle>오늘도 작심한 것을 인증해주세요!</SubTitle>
        <PhotoBox>
          <Camera name="camerao" size={25} color={"#054de4"} />
          <CameraText>도전작심 규칙을 참고하셔서{`\n`}인증할 수 있는 사진을 올려주세요!</CameraText>
        </PhotoBox>
        <InfoButton
          onPress={() => {
            navigation.navigate("ProgressPageInfo", {
              challengeIdx: challengeIdx,
            });
          }}
        >
          <InfoButtonText>도전작심 정보</InfoButtonText>
        </InfoButton>
        <GradientButtonWrapper>
          <GradientButtons
            onPress={() => {
              "인증하기~";
            }}
            Title="사진 촬영해서 인증하기"
          />
        </GradientButtonWrapper>
      </Wrapper>
    </SafeAreaView>
  );
};
const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 70px 25px 0 25px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
const SubTitle = styled.Text`
  margin-top: 20px;
  font-size: 13px;
`;
const PhotoBox = styled.View`
  margin-top: 30px;
  padding: 40% 0;
  border-radius: 15px;
  background-color: #f6f5fb;
  align-items: center;
`;
const CameraText = styled.Text`
  margin-top: 30px;
  text-align: center;
`;
const InfoButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: #f6f5fb;
  border-radius: 15px;
  margin-top: 20px;
  align-items: center;
  align-self: center;
  width: 40%;
`;
const InfoButtonText = styled.Text`
  color: #6f81a9;
`;
const GradientButtonWrapper = styled.View`
  position: absolute;
  bottom: 0;
  align-self: center;
  width: 90%;
  margin-bottom: 10%;
`;
