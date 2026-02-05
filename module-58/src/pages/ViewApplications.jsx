import { useLoaderData } from "react-router-dom";

const ViewApplications = () => {
  const data = useLoaderData();
  console.log("data", data);
  const handleStatusUpdate = (e,id) => {
    console.log(e.target.value , id);
    const info = {
        status : e.target.value
    }
    fetch(`http://localhost:5000/job-applications/${id}`, {
        method : 'PATCH',
        headers : {
            'content-type' : 'application/json'
        },
        body : JSON.stringify(info)
    })
    .then(res => res.json())
    .then(data => {
        console.log("data", data)
    })
  }
  return (
    <div>
      <h2>{data.length}</h2>

      <table className="w-full max-w-6xl shadow-lg mx-auto 2xl:text-xl border border-black text-center">
        <thead className="bg-blue-800">
          <tr className="text-white font-bold">
            <th className="px-1 py-2">#</th>
            <th className="px-1 py-2">Email</th>
            <th className="px-1 py-2">Status</th>
            <th className="px-1 py-2">Update Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td className="text-black">{item.applicant_email}</td>
              <td>{item.status || "Pending"}</td>
              
              <td>
        <select
          defaultValue={item.status || "Change Status"}
          onChange={(e) =>  handleStatusUpdate(e,item._id)}
          className="select select-bordered select-xs w-full max-w-xs"
        >
          <option disabled>Change Status</option>
          <option>Under Review</option>
          <option>Set Interview</option>
          <option>Hired</option>
          <option>Rejected</option>
        </select>
      </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewApplications;
