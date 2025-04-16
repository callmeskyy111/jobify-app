import React from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsCtxt } from "../pages/AllJobs";
import Job from "./Job";

function JobsContainer() {
  const { data } = useAllJobsCtxt();
  const {jobs} = data;
  console.log(data,jobs)
  if(jobs.length === 0){
return (
  <Wrapper>
    <h2>No Jobs To Display...</h2>
  </Wrapper>
);
  }
  return (
    <Wrapper>
      <div className="jobs">
        {
            jobs.map(job=>{
                return <Job key={job._id} {...job}/>
            })
        }
      </div>
    </Wrapper>
  );
  
}

export default JobsContainer;
