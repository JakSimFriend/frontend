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
} from "../../../components/atoms/TabIcon";
import { GradientButtons } from "../../../components/atoms/GradientButtons";
import ChallengeApplyModal from "../../../components/organisms/Modal/ChallengeApplyModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { applyModalAtom, onDevelopModalAtom, userIndexAtom } from "../../../common/atom";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import OnDevelopModal from "../../../components/organisms/Modal/OnDevelopModal";

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
  const setModalTwoVisible = useSetRecoilState(onDevelopModalAtom);
  const userIdx = useRecoilValue(userIndexAtom);
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
    axios
      .get(`https://jaksimfriend.site/challenges/${challengeIdx}/${userIdx}`)
      .then(function (response) {
        setSearchData(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const joinChallenge = () => {
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
  };

  const moneyAvailable = searchData.pee < searchData.myPoint ? true : false;

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
            <Text style={{ marginTop: 12, marginLeft: -2 }}>{searchData.date}</Text>
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
      <View style={styles.cashWrapper}>
        <ChallengeCash>
          <ChallengeCashText>도전 캐시</ChallengeCashText>
          <ChallengeCashText>{searchData.pee}C</ChallengeCashText>
        </ChallengeCash>
        <MyCash>
          <Text>내 캐시</Text>
          <Text>{searchData.myPoint}C</Text>
        </MyCash>
      </View>
      <Buttons>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => {
            setModalTwoVisible(true);
          }}
        >
          <Text>공유할래요</Text>
        </TouchableOpacity>
        {searchData.existStatus === 1 ? (
          <TouchableOpacity style={styles.CompletedButton} disabled>
            <Text style={{ color: "#ffffff" }}>이미 신청했어요</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={ShowBottomSheet}>
            <LinearGradient style={styles.applyButton} colors={["#947BEA", "#1151E5"]}>
              <Text style={{ color: "#ffffff", paddingVertical: 20, paddingHorizontal: "15%" }}>
                신청할게요
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </Buttons>

      {/* 바텀 시트 */}
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

      <ChallengeApplyModal money={moneyAvailable} />
      <OnDevelopModal />
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  shareButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 20,
    paddingHorizontal: "15%",
    marginRight: 5,
    borderRadius: 15,
  },
  CompletedButton: {
    backgroundColor: "#bfc7d7",
    paddingVertical: 20,
    paddingHorizontal: "11%",
    marginLeft: 5,
    borderRadius: 15,
  },
  applyButton: {
    backgroundColor: "#5A69E8",
    borderRadius: 15,
    alignSelf: "center",
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
  cashWrapper: {
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginTop: 20,
    marginBottom: 30,
  },
});
const Wrapper = styled.View`
  flex: 1;
  background-color: #f6f5fb;
  padding: 100px 5% 0 5%;
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
`;
const Buttons = styled.View`
  flex-direction: row;
  align-self: center;
`;
const TopText = styled.Text`
  font-size: 12px;
  color: #6f81a9;
  margin-bottom: 3px;
`;
