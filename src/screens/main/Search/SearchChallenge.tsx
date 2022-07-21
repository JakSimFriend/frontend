import React, { useEffect, useState } from "react";
import {
  Animated,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styled from "styled-components/native";
import {
  CalendarIcon,
  ClockIconTwo,
  DiamondIconTwo,
  FlagIcon,
  UserIconTwo,
} from "../../../components/TabIcon";
import moment from "moment";
import { GradientButtons } from "../../../components/GradientButtons";
import ChallengeApplyModal from "../../../components/organisms/ChallengeApplyModal";
import { useSetRecoilState } from "recoil";
import { applyModalAtom } from "../../../../atom";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

type RouteParams = {
  route: {
    params: {
      title: string;
      schedule: string;
      members: number;
      challengeIdx: number;
    };
  };
};

export const SearchChallenge = ({ route }: RouteParams) => {
  const { title, schedule, members, challengeIdx } = route.params;
  const setModalVisible = useSetRecoilState(applyModalAtom);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const upValue = useState(new Animated.Value(0))[0];
  const sheetUp = () => {
    Animated.timing(upValue, {
      toValue: 280,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const sheetDown = () => {
    Animated.timing(upValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const ShowBottomSheet = () => {
    sheetUp();
    setBottomSheetVisible(true);
  };
  const HideBottomSheet = () => {
    sheetDown();
    setTimeout(() => {
      setBottomSheetVisible(() => false);
    }, 300);
  };
  const ModalVisible = () => {
    sheetDown();
    setBottomSheetVisible(() => false);
    setModalVisible(true);
  };

  const [searchData, setSearchData]: any = useState("");
  useEffect(() => {
    AsyncStorage.getItem("userIdx").then((value) => {
      const userIdx = value;
      axios
        .get(`https://jaksimfriend.site/challenges/${challengeIdx}/${userIdx}`)
        .then(function (response) {
          setSearchData(response.data.result);
        })
        .catch(function (error) {
          console.warn(error);
        });
    });
  }, []);
  const joinChallenge = () => {
    AsyncStorage.getItem("userIdx").then((value) => {
      const userIdx = value;
      axios
        .post(`https://jaksimfriend.site/challenges/join`, {
          userIdx: userIdx,
          challengeIdx: challengeIdx,
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };
  return (
    <Wrapper>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f5fb" />
      <Title>{title}</Title>
      <Content>{searchData.content}</Content>
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
            <Text style={{ marginTop: 9 }}>{searchData.date}</Text>
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
            <Text style={{ marginTop: 9 }}>
              신청 인원 {members}명, 대기자 수 {searchData.waiting}명
            </Text>
          </TextWrapper>
        </InfoWrapper>
        <InfoWrapper>
          <IconWrapper>
            <DiamondIconTwo />
          </IconWrapper>
          <TextWrapper>
            <TopText>팀원 평균</TopText>
            <Text>{searchData.tier}</Text>
          </TextWrapper>
        </InfoWrapper>
      </Infos>
      <ChallengeCash>
        <ChallengeCashText>도전 캐시</ChallengeCashText>
        <ChallengeCashText>{searchData.pee}C</ChallengeCashText>
      </ChallengeCash>
      <MyCash>
        <Text>내 캐시</Text>
        <Text>{searchData.myPoint}C</Text>
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
        {searchData.existStatus === 1 ? (
          <TouchableOpacity style={styles.CompletedButton} disabled>
            <Text style={{ color: "#ffffff" }}>이미 신청했어요</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.applyButton} onPress={ShowBottomSheet}>
            <Text style={{ color: "#ffffff" }}>신청할게요</Text>
          </TouchableOpacity>
        )}
      </Buttons>

      {/* 바텀 시트(신청할게요) */}
      <Modal visible={bottomSheetVisible} transparent={true}>
        <TouchableWithoutFeedback onPress={HideBottomSheet}>
          <View style={styles.background}>
            <Animated.View
              style={{
                marginBottom: upValue,
              }}
            >
              <View style={styles.container}>
                <Text style={styles.infoOne}>제목 도전캐시{"\n"}1,000C를 사용하시겠어요?</Text>
                <Text style={styles.infoTwo}>
                  캐시는 개설자가 가입 승인할 때 빠져 나가요!{"\n"}한번 신청하면 취소할 수 없어요!
                </Text>
                <GradientButtons
                  onPress={() => {
                    joinChallenge();
                    ModalVisible();
                  }}
                  Title="결제할래요"
                />
                <TouchableOpacity style={styles.nextButton} onPress={HideBottomSheet}>
                  <Text style={styles.nextButtonText}>다음에 할게요</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* 모달 */}
      <ChallengeApplyModal />
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  shareButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  CompletedButton: {
    backgroundColor: "#bfc7d7",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
  },
  applyButton: {
    backgroundColor: "#5A69E8",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 15,
  },
  background: {
    flex: 1,
    backgroundColor: "#1016474D",
    justifyContent: "flex-end",
    marginBottom: -280,
  },
  container: {
    backgroundColor: "#fff",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  infoOne: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 30,
  },
  infoTwo: {
    textAlign: "center",
    marginBottom: 30,
    color: "#6F81A9",
  },
  nextButton: {
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#f6f5fb",
  },
  nextButtonText: {
    fontSize: 18,
    color: "#6F81A9",
  },
});
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
