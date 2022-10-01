import { BaseResponse } from "@src/common/responseCode.type";

export interface Challenge {
  categoryName: string;
  challengeIdx: number;
  title: string;
  startDate: string;
  certification: string;
  accept: number;
  tags: string[];
}

export interface Tags {
  tag: string[];
}

export interface HomeViewRecommendChangeRequest extends BaseResponse {
  result: Challenge[];
}
