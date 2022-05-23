import {useContext} from "react";
import {useLocation} from "react-router";
import {Navigate, Outlet} from "react-router-dom";
import AuthContext from "./AuthContext";

/**
 * This component handles the private Routes in React Router. They require a
 * user being authorized to visit a route (read: page).
 * If a user is not authorized for a specific page, they cannot access it.
 * Here the user is navigate to the login page.
 */
function isAuthenticated(loggedInUser) {
  return loggedInUser;
}

function isAuthorized(loggedInUser, role) {
  return loggedInUser && loggedInUser.roles.includes(role);
}

function ProtectedRoutes({redirectPath = "/login"}) {
  const location = useLocation();
  const {loggedInUser} = useContext(AuthContext);

  if (!isAuthenticated(loggedInUser)) {
    return <Navigate to={redirectPath} replace state={{from: location}} />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
