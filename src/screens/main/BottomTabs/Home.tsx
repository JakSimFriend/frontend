import React, { useState } from "react";
import { Animated, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { SearchIcon } from "../../../components/TabIcon";
import { CategoryHeader } from "./Home/CategoryHeader";
import { Challenges } from "./Home/Challenges";

export const Home = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("유저"); //서버데이터
  const goToSearch = () => navigation.navigate("Search");
  const goToOpenChallenge = () => navigation.navigate("Category");

  // 검색바 애니메이션
  const upValue = useState(new Animated.Value(0))[0];
  const MoveSearchBarUp = () => {
    Animated.timing(upValue, {
      toValue: 75,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      Animated.timing(upValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, 250);
  };
  return (
    <HomeWrapper>
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <Title>
          환영합니다. {userName}님!{"\n"}새로운 챌린지를 찾아보세요!
        </Title>
        <Animated.View
          style={{
            bottom: upValue,
          }}
        >
          <InputWrapper
            onPress={() => {
              MoveSearchBarUp();
              goToSearch();
            }}
          >
            <InputBox>
              <InputText>다양한 챌린지를 검색해보세요!</InputText>
            </InputBox>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </InputWrapper>
        </Animated.View>
        <CategoryHeader />
        <Challenges />
      </ScrollView>
      <OpenChallenge onPress={goToOpenChallenge}>
        <OpenChallengeText> 챌린지 개설하기</OpenChallengeText>
      </OpenChallenge>
    </HomeWrapper>
  );
};

const HomeWrapper = styled.View`
  flex: 1;
  padding-left: 18px;
  background-color: #ffffff;
  height: 100%;
`;
const Title = styled.Text`
  color: #000000;
  font-size: 20px;
  font-weight: 400;
  margin: 10px 0 0 15px;
`;
const InputWrapper = styled.TouchableOpacity`
  align-items: flex-start;
  flex-direction: row;
  margin-top: 30px;
`;
const InputBox = styled.View`
  background-color: #f6f5fb;
  border-radius: 10px;
  padding: 15px;
  width: 83%;
  margin-left: 12px;
`;
const InputText = styled.Text`
  color: #6b7ba2;
`;
const SearchIconWrapper = styled.View`
  margin: 12px 0 0 5px;
`;
const OpenChallenge = styled.TouchableOpacity`
  align-self: center;
  align-items: center;
  background-color: #054de4;
  border-radius: 10px;
  margin-bottom: 30px;
  padding: 15px;
  width: 70%;
  position: absolute;
  bottom: 0;
`;
const OpenChallengeText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
`;
