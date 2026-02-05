import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const AddJob = () => {
  const {user} = useAuth()
  // const [formData, setFormData] = useState({
  //   title: "",
  //   location: "",
  //   type: "",
  //   minSalary: "",
  //   maxSalary: "",
  //   description: "",
  //   company: "",
  //   requirements: "",
  //   responsibilities: "",
  //   hrName: "",
  //   hrEmail: "",
  //   logoUrl: "",
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
   const data = Object.fromEntries(formData.entries());
console.log(data)
   const {minSalary, maxSalary , currency, ...newJob} = data;
   newJob.salaryRange = {
    minSalary, maxSalary, currency 
   }
newJob.requirements = newJob.requirements.split('\n')
newJob.responsibilities = newJob.responsibilities.split('\n')
console.log(newJob)
    fetch("http://localhost:5000/jobs", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newJob),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          alert("Job posted successfully ✅");
        }
        Navigate('/myPostedJobs')
      });
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-blue-500";

  const labelClass = "text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Post a New Job
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Job Title */}
          <div>
            <label className={labelClass}>Job Title</label>
            <input
              name="title"
              // value={formData.title}
              // onChange={handleChange}
              placeholder="Frontend Developer"
              className={inputClass}
            />
          </div>

          {/* Job Location */}
          <div>
            <label className={labelClass}>Job Location</label>
            <input
              name="location"
              // value={formData.location}
              // onChange={handleChange}
              placeholder="Dhaka, Bangladesh"
              className={inputClass}
            />
          </div>

          {/* Job Type */}
          <div>
            <label className={labelClass}>Job Type</label>
            <select
              name="type"
              // value={formData.type}
              // onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select job type</option>
              <option>Intern</option>
              <option>Full-time</option>
              <option>Part-time</option>
            </select>
          </div>

          {/* Salary */}
          {/* <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Min Salary</label>
              <div className="flex">
                <span className="px-3 flex items-center border border-r-0 border-gray-300 rounded-l-md bg-gray-100 text-gray-600">
                  ৳
                </span>
                <input
                  type="number"
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleChange}
                  placeholder="20000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Max Salary</label>
              <div className="flex">
                <span className="px-3 flex items-center border border-r-0 border-gray-300 rounded-l-md bg-gray-100 text-gray-600">
                  ৳
                </span>
                <input
                  type="number"
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  placeholder="40000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div> */}

          <div>
  <label className="text-sm font-medium text-gray-700 mb-1 block">
    Salary Range
  </label>

  <div className="grid grid-cols-3 gap-4">
    {/* Currency */}
    <select
      name="currency"
      // value={formData.currency}
      // onChange={handleChange}
      className="px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-blue-500"
    >
      <option value="BDT">BDT (৳)</option>
      <option value="USD">USD ($)</option>
      <option value="EUR">EUR (€)</option>
      <option value="INR">INR (₹)</option>
    </select>

    {/* Min Salary */}
    <input
      type="number"
      name="minSalary"
      // value={formData.minSalary}
      // onChange={handleChange}
      placeholder="Min Salary"
      className="px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-blue-500"
    />

    {/* Max Salary */}
    <input
      type="number"
      name="maxSalary"
      // value={formData.maxSalary}
      // onChange={handleChange}
      placeholder="Max Salary"
      className="px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-800 focus:ring-2 focus:ring-blue-500"
    />
  </div>
</div>


          {/* Job Description */}
          <div>
            <label className={labelClass}>Job Description</label>
            <textarea
              name="description"
              // value={formData.description}
              // onChange={handleChange}
              placeholder="Describe the role..."
              className={`${inputClass} h-24`}
            />
          </div>

          {/* Company */}
          <div>
            <label className={labelClass}>Company Name</label>
            <input
              name="company"
              // value={formData.company}
              // onChange={handleChange}
              placeholder="ABC Tech Ltd"
              className={inputClass}
            />
          </div>

          {/* Requirements & Responsibilities */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Job Requirements</label>
              <textarea
                name="requirements"
                // value={formData.requirements}
                // onChange={handleChange}
                placeholder="One requirement per line"
                className={`${inputClass} h-24`}
              />
            </div>

            <div>
              <label className={labelClass}>Job Responsibilities</label>
              <textarea
                name="responsibilities"
                // value={formData.responsibilities}
                // onChange={handleChange}
                placeholder="One responsibility per line"
                className={`${inputClass} h-24`}
              />
            </div>
          </div>

          {/* HR Info */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>HR Name</label>
              <input
                name="hr_name"
                // value={formData.hrName}
                // onChange={handleChange}
                placeholder="John Doe"
                className={inputClass}
              />


            </div>

            <div>
              <label className={labelClass}>HR Email</label>
              <input
                type="email"
              defaultValue={user?.email}
                name="hr_email"
                // value={formData.hrEmail}
                // onChange={handleChange}
                placeholder="hr@company.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>dead line</label>
              <input
                type="date"

                name="applicationDeadline"
                // value={formData.hrEmail}
                // onChange={handleChange}
                placeholder="deadline"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Company Logo URL</label>
              <input
                name="logoUrl"
                // value={formData.logoUrl}
                // onChange={handleChange}
                placeholder="https://logo.png"
                className={inputClass}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-medium"
          >
            Submit Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddJob;
