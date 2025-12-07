import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
        <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full font-medium mb-4">
          hii
        </span>
        <p className="text-gray-600">Here's your main panel to manage everything smoothly.</p>
      </div>
    </div>
  );
};

export default Dashboard;
