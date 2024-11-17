"use client"

import "@/app/assets/css/home.css";
import Navbar from "@/components/fragments/Navbar/index";
import Footer from "@/components/fragments/Footer/index";
import Header from "@/components/fragments/Header/index";
import HeaderSection from "@/components/fragments/HeaderSection/index";
import EditorPick from "@/components/fragments/EditorPick/index";
import SliderComp from "@/components/fragments/Carousel/Slider"

export default function Home() {

  return (
    <div>
      <Navbar></Navbar>

      <Header/>

      <div className="flex justify-center">

        <div className="container mx-auto px-4 md:px-0 lg:px-0 sm:px-5">
          <div>
            
            <HeaderSection title={"FLASH SALE"} subtitle={"Today's"} link={"Ini Link"} />

            <div className="overflow-x-hidden mb-5">
              <div className="max-w-7xl mx-auto">
      
                <div>
                  <SliderComp></SliderComp>
                </div>
      
              </div>
            </div>

            <HeaderSection title={"EDITOR'S PICK"} subtitle={"Categories"} link={"Ini Link"} />

            <div className="mb-10">
              <EditorPick/>
            </div>

            <HeaderSection title={"BEST SELLER PRODUCTS"} subtitle={"Categories"} link={"Ini Link"} />

            <div className="overflow-x-hidden mb-10">
              <div className="max-w-7xl mx-auto">

                <div>
                  <SliderComp></SliderComp>
                </div>

              </div>
            </div>

            <HeaderSection title={"Our Resell World Wide"} subtitle={"Best"} link={"Ini Link"} />

            <div className="bg-[#f6f0eb] p-8 rounded-lg w-full mx-auto flex items-center justify-center flex-col md:flex-row gap-6 mb-10">

              <div className="flex-1 text-center md:text-left">
                <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  <br/> <br/>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.         
                </p>
                <button className="mt-4 bg-gray-300 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-400 transition-shadow shadow-md">
                  Show More
                </button>
              </div>

              <div className="flex-1">
                <img
                  src="/assets/image/best_seller.png"
                  alt="best_seller"
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>

          </div>


        </div>

      </div>

      <Footer></Footer>

    </div>
  );
}
