import React from "react";

const Settings = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100 p-6">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-blue-600 dark:text-cyan-400 mb-6">
          ⚙️ ChatsApp Settings
        </h1>

        <div className="space-y-4">
          <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 pb-2">
            <span className="font-semibold">App Name:</span>
            <span>ChatsApp</span>
          </div>

          <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 pb-2">
            <span className="font-semibold">Version:</span>
            <span>v1.0.0</span>
          </div>

          <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 pb-2">
            <span className="font-semibold">Developer:</span>
            <span>Harsh Patel</span>
          </div>

          <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 pb-2">
            <span className="font-semibold">Framework:</span>
            <span>MERN Stack</span>
          </div>

          <div className="flex justify-between border-b border-gray-300 dark:border-gray-700 pb-2">
            <span className="font-semibold">Purpose:</span>
            <span>Realtime Chat Application</span>
          </div>

          <div className="flex justify-between pb-2">
            <span className="font-semibold">Status:</span>
            <span className="text-green-500 font-medium">Active</span>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          Built with ❤️ by Harsh Patel © 2025
        </p>
      </div>
    </div>
  );
};

export default Settings;
