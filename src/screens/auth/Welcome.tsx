import React from "react";
import { Platform } from "react-native";
import { useSetRecoilState } from "recoil";
import styled from "styled-components/native";
import { isLoggedInAtom } from "../../../atom";

const Welcome = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const onDone = () => {
    setIsLoggedIn(true);
  };
  return (
    <Wrapper>
      <Title>어서오세요!</Title>
      <SubTitle>작심친구입니다!</SubTitle>
      <Detail>함께 챌린지할 친구를 찾아봐요!</Detail>
      <Button onPress={onDone}>
        <ButtonText>카카오 계정으로 시작하기</ButtonText>
      </Button>
      <Button onPress={onDone}>
        <ButtonText>구글 계정으로 시작하기</ButtonText>
      </Button>
      <Button onPress={onDone}>
        <ButtonText>애플 계정으로 시작하기</ButtonText>
      </Button>
    </Wrapper>
  );
};
export default Welcome;

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 80px 25px 0 25px;
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
const Button = styled.TouchableOpacity`
  background-color: #101647;
  padding: 15px 10px;
  margin: 10px 0 10px 0 ;
  border-radius: 13px;
`;
const ButtonText = styled.Text`
  text-align: center;
  color: #ffffff;
  font-weight: 600;
`;
