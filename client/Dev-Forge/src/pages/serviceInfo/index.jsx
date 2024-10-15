import React from 'react';
import { useState, useEffect } from 'react' ;
import { useNavigate,useParams } from 'react-router-dom' ;
import Info from './info';
import Logs from './log';
const ServiceInfo=()=>{
    useEffect(() => {
        fetch('http://localhost:3000/checkLogin', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if(!data.status){
                navigate('/login');
            }
        })});
    const navigate=useNavigate();
    const {id}=useParams();
    const [service, setService] = useState({});
    const [comp,setComp]=useState(0);
    useEffect(() => {
        // Fetch services from an API or database
        // This is just a placeholder for actual data fetching logic
        const fetchServices = async () => {
            const response = await fetch(`http://localhost:3000/services/${id}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await response.json();
            console.log(data);
            setService(data.service);
        };
        fetchServices();
    }, []);
    const Components=[<Info service={service}/>,<Logs id={id}/>,<div>Settings</div>,<div>redeploy</div>];
    return (
    <>
        <nav className="flex justify-between items-center mb-6 p-4 bg-gray-800 shadow-lg sticky top-0 left-0 right-0 z-10">
        <h1 className="text-2xl font-bold font-sans text-green-400 transition duration-300 hover:scale-105">
          Service Info
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
        <button  onClick={() => navigate('/services')} className="bg-green-400 text-black font-bold py-2 px-4 rounded transition duration-300 transform hover:bg-green-300 hover:scale-105 hover:shadow-lg">{`<- Back`}</button>
        <div className='flex flex-row'>
            <div className=' inline-flex flex-col bg-transparent border-2 m-2 p-2 flex-grow-1 w-[23%]'>
                <button className='bg-slate-400 m-2' onClick={()=>{ setComp(0)}}>Service Info</button>
                <button className='bg-slate-400 m-2' onClick={()=>{ setComp(1)}}>Logs</button>
                <button className='bg-slate-400 m-2' onClick={()=>{ setComp(2)}}>Settings</button>
                <button className='bg-slate-400 m-2' onClick={()=>{ setComp(3)}}>redeploy</button>
            </div>
            <div className='inline-flex flex-col bg-transparent border-2 m-2 p-2 flex-grow-0 w-11/12'>
            {Components[comp]}
            </div>
        </div>
        
        </div>
    </>
    )
}
export default ServiceInfo;