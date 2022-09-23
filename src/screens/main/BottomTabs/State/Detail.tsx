import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import axios from "axios";
import { a, b, c, d, e, f, g, h } from "../../../../assets/images/images";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useRecoilValue } from "recoil";
import { userIdxAtom } from "../../../../common/atom";

export const Detail = () => {
  const icons = [a, b, c, d, e, f, g, h];
  const navigation = useNavigation();
  const [detailEmpty, setDetailEmpty] = useState(true);
  const [detailData, setDetailData]: any = useState([]);
  const userIdx = useRecoilValue(userIdxAtom);
  useEffect(() => {
    axios
      .get(`https://jaksimfriend.site/status/${userIdx}/detail`)
      .then(function (response) {
        if (response.data.code === 3049) {
          setDetailEmpty(true);
        } else if (response.data.code === 1000) {
          setDetailEmpty(false);
          setDetailData(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
        setDetailEmpty(true);
      });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Wrapper>
        <View style={styles.topView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={25} color="#101647" />
          </TouchableOpacity>
          <Text style={styles.topText}>상세</Text>
          <Ionicons name="arrow-back" size={24} color="#0000" />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {detailEmpty ? (
            <>
              <View style={styles.EmptyView}>
                <Text style={styles.EmptyText}>완료한 챌린지가 없어요</Text>
              </View>
            </>
          ) : (
            <View style={{ marginTop: "10%" }}>
              {detailData.result?.map((item: any, index: number) => {
                return (
                  <Categories key={index}>
                    <Left>
                      <ImageWrapper style={styles.categoryBackground}>
                        <Logo resizeMode="contain" source={icons[item.categoryIdx - 1]} />
                      </ImageWrapper>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.categoryText}>{item.title}</Text>
                        <Text style={[styles.categoryText, { color: "#BFC7D7", fontSize: 15 }]}>
                          {item.endDate}
                        </Text>
                      </View>
                    </Left>
                    <TextWrapper>
                      <Text style={styles.EXP}>+{item.experience}EXP</Text>
                      <Text style={[styles.EXP, { color: "#BFC7D7", fontSize: 15 }]}>
                        {item.total}EXP
                      </Text>
                    </TextWrapper>
                  </Categories>
                );
              })}
            </View>
          )}
        </ScrollView>
      </Wrapper>
    </SafeAreaView>
  );
};

const Wrapper = styled.View`
  flex: 1;
  padding: 0 5% 0 5%;
  background-color: #ffffff;
`;
const Categories = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
  border-bottom-width: 1px;
  border-bottom-color: #f6f5fb;
  padding-bottom: 10px;
`;
const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ImageWrapper = styled.View`
  padding: 10px;
  border-radius: 10px;
`;
const Logo = styled.Image`
  width: 20px;
  height: 20px;
`;
const TextWrapper = styled.View`
  align-items: center;
`;
const styles = StyleSheet.create({
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },
  topText: {
    color: "#101647",
    fontSize: 18,
    fontWeight: "900",
    alignSelf: "center",
  },
  categoryBackground: {
    backgroundColor: "#f6f5fb",
  },
  categoryText: {
    marginLeft: 15,
    fontSize: 18,
  },
  EXP: {
    fontSize: 17,
  },
  EmptyView: {
    backgroundColor: "#F6F5FB",
    padding: 45,
    borderRadius: 15,
  },
  EmptyText: {
    color: "#6F81A9",
    alignSelf: "center",
  },
});
