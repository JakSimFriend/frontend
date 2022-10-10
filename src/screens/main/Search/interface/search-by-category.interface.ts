import { BaseResponse } from "@src/common/responseCode.type";
import { Challenge } from "@src/components/home/interface/recommend-challenge";

export interface SearchByCategoryRequest extends BaseResponse {
  result: [EndedChallenge, ActiveChallenge];
}

export interface SearchByCategory {
  result: [EndedChallenge, ActiveChallenge][];
}

interface EndedChallenge {
  ends: Challenge[];
}

interface ActiveChallenge {
  recruitments: Challenge[];
}
