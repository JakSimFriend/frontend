import React from "react";
import Clock from "react-native-vector-icons/AntDesign";
import ClockTwo from "react-native-vector-icons/AntDesign"; //
import CalendarTwo from "react-native-vector-icons/AntDesign"; //
import UserTwo from "react-native-vector-icons/AntDesign"; //
import Search from "react-native-vector-icons/AntDesign";
import Camera from "react-native-vector-icons/AntDesign"; //
import User from "react-native-vector-icons/FontAwesome";
import Flag from "react-native-vector-icons/FontAwesome";
import Home from "react-native-vector-icons/Ionicons";
import Back from "react-native-vector-icons/Ionicons";
import Calendar from "react-native-vector-icons/Ionicons";
import Diamond from "react-native-vector-icons/MaterialCommunityIcons";
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
      name={focused ? "user-circle" : "user-circle"}
      color={focused ? "#054DE4" : "#BFC7D7"}
      size={23}
    />
  );
};
export const HomeClock = () => {
  return <ClockTwo name="clockcircleo" size={17} />;
};
export const HomeClockBlue = () => {
  return <ClockTwo name="clockcircleo" size={17} color={"#054de4"} />;
};
export const HomeCalendar = () => {
  return <CalendarTwo name="calendar" size={17} />;
};
export const HomeCalendarBlue = () => {
  return <CalendarTwo name="calendar" size={17} color={"#054de4"} />;
};
export const HomeUser = () => {
  return <UserTwo name="user" size={15} />;
};
export const HomeUserBlue = () => {
  return <UserTwo name="user" size={15} color={"#054de4"} />;
};
export const HomeCamera = () => {
  return <Camera name="camerao" size={15} color={"#054de4"} />;
};
export const SearchIcon = () => {
  return <Search name="search1" size={25} />;
};
export const BackIcon = () => {
  return <Back name="arrow-back" size={30} />;
};
export const FlagIcon = () => {
  return <Flag name="flag" size={20} color={"#054de4"} />;
};
export const CalendarIcon = () => {
  return <Calendar name="calendar" size={22} color={"#054de4"} />;
};
export const ClockIconTwo = () => {
  return <Clock name="clockcircle" size={20} color={"#054de4"} />;
};
export const DiamondIconTwo = () => {
  return <Diamond name="diamond" size={20} color={"#054de4"} />;
};
export const UserIconTwo = () => {
  return <User name="user" size={25} color={"#054de4"} style={{ paddingHorizontal: 1 }} />;
};
