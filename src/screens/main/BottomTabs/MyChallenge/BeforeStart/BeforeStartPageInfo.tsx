import React from "react";
import { StatusBar, Text } from "react-native";
import styled from "styled-components/native";
import moment from "moment";
import { GradientButtons } from "../../../../../components/GradientButtons";
import {
  CalendarIcon,
  ClockIconTwo,
  DiamondIconTwo,
  FlagIcon,
  UserIconTwo,
} from "../../../../../components/TabIcon";
import { useRecoilValue } from "recoil";
import {
  BeforeStartContentInfoAtom,
  BeforeStartMembersInfoAtom,
  BeforeStartScheduleInfoAtom,
  BeforeStartStartDateInfoAtom,
  BeforeStartTitleInfoAtom,
  BeforeStartWaitingInfoAtom,
} from "../../../../../../atom";

export const BeforeStartPageInfo = () => {
  const BeforeStartTitleInfo = useRecoilValue(BeforeStartTitleInfoAtom);
  const BeforeStartContentInfo = useRecoilValue(BeforeStartContentInfoAtom);
  const BeforeStartStartDateInfo = useRecoilValue(BeforeStartStartDateInfoAtom);
  const BeforeStartScheduleInfo = useRecoilValue(BeforeStartScheduleInfoAtom);
  const BeforeStartMembersInfo = useRecoilValue(BeforeStartMembersInfoAtom);
  const BeforeStartWaitingInfo = useRecoilValue(BeforeStartWaitingInfoAtom);
  return (
    <Wrapper>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f5fb" />
      <Title>{BeforeStartTitleInfo}</Title>
      <Content>{BeforeStartContentInfo}</Content>
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
            <Text style={{ marginTop: 9 }}>
              {moment(BeforeStartStartDateInfo).format(`M월 D일`)}~
              {moment(BeforeStartStartDateInfo).add(14, "days").format(`M월 D일`)}
            </Text>
          </TextWrapper>
        </InfoWrapper>
        <InfoWrapper>
          <IconWrapper>
            <ClockIconTwo />
          </IconWrapper>
          <TextWrapper>
            <Text style={{ marginTop: 9 }}>{BeforeStartScheduleInfo}씩 인증</Text>
          </TextWrapper>
        </InfoWrapper>
        <InfoWrapper>
          <IconWrapper>
            <UserIconTwo />
          </IconWrapper>
          <TextWrapper>
            <Text style={{ marginTop: 9 }}>
              신청 인원 {BeforeStartMembersInfo}명, 대기자 수 {BeforeStartWaitingInfo}명
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
      <OpenChallenge>
        <GradientButtons
          onPress={() => {
            console.warn("공유할래용");
          }}
          Title="공유할래요"
        />
      </OpenChallenge>
    </Wrapper>
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
const OpenChallenge = styled.View`
  align-self: center;
  width: 90%;
  position: absolute;
  bottom: 0;
  margin-bottom: 30px;
`;
