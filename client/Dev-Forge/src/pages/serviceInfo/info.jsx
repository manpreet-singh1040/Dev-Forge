import React from "react";

const Info = (props) => {
    const service = props.service;
  return (
    <>
    <h1 className="text-2xl font-bold text-green-400">Service Details</h1>
            <div className="flex flex-col space-y-4">
                <div>
                    <h2 className="text-lg font-bold">Service Name:</h2>
                    <p>{service.repo}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold">Service Type:</h2>
                    <p>{service.type}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold">Service URL:</h2>
                    <p><a href={`${service.subDomain}.localhost:8080`} target="_blank" rel="noopener noreferrer" className='text-green-400'>{`${service.subDomain}.localhost:8080`}</a></p>
                </div>
                <div>
                    <h2 className="text-lg font-bold">Service Status:</h2>
                    <p>{service.status}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold">Git Hub Repository Link:</h2>
                    <p><a href={service.gitUrl} target="_blank" rel="noopener noreferrer"  className='text-green-400'>{service.gitUrl}</a></p>
                </div>
                <div>
                    <h2 className="text-lg font-bold">Build Command :</h2>
                    <p>{service.buildCommand}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold">Run Command :</h2>
                    <p>{service.runCommand}</p>
                </div>
                <div>
                    <h2 className="text-lg font-bold">Directory :</h2>
                    <p>{service.directory}</p>
                </div>
            </div>
    </>
  );
};

export default Info;