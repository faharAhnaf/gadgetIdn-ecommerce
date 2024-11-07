import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBell,
  faCalendar,
  faDatabase,
  faFile,
  faGlobe,
  faHouseChimney,
  faLock,
  faPenToSquare,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import AnimateHeight from "react-animate-height";

type Props = {
  currentMenu: string;
};

const TokoAnimateDropdown = ({ currentMenu }: Props) => {
  return (
    <AnimateHeight duration={300} height={currentMenu === "toko" ? "auto" : 0}>
      <ul className="space-y-6 mt-6">
        <li>
          <button className="flex items-center gap-3 w-full">
            <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
            <div className="text-left">
              <p>Edit informasi toko</p>
            </div>
          </button>
        </li>
        <li>
          <button className="flex items-center gap-3 w-full">
            <FontAwesomeIcon icon={faFile} className="w-5" />
            <div className="text-left">
              <p>Edit catatan toko</p>
            </div>
          </button>
        </li>
        <li>
          <button className="flex items-center gap-3 w-full">
            <FontAwesomeIcon icon={faCalendar} className="w-5" />
            <div className="text-left">
              <p>Edit jadwal operasional toko</p>
            </div>
          </button>
        </li>
      </ul>
    </AnimateHeight>
  );
};

export default TokoAnimateDropdown;
