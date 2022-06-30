import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";
import { Wrapper } from "../../../../styles/styles";
import { a, c, d } from "../../../../assets/images";

const StatData = [
  {
    category: a,
    categoryTitle: "시사",
    exp: "20,000",
  },
  {
    category: c,
    categoryTitle: "외국어",
    exp: "10,000",
  },
  {
    category: d,
    categoryTitle: "전공기초",
    exp: "10,000",
  },
];

export const MyState = () => {
  const [categoryEmpty, setCategoryEmpty] = useState(false); // data
  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient style={styles.blueBox} colors={["#947BEA", "#1151E5"]}>
          <UpBox>
            <SeasonTitle>작심 시즌 1</SeasonTitle>
            <ChallengeText>2022/06/01 ~ 2022/08/30</ChallengeText>
            <ChallengeText>기간동안 만료한 챌린지만 합산됩니다</ChallengeText>
          </UpBox>
          <InfoWrapper>
            <View>
              <Text style={styles.text}>경험치 상위</Text>
              <Text style={styles.text}>
                <Text style={styles.number}>20</Text>%
              </Text>
              <Text style={styles.text}>누적 경험치 40,000</Text>
            </View>
            <View>
              <Text style={styles.text}>참가율 상위</Text>
              <Text style={styles.text}>
                <Text style={styles.number}>30</Text>%
              </Text>
              <Text style={styles.text}>참가 챌린지 40개</Text>
            </View>
          </InfoWrapper>
        </LinearGradient>
        <StatTitle>카테고리 통계</StatTitle>
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

const SeasonTitle = styled.Text`
  margin-top: 15px;
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
`;
const ChallengeText = styled.Text`
  color: #ffffff;
  margin-top: 10px;
`;
const InfoWrapper = styled.View`
  flex-direction: row;
  margin-top: 25px;
  margin-left: 10px;
`;
const StatTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin: 60px 0 30px 0;
`;
const UpBox = styled.View`
  align-self: center;
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #ffffff;
  width: 95%;
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
  blueBox: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  text: {
    color: "#ffffff",
    marginBottom: 5,
    marginRight: 30,
  },
  number: {
    fontSize: 45,
    fontWeight: "bold",
  },
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
