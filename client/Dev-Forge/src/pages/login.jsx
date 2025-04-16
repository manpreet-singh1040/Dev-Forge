import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/checkLogin", {
            method: "GET",
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            setLogin(data.status);
        })
        .catch(() => setLogin(false));
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        // Implement login logic here
        console.log("Email:", email, "Password:", password);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 px-4">
            <div className="bg-purple-800 shadow-xl rounded-2xl p-10 max-w-sm text-center text-white animate-fade-in">
                <h1 className="text-4xl font-extrabold text-blue-400 mb-6">Welcome Back!</h1>
                <p className="text-blue-300 mb-4">Sign in to continue</p>
                
                {login === null ? (
                    <div className="flex items-center justify-center">
                        <Loader2 className="animate-spin text-blue-400 w-8 h-8" />
                    </div>
                ) : login ? (
                    <>
                        <div className="text-xl text-blue-300 mb-6">You're already logged in!</div>
                        <button  
                            onClick={() => navigate("/")} 
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-transform transform hover:scale-105">
                            Back to Home
                        </button>
                    </>
                ) : (
                    <>
                        <form onSubmit={handleLogin} className="flex flex-col gap-4 mb-4">
                            <input 
                                type="email" 
                                placeholder="Email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="p-3 rounded-lg bg-purple-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <input 
                                type="password" 
                                placeholder="Password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="p-3 rounded-lg bg-purple-700 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                            <button 
                                type="submit" 
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-transform transform hover:scale-105">
                                Login
                            </button>
                        </form>
                        <p className="text-blue-300 mb-2">or</p>
                        <button 
                            onClick={() => (window.location.href = "http://localhost:3000/auth/github")} 
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-transform transform hover:scale-105">
                            Sign in with GitHub
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Login;