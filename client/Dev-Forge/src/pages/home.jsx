import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    document.title = "Dev-Forge | Deploy with Ease";
    checkLoginStatus();
  }, []);

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkLoginStatus = () => {
    fetch('http://localhost:3000/checkLogin', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      setLoading(false);
      if (data.status) {
        setIsLoggedIn(true);
      }
    })
    .catch(() => setLoading(false));
  };

  const handleLogout = () => {
    Cookie.remove('sessionToken');
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-white flex flex-col">
      {/* Navbar */}
      <header className="w-full fixed top-0 left-0 right-0 flex justify-between items-center py-6 px-10 bg-gray-900 shadow-xl z-50">
        <h1 className="text-5xl font-extrabold text-blue-500 tracking-wide">Dev-Forge</h1>
        <nav>
          <ul className="flex space-x-8 text-lg">
            <li><button onClick={() => navigate('/services')} className="hover:text-blue-400 transition duration-300">Dashboard</button></li>
            <li><button onClick={() => navigate('/createService')} className="hover:text-blue-400 transition duration-300">Create Service</button></li>
            <li>
              {isLoggedIn ? (
                <button onClick={handleLogout} className="hover:text-red-400 transition duration-300">Logout</button>
              ) : (
                <button onClick={() => navigate('/login')} className="hover:text-blue-400 transition duration-300">Login</button>
              )}
            </li>
          </ul>
        </nav>
      </header>
      
      {/* Main Content */}
      <main className="text-center mt-32 max-w-4xl mx-auto px-6">
        {loading ? (
          <h2 className="text-3xl font-bold animate-pulse">Loading...</h2>
        ) : (
          <>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 1 }}
              className="text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            >
              Effortless Deployment
            </motion.h2>
            <p className="mt-6 text-lg text-gray-300">
              Automate your frontend and backend deployments with Dev-Forge, making deployment seamless and stress-free.
            </p>
            <motion.button 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.5 }}
              onClick={() => navigate('/createService')} 
              className="mt-8 inline-block px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-lg rounded-full shadow-xl transition-all duration-300"
            >
              Get Started
            </motion.button>
          </>
        )}
      </main>
      
      {/* Additional Sections */}
      <section className="mt-20 px-6 max-w-4xl mx-auto text-center space-y-20">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-gray-700 p-10 rounded-lg shadow-lg"
        >
          <h3 className="text-4xl font-bold text-blue-400">Why Choose Dev-Forge?</h3>
          <p className="mt-4 text-gray-300">Experience seamless deployment with zero downtime and automatic scaling.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-gray-700 p-10 rounded-lg shadow-lg"
        >
          <h3 className="text-4xl font-bold text-blue-400">Advanced Features</h3>
          <p className="mt-4 text-gray-300">Supports multiple environments, easy rollback, and real-time monitoring.</p>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="mt-32 py-6 text-gray-400 text-sm border-t border-gray-700 w-full text-center">
        &copy; 2025 Dev-Forge. All rights reserved.
      </footer>
    </div>
  );
}
