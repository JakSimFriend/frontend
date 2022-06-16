import React from "react";
import Home from "react-native-vector-icons/Ionicons";
import Diamond from "react-native-vector-icons/MaterialCommunityIcons";
import Clock from "react-native-vector-icons/AntDesign";
import User from "react-native-vector-icons/FontAwesome";

type TabBarIconProps = {
  focused: boolean;
};

export const HomeIcon = ({ focused }: TabBarIconProps) => {
  return <Home name={focused ? "home" : "home-outline"} size={23} color="black" />;
};
export const DiamondIcon = ({ focused }: TabBarIconProps) => {
  return <Diamond name={focused ? "diamond" : "diamond-outline"} size={23} color="black" />;
};
export const ClockIcon = ({ focused }: TabBarIconProps) => {
  return <Clock name={focused ? "clockcircle" : "clockcircleo"} size={23} color="black" />;
};
export const UserIcon = ({ focused }: TabBarIconProps) => {
  return <User name={focused ? "user-circle" : "user-o"} size={23} color="black" />;
};
