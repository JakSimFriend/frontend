import { useNavigation } from "@react-navigation/native";
import { Color } from "@src/assets/color";
import { applyModalAtom, onDevelopModalAtom, userIdxAtom } from "@src/common/atom";
import { GradientButtons } from "@src/components/atoms/GradientButtons";
import {
  CalendarIcon,
  ClockIconTwo,
  DiamondIconTwo,
  FlagIcon,
  UserIconTwo,
} from "@src/components/atoms/TabIcon";
import ChallengeApplyModal from "@src/components/organisms/Modal/ChallengeApplyModal";
import OnDevelopModal from "@src/components/organisms/Modal/OnDevelopModal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components/native";

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

export const HomeChallengeInfo = ({ route }: RouteParams) => {
  const navigation = useNavigation();
  const { title, schedule, members, challengeIdx } = route.params;
  const setModalVisible = useSetRecoilState(applyModalAtom);
  const setModalTwoVisible = useSetRecoilState(onDevelopModalAtom);
  const userIdx = useRecoilValue(userIdxAtom);
  const [infoData, setInfoData]: any = useState([]);
  const cashAvailable = infoData.pee < infoData.myPoint ? true : false;

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

  useEffect(() => {
    axios
      .get(`https://eddy-pl.com/api/challenges/${challengeIdx}/${userIdx}`)
      .then(function (response) {
        setInfoData(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const joinChallenge = () => {
    axios
      .post(`https://eddy-pl.com/api/challenges/join`, {
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

  const link =
    Platform.OS === "ios"
      ? "https://apps.apple.com/us/app/%EB%B3%B4%EB%8B%A5-%EB%82%B4-%EB%B3%B4%ED%97%98%EC%A0%90%EC%88%98-%EC%A7%84%EB%8B%A8-%EC%83%88%EB%8A%94-%EB%B3%B4%ED%97%98%EB%A3%8C-%ED%99%95%EC%9D%B8/id1447862053"
      : "https://play.google.com/store/apps/details?id=com.kakao.talk&hl=ko";

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: title,
        message: `${infoData.content}${`\n`} ${link}`,
        url: "https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white[0] }}>
      <View style={styles.topView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#101647" />
        </TouchableOpacity>
      </View>
      <Wrapper>
        <StatusBar barStyle="dark-content" backgroundColor={Color.white[200]} />
        <Title>{title}</Title>
        <Content>{infoData.content}</Content>
        <ScrollView>
          <Infos>
            <InfoWrapper>
              <IconWrapper>
                <FlagIcon />
              </IconWrapper>
              <TextWrapper>
                <TopText>완주시 최대</TopText>
                <Text>2,000 포인트와 1,000 경험치</Text>
              </TextWrapper>
            </InfoWrapper>
            <InfoWrapper>
              <IconWrapper>
                <CalendarIcon />
              </IconWrapper>
              <TextWrapper>
                <Text style={{ marginTop: 11 }}>{infoData.date}</Text>
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
                  신청 인원 {infoData.waiting}명, 대기자 수 {members}명
                </Text>
              </TextWrapper>
            </InfoWrapper>
            <InfoWrapper>
              <IconWrapper>
                <DiamondIconTwo />
              </IconWrapper>
              <TextWrapper>
                <TopText>팀원 평균</TopText>
                <Text>{infoData.tier}</Text>
              </TextWrapper>
            </InfoWrapper>
          </Infos>
          <View style={styles.cashWrapper}>
            <ChallengeCash>
              <ChallengeCashText>도전 캐시</ChallengeCashText>
              <ChallengeCashText>{infoData.pee}C</ChallengeCashText>
            </ChallengeCash>
            <MyCash>
              <Text>내 캐시</Text>
              <Text>{infoData.myPoint}C</Text>
            </MyCash>
          </View>
          <Buttons>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={() => {
                setModalTwoVisible(true);
                // onShare();
              }}
            >
              <Text>공유할래요</Text>
            </TouchableOpacity>
            {infoData.existStatus === 1 ? (
              <TouchableOpacity style={styles.CompletedButton} disabled>
                <Text style={{ color: Color.white[0] }}>이미 신청했어요</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={ShowBottomSheet}>
                <LinearGradient style={styles.applyButton} colors={["#947BEA", "#1151E5"]}>
                  <Text
                    style={{ color: Color.white[0], paddingVertical: 20, paddingHorizontal: "15%" }}
                  >
                    신청할게요
                  </Text>
                </LinearGradient>
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
                    <Text style={styles.infoOne}>
                      {title} 도전캐시{"\n"}1,000C를 사용하시겠어요?
                    </Text>
                    <View style={styles.infoWrapper}>
                      <Text style={styles.infoTwo}>
                        {"\u2022"} 캐시는 개설자가 가입 승인할 때 빠져 나가요!
                      </Text>
                      <Text style={styles.infoTwo}>{"\u2022"} 한번 신청하면 취소할 수 없어요!</Text>
                    </View>
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
          <ChallengeApplyModal money={cashAvailable} />
          <OnDevelopModal />
        </ScrollView>
      </Wrapper>
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
  flex: 1;
  padding: 20px 4% 0 4%;
`;
const Title = styled.Text`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 30px;
`;
const Content = styled.Text`
  color: ${Color.blue[900]};
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
  background-color: ${Color.white[0]};
  border-radius: 10px;
`;
const TextWrapper = styled.View`
  margin-left: 20px;
`;
const TopText = styled.Text`
  font-size: 12px;
  color: ${Color.blue[900]};
  margin-bottom: 3px;
`;
const ChallengeCash = styled.View`
  background-color: ${Color.blue[1100]};
  padding: 22px;
  border-radius: 15px;
  flex-direction: row;
  justify-content: space-between;
  box-shadow: 0px 2px 16px rgba(15, 45, 107, 0.2);
`;
const ChallengeCashText = styled.Text`
  color: ${Color.white[0]};
  font-size: 18px;
  font-weight: 600;
`;
const MyCash = styled.View`
  background-color: ${Color.white[200]};
  padding: 22px;
  border-radius: 15px;
  flex-direction: row;
  justify-content: space-between;
`;
const Buttons = styled.View`
  flex-direction: row;
  align-self: center;
`;

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  topText: {
    color: Color.blue[1100],
    fontSize: 17,
    position: "absolute",
    width: width,
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 10,
    fontWeight: "500",
  },
  shareButton: {
    backgroundColor: Color.white[0],
    paddingVertical: 20,
    paddingHorizontal: "15%",
    marginRight: 5,
    borderRadius: 15,
  },
  CompletedButton: {
    backgroundColor: Color.gray[100],
    paddingVertical: 20,
    paddingHorizontal: "11%",
    marginLeft: 5,
    borderRadius: 15,
  },
  applyButton: {
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
    backgroundColor: Color.white[0],
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
  infoWrapper: {
    marginBottom: 30,
  },
  infoTwo: {
    textAlign: "center",
    // marginBottom: 30,
    color: Color.blue[900],
  },
  nextButton: {
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "${Color.white[200]}",
  },
  nextButtonText: {
    fontSize: 18,
    color: Color.blue[900],
  },
  cashWrapper: {
    backgroundColor: Color.white[0],
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginTop: 20,
    marginBottom: 30,
  },
});
