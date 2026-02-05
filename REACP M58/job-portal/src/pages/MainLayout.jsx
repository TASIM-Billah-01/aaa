import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const MainLayout = () => {
    return (
        <div>
            <Navbar className="my-4"></Navbar>
            <Outlet></Outlet>            
        </div>
    );
};

export default MainLayout;