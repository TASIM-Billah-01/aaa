import { useEffect, useState } from "react";
import HotCard from "./HotCard";

const HotJobs = () => {
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/jobs', )
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setJobs(data)
        })
    },[])
    return (
        <div>
            <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-4">
                {
                    jobs.map( (item,index) => <HotCard key={index} item={item}></HotCard>)
                }
            </section>
        </div>
    );
};

export default HotJobs;