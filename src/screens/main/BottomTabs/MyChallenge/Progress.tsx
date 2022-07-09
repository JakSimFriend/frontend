import React, { useState } from "react";
import {
  Animated,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import styled from "styled-components/native";
import { HomeCalendar, HomeClock, HomeUser } from "../../../../components/TabIcon";
import { BeforeStartData, progressData } from "./ChallengeData";
import Collapsible from "react-native-collapsible";
import * as ProgressBar from "react-native-progress";
import Arrow from "react-native-vector-icons/FontAwesome";
import { GradientButtons } from "../../../../components/GradientButtons";
import ReactionModal from "../../../../components/organisms/ReactionModal";
import { useSetRecoilState } from "recoil";
import { reactionModalAtom } from "../../../../../atom";
import { Emo, a, b, c, d, e, f } from "../../../../assets/images";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

// type StackParamList = {
//   BeforeStart: {
//     title: string;
//     content: string;
//     startDate: string;
//     schedule: string;
//     members: number;
//     waiting: number;
//   };
//   ProgressPage: {
//     title: string;
//     content: string;
//     startDate: string;
//     schedule: string;
//     members: number;
//   };
// };
// type NavigationProps = StackNavigationProp<StackParamList>;

export const Progress = React.memo(() => {
  const MYCOLOR = "#5266E8",
    OTHERSCOLOR = "#BFC7D7";

  const [onProgress, setOnProgress] = useState(3); //data(진행중)
  const [reactionType, setReactionType] = useState("");
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
  const ShowBottomSheet = () => {
    sheetUp();
    setBottomSheetVisible(true);
  };
  const HideBottomSheet = () => {
    sheetDown();
    setTimeout(() => {
      setBottomSheetVisible(() => false);
    }, 300);
    setReactionType("리액션 선택"); //data리셋
    setEmoticonIndex(10);
  };
  const SelectReaction = () => {
    sheetDown();
    setBottomSheetVisible(() => false);
    setModalVisible(true);
    //이모티콘 data전송 후 => 리셋
    setReactionType("리액션 선택"); //data리셋
    setEmoticonIndex(10);
  };

  //바텀시트 이모티콘
  const emoticons = ["😊", "😄", "🙁", "😂", "😲", "😘"];
  const emoticonDetail = ["기쁨", "웃음", "불만", "미안", "놀람", "멋져"];
  const [emoticonIndex, setEmoticonIndex] = useState(10);
  return (
    <ProgressWrapper>
      <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
        {/* 진행 중 */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>진행 중</Text>
          <Text style={styles.number}>{onProgress}</Text>
        </View>
        {onProgress === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>진행하고 있는 도전작심이 없어요</Text>
          </View>
        ) : (
          <>
            {progressData.map((item, index) => {
              const [isCollapsed, setIsCollapsed] = useState(true); //accordion클릭이벤트
              const Accordion = () => {
                setIsCollapsed(!isCollapsed);
              };
              return (
                <TouchableWithoutFeedback onPress={Accordion} key={index}>
                  <View style={styles.accordionWrapper}>
                    <View style={styles.titleWrapper}>
                      <Text style={styles.accordionTitle}>{item.title}</Text>
                      <View style={styles.dropdownButton}>
                        {!isCollapsed ? (
                          <Arrow name="chevron-up" size={15} />
                        ) : (
                          <Arrow name="chevron-down" size={15} />
                        )}
                      </View>
                    </View>

                    {/* accordion 외부내용 */}
                    <Collapsible collapsed={!isCollapsed}>
                      <Text style={styles.accordionMyState}>내 달성률 {item.Mypercentage}%</Text>
                      <ProgressBar.Bar
                        progress={item.Mypercentage / 100}
                        width={330}
                        height={12}
                        borderRadius={30}
                        color={MYCOLOR}
                      />
                    </Collapsible>

                    {/* accordion 내부내용 */}
                    {item.members.map((items, index) => {
                      const icon = [a, b, c, d, e, f];
                      return (
                        <View key={index}>
                          <Collapsible collapsed={isCollapsed} style={styles.innerDataWrapper}>
                            <View style={styles.innerData}>
                              <View style={styles.pictureWrapper}>
                                <Logo
                                  style={styles.picture}
                                  resizeMode="contain"
                                  source={icon[index]}
                                />
                                <TouchableOpacity onPress={ShowBottomSheet}>
                                  <View style={styles.reactionButton}>
                                    <Logo resizeMode="contain" source={Emo} />
                                  </View>
                                </TouchableOpacity>
                              </View>
                              <View>
                                <Text style={styles.innerTitle}>
                                  {items.name}
                                  <Text style={styles.innerPercentage}> {items.percentage}%</Text>
                                </Text>
                                <ProgressBar.Bar
                                  progress={items.percentage / 100}
                                  width={250}
                                  height={12}
                                  borderRadius={30}
                                  color={OTHERSCOLOR}
                                />
                              </View>
                            </View>
                          </Collapsible>

                          {/* 바텀시트모달 */}
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
                                        <View style={styles.picture}></View>
                                        <View>
                                          <TextOne>
                                            <Text style={styles.text1Name}>{items.name}</Text>
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
                                        {emoticons.map((item, index) => {
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
                                              <Text style={styles.emoticon}>{item}</Text>
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

                    {/* 바깥 버튼 */}
                    <View style={styles.accordionButtons}>
                      <TouchableOpacity
                        onPress={() => {
                          // 1.프롭스(진행중 정보페이지에서 axios로 받아오면됨)
                          navigation.navigate("ProgressDetailTopTab", {
                            title: "item.title",
                            startDate: "2022-07-05",
                            schedule: "item.schedule",
                            members: 5,
                          });
                        }}
                        style={styles.detailButton}
                      >
                        <Text style={styles.detailButtonText}>상세 보기</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.completedButton}
                        onPress={() => {
                          console.warn("인증하기");
                        }}
                      >
                        <Text style={styles.completedButtonText}>인증하기</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </>
        )}

        {/* 시작 전 */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>시작 전</Text>
          <Text style={styles.number}>{BeforeStartData.length}</Text>
        </View>
        {BeforeStartData.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>시작을 기다리는 도전작심이 없어요</Text>
          </View>
        ) : (
          <>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              {BeforeStartData.map((item, index) => {
                const Members = [1, 2, 3, 4, 5, 6];
                const selected = Members.slice(0, item.members);
                const common = Members.concat(selected);
                const Others = common.filter(function (v) {
                  return common.indexOf(v) == common.lastIndexOf(v);
                });
                const todayDate = moment(new Date()).format("YYYY-MM-DD");
                return (
                  <View key={index}>
                    {/* 아직 시작전인 챌린지들만 띄우기 */}
                    {item.startDate > todayDate ? (
                      <ChallengeBox>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("BeforeStartPage", {
                              title: item.title,
                              content: item.content,
                              startDate: item.startDate,
                              schedule: item.schedule,
                              members: item.members,
                              waiting: item.waiting,
                            });
                          }}
                        >
                          <ChallengeCategory>
                            <ChallengeCategoryText>{item.category}</ChallengeCategoryText>
                          </ChallengeCategory>
                          <ChallengeTitle>{item.title}</ChallengeTitle>
                          <ChallengeTags>{item.tags}</ChallengeTags>
                          <DateWrapper>
                            <HomeCalendar />
                            <InfoText>
                              D-
                              {Math.ceil(
                                moment.duration({ from: new Date(), to: item.startDate }).asDays(),
                              )}
                            </InfoText>
                          </DateWrapper>
                          <ScheduleWrapper>
                            <HomeClock />
                            <InfoText>{item.schedule}</InfoText>
                          </ScheduleWrapper>
                          <MembersWrapper>
                            <HomeUser />
                            {/* 선택된맴버수 예시:4명 */}
                            {Members.slice(0, item.members).map((item, index) => {
                              return (
                                <SelectedWrapper key={index}>
                                  <ButtonText>{item}</ButtonText>
                                </SelectedWrapper>
                              );
                            })}
                            {/* 전체 맴버수 예시:6명 */}
                            {Others.map((item, index) => {
                              return (
                                <NonSelectedWrapper key={index}>
                                  <ButtonText>{item}</ButtonText>
                                </NonSelectedWrapper>
                              );
                            })}
                          </MembersWrapper>
                        </TouchableOpacity>
                      </ChallengeBox>
                    ) : (
                      <></>
                    )}
                  </View>
                );
              })}
            </ScrollView>
          </>
        )}
      </ScrollView>

      {/* 리액션 전송 모달 팝업 */}
      <ReactionModal />
    </ProgressWrapper>
  );
});

const ProgressWrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
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
    marginTop: 20,
    flexDirection: "row",
    paddingLeft: 10,
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
    marginTop: 20,
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
    marginTop: -10,
  },
  accordionMyState: {
    color: "#6F81A9",
    paddingBottom: 10,
  },
  innerDataWrapper: {
    flexDirection: "column",
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
  accordionButtons: {
    marginTop: 25,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  detailButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    backgroundColor: "#ffffff",
    marginRight: 15,
    borderRadius: 15,
  },
  detailButtonText: {
    color: "#054de4",
  },
  completedButton: {
    backgroundColor: "#054de4",
    borderRadius: 10,
    paddingVertical: 15,
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
