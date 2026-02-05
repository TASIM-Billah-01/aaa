import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import image from "../assets/icons8-job-application-94.png"
import { NavLink } from "react-router-dom";
const NavBar = () => {
    const {user,signOutUser} = useContext(AuthContext)
    return (
        <div>
            <section className="flex justify-between">
                <img src={image} alt="" />
                <section>

                </section>
<section className="flex items-center gap-4">
    {user ? (
        <button
            onClick={signOutUser}
            className="px-5 py-2 rounded-lg bg-red-500 text-white font-medium 
                       hover:bg-red-600 transition duration-200 shadow-md"
        >
            Logout
        </button>
    ) : (
        <NavLink
            to="/register"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium
                       hover:bg-blue-700 transition duration-200 shadow-md"
        >
            Register
        </NavLink>
    )}
</section>

            </section>
            
        </div>
    );
};

export default NavBar;
