import styled from "styled-components/native";

type Props = {
  Tier?: boolean;
  Exp?: boolean;
  Percentage?: boolean;
  TierBox?: boolean;
};

export const Wrapper = styled.View`
  flex: 1;
  padding: 0px 15px;
  background-color: #ffffff;
`;

export const TextStyle = styled.Text`
  color: #000000;
  font-size: 20px;
  font-weight: 400;
`;

export const TabBox = styled.View<Props>`
  background-color: #f6f5fb;
  border-radius: 15px;
  padding: 15px 10px;
  margin-right: 5px;
  align-items: ${(props) => (props.TierBox ? "center" : "")};
  margin-top: ${(props) => (props.Tier || props.TierBox ? "15px" : "0")};
  width: ${(props) => (props.Exp || props.Percentage ? "49%" : "100%")};
`;
