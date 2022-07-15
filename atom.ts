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
export const userIndexAtom = atom<number>({
  key: `isUser${uuid()}`,
  default: 0,
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
export const categoryIndexAtom = atom<number>({
  key: `categoryIndex${uuid()}`,
  default: 0,
});

export const recruitTitleInfoAtom = atom<string>({
  key: `recruitTitleInfo${uuid()}`,
  default: "",
});
export const recruitStartDateInfoAtom = atom<string>({
  key: `recruitStartDateInfo${uuid()}`,
  default: "",
});
export const recruitScheduleInfoAtom = atom<string>({
  key: `recruitScheduleInfo${uuid()}`,
  default: "",
});
export const recruitMembersInfoAtom = atom<number>({
  key: `recruitMembersInfo${uuid()}`,
  default: 0,
});
export const recruitWaitingInfoAtom = atom<number>({
  key: `recruitContentInfo${uuid()}`,
  default: 0,
});
export const recruitContentInfoAtom = atom<string>({
  key: `recruitContentInfo${uuid()}`,
  default: "",
});
export const BeforeStartTitleInfoAtom = atom<string>({
  key: `BeforeStartTitleInfo${uuid()}`,
  default: "",
});
export const BeforeStartStartDateInfoAtom = atom<string>({
  key: `BeforeStartStartDateInfo${uuid()}`,
  default: "",
});
export const BeforeStartScheduleInfoAtom = atom<string>({
  key: `BeforeStartScheduleInfo${uuid()}`,
  default: "",
});
export const BeforeStartMembersInfoAtom = atom<number>({
  key: `BeforeStartMembersInfo${uuid()}`,
  default: 0,
});
export const BeforeStartWaitingInfoAtom = atom<number>({
  key: `BeforeStartContentInfo${uuid()}`,
  default: 0,
});
export const BeforeStartContentInfoAtom = atom<string>({
  key: `BeforeStartContentInfo${uuid()}`,
  default: "",
});
