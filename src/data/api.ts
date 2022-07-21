import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = `https://jaksimfriend.site`;

export const fetchLive = () => {
  AsyncStorage.getItem("userIdx").then((value) => {
    const userIdx = value;
    axios
      .get(`${BASE_URL}/my-challenges/${userIdx}/application`)
      .then((response) => {
        response.data.result[0];
      })
      .catch((error) => console.log(error.message));
  });
};

// const BASE_URL = `https://api.holotools.app/v1`;

// export async function fetchLive() {
//   const response = await fetch(`${BASE_URL}/live`);
//   const json = await response.json();
//   return json.live;
// }
