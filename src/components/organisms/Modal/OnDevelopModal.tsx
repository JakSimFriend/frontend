import React from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRecoilState } from "recoil";

import { onDevelopModalAtom } from "../../../common/atom";

export default function OnDevelopModal() {
  const [modalTwoVisible, setModalTwoVisible] = useRecoilState(onDevelopModalAtom);
  return (
    <Modal visible={modalTwoVisible} transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text1}>프로그램 개발중 입니다</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalTwoVisible(() => false)}
          >
            <Ionicons name="close-outline" color="#101647" size={24} />
          </TouchableOpacity>
          <ActivityIndicator size={30} color={"#044DE4"} />
          <Text style={styles.text3}>
            현재 페이지는 준비중입니다.{`\n`}빠른 시일 내에 더욱 나은 모습으로 찾아뵙겠습니다.
          </Text>
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
