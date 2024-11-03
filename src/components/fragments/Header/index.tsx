export default function Header() {
  return (
    <div className="mt-[100px] lg:px-0 mb-10">
      <div className="relative flex justify-center">
        <img
          src="/assets/image/header.png"
          alt="header"
          className="w-full hover:scale-105 duration-500 rounded-[12px]"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 rounded-[8px] p-4">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 text-center">
            Get your gear here!
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-center text-white mb-3 px-4 sm:px-6 md:px-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="bg-blue-500 text-white text-md font-semibold py-2 px-4 sm:px-5 md:px-6 rounded-full hover:bg-blue-600 transition">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
