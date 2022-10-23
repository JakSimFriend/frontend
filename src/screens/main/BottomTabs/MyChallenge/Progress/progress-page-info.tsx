import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import styled from "styled-components/native";
import {
  CalendarIcon,
  ClockIconTwo,
  DiamondIconTwo,
  FlagIcon,
  UserIconTwo,
} from "../../../../../components/atoms/TabIcon";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { userIdxAtom } from "../../../../../common/atom";

type RouteParams = {
  route: {
    params: {
      challengeIdx: number;
    };
  };
};

export const ProgressPageInfo = ({ route }: RouteParams) => {
  const { challengeIdx } = route.params;
  const userIdx = useRecoilValue(userIdxAtom);

  const [data, setData]: any = useState([]);
  useEffect(() => {
    axios
      .get(`https://jaksimfriend.site/my-challenges/${challengeIdx}/${userIdx}/detail`)
      .then(function (response) {
        setData(response.data.result);
      })
      .catch((error) => console.log(error.message));
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f5fb" }}>
      <Wrapper>
        <StatusBar barStyle="dark-content" backgroundColor="#f6f5fb" />
        <Title>{data.title}</Title>
        <Content>{data.content}</Content>
        <Infos>
          <InfoWrapper>
            <IconWrapper>
              <FlagIcon />
            </IconWrapper>
            <TextWrapper>
              <TopText>완주시 최대</TopText>
              <Text>2,000 캐시와 1,000 경험치</Text>
            </TextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <IconWrapper>
              <CalendarIcon />
            </IconWrapper>
            <TextWrapper>
              <Text style={{ marginTop: 9 }}>{data.date}</Text>
            </TextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <IconWrapper>
              <ClockIconTwo />
            </IconWrapper>
            <TextWrapper>
              <Text style={{ marginTop: 12 }}>{data.certification}씩 인증</Text>
            </TextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <IconWrapper>
              <UserIconTwo />
            </IconWrapper>
            <TextWrapper>
              <Text style={{ marginTop: 9 }}>
                신청 인원 {data.accept}명, 대기자 수 {data.waiting}명
              </Text>
            </TextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <IconWrapper>
              <DiamondIconTwo />
            </IconWrapper>
            <TextWrapper>
              <TopText>팀원 평균</TopText>
              <Text>상위 50%</Text>
            </TextWrapper>
          </InfoWrapper>
        </Infos>
      </Wrapper>
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #f6f5fb;
  padding: 50px 20px 0 20px;
`;
const Title = styled.Text`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 30px;
`;
const Content = styled.Text`
  color: #6f81a9;
  margin-bottom: 30px;
`;
const Infos = styled.View`
  flex-direction: column;
`;
const InfoWrapper = styled.View`
  margin-bottom: 15px;
  flex-direction: row;
`;
const IconWrapper = styled.View`
  padding: 8px;
  background-color: #ffffff;
  border-radius: 10px;
`;
const TextWrapper = styled.View`
  margin-left: 20px;
`;
const TopText = styled.Text`
  font-size: 12px;
  color: #6f81a9;
  margin-bottom: 3px;
`;
