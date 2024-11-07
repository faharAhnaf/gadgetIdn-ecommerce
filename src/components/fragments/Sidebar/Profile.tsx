import ProfileAnimateDropdown from "@/components/core/Dropdown/Sidebar";
import TokoAnimateDropdown from "@/components/core/Dropdown/Toko";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleRight,
  faArrowRightFromBracket,
  faGear,
  faHouseChimney,
  faShop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AnimateHeight from "react-animate-height";

type Props = {
  data: any;
  isAdmin: boolean;
};

const ProfileSidebar = ({ data, isAdmin }: Props) => {
  const [currentMenu, setCurrentMenu] = useState<string>("");

  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => (oldValue === value ? "" : value));
  };

  return (
    <div className="m-10 my-28 w-96 p-5 shadow-xl rounded-xl">
      <div className="flex gap-4 border-b-2 py-5">
        <div className="bg-slate-400 rounded-full size-24" />
        <div className="flex-col flex justify-center">
          <p>{data.name}</p>
          <p>{data.email}</p>
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
                    currentMenu === "settings" ? "rotate-90" : ""
                  }`}
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </div>
              </div>
            </button>

            <ProfileAnimateDropdown currentMenu={currentMenu} />
          </li>

          {isAdmin && (
            <li className="flex flex-col">
              <button
                type="button"
                className={`${currentMenu === "toko" ? "active" : ""}`}
                onClick={() => toggleMenu("toko")}
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faShop} className="w-5" />
                  <span className="text-black">Toko</span>
                  <div
                    className={`ml-auto ${
                      currentMenu === "toko" ? "rotate-90" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
              </button>

              <TokoAnimateDropdown currentMenu={currentMenu} />
            </li>
          )}

          <li className="flex items-center gap-3">
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-5" />
            <p>Logout</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;
