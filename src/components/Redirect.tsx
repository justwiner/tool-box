import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Redirect(props: { to: string; from: string }) {
  const location = useLocation();
  if (location.pathname === props.from) {
    return <Navigate to={props.to} replace />;
  } else {
    return <Outlet />;
  }
}
