'use client';
import React, { useState } from 'react';

const FetchAndWriteJsonPage = () => {
  const [bucketName, setBucketName] = useState('');
  const [objectName, setObjectName] = useState('');
  const [fileName, setFileName] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/fetch-and-write-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bucketName, objectName, fileName }),
      });

      const result = await response.json();
      setResponse(result.message || result.error);
    } catch (error) {
      setResponse(`Failed to write file ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">
            Fetch and Write JSON File
          </h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="bucketName" className="sr-only">
                Bucket Name
              </label>
              <input
                id="bucketName"
                name="bucketName"
                type="text"
                required
                value={bucketName}
                onChange={(e) => setBucketName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Bucket Name"
              />
            </div>
            <div>
              <label htmlFor="objectName" className="sr-only">
                Object Name
              </label>
              <input
                id="objectName"
                name="objectName"
                type="text"
                required
                value={objectName}
                onChange={(e) => setObjectName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Object Name"
              />
            </div>
            <div>
              <label htmlFor="fileName" className="sr-only">
                File Name
              </label>
              <input
                id="fileName"
                name="fileName"
                type="text"
                required
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="File Name"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Fetch and Write File
            </button>
          </div>
        </form>
        {response && (
          <div className="mt-6 text-center text-sm text-red-500">
            {response}
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchAndWriteJsonPage;
