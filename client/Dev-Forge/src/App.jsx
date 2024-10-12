import { useState } from 'react'
import { BrowserRouter as Router, Route,Routes, useNavigate, BrowserRouter } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home.jsx'
import Login from './pages/login.jsx'
import ProjectSetupForm  from './pages/createService/index2.jsx'
import UserServices from './pages/userServices/index.jsx'
import ServiceInfo from './pages/serviceInfo/index.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <BrowserRouter>
      <div className='bg-black'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createservice" element={<ProjectSetupForm />} />
          <Route path="/services" element={<UserServices/>} />
          <Route path="/services/:id" element={<ServiceInfo/>} />
        </Routes> 

      </div>
      </BrowserRouter>
      </>
  )
}

export default App
