import React, { useEffect, useState } from "react";
import {
  Animated,
  Modal,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedInAtom, isUserAtom, userIndexAtom } from "../../../../atom";
import { unlink } from "@react-native-seoul/kakao-login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export interface WithdrawalModalProps {
  visible: boolean;
  setVisible: (value: (value: boolean) => boolean) => void;
}

export default function WithdrawalModal({ visible, setVisible }: WithdrawalModalProps) {
  const [text, setText] = useState("");
  const [textInputBorderColor, setTextInputBordercolor] = useState("#BFC7D7");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const upValue = new Animated.Value(-500);
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setIsUser = useSetRecoilState(isUserAtom);
  const userIdx = useRecoilValue(userIndexAtom);

  const sheetUp = () => {
    Animated.timing(upValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const sheetDown = () => {
    Animated.timing(upValue, {
      toValue: -500,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const showBottomSheet = () => {
    sheetUp();
  };
  const hideBottomSheet = () => {
    sheetDown();
    setTimeout(() => {
      setText("");
      setVisible(() => false);
    }, 300);
  };

  useEffect(() => {
    if (visible) showBottomSheet();
  }, [visible]);

  const onChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    if (e.nativeEvent.text == "탈퇴") {
      setButtonDisabled(false);
      setTextInputBordercolor("#101647");
    } else if (e.nativeEvent.text.length == 0) {
      setTextInputBordercolor("#BFC7D7");
      setButtonDisabled(true);
    } else if (e.nativeEvent.text != "탈퇴") {
      setTextInputBordercolor("#044DE4");
      setButtonDisabled(true);
    }
  };

  const KakaoSignOut = async (): Promise<void> => {
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

  return (
    <Modal visible={visible} transparent={true}>
      <TouchableOpacity style={{ height: "100%" }} activeOpacity={1} onPress={hideBottomSheet}>
        <View style={styles.back} accessible={false}>
          <Animated.View style={[styles.containerView, { bottom: upValue }]}>
            <TouchableOpacity style={styles.containerTouchableOpacity} activeOpacity={1}>
              <Text style={styles.title}>작심친구를{"\n"}탈퇴하시겠어요?</Text>
              <Text style={styles.title2}>
                한번 탈퇴하면 3개월간 재가입할 수 없어요{"\n"}탈퇴를 원하시면 아래에 탈퇴라고
                적어주세요
              </Text>
              <TextInput
                style={[styles.textInput, { borderColor: textInputBorderColor }]}
                placeholder="탈퇴"
                value={text}
                onChangeText={setText}
                onChange={onChange}
              />
              <TouchableOpacity onPress={KakaoSignOut} disabled={buttonDisabled}>
                <LinearGradient
                  style={styles.linearGradient}
                  colors={buttonDisabled ? ["#F5F5FB", "#F5F5FB"] : ["#947BEA", "#1151E5"]}
                >
                  <Text style={[styles.buttonText, { color: buttonDisabled ? "#6F81A9" : "#fff" }]}>
                    탈퇴하기
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: "#1016474D",
    flex: 1,
  },
  containerView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  containerTouchableOpacity: {
    backgroundColor: "#fff",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  title: {
    fontWeight: "600",
    fontSize: 28,
    color: "#101647",
  },
  title2: {
    fontSize: 17,
    color: "#6F81A9",
    marginTop: 10,
    marginBottom: 60,
  },
  textInput: {
    backgroundColor: "#F5F5FB",
    borderWidth: 1,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 17,
    color: "#101647",
  },
  linearGradient: {
    flex: 1,
    borderRadius: 13,
    paddingVertical: 16,
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
  },
});
