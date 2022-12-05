import { Color } from "@src/assets/color";
import { a, b, c, d, e, f, g, h } from "@src/assets/images/images";
import { stateIndicatorAtom, userIdxAtom } from "@src/common/atom";
import { Wrapper } from "@src/styles/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";

import { Category, Status } from "./interface/stauts.interface";

export const MyState = () => {
  const icons = [a, b, c, d, e, f, g, h];
  const [statData, setStatData] = useState<Status>();
  const [categoryEmpty, setCategoryEmpty] = useState(false);
  const [season, setSeason] = useState<{ period: string; seasonIdx: number; seasonName: string }>();
  const stateIndicator = useRecoilValue(stateIndicatorAtom);
  const userIdx = useRecoilValue(userIdxAtom);
  const getData = () => {
    axios
      .get(`https://eddy-pl.com/api/status/${userIdx}`)
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
    axios
      .get(`https://eddy-pl.com/api/status/season`)
      .then(({ data }) => setSeason(data.result[0]));
  };
  useEffect(() => {
    getData();
  }, [stateIndicator]);

  return (
    <SafeAreaView style={{ backgroundColor: "#f6f5fb", height: "100%" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Wrapper>
          <LinearGradient style={styles.blueBox} colors={["#947BEA", "#1151E5"]}>
            <UpBox>
              <SeasonTitle>{season?.seasonName}</SeasonTitle>
              <ChallengeText>
                {season?.period}
                {"\n"} 기간동안 완료한 챌린지만 합산됩니다
              </ChallengeText>
            </UpBox>
            <InfoWrapper>
              <Text style={styles.avgText}>평균 달성률</Text>
              <Text style={styles.text}>
                <Text style={styles.number}>
                  {statData?.achievement ? statData.achievement : 0}
                </Text>
                %
              </Text>
            </InfoWrapper>
          </LinearGradient>
          <Text style={styles.expTitle}>누적 경험치</Text>
          <Text style={styles.expNumber}>
            {statData?.experience ? statData.experience.toLocaleString() : 0} EXP
          </Text>

          <View style={styles.CategoriesWrapper}>
            {statData?.categories &&
              statData?.categories.length > 0 &&
              statData?.categories?.map((item: Category, index: number) => {
                return (
                  <Categories key={index}>
                    <Left>
                      <ImageWrapper style={styles.categoryBackground}>
                        <Logo resizeMode="contain" source={icons[item.categoryIdx - 1]} />
                      </ImageWrapper>
                      <Text style={styles.categoryText}>{item.categoryName}</Text>
                    </Left>
                    <TextWrapper>
                      <Text style={styles.EXP}>{item.categoryEx.toLocaleString()}EXP</Text>
                    </TextWrapper>
                  </Categories>
                );
              })}
            {!statData?.categories && (
              <EmptyChallengeWrapper>
                <Text style={{ color: Color.blue[900], fontSize: 17 }}>
                  완료한 도전작심이 없어요
                </Text>
              </EmptyChallengeWrapper>
            )}
          </View>
        </Wrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

const SeasonTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
`;
const ChallengeText = styled.Text`
  color: #ffffff;
  margin-top: 8px;
  line-height: 20px;
  text-align: center;
`;
const InfoWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
`;
const UpBox = styled.View`
  align-self: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #ffffff;
  width: 95%;
  padding-bottom: 20px;
`;
const Categories = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;
const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ImageWrapper = styled.View`
  padding: 10px;
  border-radius: 10px;
`;
const Logo = styled.Image`
  width: 22px;
  height: 28px;
`;
const TextWrapper = styled.View``;

const EmptyChallengeWrapper = styled.View`
  margin-top: 30px;
  align-items: center;
  background-color: ${Color.white[100]};
  padding-top: 37px;
  padding-bottom: 37px;
  border-radius: 13px;
`;

const styles = StyleSheet.create({
  blueBox: {
    borderRadius: 10,
    marginTop: 20,
    paddingBottom: 40,
    paddingTop: 27,
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  avgText: {
    color: "#ffffff",
    fontSize: 13,
  },
  text: {
    color: "#ffffff",
    fontSize: 24,
  },
  number: {
    fontSize: 48,
    fontWeight: "bold",
  },
  expTitle: {
    marginTop: 50,
    fontSize: 20,
    fontWeight: "400",
  },
  expNumber: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: "600",
  },
  categoryBackground: {
    backgroundColor: "#f6f5fb",
  },
  categoryText: {
    marginLeft: 15,
    fontSize: 17,
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
  CategoriesWrapper: {
    marginTop: 30,
  },
});
