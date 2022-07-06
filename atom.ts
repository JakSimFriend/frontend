import { atom, atomFamily } from "recoil";
import { v4 as uuid } from "uuid";

export const isLoggedInAtom = atom<boolean | undefined>({
  key: `loggedIn${uuid()}`,
  default: false,
});
export const isUserAtom = atom<boolean | undefined>({
  key: `isUser${uuid()}`,
  default: false,
});
export const tierAtom = atom<string | undefined>({
  key: `tier${uuid()}`,
  default: "다이아몬드",
});
export const nextButtonAtom = atom<boolean | undefined>({
  key: `nextButton${uuid()}`,
  default: true,
});
export const submitButtonAtom = atom<boolean | undefined>({
  key: `submitButton${uuid()}`,
  default: true,
});
export const createdModalAtom = atom<boolean | undefined>({
  key: `createdModalVisible${uuid()}`,
  default: false,
});
export const reactionModalAtom = atom<boolean | undefined>({
  key: `ReactionModalVisible${uuid()}`,
  default: false,
});
export const cancelModalAtom = atom<boolean | undefined>({
  key: `CancelModalVisible${uuid()}`,
  default: false,
});
export const applyModalAtom = atom<boolean | undefined>({
  key: `ApplyModalVisible${uuid()}`,
  default: false,
});
export const categoryIndexAtom = atom<number | undefined>({
  key: `categoryIndex${uuid()}`,
  default: 0,
});

export const recruitTitleInfoAtom = atom<string | undefined>({
  key: `recruitTitleInfo${uuid()}`,
  default: "",
});
export const recruitStartDateInfoAtom = atom<string | undefined>({
  key: `recruitStartDateInfo${uuid()}`,
  default: "",
});
export const recruitScheduleInfoAtom = atom<string | undefined>({
  key: `recruitScheduleInfo${uuid()}`,
  default: "",
});
export const recruitMembersInfoAtom = atom<number | undefined>({
  key: `recruitMembersInfo${uuid()}`,
  default: 0,
});
export const recruitWaitingInfoAtom = atom<number | undefined>({
  key: `recruitContentInfo${uuid()}`,
  default: 0,
});
export const recruitContentInfoAtom = atom<string | undefined>({
  key: `recruitContentInfo${uuid()}`,
  default: "",
});

export const BeforeStartTitleInfoAtom = atom<string | undefined>({
  key: `BeforeStartTitleInfo${uuid()}`,
  default: "",
});
export const BeforeStartStartDateInfoAtom = atom<string | undefined>({
  key: `BeforeStartStartDateInfo${uuid()}`,
  default: "",
});
export const BeforeStartScheduleInfoAtom = atom<string | undefined>({
  key: `BeforeStartScheduleInfo${uuid()}`,
  default: "",
});
export const BeforeStartMembersInfoAtom = atom<number | undefined>({
  key: `BeforeStartMembersInfo${uuid()}`,
  default: 0,
});
export const BeforeStartWaitingInfoAtom = atom<number | undefined>({
  key: `BeforeStartContentInfo${uuid()}`,
  default: 0,
});
export const BeforeStartContentInfoAtom = atom<string | undefined>({
  key: `BeforeStartContentInfo${uuid()}`,
  default: "",
});
