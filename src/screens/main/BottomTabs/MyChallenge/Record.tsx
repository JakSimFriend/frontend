import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useSetRecoilState } from "recoil";
import styled from "styled-components/native";
import { recieveModalAtom } from "../../../../../atom";
import { GradientButtons } from "../../../../components/GradientButtons";
import RecieveModal from "../../../../components/organisms/RecieveModal";

const data = [
  {
    title: "제목1",
    category: "전공 기초",
    date: "2022년 6월 15일",
    percentage: "60%",
  },
  {
    title: "제목2",
    category: "예술",
    date: "2022년 6월 10일",
    percentage: "100%",
  },
  {
    title: "제목3",
    category: "운동",
    date: "2022년 6월 25일",
    percentage: "80%",
  },
];

export const Record = () => {
  const setModalVisible = useSetRecoilState(recieveModalAtom);
  const navigation = useNavigation();
  const goToProgressInfo = () => navigation.navigate("ProgressDetailTopTab");
  return (
    <Wrapper>
      <ScrollView>
        <InfoWrapper>
          <Date>2022년</Date>
          <Number>{data.length}</Number>
        </InfoWrapper>
        {data.map((item, index) => {
          const [received, setReceived] = useState(false); //data
          const 보상받기 = () => {
            setModalVisible(true);
            setReceived(true);
          };
          return (
            <Box key={index} onPress={goToProgressInfo}>
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
                {received ? (
                  <RecieveButton disabled>
                    <Text style={{ color: "#ffffff" }}>보상 받음</Text>
                  </RecieveButton>
                ) : (
                  <View style={{ marginLeft: 20 }}>
                    <GradientButtons onPress={보상받기} Title="보상 받기" />
                  </View>
                )}
              </Body>
            </Box>
          );
        })}
      </ScrollView>
      <RecieveModal />
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
const Box = styled.TouchableOpacity`
  background-color: #f6f5fb;
  margin-top: 20px;
  padding: 25px 25px 15px 25px;
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
  padding: 6px 0;
  background-color: #ffffff;
  border-radius: 15px;
  margin-left: 20px;
  width: 30%;
  align-items: center;
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
const RecieveButton = styled.TouchableOpacity`
  padding: 15px 20px;
  background-color: #bfc7d7;
  border-radius: 15px;
`;
