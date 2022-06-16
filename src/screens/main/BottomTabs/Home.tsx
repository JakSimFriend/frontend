import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button } from "react-native";
import { TextStyle, Wrapper } from "../../../styles/styles";

export const Home = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("만두");
  const goToSearch = () => navigation.navigate("Search");
  return (
    <Wrapper>
      <TextStyle>
        환영합니다. {userName}님!{"\n"}새로운 챌린지를 찾아보세요!
      </TextStyle>
      <Button title="검색" onPress={goToSearch}></Button>
    </Wrapper>
  );
};
