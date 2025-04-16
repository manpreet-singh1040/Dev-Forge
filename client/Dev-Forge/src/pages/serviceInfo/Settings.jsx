import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Redeploy from './redploy';

const Settings = ({ handleDeleteService }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6">
            <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
                <h2 className="text-lg font-semibold mb-4">
                    Do you want to redeploy the project?
                </h2>
                <div className="flex justify-center gap-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                        Redeploy
                    </button>
                </div>
            </div>
            <button 
                className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-700 transition"
                onClick={handleDeleteService}
            >
                Delete Service
            </button>
        </div>
    );
};
    

export default Settings;
