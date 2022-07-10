import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { recieveModalAtom } from "../../../atom";

export default function RecieveModal() {
  const modalVisible = useRecoilValue(recieveModalAtom);
  const setModalVisible = useSetRecoilState(recieveModalAtom);
  return (
    <Modal visible={modalVisible} transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text1}>도전 작심 완료</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Ionicons name="close-outline" color="#101647" size={24} />
          </TouchableOpacity>
          <Text style={styles.text2}>축하드려요!{"\n"}보상을 받으셨어요!</Text>
          <Text style={styles.text3}>경험치는 현황에서{"\n"}캐시는 프로필에서 확인하세요!</Text>
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
