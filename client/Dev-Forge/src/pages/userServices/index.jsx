import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import ServiceCard from './card';

const UserServices = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchServices = async () => {
            const response = await fetch(`http://localhost:3000/services`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const data = await response.json();
            if (response.status === 401) navigate("/login");
            if (data) setServices(data.services);
        };
        fetchServices();
    }, []);

    return (
        <>
            {/* Navigation Bar */}
            <nav className="w-full bg-[#1E1B4B] py-5 px-8 flex justify-between items-center shadow-lg border-b border-[#312E81]">
                <h1 className="text-3xl font-bold text-[#C7D2FE]">Dashboard</h1>
                <div className="flex space-x-4">
                    <button 
                        onClick={() => navigate("/")} 
                        className="px-6 py-2 text-white font-semibold rounded-lg bg-[#312E81] hover:bg-[#4338CA] transition-all duration-300"
                    >
                        Home
                    </button>
                    <button 
                        onClick={() => navigate("/userdetails")} 
                        className="px-6 py-2 text-white font-semibold rounded-lg bg-[#4C1D95] hover:bg-[#6D28D9] transition-all duration-300"
                    >
                        User Details
                    </button>
                </div>
            </nav>

            {/* Background with Blur & Gradient Effect */}
            <div className="relative min-h-screen flex flex-col items-center p-6 text-white bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#4338CA]">
                <div className="absolute inset-0 bg-[url('/your-background-image.jpg')] bg-cover bg-center opacity-20 blur-xl"></div>

                {/* Services List */}
                <div className="relative z-10 w-full">
                    {services.length === 0 ? (
                        <div className="text-center py-6">
                            <p className="text-lg text-[#C7D2FE]">There are no services currently deployed.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                            {services.map((service, index) => (
                                <ServiceCard key={index} service={service} onClick={() => navigate(`/services/${index}`)} />
                            ))}
                        </div>
                    )}
                </div>

                {/* Create New Service Button */}
                <div className="mt-8 flex justify-center relative z-10">
                    <button
                        onClick={() => navigate("/createservice")}
                        className="px-6 py-3 bg-gradient-to-r from-[#4F46E5] to-[#9333EA] text-white font-bold rounded-lg flex items-center gap-2 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        <PlusCircle className="w-5 h-5" /> Create a New Service
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserServices;
