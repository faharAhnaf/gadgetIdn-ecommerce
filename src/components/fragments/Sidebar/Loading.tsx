import React from "react";

const Loading = () => {
  return (
    <div className="animate-pulse">
      <div className="flex gap-4 border-b-2 py-5">
        <div className="group relative">
          <div className="h-24 w-24 rounded-full bg-gray-300" />
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
            <span className="text-lg text-white">Loading...</span>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-2">
          <div className="h-4 w-32 rounded bg-gray-300" />
          <div className="h-4 w-48 rounded bg-gray-300" />
        </div>
      </div>
      <div className="space-y-20">
        <ul className="mx-2 mt-8 space-y-6">
          <li className="flex flex-col">
            <div className="h-6 w-32 rounded bg-gray-300" />
          </li>
          <li className="flex flex-col">
            <div className="h-6 w-32 rounded bg-gray-300" />
          </li>
          <li className="flex cursor-pointer items-center gap-3">
            <div className="h-6 w-32 rounded bg-gray-300" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Loading;
