import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserServices = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch services from an API or database
        // This is just a placeholder for actual data fetching logic
        const fetchServices = async () => {
            const response = await fetch(`http://localhost:3000/services`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            if(response.status===401){ navigate("/login");}
            console.log(data);
            if(data)
            {

              setServices(data.services);
            }
        };

        fetchServices();
    }, []);
    return (
        <>
          <nav className="flex justify-between items-center mb-6 p-4 bg-gray-800 shadow-lg sticky top-0 left-0 right-0 z-10">
      <h1 className="text-2xl font-bold font-sans text-green-400 transition duration-300 hover:scale-105">
        User Services
      </h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-800 hover:bg-black text-green-400 font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
        >
          Home
        </button>
        <button
          onClick={() => navigate("/userdetails")}
          className="bg-gray-800 hover:bg-black text-green-400 font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
        >
          User Details
        </button>
      </div>
    </nav>
        <div className="bg-black min-h-screen p-4 text-white">
          {/* Sticky Navigation Bar */}
    
          {/* Services List */}
          {services.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-lg">There are no services currently deployed.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <li
                  key={index}
                  onClick={() => navigate(`/services/${index}`)} // Add navigation on card click
                  className={`p-6 rounded-lg border-2 transition-transform transform hover:scale-105 duration-300 ease-in-out 
                    bg-gradient-to-r from-blue-600 to-blue-700 border-blue-700 
                    hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600`} // Different shades of blue
                >
                  {/* Add Image */}
                  {/*<div className="mb-4">
                    <img src={service.imageUrl} alt={`${service.repo} logo`} className="h-24 w-24 object-contain mx-auto" />
                  </div>*/}
                  <h2 className="text-xl font-bold text-black">{service.repo}</h2>
                  <p className="text-gray-300 mt-1">Type: <span className="text-gray-200">{service.type}</span></p>
                  <p className="text-gray-300 mt-1">Environment: <span className="text-gray-200">{service.environment}</span></p>
                  <p className="text-gray-300 mt-1">
                    <a href={service.gitUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">Git URL</a>
                  </p>
                  <p className="text-gray-300 mt-1">Website Link: 
                    <a href={`${service.subDomain}.localhost:8080`} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline"> {`${service.subDomain}.localhost:8080`}</a>
                  </p>
                  <p className="text-gray-300 mt-1">Repository: <span className="text-gray-200">{service.repo}</span></p>
                </li>
              ))}
            </ul>
          )}
    
          {/* Create New Service Button */}
          <div className="mt-6">
            <button
              onClick={() => navigate("/createservice")}
              className="w-auto bg-red-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Create a New Service
            </button>
          </div>
        </div>
        </>
      );
    };

export default UserServices;