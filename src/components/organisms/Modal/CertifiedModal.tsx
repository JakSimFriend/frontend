import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSetRecoilState } from "recoil";
import { CertifiedAtom } from "../../../../atom";
import * as ProgressBar from "react-native-progress";

export interface Certified1Props {
  visible: boolean;
  certifiedPercent: any;
}

export default function CertifiedModal({ visible, certifiedPercent }: Certified1Props) {
  const navigation = useNavigation();
  const setModalVisible = useSetRecoilState(CertifiedAtom);
  const { width } = Dimensions.get("window");
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.text1}>오늘도 실천하셨어요!</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(false);
              setTimeout(() => {
                navigation.goBack();
              }, 200);
            }}
          >
            <Ionicons name="close-outline" color="#101647" size={24} />
          </TouchableOpacity>
          <>
            <Text style={styles.text2}>100% 달성</Text>
            <ProgressBar.Bar
              style={{ marginTop: 30 }}
              progress={100 / 100}
              width={width / 1.5}
              height={15}
              borderRadius={30}
            />
          </>
          <Text style={styles.text3}>
            멋져요. {certifiedPercent.nickName}님!${`\n`}내일도 와주실 거죠?
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
