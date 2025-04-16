import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle } from 'lucide-react';
import MultiStepForm from './createServiceForm';

function ReviewDetails({ formData, onSubmit, onEdit }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-center mb-4 text-purple-400">Review Your Details</h3>
      <div className="bg-gray-700 p-4 rounded-lg text-white">
        {Object.entries(formData).map(([key, value]) => (
          <p key={key} className="mb-2"><strong>{key}:</strong> {value || 'N/A'}</p>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={onEdit} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg">
          Edit
        </button>
        <button onClick={onSubmit} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
          Submit
        </button>
      </div>
    </div>
  );
}

export default function CreateService() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gitUrl: '',
    repo: '',
    environment: '',
    type: '',
    buildCommand: '',
    runCommand: '',
    subDomain: '',
    directory: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/checkLogin', {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (!data.status) {
          navigate('/login');
        }
      });
  }, [navigate]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsSubmitted(false);

    try {
      const res = await fetch('http://localhost:3000/build', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (res.status === 200) {
        setIsSubmitted(true);
        setTimeout(() => navigate('/services'), 2000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      alert('Project Setup Failed: Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-blue-500">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-gradient blur-3xl opacity-80"></div>
      <div className="absolute inset-0 animate-blurSpot"></div>
      <div className="relative w-full max-w-xl bg-gray-800 bg-opacity-95 backdrop-blur-lg shadow-2xl rounded-xl p-8 text-white border border-gray-700">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 rounded-xl">
            <Loader2 className="w-12 h-12 animate-spin text-purple-400" />
            <p className="mt-2 text-gray-300">Deploying your service...</p>
          </div>
        )}

        {isSubmitted && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 rounded-xl text-center">
            <CheckCircle className="w-16 h-16 text-purple-400" />
            <p className="mt-2 text-lg font-bold">Service Created Successfully!</p>
          </div>
        )}

        <h2 className="text-3xl font-bold text-center mb-4 text-purple-400">Create Your Service</h2>
        <p className="text-center text-gray-300 mb-6">Set up and deploy your service seamlessly</p>

        {!isReviewing ? (
          <MultiStepForm formData={formData} setFormData={setFormData} onComplete={() => setIsReviewing(true)} />
        ) : (
          <ReviewDetails formData={formData} onSubmit={handleSubmit} onEdit={() => setIsReviewing(false)} />
        )}
      </div>

      <style>{`
        @keyframes gradientMove {
          0% { transform: translateX(-50%) translateY(-50%); }
          50% { transform: translateX(50%) translateY(50%); }
          100% { transform: translateX(-50%) translateY(-50%); }
        }
        .animate-gradient {
          animation: gradientMove 10s infinite alternate ease-in-out;
        }
        @keyframes blurSpot {
          0% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.2); }
          100% { opacity: 0.6; transform: scale(1); }
        }
        .animate-blurSpot {
          background: radial-gradient(circle, rgba(255,255,255,0.3) 10%, transparent 60%);
          animation: blurSpot 6s infinite alternate;
        }
      `}</style>
    </div>
  );
}
