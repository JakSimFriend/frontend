import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Color } from "@src/assets/color";
import { userInfoAtom } from "@src/common/atom";
import { HomeLists } from "@src/components//home/HomeLists";
import { GradientButtons } from "@src/components/atoms/GradientButtons";
import { SearchIcon } from "@src/components/atoms/TabIcon";
import { HomeCategory } from "@src/components/molecules/categories/HomeCategory";
import { useUserInfo } from "@src/hook/useUserInfo";
import React, { useRef, useState } from "react";
import { Animated, ScrollView, StatusBar } from "react-native";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";

// eslint-disable-next-line react/display-name
export const Home = React.memo(() => {
  useUserInfo();
  const navigation = useNavigation();
  const userInfo = useRecoilValue(userInfoAtom);
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
      toValue: 88,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      Animated.timing(upValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, 300);
  };

  // 카테고리 애니메이션
  const iconValue = useState(new Animated.Value(0))[0];
  const MoveIconUp = () => {
    Animated.timing(iconValue, {
      toValue: 50,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      Animated.timing(iconValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }, 300);
  };

  return (
    <HomeWrapper>
      <StatusBar barStyle={"dark-content"}></StatusBar>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <Title>
          어서오세요, {userInfo?.nickName || "유저"}님!{"\n"}천리길의 한걸음도 작심친구와 함께!
        </Title>
        <Animated.View
          style={{
            bottom: upValue,
          }}
        >
          <InputBox
            onPress={() => {
              MoveSearchBarUp();
              goToSearch();
            }}
          >
            <SearchIcon />
            <InputText>다양한 도전작심을 검색해 보세요!</InputText>
          </InputBox>
        </Animated.View>
        <Animated.View
          style={{
            bottom: iconValue,
          }}
        >
          <HomeCategory />
        </Animated.View>
        <HomeLists />
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
  background-color: ${Color.white[0]};
  height: 100%;
  padding: 20px 20px 0;
`;
const Title = styled.Text`
  color: #000000;
  font-size: 20px;
  font-weight: 400;
`;
const InputBox = styled.TouchableOpacity`
  background-color: ${Color.white[200]};
  border-radius: 13px;
  flex-direction: row;
  padding: 10px;
  width: 100%;
  height: 45px;
  margin-top: 30px;
`;
const InputText = styled.Text`
  color: ${Color.blue[800]};
  align-self: center;
  font-size: 15px;
  margin-left: 10px;
`;
const OpenChallenge = styled.View`
  align-self: center;
  width: 70%;
  position: absolute;
  bottom: 0;
  margin-bottom: 20px;
`;
