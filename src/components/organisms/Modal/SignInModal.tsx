import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSetRecoilState } from "recoil";
import { isUserStatusAtom, SignInAtom } from "../../../common/atom";

export interface SignInModal1Props {
  visible: boolean;
}

export default function SignInModal({ visible }: SignInModal1Props) {
  const navigation = useNavigation();
  const goHome = () => navigation.navigate("Home");
  const setModalVisible = useSetRecoilState(SignInAtom);
  const setIsUser = useSetRecoilState(isUserStatusAtom);
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text1}>가입 완료</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(false);
              setTimeout(() => {
                setIsUser("success");
              }, 200);
            }}
          >
            <Ionicons name="close-outline" color="#101647" size={24} />
          </TouchableOpacity>
          <Text style={styles.text2}>작심친구와{"\n"} 자기계발하러 가요!</Text>
          <Text style={styles.text3}>활동에 필요한 캐시는{"\n"}프로필에서 확인할 수 있어요!</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#1016474D",
    justifyContent: "center",
    paddingHorizontal: 45,
  },
  container: {
    backgroundColor: "#fff",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  text1: {
    color: "#044DE4",
    fontWeight: "600",
    fontSize: 17,
    alignSelf: "center",
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  text2: {
    fontWeight: "600",
    fontSize: 28,
    color: "#101647",
    textAlign: "center",
  },
  text3: {
    fontWeight: "400",
    fontSize: 17,
    color: "#101647",
    marginTop: 70,
    textAlign: "center",
  },
});
