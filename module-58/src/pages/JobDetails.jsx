import { Link, useLoaderData } from "react-router-dom";

const JobDetails = () => {
    const { 
        title, 
        company, 
        company_logo, 
        requirements, 
        description, 
        location, 
        salaryRange,
        _id
    } = useLoaderData();

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-xl mt-10">
            {/* Header */}
            <div className="flex items-center gap-6 mb-6">
                <img 
                    src={company_logo} 
                    alt={company} 
                    className="w-20 h-20 object-contain rounded-lg border p-2"
                />
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                    <p className="text-gray-600 text-lg">{company}</p>
                    <p className="text-gray-500">{location} • {salaryRange.min} - {salaryRange.max} {salaryRange.currency.toUpperCase()}</p>
                </div>
            </div>

            {/* Description */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Job Description</h2>
                <p className="text-gray-700 leading-relaxed">{description}</p>
            </section>

            {/* Requirements */}
            <section className="mb-6">
                <h2 className="text-2xl font-semibold mb-2 text-gray-800">Requirements</h2>
                <div className="flex flex-wrap gap-3">
                    {requirements.map((req, index) => (
                        <span 
                            key={index} 
                            className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {req}
                        </span>
                    ))}
                </div>
            </section>

            {/* Apply Button */}
            <div className="text-center mt-8">
                <Link to={`/apply/${_id}`} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Apply Now
                </Link>
            </div>
        </div>
    );
};

export default JobDetails;
