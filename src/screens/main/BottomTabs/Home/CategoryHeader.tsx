import React from "react";
import { StyleSheet } from "react-native";
import { useRecoilState } from "recoil";
import styled from "styled-components/native";
import { categoryIndexAtom } from "../../../../../atom";
import { a, b, c, d, e, f, g, h } from "../../../../assets/images";

export const CategoryHeader = () => {
  const [categoryIndex, setCategoryIndex] = useRecoilState(categoryIndexAtom);
  const categories = ["시사", "독서", "외국어", "전공 기초", "예술", "습관", "운동", "기타"];
  const icons = [a, b, c, d, e, f, g, h];
  return (
    <CategoryBox>
      {categories.map((item, index) => {
        return (
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
              {item}
            </CategoryText>
          </CategoryButtons>
        );
      })}
    </CategoryBox>
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

const CategoryBox = styled.View`
  flex-direction: row;
  margin: 30px 0;
  flex-wrap: wrap;
  justify-content: center;

`;
const CategoryButtons = styled.TouchableOpacity`
  margin-bottom: 10px;
  width: 25%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;
const ImageWrapper = styled.View`
  padding: 10px;
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
