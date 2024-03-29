import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export interface NickNameModal3Props {
  visible: boolean;
  setVisible: (value: (value: boolean) => boolean) => void;
  nickName: string;
}

export default function NickNameModal3({ visible, setVisible, nickName }: NickNameModal3Props) {
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text1}>추천 성공</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => setVisible(() => false)}>
            <Ionicons name="close-outline" color="#101647" size={24} />
          </TouchableOpacity>
          <Text style={styles.text2}>{nickName}님이{"\n"}추천하셨어요!</Text>
          <Text style={styles.text3}>작심하러 가실 때{'\n'}1,000P 받아가세요!</Text>
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
    marginTop: 95,
    textAlign: "center",
  },
});
