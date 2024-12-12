"use client";

import "@/app/assets/css/home.css";
import Navbar from "@/components/fragments/Navbar/Navbar";
import Footer from "@/components/fragments/Footer/Footer";
import Header from "@/components/fragments/Header/Header";
import HeaderSection from "@/components/fragments/HeaderSection/HeaderSection";
import EditorPick from "@/components/fragments/EditorPick/EditorPick";
import SliderComp from "@/components/fragments/Carousel/SliderComp";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>

      <Header />

      <div className="flex justify-center">
        <div className="container mx-auto px-4 sm:px-5 md:px-0 lg:px-0">
          <div>
            <HeaderSection
              title={"FLASH SALE"}
              subtitle={"Today's"}
              link={"Ini Link"}
            />

            <div className="mb-5 overflow-x-hidden">
              <div className="mx-auto max-w-7xl">
                <div>
                  <SliderComp></SliderComp>
                </div>
              </div>
            </div>

            <HeaderSection
              title={"EDITOR'S PICK"}
              subtitle={"Categories"}
              link={"Ini Link"}
            />

            <div className="mb-10">
              <EditorPick />
            </div>

            <HeaderSection
              title={"BEST SELLER PRODUCTS"}
              subtitle={"Categories"}
              link={"Ini Link"}
            />

            <div className="mb-10 overflow-x-hidden">
              <div className="mx-auto max-w-7xl">
                <div>
                  <SliderComp></SliderComp>
                </div>
              </div>
            </div>

            <HeaderSection
              title={"Our Resell World Wide"}
              subtitle={"Best"}
              link={"Ini Link"}
            />

            <div className="mx-auto mb-10 flex w-full flex-col items-center justify-center gap-6 rounded-lg bg-[#f6f0eb] p-8 md:flex-row">
              <div className="flex-1 text-center md:text-left">
                <p className="mb-4 text-sm leading-relaxed text-gray-700 md:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                  <br /> <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <button className="mt-4 rounded-lg bg-gray-300 px-5 py-2 text-gray-700 shadow-md transition-shadow hover:bg-gray-400">
                  Show More
                </button>
              </div>

              <div className="flex-1">
                <img
                  src="/assets/image/best_seller.png"
                  alt="best_seller"
                  className="rounded-lg object-cover shadow-lg"
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
