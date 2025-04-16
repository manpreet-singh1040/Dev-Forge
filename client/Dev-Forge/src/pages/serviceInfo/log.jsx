import React, { useState, useEffect, useRef } from "react";

const Logs = ({ id }) => {
    const [logs, setLogs] = useState([]);
    const logContainerRef = useRef(null);

    const fetchLogs = async () => {
        const response = await fetch(`http://localhost:3000/logs/${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        const data = await response.json();
        if (data.logs) setLogs([data.logs]);
    };

    const refreshLogs = () => fetchLogs();

    useEffect(() => { fetchLogs(); }, [id]);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight; 
        }
    }, [logs]);

    return (
        <div className="p-6 bg-[#0D1117] rounded-lg border border-[#1F2937] space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-[#3B82F6]">Service Logs</h1>
                <button
                    onClick={refreshLogs}
                    className="bg-[#2563EB] text-white font-bold px-4 py-2 rounded transition duration-300 hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-opacity-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Logs
                </button>
            </div>
            <div
                ref={logContainerRef}
                className="h-[400px] overflow-y-auto rounded-md border border-[#1F2937] bg-[#161B22]"
            >
                {logs.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-lg text-gray-400">No logs available for this service.</p>
                    </div>
                ) : (
                    <ul className="space-y-2 p-4">
                        {logs.map((log, index) => (
                            <li key={index} className="p-3 bg-[#1E293B] rounded-lg">
                                <pre className="whitespace-pre-wrap text-sm text-[#CBD5E1] font-mono">{log}</pre>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Logs;
