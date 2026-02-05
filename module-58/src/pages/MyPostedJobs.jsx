import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const MyPostedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`http://localhost:5000/jobs?hr_email=${user.email}`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500 text-lg">Loading your posted jobs...</p>
      </div>
    );
  }

  console.log(jobs)

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          My Posted Jobs
        </h2>
        <p className="text-sm text-gray-500">
          Total Jobs: {jobs.length}
        </p>
      </div>

      {/* Empty State */}
      {jobs.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center text-gray-500">
          No jobs posted yet.
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Job Title</th>
                <th>applied counrt</th>
                <th className="px-6 py-4">Deadline</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((item, index) => (
                <tr key={item._id} className="border-t hover:bg-gray-50 transition">
  <th className="px-6 py-4">{index + 1}</th>
  <td className="px-6 py-4 font-medium text-gray-800">{item.title}</td>
  <td className="px-6 py-4 text-gray-600">
    {item.applicationCount }  {/* default 0 if undefined */}
  </td>
  <td className="px-6 py-4 text-gray-600">{item.applicationDeadline}</td>
  <td className="px-6 py-4 flex justify-center gap-3">
    <Link to={`/viewApplications/${item._id}`} className="px-3 py-1 text-sm rounded bg-blue-500 text-white hover:bg-blue-600">Edit</Link>
    <button className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600">Delete</button>
  </td>
</tr>

              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPostedJobs;
