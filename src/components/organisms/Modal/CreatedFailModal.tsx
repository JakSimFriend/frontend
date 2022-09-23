import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSetRecoilState } from "recoil";
import { createdFailModalAtom } from "../../../common/atom";

export interface CreatedFailModalProps {
  visible: boolean;
}

export default function CreatedFailModal({ visible }: CreatedFailModalProps) {
  const navigation = useNavigation();
  const goHome = () => navigation.navigate("Home");
  const setModalVisible = useSetRecoilState(createdFailModalAtom);
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text1}>개설 실패!</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(false);
              setTimeout(() => {
                goHome();
              }, 200);
            }}
          >
            <Ionicons name="close-outline" color="#101647" size={24} />
          </TouchableOpacity>
          <Text style={styles.text2}>캐시가{"\n"} 부족해요!</Text>
          <Text style={styles.text3}>챌린지를 완료하면{"\n"}캐시를 얻을 수 있어요!</Text>
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
