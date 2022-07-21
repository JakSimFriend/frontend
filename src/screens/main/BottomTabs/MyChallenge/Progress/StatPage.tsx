import moment from "moment";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GradientButtons } from "../../../../../components/GradientButtons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { progressIndexAtom, recieveModalAtom } from "../../../../../../atom";
import RecieveModal from "../../../../../components/organisms/RecieveModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const StatPage = () => {
  const progressIndex = useRecoilValue(progressIndexAtom);
  const todayDate = moment(new Date()).format("YYYY/MM/DD일 hh:mm 기준");
  const [received, setReceived] = useState(false); //data
  const [graphColor, setGraphColor] = useState("#947BEA");
  const [graphColorTwo, setGraphColorTwo] = useState("#1151E5");
  const setModalVisible = useSetRecoilState(recieveModalAtom);
  const 보상받기 = () => {
    // 여기에 보상받기 post38번 추가
    setModalVisible(true);
    setReceived(true);
    setGraphColor("#BFC7D7");
    setGraphColorTwo("#BFC7D7");
  };

  const [data, setData]: any = useState([]);
  const [fill, setFill] = useState(0);
  useEffect(() => {
    AsyncStorage.getItem("userIdx").then((value) => {
      const userIdx = value;
      axios
        .get(
          `https://jaksimfriend.site/my-challenges/${progressIndex}/${userIdx}/progress-calculation`,
        )
        .then(function (response) {
          setData(response.data.result);
          setFill(response.data.result.achievement);
        })
        .catch(function (error) {
          console.warn(error);
        });
    });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Wrapper>
        <TodayText>{todayDate}</TodayText>
        <GraphWrapper>
          <AnimatedCircularProgress
            size={250}
            width={25}
            fill={fill}
            tintColor={graphColor}
            tintColorSecondary={graphColorTwo}
            backgroundColor="#F6F5FB"
            rotation={270}
            arcSweepAngle={180}
            style={{ height: 125 }}
          >
            {() => (
              <View style={styles.GraphInnerWrapper}>
                <Text style={[styles.GraphInnerText, { color: graphColorTwo }]}>달성률</Text>
                <Text style={[styles.GraphInnerPercentage, { color: graphColorTwo }]}>
                  {data.achievement}%
                </Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </GraphWrapper>
        <View style={styles.InfoWrapper}>
          <View>
            <Text style={styles.InfoTitle}>환급 캐시</Text>
            <Text style={styles.InfoValue}>
              <Text style={styles.InfoNumber}>{data.refundCash}</Text>C
            </Text>
            <View>
              <Text style={styles.BoxTitle}>총 도전 캐시</Text>
              <View style={styles.InfoBox}>
                <Text style={styles.BoxText}>{data.totalCash}C</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.InfoTitle}>경험치</Text>
            <Text style={styles.InfoValue}>
              <Text style={styles.InfoNumber}>{data.experience}</Text>EXP
            </Text>
            <View>
              <Text style={styles.BoxTitle}>개인 달성률</Text>
              <View style={styles.InfoBox}>
                <Text style={styles.BoxText}>{data.individual}EXP</Text>
              </View>
            </View>
            <View>
              <Text style={styles.BoxTitle}>작심친구 달성률</Text>
              <View style={styles.InfoBox}>
                <Text style={styles.BoxText}>{data.friend}EXP</Text>
              </View>
            </View>
            <View>
              <Text style={styles.BoxTitle}>작심친구 구성 보너스</Text>
              <View style={styles.InfoBox}>
                <Text style={styles.BoxText}>{data.bonus}EXP</Text>
              </View>
            </View>
          </View>
        </View>
        {data.exitStatus === 1 ? (
          received ? (
            <RecievedButtonWrapper>
              <RecievedButtonText>보상을 이미 받으셨어요</RecievedButtonText>
            </RecievedButtonWrapper>
          ) : (
            <RecievedButton>
              <GradientButtons Title="보상 받기" onPress={보상받기} />
            </RecievedButton>
          )
        ) : (
          <ButtonWrapper>
            <ButtonText>끝나고 보상 받기</ButtonText>
          </ButtonWrapper>
        )}
        <RecieveModal />
      </Wrapper>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  GraphInnerWrapper: {
    alignItems: "center",
    bottom: 40,
  },
  GraphInnerText: {
    fontWeight: "600",
  },
  GraphInnerPercentage: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "600",
  },
  InfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  InfoTitle: {
    color: "#1151e5",
  },
  InfoValue: {
    marginTop: 10,
    fontSize: 20,
  },
  InfoNumber: {
    fontSize: 30,
    fontWeight: "600",
  },
  BoxTitle: {
    marginTop: 15,
  },
  InfoBox: {
    paddingVertical: 12,
    paddingRight: "30%",
    paddingLeft: 10,
    backgroundColor: "#f6f5fb",
    borderRadius: 15,
  },
  BoxText: {
    color: "#6F81A9",
  },
});
const GraphWrapper = styled.View`
  align-items: center;
  margin-top: 40px;
  border-bottom-width: 1px;
  border-bottom-color: #1151e5;
`;
const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 10px 25px 0 25px;
`;
const TodayText = styled.Text`
  color: #bfc7d7;
`;
const ButtonWrapper = styled.TouchableOpacity`
  align-items: center;
  padding: 15px;
  background-color: #f6f5fb;
  border-radius: 15px;
  margin-top: 60px;
`;
const RecievedButton = styled.View`
  margin-top: 60px;
`;
const ButtonText = styled.Text`
  color: #6f81a9;
  font-size: 20px;
`;
const RecievedButtonWrapper = styled.TouchableOpacity`
  align-items: center;
  padding: 15px;
  background-color: #f6f5fb;
  border-radius: 15px;
  margin-top: 60px;
  border-width: 1px;
  border-color: #054de4;
`;
const RecievedButtonText = styled.Text`
  color: #054de4;
  font-size: 20px;
`;
