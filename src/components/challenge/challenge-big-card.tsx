import { Color } from "@src/assets/color";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";

import { HomeCalendar, HomeClock, HomeUser } from "../atoms/TabIcon";

export interface ChallengeCardProps {
  index: number;
  title: string;
  category: string;
  tag: string[];
  remainingDay: string;
  memberCount: number;
  certification: string;
  memberCountType?: "number" | "box";
  isBottomShow?: boolean;
  onPressEvent: () => void;
}

export const ChallengeBigCard = ({
  index,
  title,
  category,
  tag,
  remainingDay,
  memberCount,
  certification,
  memberCountType = "number",
  onPressEvent,
  isBottomShow = false,
}: ChallengeCardProps) => {
  return (
    <CardWrapper style={{ marginRight: index != 1 ? 10 : 0 }}>
      <TouchableOpacity onPress={() => onPressEvent()}>
        <CardCategoryWrapper>
          <CardCategoryText>{category}</CardCategoryText>
        </CardCategoryWrapper>
        <CardTitleWrapper>
          <CardTitle>{title}</CardTitle>
        </CardTitleWrapper>
        <CardTagWrapper>
          {tag.map((tag: string, index: number) => (
            <CardTagItem key={index}>#{tag}</CardTagItem>
          ))}
        </CardTagWrapper>
        <CardContentWrapper>
          <CardContent>
            <CardContentText>
              <HomeCalendar />
            </CardContentText>
            <CardContentText style={{ marginLeft: 4 }}>{remainingDay}</CardContentText>
          </CardContent>
          <CardContent style={{ marginTop: 10 }}>
            <CardContentText>
              <HomeClock />
            </CardContentText>
            <CardContentText style={{ marginLeft: 4 }}>{certification}</CardContentText>
          </CardContent>
          <CardContent style={{ marginTop: 10 }}>
            <CardContentText>
              <HomeUser />
            </CardContentText>
            {memberCountType === "number" ? (
              <CardContentText style={{ marginLeft: 4 }}>{memberCount}</CardContentText>
            ) : (
              <MemberListWrapper>
                {[...Array(memberCount)].map((d, index: number) => (
                  <MemberCountBox key={index} style={{ backgroundColor: "#054de4" }} />
                ))}
                {[...Array(6 - memberCount)].map((d, index: number) => (
                  <MemberCountBox key={index} style={{ backgroundColor: "#bfc7d7" }} />
                ))}
              </MemberListWrapper>
            )}
          </CardContent>
        </CardContentWrapper>
        {isBottomShow && (
          <CardBottomWrapper>
            <CardBottomContent>12312</CardBottomContent>
          </CardBottomWrapper>
        )}
      </TouchableOpacity>
    </CardWrapper>
  );
};

const CardWrapper = styled.View`
  width: 192px;
  padding: 30px 16px 16px 20px;
  background-color: ${Color.white[100]};
  border-radius: 12px;
`;

const CardCategoryWrapper = styled.View`
  border-radius: 20px;
  background-color: #ffffff;
  position: absolute;
`;

const CardCategoryText = styled.Text`
  font-size: 12px;
  padding: 5px 15px;
  border-radius: 20px;
`;

const CardTitleWrapper = styled.View`
  margin: 36px 0 15px 0;
`;

const CardTitle = styled.Text`
  font-size: 17px;
  font-weight: 700;
`;

const CardTagWrapper = styled.View`
  height: 16px;
  margin-top: 6px;
  flex-direction: row;
`;
const CardTagItem = styled.Text`
  font-size: 12px;
  color: ${Color.blue[900]};
`;

const CardContentWrapper = styled.View`
  margin-top: 30px;
`;

const CardContent = styled.View`
  flex-direction: row;
`;
const CardContentText = styled.Text``;

const CardBottomWrapper = styled.View`
  margin-top: 20px;
`;

const CardBottomContent = styled.Text`
  color: ${Color.blue[1100]};
  font-size: 15px;
`;

const MemberListWrapper = styled.View`
  flex-direction: row;
`;

const MemberCountBox = styled.View`
  border-radius: 4px;
  margin-left: 4px;
  width: 16px;
  height: 16px;
  border-radius: 4px;
`;
