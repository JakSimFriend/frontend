import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";
import { Wrapper } from "../../../../styles/styles";
import axios from "axios";
import { a, b, c, d, e, f, g, h } from "../../../../assets/images/images";
import { useRecoilValue } from "recoil";
import { stateIndicatorAtom, userIndexAtom } from "../../../../../atom";

export const MyState = React.memo(() => {
  const icons = [a, b, c, d, e, f, g, h];
  const [statData, setStatData]: any = useState([]);
  const [categoryEmpty, setCategoryEmpty] = useState(false);
  const stateIndicator = useRecoilValue(stateIndicatorAtom);
  const userIdx = useRecoilValue(userIndexAtom);
  const getData = () => {
    axios
      .get(`https://jaksimfriend.site/status/${userIdx}`)
      .then(function (response) {
        if (response.data.code === 3049) {
          setCategoryEmpty(true);
        } else if (response.data.code === 1000) {
          setCategoryEmpty(false);
          setStatData(response.data.result[0]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, [stateIndicator]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f5fb" }}>
      <Wrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient style={styles.blueBox} colors={["#947BEA", "#1151E5"]}>
            <UpBox>
              <SeasonTitle>시즌 1</SeasonTitle>
              <ChallengeText>2022/06/01 ~ 2022/08/30</ChallengeText>
              <ChallengeText>기간동안 완료한 챌린지만 합산됩니다</ChallengeText>
            </UpBox>
            <InfoWrapper>
              <View>
                <Text style={styles.text}>평균 달성률</Text>
                <Text style={styles.text}>
                  <Text style={styles.number}>
                    {statData.achievement ? statData.achievement : 0}
                  </Text>
                  %
                </Text>
              </View>
            </InfoWrapper>
          </LinearGradient>
          <Text style={styles.expTitle}>누적 경험치</Text>
          <Text style={styles.expNumber}>{statData.experience ? statData.experience : 0} EXP</Text>
          <StatTitle>카테고리 통계</StatTitle>
          {statData.categories?.length === 0 || categoryEmpty ? (
            <>
              <View style={styles.EmptyView}>
                <Text style={styles.EmptyText}>완료한 도전작심이 없어요</Text>
              </View>
            </>
          ) : (
            <>
              {statData.categories?.map((item: any, index: number) => {
                return (
                  <Categories key={index}>
                    <Left>
                      <ImageWrapper style={styles.categoryBackground}>
                        <Logo resizeMode="contain" source={icons[item.categoryIdx - 1]} />
                      </ImageWrapper>
                      <Text style={styles.categoryText}>{item.categoryName}</Text>
                    </Left>
                    <TextWrapper>
                      <Text style={styles.EXP}>{item.categoryEx}EXP</Text>
                    </TextWrapper>
                  </Categories>
                );
              })}
            </>
          )}
        </ScrollView>
      </Wrapper>
    </SafeAreaView>
  );
});

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
  justify-content: center;
  flex-direction: row;
  margin-top: 25px;
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
  width: 25px;
  height: 25px;
`;
const TextWrapper = styled.View`
  margin-top: 10px;
`;
const styles = StyleSheet.create({
  blueBox: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 20,
  },
  text: {
    color: "#ffffff",
    marginBottom: 5,
  },
  number: {
    fontSize: 45,
    fontWeight: "bold",
    textAlign: "center",
  },
  expTitle: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: "400",
  },
  expNumber: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "600",
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
    fontSize: 18,
    fontWeight: "500",
  },
  EmptyView: {
    backgroundColor: "#F6F5FB",
    padding: 45,
    borderRadius: 15,
  },
  EmptyText: {
    color: "#6F81A9",
    alignSelf: "center",
    fontSize: 18,
  },
});
