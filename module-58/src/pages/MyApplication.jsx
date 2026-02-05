import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios"; // ✅ REQUIRED

const MyApplication = () => {
  const { user } = useAuth();
  const [state, setState] = useState([]);

  useEffect(() => {


    axios.get(`http://localhost:5000/job_application?email=${user.email}`, {withCredentials : true})
    .then(res => setState(res.data))

    // fetch(`http://localhost:5000/job_application?email=${user.email}`)
    //   .then(res => res.json())
    //   .then(data => setState(data));
  }, [user?.email]);

  return (
    <div>
      <p>{state.length}</p>
    </div>
  );
};

export default MyApplication;
