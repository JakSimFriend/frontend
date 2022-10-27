import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { myIndicatorAtom, userIdxAtom } from "@src/common/atom";
import { HomeCalendar, HomeClock, HomeUser } from "@src/components/atoms/TabIcon";
import { ChallengeCard } from "@src/components/challenge/challenge-card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";

type StackParamList = {
  RecruitPage: {
    title: string;
    members: number;
    waiting: number;
    challengeIdx: number;
  };
  RequestPage: {
    challengeIdx: number;
    waitingIdx: number;
  };
};
type NavigationProps = StackNavigationProp<StackParamList>;

export const Request = () => {
  const navigation = useNavigation<NavigationProps>();
  const myIndicator = useRecoilValue(myIndicatorAtom);
  const userIdx = useRecoilValue(userIdxAtom);

  const [listEmpty, setListEmpty] = useState(false);
  const [recruitData, setRecruitData]: any = useState([]);
  const GetData = () => {
    axios
      .get(`https://jaksimfriend.site/my-challenges/${userIdx}/application`)
      .then((response) => {
        setListEmpty(false);
        if (response.data.result === undefined) {
          setListEmpty(true);
        } else {
          setListEmpty(false);
          setRecruitData(response.data.result[0]);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setListEmpty(true);
      });
  };
  useEffect(() => {
    GetData();
  }, [myIndicator]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f5fb" }}>
      <RequestWrapper>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* 모집 중 */}
          <View style={styles.textWrapper}>
            <Text style={styles.title}>모집 중</Text>
            <Text style={styles.number}>{recruitData.recruitmentCount}</Text>
          </View>
          {recruitData.recruitmentCount === 0 || listEmpty ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>모집하고 있는 도전작심이 없어요</Text>
            </View>
          ) : (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {recruitData.recruitments?.map((item: any, index: number) => {
                return (
                  <ChallengeCard
                    key={index}
                    title={item.title}
                    waiting={item.waiting}
                    remainingDay={item.remainingDay}
                    memberCount={item.memberCount}
                    onPressEvent={() =>
                      navigation.navigate("RecruitPage", {
                        title: item.title,
                        challengeIdx: item.challengeIdx,
                        members: item.memberCount,
                        waiting: item.waiting,
                      })
                    }
                  />
                );
              })}
            </ScrollView>
          )}

          {/* 신청 중 */}
          <View style={styles.textWrapper}>
            <Text style={styles.title}>신청 중</Text>
            <Text style={styles.number}>{recruitData.applyingCount}</Text>
          </View>
          {recruitData.applyingCount === 0 || listEmpty ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>신청한 도전작심이 없어요</Text>
            </View>
          ) : (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {recruitData.applyings?.map((item: any, index: number) => {
                return (
                  <ChallengeBox key={index}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("RequestPage", {
                          challengeIdx: item.challengeIdx,
                          waitingIdx: item.waitingIdx,
                        });
                      }}
                      style={{ padding: 20 }}
                    >
                      {item.acceptStatus === 1 ? (
                        <ChallengeCategory>
                          <ChallengeCategoryText>승인</ChallengeCategoryText>
                        </ChallengeCategory>
                      ) : (
                        <ChallengeCategoryTwo>
                          <ChallengeCategoryTextTwo>승인 대기</ChallengeCategoryTextTwo>
                        </ChallengeCategoryTwo>
                      )}
                      <ChallengeTitle>{item.title}</ChallengeTitle>
                      <ChallengeTags>
                        {item.tags[2] ? `#${item.tags[2]}` : ""}{" "}
                        {item.tags[1] ? `#${item.tags[1]}` : ""}{" "}
                        {item.tags[0] ? `#${item.tags[0]}` : ""}
                      </ChallengeTags>
                      <DateWrapper>
                        <HomeCalendar />
                        <InfoText>{item.remainingDay}</InfoText>
                      </DateWrapper>
                      <ScheduleWrapper>
                        <HomeClock />
                        <InfoText>{item.certification}</InfoText>
                      </ScheduleWrapper>
                      <MembersWrapper>
                        <HomeUser />
                        <InfoText>{item.memberCount}명</InfoText>
                      </MembersWrapper>
                      {item.memberCount < 4 ? (
                        <View style={styles.moreMembersButton}>
                          <Text>{item.needCount}명 더 필요해요</Text>
                        </View>
                      ) : (
                        <></>
                      )}
                    </TouchableOpacity>
                  </ChallengeBox>
                );
              })}
            </ScrollView>
          )}
        </ScrollView>
      </RequestWrapper>
    </SafeAreaView>
  );
};

const RequestWrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-left: 20px;
  padding-right: 20px;
`;
const RecruitWrapper = styled.View`
  background-color: #f6f5fb;
  padding: 15px;
  border-radius: 15px;
  margin: 15px 15px 0 0;
`;
const RecruitText = styled.Text`
  margin: 0 10px 10px 5px;
`;
const ChallengeBox = styled.View`
  background-color: #f6f5fb;
  border-radius: 12px;
  margin: 15px 10px 30px 5px;
`;
const ChallengeTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  margin: 10px 0 15px 0;
`;
const ChallengeCategory = styled.View`
  background-color: #ffffff;
  border-radius: 15px;
  padding: 8px 0;
  margin: 6px 0;
  width: 50%;
`;
const ChallengeCategoryTwo = styled.View`
  background-color: #4f65e7;
  border-radius: 15px;
  padding: 8px 0;
  margin: 6px 0;
  width: 50%;
`;
const ChallengeCategoryText = styled.Text`
  text-align: center;
`;
const ChallengeCategoryTextTwo = styled.Text`
  text-align: center;
  color: #ffffff;
`;
const ChallengeTags = styled.Text`
  margin: 0 0 20px 0;
  color: #6f81a9;
`;
const DateWrapper = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;
const ScheduleWrapper = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;
const MembersWrapper = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;
const InfoText = styled.Text`
  padding: 0 5px;
`;

const styles = StyleSheet.create({
  textWrapper: {
    marginTop: 30,
    flexDirection: "row",
    paddingLeft: 3,
  },
  title: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "600",
  },
  recruitBox: {
    width: 250,
  },
  number: {
    fontSize: 20,
    color: "blue",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 3,
  },
  emptyBox: {
    backgroundColor: "#F6F5FB",
    padding: 45,
    borderRadius: 15,
    marginTop: 10,
    alignItems: "center",
  },
  emptyText: {
    color: "#6F81A9",
  },
  recruitTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recruitInfo: {
    flexDirection: "row",
  },
  newInfo: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginVertical: 5,
  },
  newInfoText: {
    color: "#054DE4",
    alignSelf: "center",
  },
  moreMembersButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginTop: 10,
  },
});
