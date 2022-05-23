import React from "react";

const AuthContext = React.createContext({
  loggedInUser: null,
  setLoggedInUser: user => {}
});

export default AuthContext;
