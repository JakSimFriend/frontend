import React from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import { ProgressTopbarNav } from "../../../../../navigators";

export const ProgressDetailTopTab = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Wrapper>
        <ProgressTopbarNav />
      </Wrapper>
    </SafeAreaView>
  );
};
const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-top: 10%;
`;
