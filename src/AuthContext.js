import {useNavigate, useLocation} from "react-router";
import {createContext, useState} from "react";
import qs from "qs";
import http from "./http-common";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  let loginUser = async (username, password) => {
    const response = await http({
      method: "post",
      url: "/login",
      data: qs.stringify({
        email: username,
        password: password
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    }).then(response => {
      // Success
      console.log("Login success", response);
      setLoggedInUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));

      // redirect to uri
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    });
  };

  let logoutUser = () => {
    setLoggedInUser(null);
    localStorage.removeItem("user");
  };

  let context = {
    loggedInUser: loggedInUser,
    setLoggedInUser: setLoggedInUser,
    logoutUser: logoutUser,
    loginUser: loginUser
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

//export {AuthContext, AuthProvider};
