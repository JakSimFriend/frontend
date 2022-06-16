import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { tierAtom } from "../../../../../atom";
import { Wrapper } from "../../../../styles/styles";

type Props = {
  Tier?: boolean;
  Exp?: boolean;
  Percentage?: boolean;
};

export const MyState = () => {
  const tier = useRecoilValue(tierAtom);
  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Date>2022/05/01 ~ 2022/05/05</Date>
        <TabBox Tier>
          <Text>2주 연속</Text>
          <TierTitle>{tier} 티어</TierTitle>
        </TabBox>
        <InfoWrapper>
          <TabBox Exp>
            <Text>누적 경험치</Text>
            <Text>40,000 EXP</Text>
          </TabBox>
          <TabBox Percentage>
            <Text>평균 실천율</Text>
            <Text>50%</Text>
          </TabBox>
        </InfoWrapper>
        <StatTitle>챌린지 통계</StatTitle>
        <GraphBox>
          <Text>그래프?</Text>
        </GraphBox>
        <BottomTitle>가장 많이 하신 챌린지</BottomTitle>
        <BottomBox>
          <BottomText>예술</BottomText>
        </BottomBox>
        <BottomTitle>달성률이 가장 높은 챌린지</BottomTitle>
        <BottomBox>
          <BottomText>시사</BottomText>
        </BottomBox>
      </ScrollView>
    </Wrapper>
  );
};

const Date = styled.Text`
  color: #b2b1b0;
  font-size: 12px;
`;
const TierTitle = styled.Text`
  margin-top: 5px;
  font-size: 20px;
  font-weight: 600;
`;
const InfoWrapper = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-top: 10px;
`;
const TabBox = styled.View<Props>`
  background-color: #f6f5fb;
  padding: 15px 10px 15px 10px;
  border-radius: 15px;
  margin-right: 10px;
  margin-top: ${(props) => (props.Tier ? "15px" : "0")};
  width: ${(props) => (props.Exp || props.Percentage ? "49%" : "100%")};
`;
const StatTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin: 30px 0 10px 0;
`;
const GraphBox = styled.View`
  align-items: center;
  background-color: #f6f5fb;
  padding: 120px;
  border-radius: 15px;
`;
const BottomTitle = styled.Text`
  margin-top: 30px;
`;
const BottomBox = styled.View`
  background-color: #f6f5fb;
  align-items: center;
  padding: 15px 0;
  margin: 5px 0 20px 0;
  border-radius: 15px;
`;
const BottomText = styled.Text`
  font-size: 18px;
`;
