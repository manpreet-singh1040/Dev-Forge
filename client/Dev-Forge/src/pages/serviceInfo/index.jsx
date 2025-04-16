import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Info from './info';
import Logs from './log';
import Redeploy from './redploy';
import Settings from './Settings';

const ServiceInfo = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [service, setService] = useState([]);
    const [comp, setComp] = useState(0);
    useEffect(() => {
        fetch('http://localhost:3000/checkLogin', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if (!data.status) {
                navigate('/login');
            }
        });
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            const response = await fetch(`http://localhost:3000/services/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            if (response.status === 401) {
                navigate("/login");
            }

            const data = await response.json();
            if (data.service) {
                setService(data.service);
            }
        };

        fetchServices();
    }, [id]);

    const handleDeleteService=async()=>{
        const response = await fetch(`http://localhost:3000/deleteService/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (response.status === 401) {
            navigate("/login");
        }
        if(response.status === 200){
            navigate("/services")
        }
        const data = await response.json();
        console.log(`service deleted !!`);
        console.log(data);
    }


    const Components = [
        <Info service={service} />,
        <Logs id={id} />,
        <Settings handleDeleteService={handleDeleteService}/>,
        <Redeploy id={id} setComp={setComp} />
    ];

    return (
        <>
            {/* Navbar */}
            <nav className="w-full bg-gradient-to-r from-[#1E3A8A] to-[#312E81] py-5 px-8 flex justify-between items-center shadow-lg border-b border-[#374151]">
                <h1 className="text-3xl font-bold text-[#C7D2FE]">Service Info</h1>
                <div className="flex space-x-6">
                    <button 
                        onClick={() => navigate("/")} 
                        className="px-5 py-2 text-white bg-[#1E40AF] rounded-lg shadow-md hover:bg-[#2563EB] transition-all duration-300 transform hover:scale-105"
                    >
                        Home
                    </button>
                    <button 
                        onClick={() => navigate("/userdetails")} 
                        className="px-5 py-2 text-white bg-[#4C1D95] rounded-lg shadow-md hover:bg-[#6D28D9] transition-all duration-300 transform hover:scale-105"
                    >
                        User Details
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="bg-[#0F172A] min-h-screen p-6 text-white">
                <button  
                    onClick={() => navigate('/services')} 
                    className="bg-gradient-to-r from-[#2563EB] to-[#6D28D9] text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                    {`← Back`}
                </button>

                <div className="flex flex-row mt-6">
                    {/* Sidebar */}
                    <div className=" max-h-fit w-[25%] bg-[#1E293B] p-4 rounded-lg shadow-lg ">
                        <button 
                            className={`w-full p-3 py-3 my-2 text-left rounded-lg text-lg font-semibold transition-all duration-300 ${
                                comp === 0 ? 'bg-[#2563EB] text-white' : 'bg-[#374151] text-[#C7D2FE] hover:bg-[#475569]'
                            }`}
                            onClick={() => setComp(0)}
                        >
                            Service Info
                        </button>
                        <button 
                            className={`w-full p-3 py-3 my-2 text-left rounded-lg text-lg font-semibold transition-all duration-300 ${
                                comp === 1 ? 'bg-[#2563EB] text-white' : 'bg-[#374151] text-[#C7D2FE] hover:bg-[#475569]'
                            }`}
                            onClick={() => setComp(1)}
                        >
                            Logs
                        </button>
                        <button 
                            className={`w-full p-3 py-3 my-2 text-left rounded-lg text-lg font-semibold transition-all duration-300 ${
                                comp === 2 ? 'bg-[#2563EB] text-white' : 'bg-[#374151] text-[#C7D2FE] hover:bg-[#475569]'
                            }`}
                            onClick={() => setComp(2)}
                        >
                            Settings
                        </button>
                        {/* <button 
                            className={`w-full p-3 py-3 my-2 text-left rounded-lg text-lg font-semibold transition-all duration-300 ${
                                comp === 3 ? 'bg-[#2563EB] text-white' : 'bg-[#374151] text-[#C7D2FE] hover:bg-[#475569]'
                            }`}
                            onClick={() => setComp(3)}
                        >
                            Redeploy
                        </button> */}
                    </div>

                    {/* Content Panel */}
                    <div className="flex-grow ml-6 bg-[#1E293B] p-6 rounded-lg shadow-lg w-[75%]">
                        {Components[comp]}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceInfo;
