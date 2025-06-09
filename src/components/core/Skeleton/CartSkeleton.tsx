"use client";
export default function CartSkeleton() {
  return (
    <div className="border-1 mb-5 flex animate-pulse items-center justify-between rounded-lg border-[#f4f1eb] px-6 py-8 shadow-md">
      <div className="flex w-full items-start">
        <div className="mr-3 h-[20px] w-[20px] rounded-full bg-gray-300"></div>
        <div className="mr-4 h-[100px] w-[150px] rounded-md bg-gray-300"></div>

        <div className="flex w-full flex-col">
          <div className="mb-3 flex justify-between">
            <div className="mb-2 h-5 w-[150px] rounded-md bg-gray-300"></div>
            <div className="mb-2 h-5 w-[100px] rounded-md bg-gray-300"></div>
          </div>

          <div className="mb-2 h-4 w-full rounded-md bg-gray-300"></div>
          <div className="mb-2 h-4 w-full rounded-md bg-gray-300"></div>
          <div className="mb-2 h-4 w-1/2 rounded-md bg-gray-300"></div>

          <div className="mt-5 flex justify-between space-x-4">
            <div className="flex">
              <div className="h-6 w-16 rounded-md bg-gray-300"></div>
              <div className="ml-3 h-6 w-16 rounded-md bg-gray-300"></div>
            </div>

            <div className="flex">
              <div className="h-6 w-10 rounded-md bg-gray-300"></div>
              <div className="ml-3 h-6 w-24 rounded-md bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
