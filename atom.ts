import { atom, atomFamily } from "recoil";
import { v4 as uuid } from "uuid";

export const isLoggedInAtom = atom<boolean>({
  key: `loggedIn${uuid()}`,
  default: false,
});
export const isUserAtom = atom<boolean>({
  key: `isUser${uuid()}`,
  default: false,
});
export const jwtAtom = atom<string>({
  key: `jwt${uuid()}`,
  default: "",
});

export const tierAtom = atom<string>({
  key: `tier${uuid()}`,
  default: "다이아몬드",
});
export const nextButtonAtom = atom<boolean>({
  key: `nextButton${uuid()}`,
  default: true,
});
export const submitButtonAtom = atom<boolean>({
  key: `submitButton${uuid()}`,
  default: true,
});
export const createdModalAtom = atom<boolean>({
  key: `createdModalVisible${uuid()}`,
  default: false,
});
export const reactionModalAtom = atom<boolean>({
  key: `ReactionModalVisible${uuid()}`,
  default: false,
});
export const cancelModalAtom = atom<boolean>({
  key: `CancelModalVisible${uuid()}`,
  default: false,
});
export const applyModalAtom = atom<boolean>({
  key: `ApplyModalVisible${uuid()}`,
  default: false,
});
export const recieveModalAtom = atom<boolean>({
  key: `RecieveModalVisible${uuid()}`,
  default: false,
});
export const reportModalOne = atom<boolean>({
  key: `ReportModalOneVisible${uuid()}`,
  default: false,
});
export const reportModalTwo = atom<boolean>({
  key: `ReportModalTwoVisible${uuid()}`,
  default: false,
});

// 개설 페이지 1
export const categoryIndexAtom = atom<number>({
  key: `categoryIndex${uuid()}`,
  default: 0,
});
export const selectedCategoryIndexAtom = atom<number>({
  key: `selectedCategoryIndex${uuid()}`,
  default: 0,
});

// 개설 페이지 2
export const titleAtom = atom<string>({
  key: `title${uuid()}`,
  default: "",
});
export const infoAtom = atom<string>({
  key: `info${uuid()}`,
  default: "",
});
export const tagsAtom = atom({
  key: `tags${uuid()}`,
  default: [""],
});

// 개설 페이지 3
export const startDateAtom = atom<string>({
  key: `startDate${uuid()}`,
  default: "",
});
export const dateAtom = atom<string>({
  key: `date${uuid()}`,
  default: "",
});
export const numberAtom = atom<string>({
  key: `number${uuid()}`,
  default: "",
});
export const timeAtom = atom<string>({
  key: `time${uuid()}`,
  default: "",
});

export const progressIndexAtom = atom<number>({
  key: `progressIndex${uuid()}`,
  default: 0,
});
export const progressTitleAtom = atom<string>({
  key: `progressTitle${uuid()}`,
  default: "",
});