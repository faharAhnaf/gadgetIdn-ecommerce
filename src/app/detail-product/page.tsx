import React from 'react';
import "@/app/assets/css/detail_produk.css";
import QuantitySelector from "@/components/core/Input/QuantitySelector";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

export default function DetailProduk() {
  return (
    <div>

      <Link href="/" className='fixed top-10 left-20 flex items-center cursor-pointer'>
        <FontAwesomeIcon icon={faArrowLeft } className="text-gray-700 hover:text-black" />
        <p className='ml-3'>Kembali</p>
      </Link>

      <div className="bg-[#f4f1eb] min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl flex flex-col md:flex-row w-full max-w-screen-xl">
            
            <div className="p-4 md:p-6 flex justify-center">
                <img
                    src="/assets/image/detail_produk.png"
                    alt="Detail Produk"
                    className="w-[500px] md:w-[500px] rounded-md h-auto mx-auto"
                />
            </div>

            <div className="p-4 md:p-6 flex-1 overflow-y-auto max-h-screen md:max-h-[600px]">
            <div className="flex flex-col mb-2">
                <span className="bg-red-500 text-white text-xs max-w-min font-semibold px-2 py-1 mb-3 rounded-full">
                HOTSALE
                </span>
                <h1 className="text-xl md:text-2xl font-bold">
                    Samsung Galaxy S24 FE 5G 8/128GB 8/256GB Blue Black Gray Original [8/256GB] - Blue, 8/256GB
                </h1>
            </div>

            <p className="text-gray-500 text-sm mb-5">
                Electronic | ⭐️ 4.9 (2130 reviews)
            </p>

            <h1 className="text-lg font-semibold">Description :</h1>

            <div className="mt-2 space-y-2 text-gray-700 text-sm md:text-base">
                <p>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:
                <br /><br />
                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
                <br /><br />
                The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.
                </p>
            </div>

            <div className="mt-6 flex flex-col bg-white shadow-md p-4 rounded-lg border border-gray-200">
                <div className='flex justify-between mb-3'>
                    <div className="flex items-center space-x-4">
                        <img
                        src="/assets/image/seller.png"
                        alt="Store Logo"
                        className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <div className="flex items-center space-x-2">
                                <span className="text-md font-semibold">MHI - Samsung Authorized</span>
                                <span className="bg-green-600 text-white text-xs font-semibold px-1.5 py-0.5 rounded-md"><FontAwesomeIcon icon={faCheck} className="text-white" />
                                </span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-green-500 text-sm font-semibold">• Online</span>
                            </div>
                        </div>
                    </div>

                    <button className="px-4 py-1 border border-green-500 text-green-500 font-semibold rounded-lg hover:bg-green-50">
                        Follow
                    </button>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-500 text-sm space-x-1">
                        <span>⭐️ 5.0</span>
                        <span>(8 rb)</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm space-x-1">
                        <span>⏱️ ± 1 jam</span>
                        <span>pesanan diproses</span>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <p className="text-lg font-semibold">Select Size:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                <button className="px-4 py-2 bg-[#f9f7f3] text-[#a7a39b] font-semibold rounded-md mb-2">
                    8/128
                </button>
                <button className="px-4 py-2 bg-transparent border-2 border-[#e2dfd9] text-gray-800 font-semibold rounded-md mb-2">
                    8/256
                </button>
                <button className="px-4 py-2 bg-transparent border-2 border-[#e2dfd9] text-gray-800 font-semibold rounded-md mb-2">
                    4/128
                </button>
                <button className="px-4 py-2 bg-transparent border-2 border-[#e2dfd9] text-gray-800 font-semibold rounded-md mb-2">
                    4/256
                </button>
                </div>
            </div>

            <div className="mt-6">
                <p className="text-lg font-semibold">Select Color:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                <button className="px-4 py-2 bg-[#f9f7f3] text-[#a7a39b] font-semibold rounded-md mb-2">
                    Gray
                </button>
                <button className="px-4 py-2 bg-transparent border-2 border-[#e2dfd9] font-semibold rounded-md mb-2">
                    Black
                </button>
                <button className="px-4 py-2 bg-transparent border-2 border-[#e2dfd9] font-semibold rounded-md mb-2">
                    White
                </button>
                <button className="px-4 py-2 bg-transparent border-2 border-[#e2dfd9] font-semibold rounded-md mb-2">
                    Blue
                </button>
                </div>
            </div>

            <div className="fixed bottom-5 left-4 right-4 md:left-20 md:right-20 bg-white shadow-md p-4 px-6 sm:px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-8 rounded-xl overflow-x-auto">
                <div className="flex items-center space-x-4 flex-shrink-0">
                    <img
                        src="/assets/image/detail_produk.png"
                        alt="Whiskas Cat Food Thumbnail"
                        className="w-12 h-12 rounded-md"
                    />
                    <div className="text-center md:text-left">
                        <p className="font-semibold text-sm md:text-base">Samsung Galaxy S24 FE 5G 8/128GB 8/256GB Blue Black Gray Original [8/256GB] - Blue, 8/256GB</p>
                        <p className="text-xs md:text-sm text-blue-400 font-semibold">Electronic</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4 flex-shrink-0">
                    <span className="text-gray-700 font-semibold text-sm md:text-base">Qty:</span>
                    
                    <QuantitySelector />

                    <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md text-xs md:text-sm hover:bg-blue-700">
                        ADD TO CART
                    </button>
                </div>
            </div>

            </div>
        </div>
      </div>

    </div>
  );
};
