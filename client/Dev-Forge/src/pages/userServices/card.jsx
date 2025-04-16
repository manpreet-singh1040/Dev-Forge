import React from 'react';
import { ExternalLink } from 'lucide-react';

const ServiceCard = ({ service, onClick }) => {
    return (
        <div 
            onClick={onClick} 
            className="p-6 bg-[#0F172A] rounded-xl border border-[#1E40AF] hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
        >
            <h2 className="text-2xl font-bold text-[#C7D2FE]">{service.repo}</h2>
            <p className="text-[#A5B4FC] mt-2">Type: <span className="text-white">{service.type}</span></p>
            <p className="text-[#A5B4FC] mt-1">Environment: <span className="text-white">{service.environment}</span></p>
            
            {/* Git URL */}
            <p className="mt-2">
                <a 
                    href={service.gitUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#60A5FA] hover:text-[#93C5FD] flex items-center gap-1 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()} // Prevents card click
                >
                    Git URL <ExternalLink className="w-4 h-4" />
                </a>
            </p>

            {/* Website Link */}
            <p className="mt-2">
                <a 
                    href={`http://${service.subDomain}.localhost`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#60A5FA] hover:text-[#93C5FD] flex items-center gap-1 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()} // Prevents card click
                >
                    {service.subDomain}.localhost <ExternalLink className="w-4 h-4" />
                </a>
            </p>
        </div>
    );
};

export default ServiceCard;
