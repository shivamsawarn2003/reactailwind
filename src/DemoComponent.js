import React, { useState } from 'react';

const DemoComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [storyboardName, setStoryboardName] = useState('');
  const [frameSize, setFrameSize] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [frames, setFrames] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFrame = {
      storyboardName,
      frameSize,
      imageFile,
      dateCreated: new Date(), // Add date created
    };
    setFrames((prevFrames) => [...prevFrames, newFrame]);
    setStoryboardName('');
    setFrameSize('');
    setImageFile(null);
    setShowForm(false);
  };

  const addNewFrame = () => {
    setShowForm(true);
  };

  return (
    <div className="relative bg-gray-100 min-h-screen">
      {/* Dim background overlay */}
      {showForm && (
        <div className="fixed top-0 left-0 z-10 w-full h-full bg-black opacity-50"></div>
      )}

      <div className="flex flex-col lg:flex-row justify-between items-end z-20">
        <div className="flex items-center lg:mt-11 lg:ml-11">
          <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-br from-yellow-700 via-brown-300 to-white border border-black mt-11 ml-11 lg:mt-0 lg:ml-0">
            <span className="text-black font-bold text-lg">A</span>
          </div>
          <span className="ml-2 mt-11 lg:mt-0 lg:ml-2 font-bold">Adam Cooper Team</span>
        </div>
        <button
          className="mr-4 mt-4 lg:mt-0 lg:mr-11 bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded z-20"
          onClick={addNewFrame}
        >
          New Project
        </button>
      </div>

      {/* Show form if 'showForm' is true */}
      {showForm && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg z-30">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <h1 className="font-bold">New Storyboard</h1>
              <br />
              <label
                htmlFor="storyboardName"
                className="block text-gray-700 font-md mb-2"
              >
                Storyboard Name
              </label>
              <input
                type="text"
                id="storyboardName"
                placeholder="Enter storyboard name"
                value={storyboardName}
                onChange={(e) => setStoryboardName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="frameSize"
                className="block text-gray-700 font-md mb-2"
              >
                Frame Size
              </label>
              <input
                type="text"
                id="frameSize"
                placeholder="Enter frame size"
                value={frameSize}
                onChange={(e) => setFrameSize(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="imageUpload"
                className="block text-gray-700 font-md mb-2"
              >
                Image Upload
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Show frames */}
      <div className="bg-white py-20 mt-11 ml-11 mr-11 rounded shadow-xl">
        <div className="flex flex-row lg:ml-20 overflow-x-auto">
          {frames.map((frame, index) => (
            <div key={index} className="mr-4 flex flex-col items-center">
              <div className="w-80 h-60 overflow-hidden rounded-lg">
                {frame && frame.imageFile && (
                  <img
                    src={URL.createObjectURL(frame.imageFile)}
                    alt="Frame"
                    className="object-cover h-full w-full"
                  />
                )}
              </div>
              <h4 className="mt-2">{frame ? frame.storyboardName : ""}</h4>
              <h5 className="text-gray-400">
                {frame && frame.dateCreated && frame.dateCreated.toLocaleString()}
              </h5>
            </div>
          ))}
          <button
            className="bg-gray-300 hover:bg-gray-700 text-white font-bold text-4xl py-2 px-4 rounded-full border border-gray-500 ml-20"
            onClick={addNewFrame}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemoComponent;
