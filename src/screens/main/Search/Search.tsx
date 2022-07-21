import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import { SearchIcon } from "../../../components/TabIcon";
import { GradientButtons } from "../../../components/GradientButtons";
import { HomeCalendar, HomeClock, HomeUser } from "../../../components/TabIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const Search = () => {
  const navigation: any = useNavigation();
  const categories = [
    "전체",
    "시사",
    "독서",
    "외국어",
    "전공 기초",
    "예술",
    "습관",
    "운동",
    "기타",
  ];
  const [categoryName, setCategoryName] = useState("전체");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [categoryEmpty, setCategoryEmpty] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // (검색input)
  const goToOpenChallenge = () => navigation.navigate("Category");
  const DownValue = useState(new Animated.Value(0))[0];

  const [searchDatas, setSearchDatas]: any = useState([]);
  useEffect(() => {
    AsyncStorage.getItem("userIdx").then((value) => {
      const userIdx = value;
      axios
        .get(`https://jaksimfriend.site/searches/${categoryIndex}/${userIdx}`)
        .then(function (response) {
          setSearchDatas(response.data.result[0]);
          setCategoryEmpty(false);
          if (response.data.result === undefined) {
            setCategoryEmpty(true);
          }
        })
        .catch(function (error) {
          setCategoryEmpty(true);
        });
    });
  }, [categoryIndex]);

  return (
    <Wrapper>
      <Animated.View
        style={{
          top: DownValue,
        }}
      >
        <InputWrapper>
          <InputBox
            placeholder="다양한 챌린지를 검색해보세요!"
            placeholderTextColor={"#6b7ba2"}
            onChangeText={(text) => setSearchInput(text)}
          />
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        </InputWrapper>
      </Animated.View>
      <CategoryBox>
        {categories.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setCategoryName(item);
                setCategoryIndex(index);
              }}
              style={categoryName === item ? styles.categoryBorderSelected : styles.categoryBorder}
            >
              <Category style={categoryName === item ? styles.categorySelected : styles.category}>
                {item}
              </Category>
            </TouchableOpacity>
          );
        })}
      </CategoryBox>

      <ScrollView>
        {/* 모집중 검색 필터링 */}
        {categoryEmpty ? (
          <></>
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
                            source={require("../../../assets/Book.png")}
                            blurRadius={20}
                            style={{
                              position: "absolute",
                              zIndex: 1,
                              width: "100%",
                              height: "100%",
                              justifyContent: "center",
                            }}
                            borderRadius={15}
                          >
                            <Text
                              style={{
                                color: "#ffffff",
                                textAlign: "center",
                                fontSize: 25,
                                fontWeight: "600",
                              }}
                            >
                              마감
                            </Text>
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

        {categoryEmpty ? (
          <EmptyBox>
            <EmptyBoxText>아직 도전작심이 없어요{"\n"}직접 도전작심을 개설해보세요!</EmptyBoxText>
          </EmptyBox>
        ) : (
          <></>
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
  category: {
    color: "#000000",
    fontWeight: "300",
  },
  categorySelected: {
    color: "#000000",
    fontWeight: "600",
  },
  categoryBorder: {
    paddingBottom: 10,
  },
  categoryBorderSelected: {
    borderBottomColor: "#054DE4",
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  searchBox: {
    backgroundColor: "#f6f5fb",
    borderRadius: 15,
    margin: 20,
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
});

const Wrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
`;
const InputWrapper = styled.TouchableOpacity`
  align-items: flex-start;
  flex-direction: row;
  margin-top: 5px;
  padding-left: 10px;
`;
const InputBox = styled.TextInput`
  background-color: #f6f5fb;
  border-radius: 10px;
  padding: 15px;
  width: 83%;
  margin-left: 12px;
`;
const SearchIconWrapper = styled.View`
  margin: 12px 0 0 5px;
`;
const CategoryBox = styled.View`
  flex-direction: row;
  margin-top: 30px;
  justify-content: space-evenly;
  align-items: center;
  border-bottom-width: 2px;
  border-bottom-color: #f6f5fb;
`;
const Category = styled.Text`
  color: #000000;
  font-size: 15px;
  font-weight: 900;
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
