import React, { useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { GradientButtons } from "../../../../components/GradientButtons";

const data = [
  {
    title: "제목1",
    category: "시사1",
    date: "2022년 6월 15일",
    percentage: "60%",
  },
  {
    title: "제목2",
    category: "예술",
    date: "2022년 6월 10일",
    percentage: "100%",
  },
];

export const Record = () => {
  const [recordNumber, setRecordNumber] = useState(0);
  return (
    <Wrapper>
      <ScrollView>
        <InfoWrapper>
          <Date>2022년</Date>
          <Number>{recordNumber}</Number>
        </InfoWrapper>
        {data.map((item, index) => {
          return (
            <Box key={index}>
              <Header>
                <Title>{item.title}</Title>
                <CategoryButton>
                  <Category>{item.category}</Category>
                </CategoryButton>
              </Header>
              <Body>
                <Left>
                  <DateTwo>{item.date}</DateTwo>에{"\n"}
                  <Percentage>{item.percentage}</Percentage>로 종료되었습니다
                </Left>
                <GradientButtons
                  onPress={() => {
                    console.warn("보상받기");
                  }}
                  Title="보상 받기"
                />
              </Body>
            </Box>
          );
        })}
      </ScrollView>
    </Wrapper>
  );
};
const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 30px 15px 0 15px;
`;
const InfoWrapper = styled.View`
  flex-direction: row;
`;
const Date = styled.Text`
  font-size: 18px;
  font-weight: 400;
`;
const Number = styled.Text`
  color: #054de4;
  font-size: 18px;
  font-weight: 400;
  margin-left: 5px;
`;
const Box = styled.View`
  background-color: #f6f5fb;
  margin-top: 20px;
  padding: 25px 25px 0 25px;
  border-radius: 15px;
`;
const Header = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
`;
const Title = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;
const CategoryButton = styled.View`
  padding: 5px 14px;
  background-color: #ffffff;
  border-radius: 15px;
  margin: -3px 0 0 20px;
`;
const Category = styled.Text`
  color: #6f81a9;
`;
const Body = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const Left = styled.Text`
  color: #6f81a9;
  font-size: 15px;
`;
const DateTwo = styled.Text`
  color: #000000;
  font-weight: 500;
`;
const Percentage = styled.Text`
  color: #054de4;
  font-weight: 600;
`;
