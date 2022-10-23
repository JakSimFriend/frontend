import { BaseResponse } from "@src/common/responseCode.type";

export interface Status extends BaseResponse, result {
  categories: Category[];
}

export interface result {
  userIdx: number;
  achievement: number;
  experience: number;
}

export interface Category {
  categoryIdx: number;
  categoryPhoto: string;
  categoryName: string;
  categoryEx: number;
}
