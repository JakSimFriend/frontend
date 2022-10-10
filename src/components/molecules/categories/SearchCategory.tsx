import { Color } from "@src/assets/color";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const SearchCategory = ({ categoryName, setCategoryName, setCategoryIndex }: any) => {
  const categories = [
    "전체",
    "시사",
    "독서",
    "외국어",
    "전공 기초",
    "예술",
    "습관",
    "운동",
    "기타",
  ];
  return (
    <CategoryBox>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCategoryName(item);
                setCategoryIndex(index);
              }}
              style={[
                categoryName === item ? styles.categoryBorderSelected : styles.categoryBorder,
                { marginLeft: 17, marginRight: 5, alignSelf: "center" },
              ]}
            >
              <Category style={categoryName === item ? styles.categorySelected : styles.category}>
                {item}
              </Category>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </CategoryBox>
  );
};

const CategoryBox = styled.View`
  flex-direction: row;
  margin-top: 30px;
  justify-content: space-evenly;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: ${Color.white[200]};
`;
const Category = styled.Text`
  color: ${Color.black[0]};
  font-size: 15px;
  font-weight: 900;
`;

const styles = StyleSheet.create({
  category: {
    color: Color.black[0],
    fontWeight: "300",
  },
  categorySelected: {
    color: Color.black[0],
    fontWeight: "600",
  },
  categoryBorder: {
    paddingBottom: 10,
  },
  categoryBorderSelected: {
    borderBottomColor: Color.blue[200],
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
});
