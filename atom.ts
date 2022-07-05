import { atom } from "recoil";

export const isLoggedInAtom = atom({
  key: "loggedIn",
  default: false,
});

export const isUserAtom = atom({
  key: "isUser",
  default: false,
});

export const tierAtom = atom({
  key: "tier",
  default: "다이아몬드",
});

export const nextButtonAtom = atom({
  key: "nextButton",
  default: true,
});
export const submitButtonAtom = atom({
  key: "submitButton",
  default: true,
});
export const createdModalAtom = atom({
  key: "createdModalVisible",
  default: false,
});
export const reactionModalAtom = atom({
  key: "ReactionModalVisible",
  default: false,
});
export const cancelModalAtom = atom({
  key: "CancelModalVisible",
  default: false,
});
export const applyModalAtom = atom({
  key: "ApplyModalVisible",
  default: false,
});


export const categoryIndexAtom = atom({
  key: "categoryIndex",
  default: 0,
});
