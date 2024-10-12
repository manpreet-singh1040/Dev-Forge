const React = require('react');
const { useState, useEffect } = require('react');
const { useNavigate,useParams } = require('react-router-dom');
const ServiceInfo=()=>{
    useEffect(() => {
        // Fetch services from an API or database
        // This is just a placeholder for actual data fetching logic
        let { id } = useParams();
        fetch(`/services/:${id}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        }
        )
    }, []);
    return (
        <div>
            <h1>Service Info</h1>
        </div>
    )
}
export default ServiceInfo;