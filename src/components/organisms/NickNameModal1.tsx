import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export interface NickNameModal1Props {
  visible: boolean;
  setVisible: (value: (value: boolean) => boolean) => void;
  nickName: string;
}

export default function NickNameModal1({ visible, setVisible, nickName }: NickNameModal1Props) {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text1}>사용 가능</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(() => false)}>
            <Ionicons name="close-outline" color="#101647" size={24} />
          </TouchableOpacity>
          <Text style={styles.text2}>{nickName + getLetter(nickName) + "\n사용할 수 있어요!"}</Text>
          <Text style={styles.text3}>한번 정한 닉네임은{"\n"}바꿀 수 없으니 신중하세요!</Text>
        </View>
      </View>
    </Modal>
  );
}

function isEndWithConsonant(korStr: string) {
  const finalChrCode = korStr.charCodeAt(korStr.length - 1);
  // 0 = 받침 없음, 그 외 = 받침 있음
  const finalConsonantCode = (finalChrCode - 44032) % 28;
  return finalConsonantCode !== 0;
}

function getLetter(str: string) {
  return isEndWithConsonant(str) ? "은" : "는";
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
