import React from 'react';

const JobDetails = ({ job }) => {
  return (
    <>
        <h2>{job.jobTitle}</h2>
        <h4>{job.address}</h4>
        <h4>{job.company}</h4>
        <h4>{job.salary}</h4>
    </>
  );
}

export default JobDetails;