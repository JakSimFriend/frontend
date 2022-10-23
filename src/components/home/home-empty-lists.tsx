import { Color } from "@src/assets/color";
import React from "react";
import styled from "styled-components/native";

export const HomeEmptyLists = () => {
  return (
    <EmptyList>
      <EmptyListTitle>추천 도전작심</EmptyListTitle>
      <EmptyListBox>
        <EmptyListDetail>아직 도전작심이 없어요</EmptyListDetail>
      </EmptyListBox>
    </EmptyList>
  );
};

const EmptyList = styled.View``;
const EmptyListTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${Color.blue[1100]};
`;
const EmptyListBox = styled.View`
  margin-top: 10px;
  padding-top: 47px;
  padding-bottom: 47px;
  background-color: ${Color.white[100]};
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;
const EmptyListDetail = styled.Text`
  font-size: 18px;
  color: ${Color.blue[900]};
`;
