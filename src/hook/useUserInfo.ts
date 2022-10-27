import { userIdxAtom, userInfoAtom } from "@src/common/atom";
import { UserInfo } from "@src/screens/main/BottomTabs/Profile/interface/user.interface";
import axios from "axios";
import * as R from "ramda";
import * as RA from "ramda-adjunct";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const getUserInfo = (userId: number) => axios.get(`/profiles/${userId}`);

export const useUserInfo = () => {
  const userIdx = useRecoilValue(userIdxAtom);
  const setUserInfo = useSetRecoilState<UserInfo | null>(userInfoAtom);
  useEffect(() => {
    if (RA.isNotNilOrEmpty(userIdx)) {
      getUserInfo(userIdx as number).then(({ data }) => {
        setUserInfo(R.head(data.result) as unknown as UserInfo);
      });
    }
  }, []);
};
