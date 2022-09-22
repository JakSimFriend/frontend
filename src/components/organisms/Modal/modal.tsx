import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Color } from "../../../assets/color";

interface ModalProps {
  isVisible: boolean;
  title: string;
  body: React.ReactChild;
  closeFn: () => void;
}

const ModalComponent = ({ isVisible, title, body, closeFn }: ModalProps) => {
  return (
    <Modal visible={isVisible} transparent={true}>
      <View style={styles.background}>
        <View style={styles.ModalWrapper}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              closeFn();
            }}
          >
            <Ionicons name="close-outline" color="#101647" size={24} />
          </TouchableOpacity>
          {body}
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#1016474D",
    justifyContent: "center",
    paddingHorizontal: 45,
  },
  ModalWrapper: {
    backgroundColor: Color.white[0],
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  title: {
    color: Color.blue[100],
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
});
