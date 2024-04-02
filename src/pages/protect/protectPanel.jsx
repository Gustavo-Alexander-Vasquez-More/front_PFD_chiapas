import { Navigate, Outlet } from "react-router-dom";

const ProtectPanel = ({ redirect = '/' }) => {
const user = localStorage.getItem('usuario');
if (!user) {
    return <Navigate to={redirect} replace />;
}
return <Outlet />;
}

export default ProtectPanel;