import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showTimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState(10);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleQuickStart = () => {
    setShowTimer(true);
    setTimer(10);
  };

  useEffect(() => {
    let interval = null;

    if (showTimer) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setShowTimer(false);
            return 10;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [showTimer]);

  const timerPercentage = (timer / 10) * 100;
  const strokeDashoffset = ((100 - timerPercentage) / 100) * Math.PI * 2 * 20;

  return (
    <nav className="flex flex-col lg:flex-row justify-between items-center bg-white text-gray-800 py-6 px-6 shadow-3xl">
      <div className="flex items-center">
        <div className="mr-4">
          <div className="h-10 w-10 rounded-full flex items-center justify-center bg-black">
            <span className="text-white font-extrabold text-2xl">B</span>
          </div>
        </div>
        <span className="font-bold text-xl">Project Dashboard</span>
      </div>
      <div className="flex items-center mt-4 lg:mt-0">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search my storyboards"
            value={searchQuery}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-20 py-2 rounded bg-gray-50 text-black border border-gray-400 focus:outline-none"
          />
        </div>
        <button
          onClick={handleQuickStart}
          className="mt-4 lg:mt-0 ml-0 lg:ml-4 bg-blue-100 hover:bg-blue-300 text-black font-bold py-2 px-4 lg:px-10 rounded border-2 border-blue-300 relative flex items-center"
        >
          <span className="mr-auto">Quick Start</span>
          {showTimer && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-start">
              <div className="relative">
                <svg className="m-1" width="30" height="30" viewBox="0 0 40 40">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="4"
                    strokeDasharray="100"
                    strokeDashoffset={strokeDashoffset}
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">{timer}</span>
              </div>
            </div>
          )}
        </button>
        <div className="mt-4 lg:mt-0 ml-0 lg:ml-4">
          <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-700 via-brown-300 to-white border border-black">
            <span className="text-black font-bold text-lg">A</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
