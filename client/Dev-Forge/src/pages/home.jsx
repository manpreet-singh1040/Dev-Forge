import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookie from 'js-cookie';

const Home = () => {
  useEffect(() => {
    isLogin();
  }, []);

  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);

  const getcok = () => {
    fetch('http://localhost:3000/hey', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    Cookie.remove('sessionToken');
    setLogin(false);
    console.log('logout');
  };

  const isLogin = () => {
    fetch('http://localhost:3000/checkLogin', {
      method: 'GET',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setLoading(false);
      if(data.status) {
        setLogin(true);
      }
    })
  };

  return (
    <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center p-4">
      {loading ? (
        <h1 className="text-2xl font-bold animate-pulse">Loading...</h1>
      ) : (
        <div className="space-y-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome Home</h1>
          {!login ? (
            <button
              onClick={handleLogin}
              className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4 rounded transition duration-300"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-black font-bold py-2 px-4 rounded transition duration-300"
            >
              Logout
            </button>
          )}
          <div className="text-xl">Hello from Radix Themes :)</div>
          <button
            onClick={() => { navigate('/createservice'); }}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4 rounded transition duration-300"
          >
            Let's go
          </button>
        </div>
      )}
    </div>
  )
}

export default Home;