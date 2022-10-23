import { a, b, c, d, e, f, g, h } from "@src/assets/images/images";
import { selectedCategoryIndexAtom } from "@src/common/atom";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSetRecoilState } from "recoil";
import styled from "styled-components/native";

export const OpenChallengeCategory = () => {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const setSelectedCategoryIndex = useSetRecoilState(selectedCategoryIndexAtom);
  const categories = ["시사", "독서", "외국어", "전공 기초", "예술", "습관", "운동", "기타"];
  const icons = [a, b, c, d, e, f, g, h];
  useEffect(() => {
    setSelectedCategoryIndex(1);
  }, []);
  return (
    <CategoryBox>
      {categories.map((item, index) => {
        return (
          <CategoryButtons
            key={index}
            onPress={() => {
              setCategoryIndex(index);
              setSelectedCategoryIndex(index + 1);
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
