import {useLocation} from "react-router";
import {Navigate, Outlet} from "react-router-dom";

// This component handles the private Routes in React Router. They require a
// user being authorized to visit a route (read: page).
// If a user is not authorized for a specific page, they cannot access it.
// Here the user is navigate to the login page.
function isAuthenticated(user) {
  return user;
}

function isAuthorized(user, role) {
  return user && user.roles.includes(role);
}

function ProtectedRoutes({user, redirectPath = "/login"}) {
  const location = useLocation();

  if (!isAuthenticated(user)) {
    return <Navigate to={redirectPath} replace state={{from: location}} />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
