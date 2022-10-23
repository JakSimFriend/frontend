import { BaseResponse } from "@src/common/responseCode.type";

export interface MyChallenges extends BaseResponse {
  result: result[];
}

export interface result {
  challengeIdx: number;
  title: string;
  startDate: string;
  remainingDay: number;
  date: string;
  limited: number;
  certification: string;
  deadline: string;
  waiting: number;
  memberCount: number;
  waitings: waitings[];
  member: members[];
}

export interface waitings {
  waitingIdx: number;
  userIdx: number;
  achievement: string;
  nickName: string;
  profile: string;
  promise: string;
}

export interface members {
  userIdx: number;
  nickName: string;
  profile: string;
  promise: string;
}
