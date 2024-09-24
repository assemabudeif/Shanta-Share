import {Navigate, Outlet, useNavigate} from "react-router-dom";
import Login from "./Login";

function PrivateRoutes(props) {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    return <Outlet/>
  } else {
    return <Navigate to={'/login'}/>
  }
}

export default PrivateRoutes;