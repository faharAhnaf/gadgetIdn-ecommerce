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
import Link from "next/link";
import React, { useState } from "react";
import AnimateHeight from "react-animate-height";

const UserProfile = () => {
  const [currentMenu, setCurrentMenu] = useState<string>("");

  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  // const { t } = getTranslation();
  return (
    <div className="">
      <Navbar></Navbar>
      <div className="w-[35%] min-h-screen m-10 mt-20">
        <div className="flex gap-4 border-b-2 py-5">
          <div className="bg-slate-400 rounded-full size-24"></div>
          <div className="flex-col flex justify-center">
            <p>Your name</p>
            <p>yourname@gmail.com</p>
          </div>
        </div>
        <div className="space-y-20">
          <ul className="mx-2 my-8 space-y-6">
            {/* Button Profile */}
            <li className="flex flex-col hover:text-blue-300">
              <button
                type="button"
                className={`${currentMenu === "profile" ? "active" : ""}`}
                onClick={() => toggleMenu("profile")}
              >
                <div className="flex items-center gap-3 hover:text-blue-300">
                  <FontAwesomeIcon icon={faUser} className="w-5" />
                  <p>Profile</p>
                  <div
                    className={`${
                      currentMenu == "profile" ? "rotate-90 rtl:rotate-90" : ""
                    } ml-auto`}
                  >
                    <FontAwesomeIcon icon={faAngleRight} className="" />
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
                    className={`${
                      currentMenu == "settings" ? "rotate-90 rtl:rotate-90" : ""
                    } ml-auto`}
                  >
                    <FontAwesomeIcon icon={faAngleRight} className="" />
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
                  <li className=" hover:bg-blue-300">
                    <button className="flex items-center gap-3 w-full ">
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

          {/* <ul className="mx-2 my-8 space-y-6">
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faUser} />
              <p>My Profile</p>
              <FontAwesomeIcon icon={faAngleRight} className="ml-auto" />
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faUser} />
              <p>My Profile</p>
              <FontAwesomeIcon icon={faAngleRight} className="ml-auto" />
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faUser} />
              <p>My Profile</p>
              <FontAwesomeIcon icon={faAngleRight} className="ml-auto" />
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faUser} />
              <p>My Profile</p>
              <FontAwesomeIcon icon={faAngleRight} className="ml-auto" />
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faUser} />
              <p>My Profile</p>
              <FontAwesomeIcon icon={faAngleRight} className="ml-auto" />
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
