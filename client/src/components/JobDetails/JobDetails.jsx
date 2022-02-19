import React from 'react';

const JobDetails = ({ job }) => {
  return (
    <>
        <h1>{job.companyName}</h1>
        <h2>{job.normalizedJobTitle}</h2>


    </>
  );
}

export default JobDetails;