import React, { useState } from 'react';
import { ChevronRight, CheckCircle, PlusCircle, Trash2 } from 'lucide-react';

const steps = [
  { id: 1, title: 'Repository', fields: ['gitUrl', 'repo'] },
  { id: 2, title: 'Configuration', fields: ['environment', 'type', 'buildCommand', 'runCommand', 'envVars'] },
  { id: 3, title: 'Deployment', fields: ['subDomain', 'directory'] }
];

export default function MultiStepForm({ formData, setFormData, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [envVars, setEnvVars] = useState([{ key: "", value: "" }]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEnvChange = (index, field, value) => {
    const updatedVars = envVars.map((env, i) =>
      i === index ? { ...env, [field]: value } : env
    );
    setEnvVars(updatedVars);
    setFormData({ ...formData });
  };

  const addEnvVar = () => {
    setEnvVars([...envVars, { key: "", value: "" }]);
  };

  const removeEnvVar = (index) => {
    const updatedVars = envVars.filter((_, i) => i !== index);
    setEnvVars(updatedVars);
    setFormData({ ...formData});
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    onComplete();
  };

  return (
    <div className="w-full p-6 bg-[#1E1E2E] bg-opacity-95 backdrop-blur-lg rounded-xl shadow-lg text-white border border-[#313244]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-[#CBA6F7]">{steps[currentStep].title}</h3>
        <p className="text-[#A6ADC8]">Step {currentStep + 1} of {steps.length}</p>
      </div>

      <div className="space-y-4">
        {steps[currentStep].fields.map((field) => (
          field === 'type' ? (
            <select
              key={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-3 bg-[#313244] rounded-lg border border-[#45475A] focus:outline-none focus:ring-2 focus:ring-[#CBA6F7] text-white"
            >
              <option value="">Select Type</option>
              <option value="webservices">Web Services</option>
              <option value="website">Website</option>
            </select>
          ) : field === 'environment' ? (
            <select
              key={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-3 bg-[#313244] rounded-lg border border-[#45475A] focus:outline-none focus:ring-2 focus:ring-[#CBA6F7] text-white"
            >
              <option value="">Select Environment</option>
              <option value="node">Node</option>
              <option value="java">Java</option>
            </select>
          ) : field === 'envVars' ? (
            <div key={field} className="bg-[#313244] p-4 rounded-lg border border-[#45475A]">
              <h4 className="text-lg font-semibold mb-3 text-[#CBA6F7]">Environment Variables</h4>
              {envVars.map((env, index) => (
                <div key={index} className="flex gap-2 mb-3 items-center">
                  <input
                    type="text"
                    placeholder="Key"
                    value={env.key}
                    onChange={(e) => handleEnvChange(index, "key", e.target.value)}
                    className="w-1/3 p-2 bg-[#45475A] rounded-lg border border-[#5B5F72] text-white focus:outline-none placeholder-[#A6ADC8]"
                  />
                  <input
                    type="text"
                    placeholder="Value"
                    value={env.value}
                    onChange={(e) => handleEnvChange(index, "value", e.target.value)}
                    className="w-1/3 p-2 bg-[#45475A] rounded-lg border border-[#5B5F72] text-white focus:outline-none placeholder-[#A6ADC8]"
                  />
                  <button
                    onClick={() => removeEnvVar(index)}
                    className="p-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              ))}
              <button
                onClick={addEnvVar}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-[#CBA6F7] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#A6ADC8]-700 transition"
              >
                <PlusCircle className="w-5 h-5" /> Add Variable
              </button>
            </div>
          ) : (
            <input
              key={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field.replace(/([A-Z])/g, ' $1')}
              className="w-full p-3 bg-[#313244] rounded-lg border border-[#45475A] focus:outline-none focus:ring-2 focus:ring-[#CBA6F7] text-white placeholder-[#A6ADC8]"
            />
          )
        ))}
      </div>

      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <button onClick={prevStep} className="px-4 py-2 bg-[#313244] rounded-lg hover:bg-[#45475A] transition-all">Back</button>
        )}
        {currentStep < steps.length - 1 ? (
          <button onClick={nextStep} className="px-4 py-2 bg-[#CBA6F7] rounded-lg flex items-center gap-2 hover:bg-[#B4A0E5] transition-all">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button className="px-4 py-2 bg-[#CBA6F7] rounded-lg flex items-center gap-2 hover:bg-[#B4A0E5] transition-all" onClick={handleSubmit}>
            <CheckCircle className="w-4 h-4" /> Review
          </button>
        )}
      </div>
    </div>
  );
}