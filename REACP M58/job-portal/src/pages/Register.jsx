import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import lottieData from '../assets/lottie/register.json'


const Register = () => {

// const {createUser} = useContext(AuthContext)
const [error, setError] = useState("");
const [success, setSuccess] = useState(false);

const handleSubmit = (e) => {
  e.preventDefault()
  setError("");
    setSuccess(false)
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo?.value || "";
    // Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return;
    }
    createUser(email,password)
    .then(res => {
      const userInfo = res.user;
      console.log(userInfo);
    }).catch(error => {
        console.log(error.message)
    })

}
  return (
    <div>

      <div  className="min-h-screen flex items-center justify-center bg-gray-100 gap-5">
      
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

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
            <label className="block mb-1 font-medium">Photo URL</label>
            <input
              type="text"
              name="photo"
              placeholder="Enter photo URL"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

        
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            
            Register
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
        {error && (
          <p className="text-red-600 text-sm sm:text-base sm:font-medium text-center my-2">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 text-sm sm:text-base sm:font-medium text-center my-2">
            Registration successful!
          </p>
        )}
      </div>

      <section className="">
        <Lottie animationData={lottieData} className="h-96"></Lottie>
      </section>

      </div>

    </div>
  );
};

export default Register;

