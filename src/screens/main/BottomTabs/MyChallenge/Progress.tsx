import { useNavigation } from "@react-navigation/native";
import { Emo } from "@src/assets/images/images";
import {
  myIndicatorAtom,
  progressIndexAtom,
  progressTitleAtom,
  reactionModalAtom,
  userIdxAtom,
} from "@src/common/atom";
import { GradientButtons } from "@src/components/atoms/GradientButtons";
import { ChallengeBigCard } from "@src/components/challenge/challenge-big-card";
import ReactionModal from "@src/components/organisms/Modal/ReactionModal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Collapsible from "react-native-collapsible";
import LinearGradient from "react-native-linear-gradient";
import * as ProgressBar from "react-native-progress";
import Arrow from "react-native-vector-icons/FontAwesome";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components/native";

export const Progress = () => {
  const setProgressIndex = useSetRecoilState(progressIndexAtom);
  const setProgressTitle = useSetRecoilState(progressTitleAtom);
  const myIndicator = useRecoilValue(myIndicatorAtom);
  const [nickName, setNickname] = useState("");
  const [profile, setProfile] = useState("");
  const { width } = Dimensions.get("window");

  const MYCOLOR = "#5266E8",
    OTHERSCOLOR = "#BFC7D7";

  const [reactionType, setReactionType] = useState("");
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [membersIdx, setMembersIdx] = useState(0);
  const navigation: any = useNavigation();

  //바텀시트
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const setModalVisible = useSetRecoilState(reactionModalAtom);
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
  const ShowBottomSheet = (item: any) => {
    sheetUp();
    setBottomSheetVisible(true);
    setNickname(item.nickName);
    setProfile(item.profile);
  };
  const HideBottomSheet = () => {
    sheetDown();
    setTimeout(() => {
      setBottomSheetVisible(() => false);
    }, 300);
    setReactionType("리액션 선택");
    setEmoticonIndex(10);
  };
  const SelectReaction = () => {
    setReactionType("리액션 선택");
    setEmoticonIndex(10);
    postReaction();
    sheetDown();
    setBottomSheetVisible(() => false);
    setModalVisible(true);
  };

  //바텀시트 이모티콘
  const emoticons = ["😊", "😄", "🙁", "😂", "😲", "😘"];
  const emoticonDetail = ["기쁨", "웃음", "불만", "미안", "놀람", "멋져"];
  const [emoticonIndex, setEmoticonIndex] = useState(10);

  // data
  const userIdx = useRecoilValue(userIdxAtom);
  const [listEmpty, setListEmpty] = useState(false);
  const [progressDatas, setProgressDatas]: any = useState([]);
  const getData = () => {
    axios
      .get(`https://jaksimfriend.site/my-challenges/${userIdx}/progress`)
      .then(function (response) {
        if (response.data.result === undefined) {
          setListEmpty(true);
        } else {
          setListEmpty(false);
          setProgressDatas(response.data.result[0]);
        }
      })
      .catch(function (error) {
        setListEmpty(true);
      });
  };
  useEffect(() => {
    getData();
  }, [myIndicator]);

  const postReaction = () => {
    axios
      .post("https://jaksimfriend.site/fcm/reaction", {
        senderIdx: userIdx,
        receiverIdx: membersIdx,
        reactionIdx: emoticonIndex + 1,
        challengeIdx: challengeIdx,
      })
      .then(function (response) {
        console.log("성공");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff", paddingHorizontal: 20 }}>
      {/* <StatusBar backgroundColor={"#1016474D"}></StatusBar> */}
      <ProgressWrapper>
        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
          <View style={[styles.textWrapper]}>
            <Text style={styles.title}>진행 중</Text>
            <Text style={styles.number}>
              {progressDatas.proceedingCount ? progressDatas.proceedingCount : 0}
            </Text>
          </View>
          {progressDatas.proceedingCount === 0 || listEmpty ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>진행하고 있는 도전작심이 없어요</Text>
            </View>
          ) : (
            <>
              {progressDatas.proceedings?.map((item: any, index: number) => {
                return (
                  <View key={index}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setChallengeIdx(challengeIdx === item.challengeIdx ? 0 : item.challengeIdx);
                      }}
                    >
                      <View style={styles.accordionWrapper}>
                        <View style={styles.titleWrapper}>
                          <Text style={styles.accordionTitle}>{item.title}</Text>
                          <View style={styles.dropdownButton}>
                            {item.challengeIdx === challengeIdx ? (
                              <Arrow name="chevron-up" size={15} />
                            ) : (
                              <Arrow name="chevron-down" size={15} />
                            )}
                          </View>
                        </View>

                        {/* accordion 외부내용 */}
                        {item.members?.map((items: any, index: number) => {
                          return (
                            <Collapsible
                              collapsed={item.challengeIdx === challengeIdx ? true : false}
                              key={index}
                            >
                              {items.userIdx === userIdx ? (
                                <>
                                  <Text style={styles.accordionMyState}>
                                    내 달성률 {items.percent}%
                                  </Text>
                                  <View style={styles.barShadow}>
                                    <ProgressBar.Bar
                                      progress={items.percent / 100}
                                      width={width * 0.8}
                                      height={16}
                                      borderRadius={30}
                                      color={"#5266E8"}
                                      style={{
                                        borderColor: "#ffffff",
                                        backgroundColor: "#ffffff",
                                      }}
                                    />
                                  </View>
                                </>
                              ) : (
                                <></>
                              )}
                            </Collapsible>
                          );
                        })}

                        {/* accordion 내부내용 */}
                        {item.members?.map((items: any, index: number) => {
                          return (
                            <View key={index}>
                              <Collapsible
                                collapsed={item.challengeIdx === challengeIdx ? false : true}
                                style={styles.innerDataWrapper}
                              >
                                <View style={styles.innerData}>
                                  <View style={styles.pictureWrapper}>
                                    <Logo
                                      style={styles.picture}
                                      resizeMode="contain"
                                      source={{
                                        uri: items.profile,
                                      }}
                                    />
                                    <TouchableOpacity
                                      onPress={() => {
                                        ShowBottomSheet(items);
                                        setMembersIdx(items.userIdx);
                                      }}
                                    >
                                      <View style={styles.reactionButton}>
                                        <Logo resizeMode="contain" source={Emo} />
                                      </View>
                                    </TouchableOpacity>
                                  </View>
                                  <View>
                                    <Text style={styles.innerTitle}>
                                      {items.nickName}
                                      <Text style={styles.innerPercentage}> {items.percent}%</Text>
                                    </Text>
                                    <View style={styles.barShadow}>
                                      <ProgressBar.Bar
                                        progress={items.percent / 100}
                                        width={width * 0.6}
                                        height={16}
                                        borderRadius={30}
                                        color={
                                          items.userIdx.toString() === userIdx
                                            ? MYCOLOR
                                            : OTHERSCOLOR
                                        }
                                        style={{
                                          borderColor: "#ffffff",
                                          backgroundColor: "#ffffff",
                                        }}
                                      />
                                    </View>
                                  </View>
                                </View>
                              </Collapsible>
                            </View>
                          );
                        })}

                        {/* 바깥 버튼 */}
                        <View style={styles.accordionButtons}>
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate("ProgressTopbarNav");
                              setProgressIndex(item.challengeIdx);
                              setProgressTitle(item.title);
                            }}
                            style={styles.detailButton}
                          >
                            <Text style={styles.detailButtonText}>상세 보기</Text>
                          </TouchableOpacity>
                          {item.certification === 1 ? (
                            <TouchableOpacity
                              style={styles.completedButton}
                              onPress={() => {
                                navigation.navigate("ProgressCertified", {
                                  challengeIdx: item.challengeIdx,
                                  certification: item.certification,
                                });
                              }}
                            >
                              <Text style={styles.completedButtonText}>인증완료</Text>
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate("ProgressCertified", {
                                  challengeIdx: item.challengeIdx,
                                  certification: item.certification,
                                });
                              }}
                            >
                              <LinearGradient
                                style={{
                                  borderRadius: 15,
                                  paddingVertical: 12,
                                  paddingHorizontal: 25,
                                }}
                                colors={["#947BEA", "#1151E5"]}
                              >
                                <Text style={styles.completedButtonText}>인증하기</Text>
                              </LinearGradient>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    </TouchableWithoutFeedback>

                    {/* 바텀 모달 시트 */}
                    <Modal visible={bottomSheetVisible} transparent={true}>
                      <TouchableWithoutFeedback onPress={HideBottomSheet}>
                        <View style={styles.background}>
                          <Animated.View
                            style={{
                              marginBottom: upValue,
                            }}
                          >
                            <TouchableWithoutFeedback>
                              <View style={styles.container}>
                                <View style={styles.pictureWrapper}>
                                  <Logo
                                    style={styles.picture}
                                    resizeMode="contain"
                                    source={{
                                      uri: profile,
                                    }}
                                  />
                                  <View>
                                    <TextOne>
                                      <Text style={styles.text1Name}>{nickName}</Text>
                                      님에게{"\n"}
                                      <View style={styles.text2}>
                                        {reactionType.length > 2 ? (
                                          <View style={styles.reactionSelectTextWrapper}>
                                            <Text style={styles.reactionSelectText}>
                                              {reactionType}
                                            </Text>
                                          </View>
                                        ) : (
                                          <Text style={styles.reactionSelectedText}>
                                            {reactionType}
                                          </Text>
                                        )}
                                        <Text style={styles.text3}>리액션을 보낼게요</Text>
                                      </View>
                                    </TextOne>
                                  </View>
                                </View>
                                <View style={styles.reactionBox}>
                                  {emoticons.map((items, index) => {
                                    return (
                                      <TouchableOpacity
                                        onPress={() => {
                                          setEmoticonIndex(index);
                                          setReactionType(emoticonDetail[index]);
                                        }}
                                        key={index}
                                        style={
                                          emoticonIndex === index
                                            ? styles.emoticonSelectedWrapper
                                            : styles.emoticonWrapper
                                        }
                                      >
                                        <Text style={styles.emoticon}>{items}</Text>
                                      </TouchableOpacity>
                                    );
                                  })}
                                </View>
                                <GradientButtons onPress={SelectReaction} Title="보낼래요" />
                              </View>
                            </TouchableWithoutFeedback>
                          </Animated.View>
                        </View>
                      </TouchableWithoutFeedback>
                    </Modal>
                  </View>
                );
              })}
            </>
          )}

          {/* 시작 전 */}
          <View style={[styles.textWrapper, { marginTop: 50 }]}>
            <Text style={styles.title}>시작 전</Text>
            <Text style={styles.number}>
              {progressDatas.beforeCount ? progressDatas.beforeCount : 0}
            </Text>
          </View>
          {progressDatas.beforeCount === 0 || listEmpty ? (
            <View style={[styles.emptyBox, { marginBottom: 30 }]}>
              <Text style={styles.emptyText}>시작을 기다리는 도전작심이 없어요</Text>
            </View>
          ) : (
            <>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {progressDatas.befores?.map((item: any, index: number) => {
                  return (
                    <ChallengeBigCard
                      key={index}
                      index={index}
                      title={item.title}
                      category={item.categoryName}
                      tag={item.tags}
                      remainingDay={item.remainingDay}
                      memberCount={item.accept}
                      memberCountType={"box"}
                      certification={item.certification}
                      onPressEvent={() => {
                        navigation.navigate("BeforeStartPage", {
                          title: item.title,
                          challengeIdx: item.challengeIdx,
                        });
                      }}
                    />
                  );
                })}
              </ScrollView>
            </>
          )}
        </ScrollView>

        <ReactionModal />
      </ProgressWrapper>
    </SafeAreaView>
  );
};

const ProgressWrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  /* padding-left: 20px;
  padding-right: 20px; */
`;
const ChallengeBox = styled.View`
  padding: 20px 10px;
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
  width: 80px;
`;
const ChallengeCategoryText = styled.Text`
  text-align: center;
`;
const ChallengeTags = styled.Text`
  margin: 0 0 20px 0;
  color: #6f81a9;
`;
const Logo = styled.Image`
  width: 20px;
  height: 20px;
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
const SelectedWrapper = styled.View`
  background-color: #054de4;
  border-radius: 4px;
  margin-left: 3px;
`;
const NonSelectedWrapper = styled.View`
  background-color: #bfc7d7;
  border-radius: 4px;
  margin-left: 3px;
`;
const InfoText = styled.Text`
  padding: 0 5px;
`;
const ButtonText = styled.Text`
  padding: 0 5px;
  color: transparent;
`;
const TextOne = styled.Text`
  font-size: 18px;
  margin-left: 15px;
  font-weight: 500;
  letter-spacing: 1px;
`;

const styles = StyleSheet.create({
  textWrapper: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 10,
  },
  title: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "600",
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
  accordionWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#F6F5FB",
  },
  titleWrapper: {
    marginBottom: 20,
  },
  accordionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dropdownButton: {
    alignItems: "flex-end",
    marginTop: -15,
  },
  accordionMyState: {
    color: "#6F81A9",
    paddingBottom: 10,
  },
  innerDataWrapper: {
    flexDirection: "column",
    marginTop: 5,
  },
  innerData: {
    flexDirection: "row",
    marginBottom: 15,
  },
  pictureWrapper: {
    flexDirection: "row",
  },
  picture: {
    padding: 20,
    backgroundColor: "#F6F5FB",
    borderRadius: 50,
  },
  reactionButton: {
    padding: 5,
    backgroundColor: "#ffffff",
    borderRadius: 50,
    top: 17,
    right: 20,
  },
  innerTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#6F81A9",
  },
  innerPercentage: {
    marginLeft: 10,
  },
  barShadow: {
    shadowColor: "#D9D9D9",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  accordionButtons: {
    marginTop: 25,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  detailButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: "#ffffff",
    marginRight: 15,
    borderRadius: 15,
  },
  detailButtonText: {
    color: "#054de4",
  },
  completedButton: {
    backgroundColor: "#BFC7D7",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: "center",
  },
  completedButtonText: {
    color: "#ffffff",
  },
  background: {
    flex: 1,
    backgroundColor: `${Platform.OS === "ios" ? "#1016474D" : "#1016471D"}`,
    justifyContent: "flex-end",
    marginBottom: -280,
  },
  container: {
    backgroundColor: "#fff",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  text1Name: {
    color: "#054de4",
  },
  text2: {
    flexDirection: "row",
  },
  text3: {
    marginTop: 8,
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  reactionSelectTextWrapper: {
    backgroundColor: "#F6F5FB",
    borderRadius: 10,
    padding: 2,
    marginTop: 5,
  },
  reactionSelectText: {
    color: "#BFC7D7",
    fontSize: 16,
    fontWeight: "500",
  },
  reactionSelectedText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#054de4",
    marginTop: 8,
  },
  reactionBox: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#F6F5FB",
    marginVertical: 30,
    borderRadius: 15,
    justifyContent: "center",
  },
  emoticonWrapper: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 3,
  },
  emoticonSelectedWrapper: {
    backgroundColor: "#054DE4",
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 3,
  },
  emoticon: {
    fontSize: 20,
  },
});
