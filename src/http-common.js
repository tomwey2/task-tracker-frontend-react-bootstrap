import {useContext} from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const baseURL = "http://localhost:5000";

export const useAuthAxios = () => {
  const http = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {}
    //headers: {
    //  "Content-type": "application/json"
    //}
  });
  return http;
};

export const useDataAxios = () => {
  const {loggedInUser} = useContext(AuthContext);
  const http = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + loggedInUser.accessToken
    }
  });
  return http;
};

//export default useAuthAxios;
