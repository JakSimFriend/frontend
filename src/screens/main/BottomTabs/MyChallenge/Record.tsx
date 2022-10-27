import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components/native";

import { progressIndexAtom, progressTitleAtom, userIdxAtom } from "../../../../common/atom";
import RecieveModal from "../../../../components/organisms/Modal/RecieveModal";

export const Record = () => {
  const setProgressIndex = useSetRecoilState(progressIndexAtom);
  const setProgressTitle = useSetRecoilState(progressTitleAtom);
  const userIdx = useRecoilValue(userIdxAtom);
  const navigation = useNavigation();

  const [recordEmpty, setRecordEmpty] = useState(false);
  const [recordData, setRecordData]: any = useState([]);
  useEffect(() => {
    axios
      .get(`https://jaksimfriend.site/my-challenges/${userIdx}/record`)
      .then(function (response) {
        if (response.data.result[0] === undefined) {
          setRecordEmpty(true);
        } else {
          setRecordEmpty(false);
          setRecordData(response.data.result[0]);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Wrapper>
        <View style={styles.topView}>
          <TouchableOpacity style={{ marginLeft: -5 }} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={25} color="#101647" />
          </TouchableOpacity>
          <Text style={styles.topText}>기록</Text>
          <Ionicons name="arrow-back" size={25} color="#0000" />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {recordEmpty ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>기록이 없어요</Text>
            </View>
          ) : (
            <>
              <InfoWrapper>
                <Date>{recordData.year}년</Date>
                <Number>{recordData.count}</Number>
              </InfoWrapper>
              {recordData.histories?.map((item: any, index: number) => {
                return (
                  <Box key={index}>
                    <Header>
                      <Title>{item.title}</Title>
                      <CategoryButton>
                        <Category>{item.categoryName}</Category>
                      </CategoryButton>
                    </Header>
                    <Body>
                      <Left>
                        <DateTwo>{item.endDate}</DateTwo>에{"\n"}
                        <Percentage>{item.percent}%</Percentage>로 종료되었습니다
                      </Left>
                      {item.rewardStatus === 1 ? (
                        <RecieveButton disabled>
                          <Text style={{ color: "#ffffff" }}>보상 받음</Text>
                        </RecieveButton>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("ProgressDetailTopTab");
                            setProgressIndex(item.challengeIdx);
                            setProgressTitle(item.title);
                          }}
                        >
                          <LinearGradient
                            style={{ borderRadius: 15, paddingVertical: 12, paddingHorizontal: 25 }}
                            colors={["#947BEA", "#1151E5"]}
                          >
                            <Text style={{ color: "#fff" }}>보상 받기</Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      )}
                    </Body>
                  </Box>
                );
              })}
            </>
          )}
        </ScrollView>
        <RecieveModal />
      </Wrapper>
    </SafeAreaView>
  );
};
const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 0 5%;
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
  padding: 12px 25px;
  background-color: #bfc7d7;
  border-radius: 15px;
`;

const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    marginBottom: "5%",
  },
  topText: {
    color: "#101647",
    fontSize: 18,
    fontWeight: "900",
    alignSelf: "center",
  },
  emptyBox: {
    backgroundColor: "#F6F5FB",
    padding: 45,
    borderRadius: 15,
    alignItems: "center",
  },
  emptyText: {
    color: "#6F81A9",
    alignSelf: "center",
    fontSize: 18,
  },
});
