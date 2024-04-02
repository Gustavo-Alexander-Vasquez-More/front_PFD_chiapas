import { Navigate, Outlet } from "react-router-dom";

const ProtectLogin = ({ redirect = '/panelAdmin' }) => {
 const user = localStorage.getItem('usuario');
 if (user) {
    return <Navigate to={redirect} replace />;
  }
 return <Outlet />;
}
export default ProtectLogin;