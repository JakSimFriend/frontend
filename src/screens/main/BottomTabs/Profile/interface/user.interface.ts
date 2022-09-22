import { BaseResponse } from "@src/common/responseCode.type";

export interface UserInfo extends BaseResponse, result {
  points: points[];
}

export interface result {
  userIdx: number;
  profile: string;
  nickName: string;
  promise: string;
  point: number;
}

export interface points {
  idx: number;
  categoryName: string;
  image: string;
  createAt: string;
  point: number;
  balance: number;
}
