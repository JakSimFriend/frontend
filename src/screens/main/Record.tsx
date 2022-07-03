import React from "react";
import { Text } from "react-native";
import styled from "styled-components/native";

export const Record = () => {
  return (
    <Wrapper>
      <Text>기록</Text>
    </Wrapper>
  );
};
const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 80px 25px 0 25px;
`;
