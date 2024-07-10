'use client';
import React, { useEffect, useState } from 'react';
import { capitalizeGroupName } from '@/utils/capitalizeGroupName';

const Status = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/read-json-files');
            const result = await response.json();
            const groupedData = result.reduce((acc, item) => {
                if (!acc[item.group]) {
                    acc[item.group] = [];
                }
                acc[item.group].push(item);
                return acc;
            }, {});
            setData(groupedData);
        };

        fetchData();
    }, []);

    return (
        <div className="container m-auto">
            <div className="space-y-4">
                {Object.keys(data).map((group) => (
                    <div key={group} className="p-4 border rounded-lg shadow-md bg-white">
                        <h2 className="text-xl font-bold mb-2 text-gray-500">{capitalizeGroupName(group)} Services</h2>
                        <div className="space-y-2">
                            {data[group].map((environment, index) => (
                                <React.Fragment key={index}>
                                    {/* <div className="card animate-slide-fade bg-white p-4 rounded shadow">
                            <div className="flex items-center">
                                <span className="h-3 w-3 mr-2 rounded-full bg-green-500"></span>
                                <span className="font-semibold text-green-500">Environment: {environment.environment}</span>
                            </div>
                            <p className="text-gray-600 text-green-500">{`Environment ${environment.environment} is working well.`}</p>
                        </div> */}
                                    <div className="card animate-slide-fade bg-white p-4 rounded shadow-md">
                                        <div className="flex items-center">
                                            <span
                                                className={`h-3 w-3 mr-2 rounded-full ${environment?.api_database === undefined ? "bg-yellow-500" : (environment.api_database ? "bg-green-500" : "bg-red-500")}`}
                                            />
                                            <span
                                                className={`font-semibold ${environment?.api_database === undefined ? "text-yellow-500" : (environment.api_database ? "text-green-500" : "text-red-500")}`}
                                            >
                                                API/Database: {environment.environment}
                                            </span>
                                        </div>
                                        <p
                                            className={`text-gray-600 ${environment?.api_database === undefined ? "text-yellow-500" : (environment.api_database ? "text-green-500" : "text-red-500")}`}
                                        >
                                            {`API/Databse of service ${environment.environment} is ${environment.api_database ? 'working well' : 'not working'}.`}
                                        </p>
                                    </div>
                                    {/* <div className="card animate-slide-fade bg-white p-4 rounded shadow">
                            <div className="flex items-center">
                                <span className="h-3 w-3 mr-2 rounded-full bg-yellow-500"></span>
                                <span className="font-semibold text-yellow-500">{`Login Page ${environment.environment}`}</span>
                            </div>
                            <p className="text-gray-600 text-yellow-500">{`Getting time out while trying to login.`}</p>
                        </div> */}
                                </React.Fragment>

                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Status