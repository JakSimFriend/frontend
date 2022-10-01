import { Color } from "@src/assets/color";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface Notification {
  alertIdx: number;
  image: string;
  alert: string;
  time: string;
}

export interface Alert {
  date: string;
  notifications: Notification[];
}

interface AlertItemProps {
  alert: Alert;
  cancel: () => void;
}

const AlertItem = ({ alert, cancel }: AlertItemProps) => {
  console.log(alert);
  return (
    <>
      {alert.notifications.map((noti: Notification, index: number) => (
        <View key={index} style={styles.alertWrapper}>
          <Image
            resizeMode="contain"
            source={{ uri: noti.image }}
            style={(styles.icon, { width: 25, height: 25 })}
          />
          <View style={styles.mainContentWrapper}>
            <Text style={styles.alert}>{noti.alert}</Text>
            <Text style={styles.date}>{alert.date + noti.time}</Text>
          </View>
        </View>
      ))}
    </>
  );
};

export default AlertItem;

const styles = StyleSheet.create({
  icon: {
    width: 40,
    height: 40,
  },
  alertWrapper: {
    flexDirection: "row",
    marginBottom: 20,
  },
  mainContentWrapper: {
    marginLeft: 10,
  },
  alert: {
    fontWeight: "400",
    fontSize: 17,
    lineHeight: 25,
  },
  date: {
    color: Color.blue[900],
    fontSize: 12,
    marginTop: 10,
  },
});
