import React from "react";
import { Text } from "react-native";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";
import { tierAtom } from "../../../../../atom";
import { TabBox, Wrapper } from "../../../../styles/styles";

const DATA = [
  {
    rank: "1",
    name: "First Item",
    exp: "10,000",
  },
  {
    rank: "2",
    name: "Second Item",
    exp: "10,000",
  },
  {
    rank: "3",
    name: "Third Item",
    exp: "10,000",
  },
  {
    rank: "4",
    name: "Forth Item",
    exp: "10,000",
  },
  {
    rank: "5",
    name: "Fifth Item",
    exp: "10,000",
  },
  {
    rank: "6",
    name: "Sixth Item",
    exp: "10,000",
  },
  {
    rank: "7",
    name: "Seventh Item",
    exp: "10,000",
  },
  {
    rank: "8",
    name: "Eighth Item",
    exp: "10,000",
  },
  {
    rank: "9",
    name: "Ninth Item",
    exp: "10,000",
  },
  {
    rank: "10",
    name: "Tenth Item",
    exp: "10,000",
  },
];
export const Tier = () => {
  const tier = useRecoilValue(tierAtom);
  return (
    <Wrapper>
      <Date>2022/05/01 ~ 2022/05/05</Date>
      <TabBox TierBox>
        <Text>이모티콘</Text>
        <TierTitle>{tier} 티어</TierTitle>
      </TabBox>
      <TierList>
        {DATA.map((item, index) => {
          return(<Text key={index}>{item.exp}</Text>)
        })}
      </TierList>
    </Wrapper>
  );
};

const Date = styled.Text`
  color: #b2b1b0;
  font-size: 12px;
`;
const TierTitle = styled.Text`
  margin-top: 5px;
  font-size: 15px;
  font-weight: 600;
`;
const TierList = styled.View`
  border-radius: 15px;
`;
