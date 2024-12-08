"use client";

import Navbar from "@/components/fragments/Navbar/index";
import Footer from "@/components/fragments/Footer/index";
import { FaInstagram, FaTiktok, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold text-black mt-10">Contact Us</h1>
        <p className="text-lg text-gray-700 mt-4 text-center">
          Reach out to us through any of the following platforms. We’re here to help!
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          <div className="flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
            <FaInstagram className="text-pink-500 text-4xl mr-4" />
            <div>
              <h2 className="text-xl font-bold">Instagram</h2>
              <a
                href="https://www.instagram.com/rezatamaar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                @rezatamaar
              </a>
            </div>
          </div>

          <div className="flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
            <FaTiktok className="text-black text-4xl mr-4" />
            <div>
              <h2 className="text-xl font-bold">Tiktok</h2>
              <a
                href="https://www.tiktok.com/@rezatamaar_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                @rezatamaar_
              </a>
            </div>
          </div>

          <div className="flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
            <FaEnvelope className="text-red-500 text-4xl mr-4" />
            <div>
              <h2 className="text-xl font-bold">Email</h2>
              <p className="text-gray-700">contact@yourdomain.com</p>
            </div>
          </div>

          <div className="flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
            <FaPhoneAlt className="text-green-500 text-4xl mr-4" />
            <div>
              <h2 className="text-xl font-bold">Phone</h2>
              <p className="text-gray-700">+62 818-0819-1102</p>
            </div>
          </div>

          <div className="flex items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition md:col-span-2">
            <FaMapMarkerAlt className="text-red-500 text-4xl mr-4" />
            <div>
              <h2 className="text-xl font-bold">Location</h2>
              <p className="text-gray-700">123 Main Street, Your City, Your Country</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
