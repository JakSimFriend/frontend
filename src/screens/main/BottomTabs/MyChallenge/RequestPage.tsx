import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import {
  CalendarIcon,
  ClockIconTwo,
  DiamondIconTwo,
  FlagIcon,
  UserIconTwo,
} from "../../../../components/TabIcon";
import moment from "moment";
import ChallengeCancelModal from "../../../../components/organisms/ChallengeCancelModal";

type RouteParams = {
  route: {
    params: {
      title: string;
      content: string;
      startDate: string;
      schedule: string;
      members: number;
    };
  };
};

export const RequestPage = ({ route }: RouteParams) => {
  const { title, content, startDate, schedule, members } = route.params;
  return (
    <Wrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>{title}</Title>
        <Content>{content}</Content>
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
                {moment(startDate).format(`M월 D일`)} ~{" "}
                {moment(startDate).add(14, "days").format(`M월 D일`)}
              </Text>
            </TextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <IconWrapper>
              <ClockIconTwo />
            </IconWrapper>
            <TextWrapper>
              <Text style={{ marginTop: 9 }}>{schedule}씩 인증</Text>
            </TextWrapper>
          </InfoWrapper>
          <InfoWrapper>
            <IconWrapper>
              <UserIconTwo />
            </IconWrapper>
            <TextWrapper>
              <Text style={{ marginTop: 9 }}>신청 인원 {members}명</Text>
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
        <ChallengeCash>
          <ChallengeCashText>도전 캐시</ChallengeCashText>
          <ChallengeCashText>1,000C</ChallengeCashText>
        </ChallengeCash>
        <MyCash>
          <Text>내 캐시</Text>
          <Text>10,000C</Text>
        </MyCash>
        <Buttons>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={() => {
              console.warn("공유할래용");
            }}
          >
            <Text>공유할래요</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.CompletedButton} disabled>
            <Text style={{ color: "#ffffff" }}>이미 신청했어요</Text>
          </TouchableOpacity>
        </Buttons>
      </ScrollView>
      <ChallengeCancelModal />
    </Wrapper>
  );
};

const Wrapper = styled.View`
  flex: 1;
  background-color: #f6f5fb;
  padding: 100px 20px 0 20px;
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
const ChallengeCash = styled.View`
  margin-top: 20px;
  background-color: #101647;
  padding: 22px;
  border-radius: 15px;
  flex-direction: row;
  justify-content: space-between;
`;
const ChallengeCashText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: 600;
`;
const MyCash = styled.View`
  background-color: #ffffff;
  padding: 22px;
  border-radius: 15px;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 30px;
`;
const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;
const TopText = styled.Text`
  font-size: 12px;
  color: #6f81a9;
  margin-bottom: 3px;
`;
const styles = StyleSheet.create({
  shareButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  CompletedButton: {
    backgroundColor: "#BFC7D7",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
  },
});
