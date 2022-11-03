import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { unlink } from "@react-native-seoul/kakao-login";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Color } from "@src/assets/color";
import Modal from "@src/components/organisms/Modal/modal";
import axios from "axios";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AntIcons from "react-native-vector-icons/AntDesign";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  createdFailModalAtom,
  createdModalAtom,
  dateAtom,
  infoAtom,
  isLoggedInAtom,
  isUserStatusAtom,
  nextButtonAtom,
  numberAtom,
  progressTitleAtom,
  selectedCategoryIndexAtom,
  startDateAtom,
  submitButtonAtom,
  tagsAtom,
  timeAtom,
  titleAtom,
  userIdxAtom,
} from "../common/atom";
import {
  Alert,
  BeforeStartPage,
  BeforeStartPageInfo,
  BirthDay,
  Category,
  ChallengeOpenOne,
  ChallengeOpenTwo,
  Detail,
  NickName,
  ProgressCertified,
  ProgressNotification,
  Record,
  RecruitPage,
  RecruitPageInfo,
  RequestPage,
  Search,
} from "../screens/main";
import { HomeChallengeInfo } from "../screens/main/BottomTabs/Home/home-challenge-info";
import { ProgressPageInfo } from "../screens/main/BottomTabs/MyChallenge/Progress/progress-page-info";
import ProfileEdit from "../screens/main/BottomTabs/Profile/profileEdit";
import { ProgressTopbarNav } from "./BottomTabs/MyChallenge/progress-topbar-nav";
import LoggedOutNav from "./logged-out-nav";
import LoggedInNav from "./loggedIn-nav";
import SettingNav from "./setting-nav";

const Stack = createStackNavigator();

const MainNav = () => {
  // useGetToken();
  const [isUser, setIsUser] = useRecoilState(isUserStatusAtom);
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const nextButtonDisable = useRecoilValue(nextButtonAtom);
  const submitButtonDisable = useRecoilValue(submitButtonAtom);
  const setModalVisible = useSetRecoilState(createdModalAtom);
  const setModalTwoVisible = useSetRecoilState(createdFailModalAtom);
  const progressTitle = useRecoilValue(progressTitleAtom);
  const navigation = useNavigation();
  const goToChallengeOpenOne = () => navigation.navigate("ChallengeOpenOne");
  const goToChallengeOpenTwo = () => navigation.navigate("ChallengeOpenTwo");
  const goToProgressNotification = () => navigation.navigate("ProgressNotification");
  const goToMyChallenge = () => navigation.navigate("내 도전");
  const goBack = () => navigation.goBack();

  const [userIdx, setUserIdx] = useRecoilState(userIdxAtom);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  // signOut
  const signOutPatch = () => {
    axios
      .patch(`https://jaksimfriend.site/users/${userIdx}/delete`)
      .then(function (response) {
        console.log(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const kakaoSignOut = async (): Promise<void> => {
    signOutPatch();
    try {
      await unlink();
      await GoogleSignin.signOut();
    } catch (error) {
      console.log(error);
    }
    AsyncStorage.removeItem("jwt");
    AsyncStorage.removeItem("userIdx");
    AsyncStorage.removeItem("fcmtoken");
    setIsLoggedIn(false);
    setIsUser("none");
  };

  // 챌린지 개설
  const title = useRecoilValue(titleAtom);
  const content = useRecoilValue(infoAtom);
  const startDate = useRecoilValue(startDateAtom);
  const date = useRecoilValue(dateAtom);
  const number = useRecoilValue(numberAtom);
  const time = useRecoilValue(timeAtom);
  const categoryIdx = useRecoilValue(selectedCategoryIndexAtom);
  const tags = useRecoilValue(tagsAtom);
  const createChallenge = () => {
    axios
      .post("https://jaksimfriend.site/challenges", {
        title: title,
        content: content,
        startDate: startDate,
        cycle: date,
        count: number,
        deadline: time,
        categoryIdx: categoryIdx,
        userIdx: userIdx,
        tags: tags.filter(Boolean),
      })
      .then(function (response) {
        if (response.data.code === 1000) {
          setModalVisible(true);
        } else if (response.data.code === 3037) {
          setModalTwoVisible(true);
        } else {
          console.warn("또 다른 에러");
        }
      })
      .catch(function (error) {
        console.warn(error);
      });
  };
  return (
    <>
      {isLoggedIn ? (
        <Stack.Navigator
          initialRouteName={"Home"}
          screenOptions={{
            headerTitle: () => false,
            headerTransparent: true,
            headerTintColor: "#000000",
            headerBackTitleVisible: false,
          }}
        >
          {isUser === "success" ? (
            <>
              <Stack.Screen name="Home" component={LoggedInNav} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="NickName"
                component={NickName}
                options={{
                  headerTitle: "회원가입",
                  headerTitleAlign: "center",
                  headerTitleStyle: { fontSize: 15, fontWeight: "900" },
                  headerLeft: () => (
                    <AntIcons
                      onPress={kakaoSignOut}
                      name="arrowleft"
                      size={25}
                      style={{ marginLeft: 15 }}
                    />
                  ),
                }}
              />
              <Stack.Screen
                name="BirthDay"
                component={BirthDay}
                options={{
                  headerTitle: "회원가입",
                  headerTitleAlign: "center",
                  headerTitleStyle: { fontSize: 15, fontWeight: "900" },
                  headerLeft: () => (
                    <TouchableOpacity>
                      <AntIcons
                        onPress={goBack}
                        name="arrowleft"
                        size={25}
                        style={{ marginLeft: 15 }}
                      />
                    </TouchableOpacity>
                  ),
                }}
              />
            </>
          )}
          <Stack.Screen
            name="HomeChallengeInfo"
            component={HomeChallengeInfo}
            options={{
              presentation: "transparentModal",
              headerLeft: () => <></>,
            }}
          />
          <Stack.Screen
            name="ProfileEdit"
            component={ProfileEdit}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="SettingNav" component={SettingNav} options={{ headerShown: false }} />

          {/* 우측 상단 페이지들 */}
          <Stack.Screen
            name="Notifications"
            component={Alert}
            options={{
              presentation: "transparentModal",
              headerLeft: () => <></>,
            }}
          />
          <Stack.Screen
            name="Detail"
            component={Detail}
            options={{
              presentation: "transparentModal",
              headerLeft: () => <></>,
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              presentation: "transparentModal",
              headerTintColor: "#000000",
              headerShadowVisible: false,
              headerTransparent: false,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <AntIcons name="arrowleft" size={25} style={{ marginLeft: 18 }} />
                  <Text style={{ marginLeft: 20, fontSize: 17, fontWeight: "bold" }}>검색</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="SearchChallenge"
            component={HomeChallengeInfo}
            options={{
              presentation: "transparentModal",
              headerShadowVisible: false,
              headerBackgroundContainerStyle: { backgroundColor: Color.white[0] },
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntIcons name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="Record"
            component={Record}
            options={{
              presentation: "transparentModal",
              headerLeft: () => <></>,
            }}
          />

          {/* 내 챌린지 페이지 내부페이지들 */}
          <Stack.Screen
            name="ProgressTopbarNav"
            component={ProgressTopbarNav}
            options={{
              presentation: "transparentModal",
              headerTitleAlign: "center",
              headerRightContainerStyle: {
                marginBottom: 10,
              },
              headerLeftContainerStyle: {
                marginBottom: 10,
              },
              headerLeft: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity onPress={goToMyChallenge}>
                    <AntIcons name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                  </TouchableOpacity>
                  <Text style={{ marginLeft: 20, fontSize: 17, fontWeight: "600" }}>
                    {progressTitle}
                  </Text>
                </View>
              ),
              headerRight: () => (
                <TouchableOpacity onPress={goToProgressNotification} style={{ marginRight: 18 }}>
                  <Text style={{ color: "#054de4" }}>알림</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="ProgressNotification"
            component={ProgressNotification}
            options={{
              presentation: "transparentModal",
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <AntIcons name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="ProgressCertified"
            component={ProgressCertified}
            options={{
              presentation: "transparentModal",
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <AntIcons name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="ProgressPageInfo"
            component={ProgressPageInfo}
            options={{
              presentation: "transparentModal",
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <AntIcons name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="BeforeStartPage"
            component={BeforeStartPage}
            options={{
              presentation: "transparentModal",
              headerLeft: () => <></>,
            }}
          />
          <Stack.Screen
            name="BeforeStartPageInfo"
            component={BeforeStartPageInfo}
            options={{
              presentation: "transparentModal",
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <AntIcons name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="RecruitPage"
            component={RecruitPage}
            options={{
              presentation: "transparentModal",
              headerLeft: () => <></>,
            }}
          />
          <Stack.Screen
            name="RecruitPageInfo"
            component={RecruitPageInfo}
            options={{
              presentation: "transparentModal",
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <AntIcons name="arrowleft" size={25} style={{ marginLeft: 20 }} />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <>
                  <TouchableOpacity
                    onPress={() => setIsModalVisible(true)}
                    style={{ marginRight: 20 }}
                  >
                    <AntIcons name="deleteuser" size={24} />
                  </TouchableOpacity>
                  <Modal
                    isVisible={isModalVisible}
                    title="취소 불가"
                    body={
                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View>
                          <Text
                            style={{
                              width: "100%",
                              fontSize: 28,
                              textAlign: "center",
                              color: Color.blue[1100],
                              fontWeight: "600",
                            }}
                          >
                            이미 참가가{"\n"}확정되었어요
                          </Text>
                        </View>
                        <View style={{ marginTop: 46 }}>
                          <Text
                            style={{
                              width: "100%",
                              fontSize: 17,
                              textAlign: "center",
                              color: Color.blue[1100],
                            }}
                          >
                            개설자가 승인한 상태라면{"\n"} 도전작심을 취소할 수 없어요
                          </Text>
                        </View>
                      </View>
                    }
                    closeFn={() => setIsModalVisible(false)}
                  />
                </>
              ),
            }}
          />
          <Stack.Screen
            name="RequestPage"
            component={RequestPage}
            options={{
              presentation: "transparentModal",
              headerShadowVisible: false,
              headerLeft: () => <></>,
            }}
          />

          {/* 챌린지 개설 페이지들 */}
          <Stack.Screen
            name="Category"
            component={Category}
            options={{
              presentation: "transparentModal",
              headerTitle: "도전작심 개설",
              headerTitleAlign: "center",
              headerTitleStyle: { fontSize: 15, fontWeight: "900" },
              headerTransparent: false,
              headerTintColor: "#000000",
              headerRight: () => (
                <TouchableOpacity onPress={goToChallengeOpenOne} style={{ marginRight: 20 }}>
                  <Text style={{ color: "#054de4" }}>다음</Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <AntIcons name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="ChallengeOpenOne"
            component={ChallengeOpenOne}
            options={{
              presentation: "transparentModal",
              headerTitle: "도전작심 개설",
              headerTitleAlign: "center",
              headerTitleStyle: { fontSize: 15, fontWeight: "900" },
              headerTransparent: false,
              headerTintColor: "#000000",
              headerRight: () => (
                <TouchableOpacity
                  onPress={goToChallengeOpenTwo}
                  disabled={nextButtonDisable}
                  style={{ marginRight: 20 }}
                >
                  <Text style={[{ color: nextButtonDisable ? "#9a9797" : "#054de4" }]}>다음</Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <AntIcons name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="ChallengeOpenTwo"
            component={ChallengeOpenTwo}
            options={{
              presentation: "transparentModal",
              headerTitle: "도전작심 개설",
              headerTitleAlign: "center",
              headerTitleStyle: { fontSize: 15, fontWeight: "900" },
              headerTransparent: false,
              headerTintColor: "#000000",
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    createChallenge();
                  }}
                  disabled={submitButtonDisable}
                  style={{ marginRight: 20 }}
                >
                  <Text style={[{ color: submitButtonDisable ? "#9a9797" : "#054de4" }]}>완료</Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={goBack}>
                  <AntIcons name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack.Navigator>
      ) : (
        <LoggedOutNav />
      )}
    </>
  );
};
export default MainNav;
