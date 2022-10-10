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

const EmptyList = styled.View`
  margin: 20px 4% 50px 4%;
`;
const EmptyListTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
const EmptyListBox = styled.View`
  margin-top: 30px;
  padding: 10px;
  background-color: #f6f5fb;
  border-radius: 12px;
  height: 100px;
  justify-content: center;
  align-items: center;
`;
const EmptyListDetail = styled.Text`
  font-size: 18px;
  color: grey;
`;
