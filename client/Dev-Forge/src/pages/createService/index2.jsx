import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Leaf } from 'lucide-react'

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

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
            type
            })
        })
        const data=await res.json();
        if(data.status===200){
            console.log('success');
            navigate('/services');
        }
        console.log(data);
      // Simulating a successful submission
      alert("Project Setup Submitted: Your project setup has been successfully submitted.")

      // Reset form (optional, depending on your use case)
      // setGitUrl('')
      // setEnvironment('')
      // setRepo('')
      // setBuildCommand('')
      // setRunCommand('')
      // setSubDomain('')
      // setType('')
    } catch (error) {
      alert("Error: Failed to submit project setup. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="text min-h-screen bg-gradient-to-br from-black via-black to-black flex items-center justify-center p-4">
      <div className=" w-full max-w-2xl bg-green-400 bg-opacity-90 backdrop-blur-md shadow-white rounded-lg">
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-center text-black">Project Setup</h2>
            <p className="text-center text-black-600">Configure your project deployment settings</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="gitUrl" className="block text-sm font-medium text-black-700">Git URL</label>
              <input
                id="gitUrl"
                type="text"
                value={gitUrl}
                onChange={(e) => setGitUrl(e.target.value)}
                placeholder="https://github.com/username/repo.git"
                className="w-full p-2 border-2 border-green-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="environment" className="block text-sm font-medium text-green-700">Environment</label>
              <select
                id="environment"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="w-full p-2 border-2 border-green-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              >
                <option value="">Select environment</option>
                <option value="node">Node</option>
                <option value="c++">C++</option>
                <option value="java">Java</option>
                <option value="go">Go</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="repo" className="block text-sm font-medium text-green-700">Repository</label>
              <input
                id="repo"
                type="text"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                placeholder="username/repo"
                className="w-full p-2 border-2 border-green-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="buildCommand" className="block text-sm font-medium text-green-700">Build Command</label>
              <input
                id="buildCommand"
                type="text"
                value={buildCommand}
                onChange={(e) => setBuildCommand(e.target.value)}
                placeholder="npm run build"
                className="w-full p-2 border-2 border-green-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="runCommand" className="block text-sm font-medium text-green-700">Run Command</label>
              <input
                id="runCommand"
                type="text"
                value={runCommand}
                onChange={(e) => setRunCommand(e.target.value)}
                placeholder="npm start"
                className="w-full p-2 border-2 border-green-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="subDomain" className="block text-sm font-medium text-green-700">Subdomain</label>
              <input
                id="subDomain"
                type="text"
                value={subDomain}
                onChange={(e) => setSubDomain(e.target.value)}
                placeholder="myproject"
                className="w-full p-2 border-2 border-green-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="type" className="block text-sm font-medium text-green-700">Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border-2 border-green-300 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              >
                <option value="">Select type</option>
                <option value="webservices">Web Services</option>
                <option value="container">Container</option>
                <option value="static-website">Static Website</option>
                <option value="database">Database</option>
              </select>
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 px-4 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              {isLoading ? (
                'Submitting...'
              ) : (
                <>
                  <Leaf className="mr-2" />
                  Submit Project Setup
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}