import { useNavigation } from "@react-navigation/native";
import { Color } from "@src/assets/color";
import { Challenge } from "@src/components/home/interface/recommend-challenge";
import axios from "axios";
import * as R from "ramda";
import React, { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { useRecoilValue } from "recoil";
import styled from "styled-components/native";

import { userIdxAtom } from "../../../common/atom";
import { GradientButtons } from "../../../components/atoms/GradientButtons";
import { SearchIcon } from "../../../components/atoms/TabIcon";
import { SearchCategory } from "../../../components/molecules/categories/SearchCategory";
import { SearchByCategoryRequest } from "./interface/search-by-category.interface";
import { SearchChallengeCard } from "./search-challenge-card";

export const Search = () => {
  const navigation: any = useNavigation();
  const [categoryName, setCategoryName] = useState("전체");
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [categoryEmpty, setCategoryEmpty] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [isInputFocus, setIsInputFocus] = useState<boolean>(false);
  const goToOpenChallenge = () => navigation.navigate("Category");

  const navMove = ({
    title,
    certification,
    accept,
    challengeIdx,
  }: {
    title: string;
    certification: string;
    accept: number;
    challengeIdx: number;
  }) => {
    navigation.navigate("SearchChallenge", {
      title: title,
      schedule: certification,
      members: accept,
      challengeIdx: challengeIdx,
    });
  };

  const [searchDates, setSearchDates] = useState<{
    ends: Challenge[];
    recruitments: Challenge[];
  }>();
  const userIdx = useRecoilValue(userIdxAtom);
  useEffect(() => {
    axios
      .get<SearchByCategoryRequest>(
        `https://eddy-pl.com/api/searches/${categoryIndex}/${userIdx}`,
      )
      .then(({ data }) => {
        if (data.result === undefined) {
          setCategoryEmpty(true);
        } else if (data.code === 1000) {
          setSearchDates(R.head(data.result) as { ends: Challenge[]; recruitments: Challenge[] });
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
      <View
        style={
          isInputFocus ? { ...styles.searchBar, ...styles.focusBorder } : { ...styles.searchBar }
        }
      >
        <View style={styles.iconWrapper}>
          <SearchIcon />
        </View>
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder="다양한 챌린지를 검색해보세요!"
          placeholderTextColor="#6b7ba2"
          onChangeText={(text) => setSearchInput(text)}
          onFocus={() => setIsInputFocus(true)}
          onBlur={() => setIsInputFocus(false)}
        />
      </View>
      <SearchCategory
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        setCategoryIndex={setCategoryIndex}
      />

      <ScrollView
        style={{ backgroundColor: Color.white[200], paddingVertical: 20, paddingHorizontal: 20 }}
      >
        {categoryEmpty ? (
          <EmptyBox>
            <EmptyBoxText>아직 도전작심이 없어요</EmptyBoxText>
          </EmptyBox>
        ) : (
          <>
            {searchDates &&
              searchDates.recruitments
                ?.filter((item: any) => {
                  if (searchInput === "") return item;
                  else if (item.title.toLowerCase().includes(searchInput)) {
                    return item;
                  }
                })
                .map((item: Challenge, index: number) => (
                  <SearchChallengeCard
                    key={index}
                    item={item}
                    nav={({
                      title,
                      certification,
                      accept,
                      challengeIdx,
                    }: {
                      title: string;
                      certification: string;
                      accept: number;
                      challengeIdx: number;
                    }) => navMove({ title, certification, accept, challengeIdx })}
                  />
                ))}

            {searchDates &&
              searchDates.ends
                ?.filter((item: any) => {
                  if (searchInput === "") return item;
                  else if (item.title.toLowerCase().includes(searchInput)) {
                    return item;
                  }
                })
                .map((item: Challenge, index: number) => (
                  <SearchChallengeCard
                    key={index}
                    item={item}
                    isDisabled
                    nav={({
                      title,
                      certification,
                      accept,
                      challengeIdx,
                    }: {
                      title: string;
                      certification: string;
                      accept: number;
                      challengeIdx: number;
                    }) => navMove({ title, certification, accept, challengeIdx })}
                  />
                ))}
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
  searchBar: {
    backgroundColor: Color.white[200],
    borderRadius: 15,
    padding: Platform.OS === "android" ? 0 : 10,
    width: "90%",
    marginTop: 10,
    flexDirection: "row",
    marginLeft: "5%",
    borderWidth: 1,
    borderColor: Color.white[200],
  },
  focusBorder: {
    borderColor: Color.blue[100],
    borderWidth: 1,
  },
  iconWrapper: {
    marginLeft: Platform.OS === "android" ? 10 : 0,
    marginTop: Platform.OS === "android" ? 12 : 0,
  },
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
