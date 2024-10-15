import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import Loading from '../../components/Loading'
export default function ProjectSetupForm() {
    const navigate=useNavigate();
  const [gitUrl, setGitUrl] = useState('')
  const [environment, setEnvironment] = useState('')
  const [repo, setRepo] = useState('')
  const [buildCommand, setBuildCommand] = useState('')
  const [runCommand, setRunCommand] = useState('')
  const [subDomain, setSubDomain] = useState('')
  const [type, setType] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const[directory,setDirectory]=useState('');
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
  const handleSubmit = async (e) => {
    console.log(`hi`);
    e.preventDefault()
    setIsLoading(true);

    try {
      // Simulating an API call
      //await new Promise(resolve => setTimeout(resolve, 1500))
      const res=await fetch('http://localhost:3000/build', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            gitUrl,
            environment,
            repo,
            buildCommand,
            runCommand,
            subDomain,
            type,
            directory
            })
        })
        const data=await res.json();
        if(data.status===200){
            console.log('success');
            navigate('/services');
        }
        console.log(data);
      // Simulating a successful submission
      console.log(res.status);
      if(res.status!==200){ throw new Error('error');}
      alert("Project Setup Submitted: Your project setup has been successfully submitted.")
      navigate(`/services/${data.id}`);
      //Reset form (optional, depending on your use case)
      setGitUrl('')
      setEnvironment('')
      setRepo('')
      setBuildCommand('')
      setRunCommand('')
      setSubDomain('')
      setType('')
      FileSystemDirectoryEntry();
    } catch (error) {
      //error popup component
      alert("Project Setup Failed: There was an error submitting your project setup. Please try again.")

    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-black flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-gradient-to-br from-green-500 to-green-400 bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg p-6">
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md rounded-lg">
            <div className="w-16 h-16 border-4 border-t-4 border-t-green-400 border-green-300 rounded-full animate-spin"></div>
          </div>
        )}
  
        <h2 className="text-3xl font-bold text-center text-white">Project Setup</h2>
        <p className="text-center text-gray-300 mb-4">Configure your project deployment settings</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="gitUrl" className="block text-sm font-medium text-gray-200">Git URL</label>
            <input
              id="gitUrl"
              type="text"
              value={gitUrl}
              onChange={(e) => setGitUrl(e.target.value)}
              placeholder="https://github.com/username/repo.git"
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition bg-white text-black"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="environment" className="block text-sm font-medium text-gray-200">Environment</label>
            <select
              id="environment"
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition bg-white text-black"
            >
              <option value="">Select environment</option>
              <option value="node">Node</option>
              <option value="c++">C++</option>
              <option value="java">Java</option>
              <option value="go">Go</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="repo" className="block text-sm font-medium text-gray-200">Repository</label>
            <input
              id="repo"
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              placeholder="username/repo"
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition bg-white text-black"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="buildCommand" className="block text-sm font-medium text-gray-200">Build Command</label>
            <input
              id="buildCommand"
              type="text"
              value={buildCommand}
              onChange={(e) => setBuildCommand(e.target.value)}
              placeholder="npm run build"
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition bg-white text-black"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="runCommand" className="block text-sm font-medium text-gray-200">Run Command</label>
            <input
              id="runCommand"
              type="text"
              value={runCommand}
              onChange={(e) => setRunCommand(e.target.value)}
              placeholder="npm start"
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition bg-white text-black"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="subDomain" className="block text-sm font-medium text-gray-200">Subdomain</label>
            <input
              id="subDomain"
              type="text"
              value={subDomain}
              onChange={(e) => setSubDomain(e.target.value)}
              placeholder="myproject"
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition bg-white text-black"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium text-gray-200">Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition bg-white text-black"
            >
              <option value="">Select type</option>
              <option value="webservices">Web Services</option>
              <option value="container">Container</option>
              <option value="static-website">Static Website</option>
              <option value="database">Database</option>
            </select>
          </div>
          <div>
            <label htmlFor="directory" className="block text-sm font-medium text-gray-200">Directory</label>
            <input
              id="directory"
              type="text"
              value={directory}
              onChange={(e) => setDirectory(e.target.value)}
              placeholder="Directory"
              className="w-full p-3 border border-green-500 rounded-lg focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition bg-white text-black"
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading} 
            className={`w-full bg-gradient-to-r from-green-500 to-green-400 text-white font-bold py-3 px-4 rounded-full transition-all duration-300 ${
              isLoading ? '' : 'hover:from-green-600 hover:to-green-500 transform hover:scale-105'
            }`}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
  
  
  
  
  
  
  
  
}