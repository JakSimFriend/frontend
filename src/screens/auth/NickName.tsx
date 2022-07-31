import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  AppState,
  SafeAreaView,
} from "react-native";
import styled from "styled-components/native";
import Feather from "react-native-vector-icons/AntDesign";
import NickNameModal1 from "../../components/organisms/Modal/NickNameModal1";
import NickNameModal2 from "../../components/organisms/Modal/NickNameModal2";
import NickNameModal3 from "../../components/organisms/Modal/NickNameModal3";
import NickNameModal4 from "../../components/organisms/Modal/NickNameModal4";
import axios from "axios";
import { isLoggedInAtom, isUserAtom, userIndexAtom } from "../../../atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { unlink } from "@react-native-seoul/kakao-login";

export const NickName = () => {
  const navigation = useNavigation();
  const userIdx = useRecoilValue(userIndexAtom);
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setIsUser = useSetRecoilState(isUserAtom);

  useEffect(() => {
    // 닉네임에서 앱 닫을 시 = 백버튼 누른것과 동일하게 signOut
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "background") {
        const kakaoSignOut = async (): Promise<void> => {
          const message = await unlink();
          console.log(message);
          AsyncStorage.removeItem("jwt");
          AsyncStorage.removeItem("userIdx");
          AsyncStorage.removeItem("fcmtoken");
          signOutPatch();
          setIsLoggedIn(false);
          setIsUser(false);
        };
        kakaoSignOut();
      }
    });
    return () => subscription.remove();
  }, []);

  //회원 탈퇴 API
  const signOutPatch = () => {
    axios
      .patch(`https://jaksimfriend.site/users/${userIdx}/delete`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postNickName = () => {
    axios
      .post("https://jaksimfriend.site/users/nickname", {
        userIdx: userIdx,
        nickName: nickName,
        recommendedIdx: 1,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const checkNickName = () => {
    axios
      .post("https://jaksimfriend.site/users/nickname/check", {
        userIdx: userIdx,
        nickName: nickName,
      })
      .then(function (response) {
        console.warn(response.data)
        if (response.data.code === 3015) {
          setModalVisible2(true);
          setGuideColor3(BLACK);
          setNickNameColor(RED);
          setButtonColor1(GREY_BUTTON);
          console.warn("ㅇㅇ")
        } else if (response.data.code === 1000) {
          setModalVisible1(true);
          setButtonColor1(BLACK);
          setGuideColor3(BLUE);
          setNickNameColor(BLUE);
          console.warn("ㅇㅇㅇ")
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //추천인 확인
  const checkUser = () => {
    axios
      .post(`https://jaksimfriend.site/users/check`, {
        userIdx: userIdx,
        nickName: nickName2,
      })
      .then(function (response) {
        if (response.data.code === 3016) {
          setModalVisible4(true);
          setGuideColor4(BLACK);
          setNickNameColor2(RED);
          setButtonColor2(GREY_BUTTON);
        } else if (response.data.code === 1000) {
          setModalVisible3(true);
          setButtonColor2(BLACK);
          setGuideColor4(BLUE);
          setNickNameColor2(BLUE);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GREY = "#6F81A9",
    BLACK = "#101647",
    RED = "#D75858",
    BLUE = "#044DE4",
    GREY_BUTTON = "#BFC7D7";

  const [nickNameColor, setNickNameColor] = useState(GREY);
  const [nickNameColor2, setNickNameColor2] = useState(GREY);

  const [nickName, setNickName] = useState("");
  const [nickName2, setNickName2] = useState("");

  const [guideColor1, setGuideColor1] = useState(GREY);
  const [guideColor2, setGuideColor2] = useState(GREY);
  const [guideColor3, setGuideColor3] = useState(GREY);
  const [guideColor4, setGuideColor4] = useState(GREY);

  const [buttonColor1, setButtonColor1] = useState(GREY_BUTTON);
  const [buttonColor2, setButtonColor2] = useState(GREY_BUTTON);

  useEffect(() => {
    setNickNameColor(guideColor1 == BLACK || guideColor2 == BLACK ? RED : GREY);
  }, [guideColor1 == BLACK || guideColor2 == BLACK]);

  const onChangeNickName = (currentNickName: string) => {
    if (currentNickName.length == 0) {
      setButtonColor1(GREY_BUTTON);
      setNickNameColor(GREY);
      setGuideColor1(GREY);
      setGuideColor2(GREY);
      setGuideColor3(GREY);
      return;
    }
    setButtonColor1(BLUE);
    if (currentNickName.length > 8) {
      setGuideColor1(BLACK);
      setButtonColor1(GREY_BUTTON);
    } else {
      setGuideColor1(BLUE);
      if (checkGuide2(currentNickName) == false) {
        setGuideColor2(BLACK);
        setButtonColor1(GREY_BUTTON);
      } else {
        setGuideColor2(BLUE);
        setButtonColor1(BLUE);
      }
    }
    setGuideColor3(GREY); // 닉네임 value 변경되는 경우 중복 확인 다시.
  };

  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Wrapper>
        <StatusBar barStyle={"default"}></StatusBar>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>닉네임을 적어주세요!</Text>
          <Text style={styles.title2}>친구들이 보게 될 닉네임이에요</Text>
          <View style={styles.nickNameView}>
            <TextInput
              placeholder="닉네임"
              placeholderTextColor={GREY}
              style={[styles.nickNameTextInput, { borderColor: nickNameColor }]}
              value={nickName}
              onChangeText={setNickName}
              onChange={(e) => {
                onChangeNickName(e.nativeEvent.text);
              }}
            />
            <TouchableOpacity
              style={[styles.nickNameButton, { backgroundColor: buttonColor1 }]}
              disabled={buttonColor1 == BLUE ? false : true}
              onPress={checkNickName}
            >
              <Text style={styles.nickNameButtonText}>중복 확인</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.guideView}>
            <Text style={[styles.guideText, { color: guideColor1 }]}>
              · 최대 8자 이하만 사용할 수 있어요
            </Text>
            <Feather name="check" size={16} color={guideColor1 == BLACK ? RED : guideColor1} />
          </View>
          <View style={styles.guideView}>
            <Text style={[styles.guideText, { color: guideColor2 }]}>
              · 영문, 특수문자, 띄어쓰기는 빼주세요
            </Text>
            <Feather name="check" size={16} color={guideColor2 == BLACK ? RED : guideColor2} />
          </View>
          <View style={styles.guideView}>
            <Text style={[styles.guideText, { color: guideColor3 }]}>
              · 중복 닉네임은 쓸 수 없어요
            </Text>
            <Feather name="check" size={16} color={guideColor3 == BLACK ? RED : guideColor3} />
          </View>
          <Text style={styles.title3}>
            추천인의 닉네임을 입력해주세요 <Text style={{ color: BLUE }}>{"(선택 사항)"}</Text>
          </Text>
          <Text style={styles.title4}>추천인을 입력하시면 두 분 모두에게 1,000p를 드려요!</Text>
          <View style={styles.nickNameView}>
            <TextInput
              placeholder="추천인 닉네임"
              placeholderTextColor={GREY}
              style={[styles.nickNameTextInput, { borderColor: nickNameColor2 }]}
              value={nickName2}
              onChangeText={setNickName2}
              onChange={(e) => {
                setNickNameColor2(GREY);
                setGuideColor4(GREY);
                setButtonColor2(e.nativeEvent.text.length == 0 ? GREY_BUTTON : BLUE);
              }}
            />
            <TouchableOpacity
              style={[styles.nickNameButton, { backgroundColor: buttonColor2 }]}
              disabled={buttonColor2 == BLUE ? false : true}
              onPress={checkUser}
            >
              <Text style={styles.nickNameButtonText}>찾아 보기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.guideView}>
            <Text style={[styles.guideText, { color: guideColor4 }]}>
              · 작심친구에 있는 닉네임이어야 해요
            </Text>
            <Feather name="check" size={16} color={guideColor4 == BLACK ? RED : guideColor4} />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: buttonColor1 == BLACK ? BLUE : "#F5F5FB" },
          ]}
          onPress={() => {
            postNickName();
            navigation.navigate("BirthDay");
          }}
          disabled={buttonColor1 != BLACK}
        >
          <Text style={[styles.submitButtonText, { color: buttonColor1 == BLACK ? "#fff" : GREY }]}>
            다음으로
          </Text>
        </TouchableOpacity>
        <NickNameModal1 visible={modalVisible1} setVisible={setModalVisible1} nickName={nickName} />
        <NickNameModal2 visible={modalVisible2} setVisible={setModalVisible2} />
        <NickNameModal3
          visible={modalVisible3}
          setVisible={setModalVisible3}
          nickName={nickName2}
        />
        <NickNameModal4 visible={modalVisible4} setVisible={setModalVisible4} />
      </Wrapper>
    </SafeAreaView>
  );
};

function checkGuide2(currentNickName: string) {
  const korRule = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/;
  return korRule.test(currentNickName);
}

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding: 0px 25px;
`;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: "#101647",
    fontWeight: "400",
    marginTop: 72,
  },
  title2: {
    fontSize: 17,
    fontWeight: "400",
    color: "#101647",
    marginTop: 20,
    marginBottom: 50,
  },
  nickNameView: {
    flexDirection: "row",
    marginBottom: 20,
  },
  nickNameTextInput: {
    paddingHorizontal: 16,
    paddingVertical: 17,
    color: "#101647",
    backgroundColor: "#F5F5FB",
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
  },
  nickNameButton: {
    marginLeft: 11,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  nickNameButtonText: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 16,
  },
  guideView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  guideText: {
    fontWeight: "400",
    fontSize: 12,
    color: "#6F81A9",
    marginBottom: 10,
  },
  title3: {
    marginTop: 60,
    fontSize: 17,
    fontWeight: "600",
    color: "#101647",
  },
  title4: {
    color: "#101647",
    fontWeight: "400",
    fontSize: 12,
    marginTop: 8,
    marginBottom: 30,
  },
  submitButton: {
    borderRadius: 13,
    marginBottom: 34,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    fontWeight: "600",
    fontSize: 17,
  },
});
