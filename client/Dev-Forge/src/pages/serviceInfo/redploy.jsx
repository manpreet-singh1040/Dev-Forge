import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading';
const Redeploy = (props) => {
    const navigate = useNavigate();
    const { id , setComp } = props;
    const [loading, setLoading] = useState(false);
    const handleRedeploy = async() => {
        // Add your redeploy logic here
        setLoading(true);
        let res=await fetch(`http://localhost:3000/redeploy/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        let data=await res.json();
        console.log(data);
        setLoading(false);
        if(data.status){
            console.log('Redeployed successfully');
            setComp(1);
        }
        console.log('Redeploying project...');
    };

    return (
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
            {loading? <Loading />:
            <>

            <h2 className="text-2xl font-bold mb-4 text-center">Do you want to redeploy the project?</h2>
            <button 
                onClick={handleRedeploy}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
                Redeploy
            </button>
            </>}
        </div>
    );
    
};

export default Redeploy;