import { Color } from "@src/assets/color";
import { HomeCalendar, HomeClock, HomeUser } from "@src/components/atoms/TabIcon";
import { Challenge } from "@src/components/home/interface/recommend-challenge";
import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SearchChallengeCardProps {
  item: Challenge;
  isDisabled?: boolean;
  nav: ({
    title,
    certification,
    accept,
    challengeIdx,
  }: {
    title: string;
    certification: string;
    accept: number;
    challengeIdx: number;
  }) => void;
}

export const SearchChallengeCard = ({
  item,
  isDisabled = false,
  nav,
}: SearchChallengeCardProps) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          nav({
            title: item.title,
            certification: item.certification,
            accept: item.accept,
            challengeIdx: item.challengeIdx,
          })
        }
        disabled={isDisabled}
      >
        <View style={styles.searchBox}>
          {isDisabled && (
            <ImageBackground
              source={require("../../../assets/images/Book.png")}
              blurRadius={25}
              style={styles.blurBackground}
              borderRadius={15}
            >
              <Text style={styles.blurText}>마감</Text>
            </ImageBackground>
          )}
          <View style={{ padding: 16 }}>
            <View style={styles.searchHeader}>
              <Text style={styles.searchTitle}>{item.title}</Text>
              <View style={styles.categoryWrapper}>
                <Text style={styles.categoryText}>{item.categoryName}</Text>
              </View>
            </View>
            <View style={styles.tagWrapper}>
              <Text style={styles.tags}>
                {item.tags[2] ? `#${item.tags[2]}` : ""} {item.tags[1] ? `#${item.tags[1]}` : ""}{" "}
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
    </View>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: Color.white[0],
    borderRadius: 13,
    marginVertical: 5,
  },
  blurBackground: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  blurText: {
    color: Color.white[0],
    textAlign: "center",
    fontSize: 25,
    fontWeight: "600",
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
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: Color.white[100],
    borderRadius: 20,
    marginLeft: 8,
  },
  categoryText: {
    color: Color.blue[900],
    fontSize: 12,
  },
  tagWrapper: {
    marginTop: 15,
  },
  tags: {
    color: Color.blue[900],
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
