import { atom } from "recoil";

export const isLoggedInAtom = atom({
  key: "loggedIn",
  default: false,
});

export const tierAtom = atom({
  key: "tier",
  default: "다이아몬드",
});