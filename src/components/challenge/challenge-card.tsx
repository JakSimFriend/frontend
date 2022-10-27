import { Color } from "@src/assets/color";
import React from "react";
import styled from "styled-components/native";

import { HomeCalendar, HomeUser } from "../atoms/TabIcon";

export interface ChallengeCardProps {
  title: string;
  waiting: number;
  remainingDay: string;
  memberCount: number;
  onPressEvent: () => void;
}

export const ChallengeCard = ({
  title,
  waiting,
  remainingDay,
  memberCount,
  onPressEvent,
}: ChallengeCardProps) => {
  return (
    <RecruitContainer onPress={() => onPressEvent()}>
      <RecruitWrapper>
        <RecruitTitle>{title}</RecruitTitle>
        <RecruitInfo>
          <HomeCalendar />
          <RecruitText>{remainingDay}</RecruitText>
          <HomeUser />
          <RecruitText>{memberCount}명</RecruitText>
        </RecruitInfo>
        <NewInfo>
          <NewInfoText>신규 신청이 {waiting}건 있어요!</NewInfoText>
        </NewInfo>
      </RecruitWrapper>
    </RecruitContainer>
  );
};

const RecruitWrapper = styled.View`
  background-color: #f6f5fb;
  padding: 15px;
  border-radius: 15px;
  margin: 15px 15px 0 0;
`;

const RecruitText = styled.Text`
  margin: 0 10px 10px 5px;
`;

const RecruitContainer = styled.TouchableOpacity`
  width: 250px;
`;

const RecruitTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10;
`;

const RecruitInfo = styled.View`
  flex-direction: row;
`;

const NewInfo = styled.View`
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const NewInfoText = styled.Text`
  color: ${Color.blue[200]};
  align-self: center;
`;
