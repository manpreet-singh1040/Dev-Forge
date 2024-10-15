import { useEffect, useState } from "react";
import { useNavigate   } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [login,setLogin]=useState(false);
    const handleClick = async () => {
        window.location.href = 'http://localhost:3000/auth/github';
    }
    useEffect(() => {
        fetch('http://localhost:3000/checkLogin', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if(data.status){
                setLogin(true);
            }
        }
        )
    }, []);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <div className="bg-gray-900 shadow-lg rounded-lg p-8 animate-fade-in">
                <h1 className="text-4xl font-bold text-green-400 mb-6">Login</h1>
                {
                    login ? 
                    <>
                        <div className="text-2xl text-green-300 mb-6 animate-pulse">Already logged in!</div>
                        <button  
                            onClick={() => { navigate('/') }} 
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 transition duration-300 ease-in-out transform hover:scale-105">
                            Back to home page
                        </button>
                    </>
                    : 
                    <button 
                        onClick={handleClick} 
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500 transition duration-300 ease-in-out transform hover:scale-105">
                        GitHub Auth
                    </button>
                }
            </div>
    
            {/* Animation styles */}
            <style jsx>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fade-in 1s ease-in-out;
                }
            `}</style>
        </div>
    )
    
    
    }
    export default Login;