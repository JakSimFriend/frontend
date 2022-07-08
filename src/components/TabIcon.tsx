import React from "react";
import Home from "react-native-vector-icons/Ionicons";
import Diamond from "react-native-vector-icons/MaterialCommunityIcons";
import Clock from "react-native-vector-icons/AntDesign";
import User from "react-native-vector-icons/FontAwesome";
import ClockTwo from "react-native-vector-icons/Feather";
import ClockTwoBlue from "react-native-vector-icons/AntDesign";
import CalendarTwo from "react-native-vector-icons/Feather";
import CalendarTwoBlue from "react-native-vector-icons/FontAwesome5";
import UserTwo from "react-native-vector-icons/Feather";
import UserTwoBlue from "react-native-vector-icons/FontAwesome";
import Search from "react-native-vector-icons/EvilIcons";
import CameraBlue from "react-native-vector-icons/FontAwesome5";
import Back from "react-native-vector-icons/Ionicons";
import Flag from "react-native-vector-icons/FontAwesome";
import Calendar from "react-native-vector-icons/FontAwesome5";
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
  return <ClockTwo name="clock" size={17} />;
};
export const HomeClockBlue = () => {
  return <ClockTwoBlue name="clockcircle" size={13} color={"#054de4"} />;
};
export const HomeCalendar = () => {
  return <CalendarTwo name="calendar" size={17} />;
};
export const HomeCalendarBlue = () => {
  return <CalendarTwoBlue name="calendar-day" size={15} color={"#054de4"} />;
};
export const HomeUser = () => {
  return <UserTwo name="user" size={15} />;
};
export const HomeUserBlue = () => {
  return <UserTwoBlue name="user" size={17} color={"#054de4"} />;
};
export const HomeCameraBlue = () => {
  return <CameraBlue name="camera" size={15} color={"#054de4"} />;
};
export const SearchIcon = () => {
  return <Search name="search" size={30} />;
};
export const BackIcon = () => {
  return <Back name="arrow-back" size={30} />;
};
export const FlagIcon = () => {
  return <Flag name="flag" size={20} color={"#054de4"} />;
};
export const CalendarIcon = () => {
  return <Calendar name="calendar-day" size={22} color={"#054de4"} />;
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
