import React from "react";
import styled from "styled-components/native";
import { MyChallengeCategoryNav } from "../../../navigators";

export const MyChallenge = () => {
  return (
    <Wrapper>
      <MyChallengeCategoryNav />
    </Wrapper>
  );
};

export const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
`;