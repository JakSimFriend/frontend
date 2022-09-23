import { userIdxAtom } from "@src/common/atom";
import axios from "axios";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as RA from "ramda-adjunct";
import * as R from "ramda";
import { UserInfo } from "@src/screens/main/BottomTabs/Profile/interface/user.interface";

const getUserInfo = (userId: number) => axios.get(`/profiles/${userId}`);

export const useUserInfo = (userIdx: number) => {
  useEffect(() => {
    console.log(userIdx);
    if (RA.isNotNilOrEmpty(userIdx)) {
      getUserInfo(userIdx as number).then(({ data }) => {
        console.log(R.head(data.result));
      });
    }
  }, []);
};
