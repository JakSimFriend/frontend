import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

export const Setting = () => {
  return (
    <Wrapper>
      <Text>설정</Text>
    </Wrapper>
  );
};
const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 80px 25px 0 25px;
`;
