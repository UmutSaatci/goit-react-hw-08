import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const RestrictedRoute = ({
  component: Component,
  redirectTo = "/contacts",
}) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};
