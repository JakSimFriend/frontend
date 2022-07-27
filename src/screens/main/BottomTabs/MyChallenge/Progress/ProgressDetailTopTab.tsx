import React from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";
import { ProgressTopbarNav } from "../../../../../navigators";

export const ProgressDetailTopTab = () => {
  return (
    <Wrapper>
      <ProgressTopbarNav />
    </Wrapper>
  );
};
const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-top: ${Platform.OS === "ios" ? "17.5%" : "12%"};
`;
