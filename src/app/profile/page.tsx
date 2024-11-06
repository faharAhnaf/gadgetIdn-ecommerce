"use client";

import Navbar from "@/components/fragments/Navbar";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleRight,
  faArrowRightFromBracket,
  faDatabase,
  faGear,
  faGlobe,
  faHouseChimney,
  faLock,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";

const UserProfile = () => {
  const [currentMenu, setCurrentMenu] = useState<string>("");
  const [data, setData] = useState<any>("");
  const [onChange, setOnChange] = useState<any>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("userSession");
    console.log("Stored Data:", storedData);
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  return (
    <div className="flex justify-center">
      <Navbar />
      <div className="m-10 my-28 w-96 p-5 shadow-xl rounded-xl">
        <div className="flex gap-4 border-b-2 py-5">
          <div className="bg-slate-400 rounded-full size-24" />
          <div className="flex-col flex justify-center">
            <p>{data.name || "loading..."} </p>
            <p>{data.email || "loading..."}</p>
          </div>
        </div>

        <div className="space-y-20">
          <ul className="mx-2 my-8 space-y-6">
            {/* Button Profile */}
            <li className="flex flex-col">
              <button
                type="button"
                className={`${currentMenu === "profile" ? "active" : ""}`}
                onClick={() => toggleMenu("profile")}
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faUser} className="w-5" />
                  <p>Profile</p>
                  <div className="ml-auto">
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
              </button>
            </li>
            {/* Button Settings */}
            <li className="flex flex-col">
              <button
                type="button"
                className={`${currentMenu === "settings" ? "active" : ""}`}
                onClick={() => toggleMenu("settings")}
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faGear} className="w-5" />
                  <span className="text-black">Settings</span>
                  <div
                    className={`ml-auto ${
                      currentMenu == "settings" ? "rotate-90" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
              </button>

              <AnimateHeight
                duration={300}
                height={currentMenu === "settings" ? "auto" : 0}
              >
                <ul className="space-y-6 mt-6">
                  <li>
                    <button className="flex items-center gap-3 w-full">
                      <FontAwesomeIcon icon={faHouseChimney} className="w-5" />
                      <div className="text-left">
                        <p>Daftar Alamat</p>
                        <p className="text-[13px]">Atur Alamat Pengiriman</p>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center gap-3 w-full">
                      <FontAwesomeIcon icon={faDatabase} className="w-5" />
                      <div className="text-left">
                        <p>Rekening Bank</p>
                        <p className="text-[13px]">Tarik Saldo</p>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center gap-3 w-full">
                      <FontAwesomeIcon icon={faWallet} className="w-5" />
                      <div className="text-left">
                        <p>Pembayaran Instan</p>
                        <p className="text-[13px]">
                          E-Wallet, kartu kredit, debit instan terdaftar
                        </p>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center gap-3 w-full">
                      <FontAwesomeIcon icon={faLock} className="w-5" />
                      <div className="text-left">
                        <p>Keamanan Akun</p>
                        <p className="text-[13px]">
                          Kata sandi, PIN, Verifikasi data diri
                        </p>
                      </div>
                    </button>
                  </li>
                  <li className="hover:bg-blue-300">
                    <button className="flex items-center gap-3 w-full">
                      <FontAwesomeIcon icon={faBell} className="w-5" />
                      <div className="text-left">
                        <p>Notifikasi</p>
                        <p className="text-[13px]">Atur notifikasi</p>
                      </div>
                    </button>
                  </li>
                  <li>
                    <button className="flex items-center gap-3 w-full">
                      <FontAwesomeIcon icon={faGlobe} className="w-5" />
                      <div className="text-left">
                        <p>Privasi Akun</p>
                        <p className="text-[13px]">Atur penggunaan data</p>
                      </div>
                    </button>
                  </li>
                </ul>
              </AnimateHeight>
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faBell} className="w-5" />
              <p>Notification</p>
              <span className="ml-auto">Allow</span>
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-5" />
              <p>Logout</p>
            </li>
          </ul>
        </div>
      </div>

      <div className=" m-10 my-28 w-[50%] p-5 shadow-xl rounded-xl ">
        <ul className="mx-2 my-8 space-y-6">
          <li className="flex items-center gap-3 border-b-2 py-5">
            <FontAwesomeIcon icon={faUser} />
            <p>My Profile</p>
            <FontAwesomeIcon icon={faAngleRight} className="ml-auto" />
          </li>
          <form action="">
            <li className="flex items-center gap-3 py-5 border-b-2 justify-between">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className=" w-1/2 h-10 text-right"
                defaultValue={data.name}
                onChange={(e) => setOnChange(e.target.value)}
              />
            </li>
            <li className="flex items-center gap-3 py-5 border-b-2 justify-between">
              <label htmlFor="name">Email Account</label>
              <input
                type="text"
                className=" w-1/2 h-10 text-right"
                defaultValue={data.email}
                // onChange={(e) => setOnChange(e.target.value)}
              />
            </li>
            <li className="flex items-center gap-3 py-5 border-b-2 justify-between">
              <label htmlFor="name">Mobile Number</label>
              <input
                type="text"
                className=" w-1/2 h-10 text-right"
                defaultValue={"your phone number"}
                // onChange={(e) => setOnChange(e.target.value)}
              />
            </li>
            <li className="flex items-center gap-3 py-5 border-b-2 justify-between">
              <label htmlFor="name">Location</label>
              <input
                type="text"
                className=" w-1/2 h-10 text-right"
                defaultValue={"your Location"}
                // onChange={(e) => setOnChange(e.target.value)}
              />
            </li>
            <li className="flex items-center gap-3 py-5  justify-between">
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg">
                Save Change
              </button>
            </li>
          </form>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
