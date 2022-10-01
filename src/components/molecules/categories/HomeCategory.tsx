import React from "react";
import { StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import styled from "styled-components/native";

import { a, b, c, d, e, f, g, h } from "../../../assets/images/images";
import { categoryIndexAtom } from "../../../common/atom";

export const HomeCategory = () => {
  const [categoryIndex, setCategoryIndex] = useRecoilState(categoryIndexAtom);
  const icons = [a, b, c, d, e, f, g, h];

  const categoriesOne = ["시사", "독서", "외국어", "전공 기초"];
  const categoriesTwo = ["예술", "습관", "운동", "기타"];

  return (
    <HomeCategoryWrapper>
      <CategoryBox>
        {categoriesOne.map((category, index) => (
          <CategoryButtons
            key={index}
            onPress={() => {
              setCategoryIndex(index);
            }}
          >
            <ImageWrapper
              style={
                categoryIndex === index
                  ? styles.categorySelectedBackground
                  : styles.categoryBackground
              }
            >
              <Logo resizeMode="contain" source={icons[index]} />
            </ImageWrapper>
            <CategoryText
              style={categoryIndex === index ? styles.categorySelected : styles.category}
            >
              {category}
            </CategoryText>
          </CategoryButtons>
        ))}
      </CategoryBox>
      <CategoryBox>
        {categoriesTwo.map((category, index) => (
          <CategoryButtons
            key={index}
            onPress={() => {
              setCategoryIndex(index + 4);
            }}
          >
            <ImageWrapper
              style={
                categoryIndex === index + 4
                  ? styles.categorySelectedBackground
                  : styles.categoryBackground
              }
            >
              <Logo resizeMode="contain" source={icons[index + 4]} />
            </ImageWrapper>
            <CategoryText
              style={categoryIndex === index + 4 ? styles.categorySelected : styles.category}
            >
              {category}
            </CategoryText>
          </CategoryButtons>
        ))}
      </CategoryBox>
    </HomeCategoryWrapper>
  );
};

const styles = StyleSheet.create({
  category: {
    color: "#000000",
  },
  categorySelected: {
    color: "#054DE4",
  },
  categoryBackground: {
    backgroundColor: "#f6f5fb",
  },
  categorySelectedBackground: {
    backgroundColor: "#054DE4",
  },
});

const HomeCategoryWrapper = styled.View`
  margin-top: 30px;
  margin-bottom: 50px;
`;

const CategoryBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const CategoryButtons = styled.TouchableOpacity`
  margin-bottom: 10px;
  /* padding: 9px 13px; */
  border-radius: 13px;
  justify-content: center;
  align-items: center;
`;
const ImageWrapper = styled.View`
  padding: 13px;
  border-radius: 10px;
`;
const Logo = styled.Image`
  width: 30px;
  height: 30px;
`;
const CategoryText = styled.Text`
  margin-top: 10px;
  font-size: 12px;
`;
