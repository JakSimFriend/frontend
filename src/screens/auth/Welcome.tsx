import React from "react";
import { Platform } from "react-native";
import { useSetRecoilState } from "recoil";
import styled from "styled-components/native";
import { isLoggedInAtom } from "../../../atom";
import { GradientButtons } from "../../components/GradientButtons";

const Welcome = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const onDone = () => {
    setTimeout(() => {
      setIsLoggedIn(true);
    }, 1000);
  };

  return (
    <Wrapper>
      <Title>어서오세요!</Title>
      <SubTitle>작심친구입니다!</SubTitle>
      <Detail>함께 챌린지할 친구를 찾아봐요!</Detail>
      <GradientButtons onPress={onDone} Title="카카오 계정으로 시작하기" />
      <GradientButtons onPress={onDone} Title="구글 계정으로 시작하기" />
      <GradientButtons onPress={onDone} Title="애플 계정으로 시작하기" />
    </Wrapper>
  );
};
export default Welcome;

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 90px 6% 0 6%;
`;
const Title = styled.Text`
  color: #000000;
  font-size: 30px;
`;
const SubTitle = styled.Text`
  color: #000000;
  font-size: 30px;
  font-weight: 900;
`;
const Detail = styled.Text`
  padding-top: 20px;
  padding-bottom: 200px;
  /* padding-bottom: ${Platform.OS === "ios" ? 250 : 150}; */
`;
