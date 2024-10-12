import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
const CreateService = () => {
    const [formData, setFormData] = useState({
        giturl: '',
        environment: 'node',
        repo: '',
        buildCommand: '',
        runCommand: '',
        subDomain: '',
        type: 'webservice'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Add your form submission logic here
    };

    return (
        <div>
            <h1>Create Service</h1>
            <form onSubmit={handleSubmit} className='bg-green-500'>
                <div>
                    <label>Git URL:</label>
                    <input type="text" name="giturl" value={formData.giturl} onChange={handleChange} />
                </div>
                <div>
                    <label>Environment:</label>
                    <select name="environment" value={formData.environment} onChange={handleChange}>
                        <option value="node">Node</option>
                        <option value="gcc">GCC</option>
                    </select>
                </div>
                <div>
                    <label>Repo:</label>
                    <input type="text" name="repo" value={formData.repo} onChange={handleChange} />
                </div>
                <div>
                    <label>Build Command:</label>
                    <input type="text" name="buildCommand" value={formData.buildCommand} onChange={handleChange} />
                </div>
                <div>
                    <label>Run Command:</label>
                    <input type="text" name="runCommand" value={formData.runCommand} onChange={handleChange} />
                </div>
                <div>
                    <label>Sub Domain:</label>
                    <input type="text" name="subDomain" value={formData.subDomain} onChange={handleChange} />
                </div>
                <div>
                    <label>Type:</label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                        <option value="webservice">Web Service</option>
                        <option value="staticwebsite">Static Website</option>
                        <option value="container">Container</option>
                        <option value="database">Database</option>
                    </select>
                </div>
                <button type="submit">Create Service</button>
            </form>
        </div>
    );
};

export default CreateService;