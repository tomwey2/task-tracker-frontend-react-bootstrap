import axios from "axios";

const baseURL = "http://localhost:5000";

// the axios instance for the authentication requests without headers
export const useAuthAxios = () => {
  const http = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {}
  });
  return http;
};

// the axios instance for the data requests where authorization header contains
// the access token
export const useDataAxios = () => {
  const http = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken")
    }
  });

  // response interceptor to refresh access token if it is exprired
  http.interceptors.response.use(
    response => {
      // if status code lies within the range of 2xx then everything is ok.
      return response;
    },
    function(error) {
      // if status codes falls outside the range of 2xx then send request
      // to refresh the tokens
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return http({
          method: "post",
          url: "/refreshtoken",
          headers: {Authorization: ""},
          data: {
            refreshToken: localStorage.getItem("refreshToken")
          }
        }).then(res => {
          // if the request was ok then update the tokens and send then
          // original request again
          if (res.status === 201) {
            // 1) put the new token to LocalStorage
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);

            // 2) change authorization header
            originalRequest.headers.Authorization =
              "Bearer " + localStorage.getItem("accessToken");

            // 3) return originalRequest object with Axios.
            return http(originalRequest);
          }
        });
      }
      if (error.response.status === 404) {
        // NOT FOUND
        console.log("error", error);
        return error.response;
      }
    }
  );

  return http;
};
