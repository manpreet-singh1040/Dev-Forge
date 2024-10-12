import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        <div>
        <h1>Login</h1>
        {
            login ? 
            <>
             <div>Already loged In !!!</div>
             <button onClick={()=>{ navigate('/')}}>Back to home page</button>
            </> 
            : 
            <button onClick={handleClick}>github auth</button>
        }
        </div>
    )
    }
    export default Login;