"use client";

export default function SearchListSkeleton() {
  return (
    <div className="flex h-full min-h-[425px] animate-pulse flex-col items-start rounded-lg bg-white p-4 shadow-lg">
      <div className="mb-4 h-48 w-full rounded-md bg-gray-300"></div>
      <div className="mb-2 h-5 w-3/4 rounded-md bg-gray-300"></div>
      <div className="mb-2 h-4 w-full rounded-md bg-gray-300"></div>
      <div className="mb-2 h-4 w-full rounded-md bg-gray-300"></div>
      <div className="mb-4 h-4 w-full rounded-md bg-gray-300"></div>

      <div className="mb-8 h-4 w-1/2 rounded-md bg-gray-300"></div>

      <div className="h-6 w-full rounded-md bg-gray-300"></div>
    </div>
  );
}
