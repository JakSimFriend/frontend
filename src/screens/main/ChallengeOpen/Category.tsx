import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, Text } from "react-native";
import styled from "styled-components/native";

export const Category = () => {
  const navigation = useNavigation();
  const goToChallengeDesc = () => navigation.navigate("ChallengeDesc");
  return (
    <Wrapper>
      <Text>카테고리</Text>
      <Button title="다음으로" onPress={goToChallengeDesc}></Button>
    </Wrapper>
  );
};
const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 80px 25px 0 25px;
`;
