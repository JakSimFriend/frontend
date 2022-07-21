import React from "react";
import styled from "styled-components/native";
import * as Progress from "react-native-progress";
import { StyleSheet } from "react-native";
import { CategoryHeader } from "./CategoryHeader";

export const Category = () => {
  return (
    <Wrapper>
      <Progress.Bar style={styles.progressBar} progress={0} width={390} height={2} />
      <Title>도전작심 카테고리를 골라주세요</Title>
      <SubTitle>한 카테고리만 선택해 주세요!</SubTitle>
      <CategoryHeader />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
`;
const Title = styled.Text`
  font-size: 20px;
  margin-top: 35px;
  font-weight: 600;
  margin-left: 7%;
`;
const SubTitle = styled.Text`
  margin-top: 10px;
  margin-left: 7%;
  font-size: 12px;
`;
const styles = StyleSheet.create({
  progressBar: {
    marginHorizontal: -18,
    borderColor: "#fff",
  },
});
