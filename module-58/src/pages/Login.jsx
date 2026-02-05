import Lottie from "lottie-react";
import { useState } from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import login from "../assets/lottie/Login.json"
import { AuthContext } from "../context/AuthContext";
import axios from "axios";


const Login = () => {

const loc = useLocation()
const navigate = useNavigate();
console.log("sign in loc",loc)
const frm = loc.state || '/'
  const {loginUser} = useContext(AuthContext)
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(""); 
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email,password)
    .then(res => {
      console.log("result login", res)
      // const user = {email : res.user.email}
      // axios.post('http://localhost:5000/jwt',user, {withCredentials : true})

      //   .then(res => {
      //     console.log(res.data);
          
      //   })

      // console.log(res);
      //   setSuccess(true);
      //   const user = {email : email}
      //   // axios.post('http://localhost:5000/jwt',user, {withCredentials : true})
      //   axios.post('http://localhost:5000/jwt',user, {withCredentials : true})
      //   .then(res => {
      //     console.log(res.data);
          
      //   })
  //               axios.post('http://localhost:5000/jwt', user)
  // .then(res => {
  //   console.log(res.data.token);  // Access the token
  //   localStorage.setItem('token', res.data.token);  // Store it
  // })
        setError(""); 
        // navigate(frm)
    })
     .catch((err) => {
        console.error(err);
        setError("Login failed. Please check your email and password.");
        setSuccess(false);
      });

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 gap-9">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
                Sign Up
            </Link>
        </p>
      {
      success && (
          <p className="text-green-600 text-sm sm:text-base sm:font-medium text-center my-2">
            Login successful!
          </p>
        )}

        {error && (
          <p className="text-red-600 text-sm sm:text-base sm:font-medium text-center my-2">
            {error}
          </p>
        )}

      </div>
      <section className="w-80">
        <Lottie animationData={login}></Lottie>
      </section>
    </div>
  );
};

export default Login;
