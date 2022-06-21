import React from "react";
import styled from "styled-components/native";

export const EmptyChallengeList = () => {
  return (
    <EmptyList>
      <EmptyListTitle>추천 챌린지</EmptyListTitle>
      <EmptyListBox>
        <EmptyListImage>이미지</EmptyListImage>
        <EmptyListDetail>아직 챌린지가 없어요</EmptyListDetail>
      </EmptyListBox>
    </EmptyList>
  );
};

const EmptyList = styled.View`
 margin: 5px 0 0 12px;
`;
const EmptyListTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
const EmptyListBox = styled.View`
  margin-top: 10px;
  padding: 10px;
  background-color: #f6f5fb;
  border-radius: 12px;
  width: 90%;
  height: 180px;
  justify-content: center;
  align-items: center;
`;
const EmptyListImage = styled.Text``;
const EmptyListDetail = styled.Text`
  font-size: 18px;
  color: grey;
  margin-top: 30px;
`;
