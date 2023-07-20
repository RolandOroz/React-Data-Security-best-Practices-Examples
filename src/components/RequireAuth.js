

/* import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const allowedRoles = [210, 110, 310];
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles === (role => allowedRoles.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth; */

import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const { auth } = useAuth();
    const location = useLocation();
    const rolesAuth = auth?.roles
    const allowRol = allowedRoles
    const findRoles = allowedRoles.includes(rolesAuth)
    console.log("from auth?.roles: ", rolesAuth);
    console.log(allowRol);
    console.log(allowRol.includes(rolesAuth));
    console.log(findRoles);


        return (findRoles === true) ? 
          <Outlet />
         : auth?.accessToken ? //changed from user to accessToken to persist login after refresh
          <Navigate to="/unauthorized" state={{ from: location }} replace />
         : 
          <Navigate to="/login" state={{ from: location }} replace />
        ;
}

export default RequireAuth;


