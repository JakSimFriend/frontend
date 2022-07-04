import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { HomeCalendar, HomeClock, HomeUser } from "../../../../components/TabIcon";

export const RecruitData = [
  {
    title: "제목1",
    day: 6,
    people: 6,
    newRequest: 6,
  },
  {
    title: "제목2",
    day: 5,
    people: 5,
    newRequest: 5,
  },
  {
    title: "제목3",
    day: 4,
    people: 4,
    newRequest: 4,
  },
  {
    title: "제목4",
    day: 3,
    people: 3,
    newRequest: 3,
  },
];
export const RequestData = [
  {
    title: "제목1",
    content: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    approve: false,
    tags: ["#최대4글", "자넘어가", "면잘리게"],
    startDate: "2022-08-01",
    schedule: "1주일에 2회",
    members: 4,
  },
  {
    title: "제목2",
    content: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    approve: true,
    tags: ["#최대4글", "자넘어가", "면잘리게"],
    startDate: "2022-08-04",
    schedule: "1주일에 2회",
    members: 2,
  },
  {
    title: "제목3",
    content: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    approve: false,
    tags: ["#최대4글", "자넘어가", "면잘리게"],
    startDate: "2022-08-07",
    schedule: "1주일에 2회",
    members: 3,
  },
  {
    title: "제목4",
    content: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    approve: true,
    tags: ["#최대4글", "자넘어가", "면잘리게"],
    startDate: "2022-09-01",
    schedule: "1주일에 2회",
    members: 5,
  },
  {
    title: "제목5",
    content: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    approve: false,
    tags: ["#최대4글", "자넘어가", "면잘리게"],
    startDate: "2022-10-23",
    schedule: "1주일에 2회",
    members: 1,
  },
];

export const Request = () => {
  const navigation: any = useNavigation();
  return (
    <RequestWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>모집 중</Text>
          <Text style={styles.number}>{RecruitData.length}</Text>
        </View>
        {RecruitData.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>모집하고 있는 도전작심이 없어요</Text>
          </View>
        ) : (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {RecruitData.map((item, index) => {
              return (
                <TouchableOpacity style={styles.recruitBox} key={index}>
                  <RecruitWrapper>
                    <Text style={styles.recruitTitle}>{item.title}</Text>
                    <View style={styles.recruitInfo}>
                      <HomeCalendar />
                      <RecruitText>D-{item.day}</RecruitText>
                      <HomeUser />
                      <RecruitText>{item.people}명</RecruitText>
                    </View>
                    <View style={styles.newInfo}>
                      <Text style={styles.newInfoText}>
                        신규 신청이 {item.newRequest}건 있어요!
                      </Text>
                    </View>
                  </RecruitWrapper>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>신청 중</Text>
          <Text style={styles.number}>{RequestData.length}</Text>
        </View>
        {RequestData.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>신청한 도전작심이 없어요</Text>
          </View>
        ) : (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {RequestData.map((item, index) => {
              return (
                <ChallengeBox key={index}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("BeforeStart", {
                        title: item.title,
                        content: item.content,
                        startDate: item.startDate,
                        schedule: item.schedule,
                        members: item.members,
                      });
                    }}
                  >
                    {item.approve ? (
                      <ChallengeCategory>
                        <ChallengeCategoryText>승인</ChallengeCategoryText>
                      </ChallengeCategory>
                    ) : (
                      <ChallengeCategoryTwo>
                        <ChallengeCategoryTextTwo>승인 대기</ChallengeCategoryTextTwo>
                      </ChallengeCategoryTwo>
                    )}
                    <ChallengeTitle>{item.title}</ChallengeTitle>
                    <ChallengeTags>{item.tags}</ChallengeTags>
                    <DateWrapper>
                      <HomeCalendar />
                      {/* startDate빼기 지금 날짜 해서 d-day구해야함(모멘트사용) */}
                      <InfoText>D-{item.startDate}</InfoText>
                    </DateWrapper>
                    <ScheduleWrapper>
                      <HomeClock />
                      <InfoText>{item.schedule}</InfoText>
                    </ScheduleWrapper>
                    <MembersWrapper>
                      <HomeUser />
                      <InfoText>{item.members}명</InfoText>
                    </MembersWrapper>
                    {item.members < 4 ? (
                      <View style={styles.moreMembersButton}>
                        <Text>{4 - item.members}명 더 필요해요</Text>
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
  );
};

const RequestWrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
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
  padding: 20px 10px;
  background-color: #f6f5fb;
  border-radius: 12px;
  margin: 15px 10px 100px 5px;
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
    marginTop: 40,
    flexDirection: "row",
    paddingLeft: 10,
  },
  title: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "600",
  },
  recruitBox: {
    flexDirection: "row",
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
    marginTop: 20,
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
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginTop: 10,
  },
});
