import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import { SearchIcon } from "../../../components/atoms/TabIcon";
import { GradientButtons } from "../../../components/atoms/GradientButtons";
import { HomeCalendar, HomeClock, HomeUser } from "../../../components/atoms/TabIcon";
import axios from "axios";
import { userIndexAtom } from "../../../common/atom";
import { useRecoilValue } from "recoil";
import { SearchCategory } from "../../../components/molecules/categories/SearchCategory";

export const Search = () => {
  const navigation: any = useNavigation();
  const [categoryName, setCategoryName] = useState("전체");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [categoryEmpty, setCategoryEmpty] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const goToOpenChallenge = () => navigation.navigate("Category");

  const [searchDatas, setSearchDatas]: any = useState([]);
  const userIdx = useRecoilValue(userIndexAtom);
  useEffect(() => {
    axios
      .get(`https://jaksimfriend.site/searches/${categoryIndex}/${userIdx}`)
      .then(function (response) {
        if (response.data.result === undefined) {
          setCategoryEmpty(true);
          console.log(response)
        } else if (response.data.code === 1000) {
          setSearchDatas(response.data.result[0]);
          setCategoryEmpty(false);
        }
      })
      .catch(function (error) {
        setCategoryEmpty(true);
        console.log(error);
      });
  }, [categoryIndex]);
  return (
    <Wrapper>
      <View style={styles.searchBar}>
        <View style={styles.iconWrapper}>
          <SearchIcon />
        </View>
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder="다양한 챌린지를 검색해보세요!"
          placeholderTextColor="#6b7ba2"
          onChangeText={(text) => setSearchInput(text)}
        />
      </View>
      <SearchCategory
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        setCategoryIndex={setCategoryIndex}
      />

      <ScrollView>
        {categoryEmpty ? (
          <EmptyBox>
            <EmptyBoxText>아직 도전작심이 없어요{"\n"}직접 도전작심을 개설해보세요!</EmptyBoxText>
          </EmptyBox>
        ) : (
          <>
            {searchDatas.recruitments
              ?.filter((item: any) => {
                if (searchInput === "") return item;
                else if (item.title.toLowerCase().includes(searchInput)) {
                  return item;
                }
              })
              .map((item: any, index: number) => {
                return (
                  <View key={index}>
                    {categoryName === "전체" || categoryName === item.categoryName ? (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("SearchChallenge", {
                            title: item.title,
                            schedule: item.certification,
                            members: item.accept,
                            challengeIdx: item.challengeIdx,
                          });
                        }}
                      >
                        <View style={styles.searchBox}>
                          <View style={{ paddingVertical: 20, paddingHorizontal: 30 }}>
                            <View style={styles.searchHeader}>
                              <Text style={styles.searchTitle}>{item.title}</Text>
                              <View style={styles.categoryWrapper}>
                                <Text style={styles.categoryText}>{item.categoryName}</Text>
                              </View>
                            </View>
                            <View style={styles.tagWrapper}>
                              <Text style={styles.tags}>
                                {item.tags[2] ? `#${item.tags[2]}` : ""}{" "}
                                {item.tags[1] ? `#${item.tags[1]}` : ""}{" "}
                                {item.tags[0] ? `#${item.tags[0]}` : ""}
                              </Text>
                            </View>
                            <View style={styles.infoWrapper}>
                              <Text style={styles.infoText}>
                                <HomeCalendar />
                                <Text> {item.startDate}</Text>
                              </Text>
                              <Text style={styles.infoText}>
                                <HomeClock />
                                <Text> {item.certification}</Text>
                              </Text>
                              <Text style={styles.infoText}>
                                <HomeUser />
                                <Text> {item.accept}명</Text>
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <></>
                    )}
                  </View>
                );
              })}

            {searchDatas.ends
              ?.filter((item: any) => {
                if (searchInput === "") return item;
                else if (item.title.toLowerCase().includes(searchInput)) {
                  return item;
                }
              })
              .map((item: any, index: number) => {
                return (
                  <View key={index}>
                    {categoryName === "전체" || categoryName === item.categoryName ? (
                      <>
                        <View style={styles.searchBox}>
                          <ImageBackground
                            source={require("../../../assets/images/Book.png")}
                            blurRadius={25}
                            style={styles.blurBackground}
                            borderRadius={15}
                          >
                            <Text style={styles.blurText}>마감</Text>
                          </ImageBackground>
                          <View style={{ paddingVertical: 20, paddingHorizontal: 30 }}>
                            <View style={styles.searchHeader}>
                              <Text style={styles.searchTitle}>{item.title}</Text>
                              <View style={styles.categoryWrapper}>
                                <Text style={styles.categoryText}>{item.categoryName}</Text>
                              </View>
                            </View>
                            <View style={styles.tagWrapper}>
                              <Text style={styles.tags}>#{item.tags}</Text>
                            </View>
                            <View style={styles.infoWrapper}>
                              <Text style={styles.infoText}>
                                <HomeCalendar />
                                <Text> {item.startDate}</Text>
                              </Text>
                              <Text style={styles.infoText}>
                                <HomeClock />
                                <Text> {item.certification}</Text>
                              </Text>
                              <Text style={styles.infoText}>
                                <HomeUser />
                                <Text> {item.accept}명</Text>
                              </Text>
                            </View>
                          </View>
                        </View>
                      </>
                    ) : (
                      <></>
                    )}
                  </View>
                );
              })}
          </>
        )}
      </ScrollView>
      {categoryEmpty ? (
        <OpenChallenge>
          <GradientButtons onPress={goToOpenChallenge} Title="도전작심 개설하기" />
        </OpenChallenge>
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: "#f6f5fb",
    borderRadius: 15,
    marginHorizontal: 20,
    marginVertical: 5,
  },
  searchBar: {
    backgroundColor: "#f6f5fb",
    borderRadius: 15,
    padding: Platform.OS === "android" ? 0 : 10,
    width: "90%",
    marginTop: 10,
    flexDirection: "row",
    marginLeft: "5%",
  },
  blurBackground: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  blurText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "600",
  },
  iconWrapper: {
    marginLeft: Platform.OS === "android" ? 10 : 0,
    marginTop: Platform.OS === "android" ? 12 : 0,
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  categoryWrapper: {
    paddingHorizontal: 12,
    backgroundColor: "#054DE4",
    borderRadius: 15,
    marginLeft: 10,
  },
  categoryText: {
    color: "#ffffff",
    paddingVertical: 6,
  },
  tagWrapper: {
    marginTop: 15,
  },
  tags: {
    color: "#6F81A9",
  },
  infoWrapper: {
    marginTop: 20,
    flexDirection: "row",
  },
  infoText: {
    marginRight: 20,
    fontSize: 15,
  },
  inputText: {},
});

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
`;
const EmptyBox = styled.View`
  padding: 40px 15px;
  background-color: #f6f5fb;
  border-radius: 15px;
  margin: 20px;
  align-items: center;
`;
const EmptyBoxText = styled.Text`
  align-self: center;
  color: #6f81a9;
  font-size: 20px;
  text-align: center;
`;
const OpenChallenge = styled.View`
  align-self: center;
  width: 70%;
  position: absolute;
  bottom: 0;
  margin-bottom: 30px;
`;
