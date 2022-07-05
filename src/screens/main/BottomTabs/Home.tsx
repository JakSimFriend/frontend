import React, { useRef, useState } from "react";
import { Animated, ScrollView } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { SearchIcon } from "../../../components/TabIcon";
import { CategoryHeader } from "./Home/CategoryHeader";
import { Challenges } from "./Home/Challenges";
import { GradientButtons } from "../../../components/GradientButtons";

export const Home = React.memo(() => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("유저"); //서버데이터
  const goToSearch = () => navigation.navigate("Search");
  const goToOpenChallenge = () => navigation.navigate("Category");

  // 페이지 이동시 scrollTo top
  const isFocused = useIsFocused();
  const scrollViewRef = useRef<ScrollView>(null);
  if (isFocused) {
    scrollViewRef.current?.scrollTo({ x: 5, y: 5, animated: false });
  }

  // 검색바 애니메이션
  const upValue = useState(new Animated.Value(0))[0];
  const MoveSearchBarUp = () => {
    Animated.timing(upValue, {
      toValue: 70,
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

  // 카테고리 애니메이션
  const iconValue = useState(new Animated.Value(0))[0];
  const MoveIconUp = () => {
    Animated.timing(iconValue, {
      toValue: 40,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      Animated.timing(iconValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, 250);
  };
  return (
    <HomeWrapper>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
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
        <Animated.View
          style={{
            bottom: iconValue,
          }}
        >
          <CategoryHeader />
        </Animated.View>
        <Challenges />
      </ScrollView>
      <OpenChallenge>
        <GradientButtons
          onPress={() => {
            MoveIconUp();
            goToOpenChallenge();
          }}
          Title="도전작심 개설하기"
        />
      </OpenChallenge>
    </HomeWrapper>
  );
});

const HomeWrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-left: 15px;
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
const OpenChallenge = styled.View`
  align-self: center;
  width: 70%;
  position: absolute;
  bottom: 0;
`;

