import { Outlet } from "react-router-dom";
import NavBar from "../shared/NavBar";

const MainLayout = () => {
    return (
        <div>
            <NavBar className="my-4"></NavBar>
            <Outlet></Outlet>            
        </div>
    );
};

export default MainLayout;