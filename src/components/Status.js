'use client';
import React, { useEffect, useState } from 'react';

const Status = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log("hiiiiii");
        const fetchData = async () => {
            const response = await fetch('/api/read-json-files');
            const result = await response.json();
            console.log({ result });
            setData(result);
        };

        fetchData();
    }, []);

    return (
        <div className="container m-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 p-2">
                {data.map((environment, index) => (
                    <React.Fragment key={index}>
                        <div className="card animate-slide-fade bg-white p-4 rounded shadow">
                            <div className="flex items-center">
                                <span className="h-3 w-3 mr-2 rounded-full bg-green-500"></span>
                                <span className="font-semibold text-green-500">Environment: {environment.environment}</span>
                            </div>
                            <p className="text-gray-600 text-green-500">{`Environment ${environment.environment} is working well.`}</p>
                        </div>
                        <div className="card animate-slide-fade bg-white p-4 rounded shadow">
                            <div className="flex items-center">
                                <span className={`h-3 w-3 mr-2 rounded-full ${environment?.api_database === undefined ? "bg-yellow-500" : (environment.api_database ? "bg-green-500" : "bg-red-500")}`}></span>
                                <span className={`font-semibold ${environment?.api_database === undefined ? "text-yellow-500" : (environment.api_database ? "text-green-500" : "text-red-500")}`}>API/Database: {environment.environment}</span>
                            </div>
                            <p className={`text-gray-600 ${environment?.api_database === undefined ? "text-yellow-500" : (environment.api_database ? "text-green-500" : "text-red-500")}`}>{`API/Databse of service ${environment.environment}`}</p>
                        </div>
                        <div className="card animate-slide-fade bg-white p-4 rounded shadow">
                            <div className="flex items-center">
                                <span className="h-3 w-3 mr-2 rounded-full bg-yellow-500"></span>
                                <span className="font-semibold text-yellow-500">{`Login Page ${environment.environment}`}</span>
                            </div>
                            <p className="text-gray-600 text-yellow-500">{`Getting time out while trying to login.`}</p>
                        </div>
                    </React.Fragment>

                ))}
            </div>
        </div>
    )
}

export default Status