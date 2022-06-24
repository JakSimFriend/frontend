import React from "react";
import { GestureResponderEvent, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components/native";

type ButtonProps = {
  Title: String;
  onPress: (event: GestureResponderEvent) => void;
};

export const GradientButtons = ({ Title, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient style={styles.linearGradient} colors={["#947BEA", "#1151E5"]}>
        <ButtonText>{Title}</ButtonText>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    padding: 5,
    marginBottom: 20,
    borderRadius: 13,
  },
});
const ButtonText = styled.Text`
  color: #ffffff;
  text-align: center;
  font-family: "Gill Sans";
  font-weight: 600;
  font-size: 16px;
  margin: 10px;
`;
