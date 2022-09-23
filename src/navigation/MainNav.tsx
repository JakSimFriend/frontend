import React, { useEffect } from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
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
  userIndexAtom,
} from "../common/atom";
import {
  Category,
  ChallengeOpenOne,
  ChallengeOpenTwo,
  Notifications,
  Search,
  SearchChallenge,
  NickName,
  Record,
  RequestPage,
  Detail,
  RecruitPage,
  BeforeStartPage,
  ProgressNotification,
  ProgressCertified,
  BirthDay,
  BeforeStartPageInfo,
  RecruitPageInfo,
} from "../screens/main";
import SettingNav from "./SettingNav";
import LoggedInNav from "./LoggedInNav";
import LoggedOutNav from "./LoggedOutNav";
import { Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ArrowLeft from "react-native-vector-icons/AntDesign";
import { unlink } from "@react-native-seoul/kakao-login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileEdit from "../screens/main/BottomTabs/Profile/ProfileEdit";
import axios from "axios";
import { HomeChallengeInfo } from "../screens/main/BottomTabs/Home/HomeChallengeInfo";
import { ProgressPageInfo } from "../screens/main/BottomTabs/MyChallenge/Progress/ProgressPageInfo";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ProgressTopbarNav } from "./BottomTabs/MyChallenge/ProgressTopbarNav";
import { useGetToken } from "@src/hook/useAutoLogin";

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
  const goToMyChallenge = () => navigation.navigate("내챌린지");
  const goBack = () => navigation.goBack();

  const [userIdx, setUserIdx] = useRecoilState(userIndexAtom);
  useEffect(() => {
    AsyncStorage.getItem("userIdx").then((value: any) => {
      setUserIdx(parseInt(value));
    });
  }, []);

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
    setIsUser(false);
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
  console.log(isUser);
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
          {isUser ? (
            <Stack.Screen name="Home" component={LoggedInNav} />
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
                    <ArrowLeft
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
                      <ArrowLeft
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
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            }}
          />
          <Stack.Screen name="SettingNav" component={SettingNav} options={{ headerShown: false }} />

          {/* 우측 상단 페이지들 */}
          <Stack.Screen
            name="Notifications"
            component={Notifications}
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
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 18 }} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="SearchChallenge"
            component={SearchChallenge}
            options={{
              presentation: "transparentModal",
              headerShadowVisible: false,
              headerBackgroundContainerStyle: { backgroundColor: "#F6F5FB" },
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
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
              headerTitle: progressTitle,
              headerTitleAlign: "center",
              headerRightContainerStyle: {
                marginBottom: 10,
              },
              headerLeftContainerStyle: {
                marginBottom: 10,
              },
              headerTitleStyle: {
                marginBottom: 10,
              },
              headerLeft: () => (
                <TouchableOpacity onPress={goToMyChallenge}>
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
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
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
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
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
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
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
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
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
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
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
                </TouchableOpacity>
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
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
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
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
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
                  <ArrowLeft name="arrowleft" size={25} style={{ marginLeft: 15 }} />
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
