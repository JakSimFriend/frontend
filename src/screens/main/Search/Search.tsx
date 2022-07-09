import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { SearchIcon } from "../../../components/TabIcon";
import { GradientButtons } from "../../../components/GradientButtons";
import { HomeCalendar, HomeClock, HomeUser } from "../../../components/TabIcon";
import moment from "moment";

export const searchData = [
  {
    title: "제목1",
    categoryIndex: 3,
    content: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    tags: ["최대4글", "자넘어가", "면잘리게"],
    startDate: "2022-08-01",
    schedule: "1주일에 2회",
    members: 5,
  },
  {
    title: "제목2",
    categoryIndex: 4,
    content: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    tags: ["최대4글", "자넘어가", "면잘리게"],
    startDate: "2022-08-04",
    schedule: "2주일에 2회",
    members: 2,
  },
  {
    title: "제목3",
    categoryIndex: 2,
    content: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    tags: ["최대4글", "자넘어가", "면잘리게"],
    startDate: "2022-08-07",
    schedule: "1주일에 4회",
    members: 3,
  },
  {
    title: "제목4",
    categoryIndex: 5,
    content: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    tags: ["최대4글", "자넘어가", "면잘리게"],
    startDate: "2022-09-01",
    schedule: "1주일에 6회",
    members: 5,
  },
  {
    title: "제목4",
    categoryIndex: 5,
    content: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    tags: ["최대4글", "자넘어가", "면잘리게"],
    startDate: "2022-09-01",
    schedule: "1주일에 6회",
    members: 5,
  },
  {
    title: "제목5",
    categoryIndex: 1,
    content: "설명설명설명설명설명설명설명설명설명설명설명설명설명설명",
    tags: ["최대4글", "자넘어가", "면잘리게"],
    startDate: "2022-10-23",
    schedule: "2주일에 2회",
    members: 1,
  },
];

//블러처리 추가(마감)
export const Search = () => {
  const navigation: any = useNavigation();
  const categories = ["전체", "시사", "독서", "외국어", "전공기초", "예술", "습관", "운동", "기타"];
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false); //data(마감<진행중>)
  const [searchInput, setSearchInput] = useState(""); //data(검색input)
  const goToOpenChallenge = () => navigation.navigate("Category");
  const DownValue = useState(new Animated.Value(0))[0];
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
                setCategoryIndex(index);
              }}
              style={
                categoryIndex === index ? styles.categoryBorderSelected : styles.categoryBorder
              }
            >
              <Category style={categoryIndex === index ? styles.categorySelected : styles.category}>
                {item}
              </Category>
            </TouchableOpacity>
          );
        })}
      </CategoryBox>
      <ScrollView>
        {/* 검색 필터링 */}
        {searchData
          ?.filter((item) => {
            if (searchInput === "") return item;
            else if (item.title.toLowerCase().includes(searchInput)) {
              return item;
            }
          })
          .map((item, index) => {
            return (
              <View key={index}>
                {categoryIndex === 0 || categoryIndex === item.categoryIndex ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("SearchChallenge", {
                        title: item.title,
                        content: item.content,
                        startDate: item.startDate,
                        schedule: item.schedule,
                        members: item.members,
                      });
                    }}
                  >
                    <View style={isStarted ? styles.startedSearchBox : styles.searchBox}>
                      <View style={styles.searchHeader}>
                        <Text style={styles.searchTitle}>{item.title}</Text>
                        <View style={styles.categoryWrapper}>
                          <Text style={styles.categoryText}>{categories[item.categoryIndex]}</Text>
                        </View>
                      </View>
                      <View style={styles.tagWrapper}>
                        <Text style={styles.tags}>#{item.tags}</Text>
                      </View>
                      <View style={styles.infoWrapper}>
                        <Text style={styles.infoText}>
                          <HomeCalendar />
                          <Text> {moment(item.startDate).format(`M월 D일`)}</Text>
                        </Text>
                        <Text style={styles.infoText}>
                          <HomeClock />
                          <Text> {item.schedule}</Text>
                        </Text>
                        <Text style={styles.infoText}>
                          <HomeUser />
                          <Text> {item.members}명</Text>
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <></>
                )}
              </View>
            );
          })}

        {/* 카테고리 비었을시 보여줄 컴포넌트 */}
        {/* <>
            <ScrollView>
              <EmptyBox>
                <EmptyBoxText>
                  아직 도전작심이 없어요{"\n"}직접 도전작심을 개설해보세요!
                </EmptyBoxText>
              </EmptyBox>
            </ScrollView>
            <OpenChallenge>
              <GradientButtons onPress={goToOpenChallenge} Title="도전작심 개설하기" />
            </OpenChallenge>
          </> */}
      </ScrollView>
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
  startedSearchBox: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "#f6f5fb",
    borderRadius: 15,
    margin: 20,
    // 블러처리 추가
  },
  searchBox: {
    paddingVertical: 20,
    paddingHorizontal: 30,
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
  margin-top: 15px;
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
