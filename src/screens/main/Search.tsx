import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Animated, Keyboard } from "react-native";
import styled from "styled-components/native";
import { BackIcon, SearchIcon } from "../../components/TabIcon";

export const Search = () => {
  const navigation = useNavigation();
  const goHome = () =>
    setTimeout(() => {
      navigation.goBack();
    }, 100);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const DownValue = useState(new Animated.Value(0))[0];
  const MoveSearchBarDown = () => {
    Animated.timing(DownValue, {
      toValue: 60,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  return (
    <Wrapper>
      <BackButton
        onPress={() => {
          MoveSearchBarDown();
          goHome();
        }}
      >
        <BackIcon />
      </BackButton>
      <Animated.View
        style={{
          top: DownValue,
        }}
      >
        <InputWrapper onPress={dismissKeyboard}>
          <InputBox placeholder="다양한 챌린지를 검색해보세요!" placeholderTextColor={"#6b7ba2"} />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </InputWrapper>
      </Animated.View>
    </Wrapper>
  );
};
const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 50px 0 0 18px;
`;
const BackButton = styled.TouchableOpacity``;
const InputWrapper = styled.TouchableOpacity`
  align-items: flex-start;
  flex-direction: row;
  margin-top: 30px;
`;
const InputBox = styled.TextInput`
  background-color: #f6f5fb;
  border-radius: 10px;
  padding: 15px;
  width: 83%;
  margin-left: 12px;
`;
const SearchIconWrapper = styled.View`
  margin: 12px 0 0 5px;
`;
