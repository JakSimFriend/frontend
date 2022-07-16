import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../../screens/main";
import Bell from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import messaging from "@react-native-firebase/messaging";

const Stack = createStackNavigator();

export const HomeNav = () => {
  const navigation = useNavigation();
  // authStatus === 2, 알림 비활성화
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.warn("Authorization status:", authStatus);
    }
  };
  const goToNotifications = () => {
    navigation.navigate("Notifications");
    requestUserPermission();
  };

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitle: "홈",
        headerTitleAlign: "center",
        headerTitleStyle: { fontSize: 15, fontWeight: "900" },
        headerShadowVisible: false,
        headerRightContainerStyle: { paddingRight: 20 },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerRight: () => <Bell name="bells" size={23} onPress={goToNotifications} />,
        }}
      />
    </Stack.Navigator>
  );
};
