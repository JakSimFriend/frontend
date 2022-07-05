import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import styled from "styled-components/native";
import { StatData } from "./StatData";

export const Detail = () => {
  const [categoryEmpty, setCategoryEmpty] = useState(false); // data
  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        {categoryEmpty ? (
          <>
            <View style={styles.EmptyView}>
              <Text style={styles.EmptyText}>완료한 챌린지가 없어요</Text>
            </View>
          </>
        ) : (
          <>
            {StatData.map((item, index) => {
              return (
                <Categories key={index}>
                  <Left>
                    <ImageWrapper style={styles.categoryBackground}>
                      <Logo resizeMode="contain" source={item.category} />
                    </ImageWrapper>
                    <Text style={styles.categoryText}>{item.categoryTitle}</Text>
                  </Left>
                  <TextWrapper>
                    <Text style={styles.EXP}>{item.exp}EXP</Text>
                  </TextWrapper>
                </Categories>
              );
            })}
          </>
        )}
      </ScrollView>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  padding: 100px 20px 0 20px;
  background-color: #ffffff;
`;
const Categories = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const Left = styled.View`
  flex-direction: row;
`;
const ImageWrapper = styled.View`
  padding: 10px;
  border-radius: 10px;
`;
const Logo = styled.Image`
  width: 20px;
  height: 20px;
`;
const TextWrapper = styled.View`
  margin-top: 10px;
`;
const styles = StyleSheet.create({
  categoryBackground: {
    backgroundColor: "#f6f5fb",
  },
  categoryText: {
    marginTop: 12,
    marginLeft: 15,
    fontSize: 16,
  },
  EXP: {
    fontSize: 17,
  },
  EmptyView: {
    backgroundColor: "#F6F5FB",
    padding: 45,
    borderRadius: 15,
  },
  EmptyText: {
    color: "#6F81A9",
    alignSelf: "center",
  },
});
