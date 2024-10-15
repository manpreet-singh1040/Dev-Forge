import React, { useState, useEffect, useRef } from "react";

const Logs = (props) => {
    const { id } = props; // Destructure id from props
    const [logs, setLogs] = useState([]);
    const logContainerRef = useRef(null); // Create a ref for the log container

    const fetchLogs = async () => {
        const response = await fetch(`http://localhost:3000/logs/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await response.json();
        if (data.logs) {
            // Split logs into lines and set them directly
            setLogs([data.logs]);
        }
    };

    const refreshLogs = () => {
        fetchLogs(); // Call fetchLogs to refresh logs
    };

    useEffect(() => {
        fetchLogs(); // Fetch logs when component mounts
    }, [id]);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight; // Scroll to the bottom
        }
    }, [logs]);

    return (
        <div className="p-6 bg-gray-900 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-green-400">Service Logs</h1>
                <button
                    onClick={refreshLogs}
                    className="bg-green-600 text-white font-bold px-4 py-2 rounded transition duration-300 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Logs
                </button>
            </div>
            <div
                ref={logContainerRef}
                className="h-[400px] overflow-y-auto rounded-md border border-gray-800 bg-gray-800"
            >
                {logs.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-lg text-gray-400">No logs available for this service.</p>
                    </div>
                ) : (
                    <ul className="space-y-2 p-4">
                        {logs.map((log, index) => (
                            <li key={index} className="p-3 bg-gray-700 rounded-lg">
                                <pre className="whitespace-pre-wrap text-sm text-white font-mono">{log}</pre>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Logs;
