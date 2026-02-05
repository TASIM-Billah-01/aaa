import React from "react";
import { Navigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const JobApply = () => {
  const {id} = useParams();
  const {user} = useAuth()
  
  const handleApply = (e) => {
    e.preventDefault();

    console.log(id, user.email)
    const form = e.target;
    const linkedin = form.linkedin.value;
    const github = form.github.value;
    const resume = form.resume.value;

    const applicationData = {
      job_id : id,
      applicant_email : user.email,
      linkedin,
      github,
      resume,
    };

    fetch('http://localhost:5000/job_applications', {
      method : "POST",
      headers : {
        'content-type' : "application/json"
      },
      body : JSON.stringify(applicationData)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if(data.insertedId) {
        Swal.fire({
  icon: 'success',
  title: 'Success!',
  text: 'Your action was completed successfully.',
  confirmButtonText: 'OK'
});

      }
      
    })
    
    // Navigate('/myApplication')
    console.log("Job Application:", applicationData);

    // later you can POST this to backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Apply for Job
        </h2>

        <form onSubmit={handleApply} className="space-y-4">
          {/* LinkedIn */}
          <div>
            <label className="block font-medium mb-1">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              name="linkedin"
              required
              placeholder="https://www.linkedin.com/in/username"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* GitHub */}
          <div>
            <label className="block font-medium mb-1">
              GitHub Profile URL
            </label>
            <input
              type="url"
              name="github"
              required
              placeholder="https://github.com/username"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Resume */}
          <div>
            <label className="block font-medium mb-1">
              Resume URL
            </label>
            <input
              type="url"
              name="resume"
              required
              placeholder="https://drive.google.com/your-resume-link"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Apply Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApply;
