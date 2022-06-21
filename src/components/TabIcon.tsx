import React from "react";
import Home from "react-native-vector-icons/Ionicons";
import Diamond from "react-native-vector-icons/MaterialCommunityIcons";
import Clock from "react-native-vector-icons/AntDesign";
import User from "react-native-vector-icons/FontAwesome";
import ClockTwo from "react-native-vector-icons/Feather";
import CalendarTwo from "react-native-vector-icons/Feather";
import UserTwo from "react-native-vector-icons/Feather";
import Search from "react-native-vector-icons/EvilIcons";
import Back from "react-native-vector-icons/Ionicons";

type TabBarIconProps = {
  focused: boolean;
};

export const HomeIcon = ({ focused }: TabBarIconProps) => {
  return (
    <Home
      name={focused ? "home" : "home-outline"}
      color={focused ? "#054DE4" : "#BFC7D7"}
      size={23}
    />
  );
};
export const DiamondIcon = ({ focused }: TabBarIconProps) => {
  return (
    <Diamond
      name={focused ? "diamond" : "diamond-outline"}
      color={focused ? "#054DE4" : "#BFC7D7"}
      size={23}
    />
  );
};
export const ClockIcon = ({ focused }: TabBarIconProps) => {
  return (
    <Clock
      name={focused ? "clockcircle" : "clockcircleo"}
      color={focused ? "#054DE4" : "#BFC7D7"}
      size={23}
    />
  );
};
export const UserIcon = ({ focused }: TabBarIconProps) => {
  return (
    <User
      name={focused ? "user-circle" : "user-o"}
      color={focused ? "#054DE4" : "#BFC7D7"}
      size={23}
    />
  );
};
export const HomeClock = () => {
  return <ClockTwo name="clock" size={15} />;
};
export const HomeCalendar = () => {
  return <CalendarTwo name="calendar" size={15} />;
};
export const HomeUser = () => {
  return <UserTwo name="users" size={15} />;
};
export const SearchIcon = () => {
  return <Search name="search" size={30} />;
};
export const BackIcon = () => {
  return <Back name="arrow-back" size={30} />;
};

