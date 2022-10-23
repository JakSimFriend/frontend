import { Color } from "@src/assets/color";
import { onDevelopModalAtom, userIdxAtom } from "@src/common/atom";
import { GradientButtons } from "@src/components/atoms/GradientButtons";
import {
  CalendarIcon,
  ClockIconTwo,
  DiamondIconTwo,
  UserIconTwo,
} from "@src/components/atoms/TabIcon";
import OnDevelopModal from "@src/components/organisms/Modal/OnDevelopModal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components/native";

type RouteParams = {
  route: {
    params: {
      challengeIdx: string;
    };
  };
};

export const RecruitPageInfo = ({ route }: RouteParams) => {
  const { challengeIdx } = route.params;
  const userIdx = useRecoilValue(userIdxAtom);
  const setModalTwoVisible = useSetRecoilState(onDevelopModalAtom);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <TouchableOpacity style={{ position: "absolute", right: 20, top: 10 }}>
        <AntDesign name="deleteuser" size={24} />
      </TouchableOpacity>
      <ScrollView>
        <Wrapper>
          <StatusBar barStyle="dark-content" backgroundColor="#f6f5fb" />
          <Title>{data.title}</Title>
          <Content>{data.content}</Content>
          <Infos>
            <InfoWrapper>
              <IconWrapper>
                <CalendarIcon />
              </IconWrapper>
              <TextWrapper>
                <Text style={{ marginTop: 12 }}>{data.date}</Text>
              </TextWrapper>
            </InfoWrapper>
            <InfoWrapper>
              <IconWrapper>
                <ClockIconTwo />
              </IconWrapper>
              <TextWrapper>
                <Text style={{ marginTop: 9 }}>{data.certification}씩 인증</Text>
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
                <Text>{data.tier}</Text>
              </TextWrapper>
            </InfoWrapper>
          </Infos>
          <PointWrapper>
            <PointContent>
              <PointContentText>완주시 최대</PointContentText>
              <PointContentText>2,000C + 1,000EXP</PointContentText>
            </PointContent>
            <PointMyInfo>
              <PointMyInfoText>도전 캐시</PointMyInfoText>
              <PointMyInfoText>1,000c</PointMyInfoText>
            </PointMyInfo>
          </PointWrapper>
          <OpenChallenge>
            <GradientButtons
              onPress={() => {
                setModalTwoVisible(true);
              }}
              Title="공유할래요"
            />
          </OpenChallenge>
        </Wrapper>
      </ScrollView>
      <OnDevelopModal />
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
  flex: 1;
  padding: 50px 20px 0 20px;
  margin-top: 29px;
`;
const Title = styled.Text`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 30px;
`;
const Content = styled.Text`
  color: ${Color.blue[900]};
  margin-bottom: 20px;
  font-size: 15px;
`;
const Infos = styled.View`
  flex-direction: column;
  margin-top: 30px;
`;
const InfoWrapper = styled.View`
  margin-bottom: 16px;
  flex-direction: row;
`;
const IconWrapper = styled.View`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${Color.white[100]};
  border-radius: 13px;
`;
const TextWrapper = styled.View`
  margin-left: 20px;
`;
const TopText = styled.Text`
  font-size: 12px;
  color: #6f81a9;
  margin-bottom: 3px;
`;
const PointWrapper = styled.View`
  margin-top: 50px;
`;
const PointContent = styled.View`
  background-color: ${Color.blue[1100]};
  flex-direction: row;
  padding: 19px 20px;
  border-radius: 13px;
  justify-content: space-between;
`;
const PointContentText = styled.Text`
  font-size: 20px;
  color: ${Color.white[100]};
  font-weight: 600;
`;

const PointMyInfo = styled.View`
  background-color: ${Color.white[100]};
  flex-direction: row;
  padding: 19px 20px;
  border-radius: 13px;
  justify-content: space-between;
`;
const PointMyInfoText = styled.Text`
  font-size: 16px;
  color: ${Color.blue[1100]};
`;

const OpenChallenge = styled.View`
  align-self: center;
  width: 90%;
  margin-top: 40px;
  margin-bottom: 30px;
`;
