export default function Header() {
  return (
    <div className="mb-10 mt-[70px] lg:px-0">
      <div className="relative flex justify-center">
        <img src="/assets/image/header_3.jpg" alt="header" className="w-full" />

        <div className="absolute left-[7vw] top-[14vh] flex flex-col rounded-[8px] bg-opacity-50 p-4">
          <p className="text-md mb-3 font-semibold text-white">WINTER 2024</p>
          <h1 className="mb-2 text-5xl font-bold text-white sm:text-xl md:text-2xl lg:text-5xl">
            NEW TV COLLECTION
          </h1>
          <p className="text-md mb-3 text-white sm:text-sm md:text-base lg:text-lg">
            Upscale every moment with more Wow
          </p>
          <button className="text-md rounded-[14px] bg-blue-500 px-10 py-3 font-semibold text-white transition hover:bg-blue-600 sm:w-[100px] sm:px-5 md:w-[150px] md:px-6 lg:w-[200px]">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
