import React from "react";
import { Keyboard, Text, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

export const ChallengeDesc = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={dismissKeyboard}>
      <Wrapper>
        <Text>챌린지 설명</Text>
      </Wrapper>
    </TouchableWithoutFeedback>
  );
};
const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 80px 25px 0 25px;
`;
