import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { reactionModalAtom } from "../../../atom";

export default function ReactionModal() {
  const modalVisible = useRecoilValue(reactionModalAtom);
  const setModalVisible = useSetRecoilState(reactionModalAtom);
  return (
    <Modal visible={modalVisible} transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text1}>리액션 전송</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Ionicons name="close-outline" color="#101647" size={24} />
          </TouchableOpacity>
          <Text style={styles.text2}>작심친구에게{"\n"}리액션 했어요</Text>
          <Text style={styles.text3}>해당 도전작심 내부 알림에서{"\n"}확인할 수 있어요</Text>
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
