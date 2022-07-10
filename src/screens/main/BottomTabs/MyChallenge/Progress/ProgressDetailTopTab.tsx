import React from "react";
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
  padding-top: 50px;
`;
