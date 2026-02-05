import { NavLink } from "react-router-dom";
import image from "../assets/images/R.png";

const Navbar = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center ">
          <img src={image} alt="logo" className="w-10 h-10" />
          <div>
            <h1 className="text-xl font-bold leading-none">Jobs Portal</h1>
            <p className="text-xs text-gray-500 uppercase">
              Online Jobs Finder
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <NavLink to="/" className="hover:text-green-500">Home</NavLink>
          <NavLink to="/jobs" className="hover:text-green-500">Jobs</NavLink>
          <NavLink to="/employer" className="hover:text-green-500">Employer</NavLink>
          <NavLink to="/candidate" className="hover:text-green-500">Candidate</NavLink>
          <NavLink to="/blog" className="hover:text-green-500">Blog</NavLink>
          <NavLink to="/contact" className="hover:text-green-500">Contact Us</NavLink>
          <NavLink to="/pages" className="hover:text-green-500">Pages</NavLink>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center gap-4">
          <button className="px-5 py-2 rounded-full border border-green-500 text-green-500 hover:bg-green-50 transition">
            Sign in
          </button>

          <button className="px-5 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition">
            Register
          </button>

          {/* Avatar (optional) */}
          {/* <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-9 h-9 rounded-full"
          /> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
