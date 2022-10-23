import { StackScreenProps } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { SettingNavParamList } from "../../../../../navigation/setting-nav";

type NotificationData = {
  title: string;
  time: string;
}[];

export default function Notification({ navigation }: StackScreenProps<SettingNavParamList>) {
  const [data, setData] = useState<NotificationData>([
    {
      title: "공지 사항 제목",
      time: "2022/01/10 10:00",
    },
  ]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList
        data={data}
        ListHeaderComponent={
          <View style={styles.topView}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#101647" />
            </TouchableOpacity>
            <Text style={styles.topText}>공지사항</Text>
            <Ionicons name="arrow-back" size={24} color="#0000" />
          </View>
        }
        renderItem={({ item }) => (
          <>
            <TouchableOpacity
              style={styles.row}
              onPress={() => navigation.navigate("NotificationDetail")}
            >
              <View style={styles.leftView}>
                <View style={styles.iconView}>
                  <Ionicons name="notifications" color="#044DE4" size={24} />
                </View>
                <View style={styles.textView}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" color="#101647" size={18} />
            </TouchableOpacity>
            <View style={{ height: 1, width: "100%", backgroundColor: "#F5F5FB", marginTop: 10 }} />
          </>
        )}
        contentContainerStyle={{ marginHorizontal: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  topText: {
    color: "#101647",
    fontSize: 17,
    fontWeight: "600",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  leftView: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconView: {
    backgroundColor: "#F5F5FB",
    borderRadius: 13,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  textView: {
    paddingLeft: 10,
  },
  title: {
    color: "#101647",
    fontWeight: "400",
    fontSize: 17,
  },
  time: {
    color: "#BFC7D7",
    fontSize: 13,
    fontWeight: "400",
  },
});
