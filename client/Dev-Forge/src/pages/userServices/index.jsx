import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserServices = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch services from an API or database
        // This is just a placeholder for actual data fetching logic
        const fetchServices = async () => {
            const response = await fetch(`/services`);
            const data = await response.json();
            setServices(data);
        };

        fetchServices();
    }, []);
    return (
        <div>
            <h1>User Services</h1>
            <ul>
                {services.map((service, index) => (
                    <li key={index} onClick={(index)=>{
                        navigate(`/services/${index}`)
                    }}>
                        <h2>{service.name}</h2>
                        <p>{service.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserServices;