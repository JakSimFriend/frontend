import React from "react";
import styled from "styled-components/native";

export const Part = () => {
  return (
    <PartWrapper>
      <PartText>
       Part
      </PartText>
    </PartWrapper>
  );
};

const PartWrapper = styled.View`
  flex: 1;
  padding: 0px 23px;
  background-color: #ffffff;
`;
const PartText = styled.Text`
  color: #000000;
  font-size: 20px;
  font-weight: 400;
`;
