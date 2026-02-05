import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    if(loading) {
        return <>loading...</>
    }
    if(user) {
        return children
    }
    const locs = useLocation();
    console.log(locs)
    return <Navigate to='/login' state={locs?.pathname}></Navigate>
};

export default PrivateRoute;