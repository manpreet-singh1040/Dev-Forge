import React from "react";
import { ExternalLink } from "lucide-react";

const Info = ({ service }) => {
    // console.log(service.subDomain);
    return (
        <div className="bg-[#0D1117] p-6 text-white rounded-lg border border-[#1F2937]">
            <h1 className="text-2xl font-bold text-[#3B82F6] border-b border-[#1F2937] pb-2 mb-4">
                Service Details
            </h1>

            <div className="space-y-3 text-[#CBD5E1]">
                <InfoRow title="Service Name" value={service.repo} />
                <InfoRow title="Service Type" value={service.type} />
                <InfoRow 
                    title="Service URL" 
                    value={
                        <a 
                            href={`http://${service.subDomain}.localhost`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[#38BDF8] hover:text-[#60A5FA] flex items-center gap-1"
                        >
                            {service.subDomain}.localhost
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    }
                />
                <InfoRow title="Service Status" value={service.status} />
                <InfoRow 
                    title="GitHub Repository" 
                    value={
                        <a 
                            href={service.gitUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[#38BDF8] hover:text-[#60A5FA] flex items-center gap-1"
                        >
                            {service.gitUrl}
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    }
                />
                <InfoRow title="Build Command" value={service.buildCommand} />
                <InfoRow title="Run Command" value={service.runCommand} />
                <InfoRow title="Directory" value={service.directory} />
            </div>
        </div>
    );
};

// 🔹 Reusable Row Component
const InfoRow = ({ title, value }) => (
    <div className="flex">
        <span className="font-semibold text-[#3B82F6] w-48">{title}:</span>
        <span className="text-white">{value || "N/A"}</span>
    </div>
);

export default Info;
