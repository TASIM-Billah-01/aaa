import { FaLocationDot } from "react-icons/fa6";
import { BsCurrencyDollar } from "react-icons/bs";
import { Link } from "react-router-dom";

const HotCard = ({ item }) => {
  const { 
    title, 
    company, 
    company_logo, 
    requirements, 
    description, 
    location, 
    salaryRange ,
    _id
  } = item;

  return (
    <article className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      
      {/* Header: Company info */}
      <header className="flex items-center p-4 gap-4 border-b">
        <img 
          src={company_logo} 
          alt={`${company} logo`} 
          className="w-16 h-16 object-contain rounded-lg bg-gray-100 p-2"
        />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{company}</h2>
          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
            <FaLocationDot />
            <span>{location}</span>
          </div>
        </div>
      </header>

      {/* Job Details */}
      <section className="p-4 space-y-3">
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-700 text-sm line-clamp-3">{description}</p>

        {/* Requirements Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {requirements.map((r, index) => (
            <span 
              key={index} 
              className="border border-blue-500 text-blue-500 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-50 transition"
            >
              {r}
            </span>
          ))}
        </div>
      </section>

      {/* Footer: Salary & Apply button */}
      <footer className="flex items-center justify-between p-4 border-t">
        <p className="flex items-center gap-1 text-green-600 font-semibold">
          <BsCurrencyDollar /> {salaryRange.min} - {salaryRange.max}
        </p>
        <Link to={`/details/${_id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
          Apply Now
        </Link>
      </footer>

    
    </article>
  );
};

export default HotCard;
