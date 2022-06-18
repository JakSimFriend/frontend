import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, Button } from "react-native";
import styled from "styled-components/native";
import { useSetRecoilState } from "recoil";
import { isUserAtom } from "../../../atom";

export const NickName = () => {
  const navigation = useNavigation();
  const setIsUser = useSetRecoilState(isUserAtom);
  const jakSimStart = () => {
    setIsUser(true);
    navigation.navigate("NickName");
  };

  return (
    <Wrapper>
      <Text>닉네임을 적어주세요</Text>
      <Button title="작심하러 갈게요" onPress={jakSimStart}></Button>
    </Wrapper>
  );
};
const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 80px 25px 0 25px;
`;
