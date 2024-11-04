"use client";

import Navbar from "@/components/fragments/Navbar";
import { faBell, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleRight,
  faArrowRightFromBracket,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const UserProfile = () => {
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
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faUser} />
              <p>My Profile</p>
              <FontAwesomeIcon icon={faAngleRight} className="ml-auto" />
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faGear} />
              <p>Settings</p>
              <FontAwesomeIcon icon={faAngleRight} className="ml-auto" />
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faBell} />
              <p>Notification</p>
              <span className="ml-auto">Allow</span>
            </li>
            <li className="flex items-center gap-3">
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <p>Logout</p>
            </li>
          </ul>

          <ul className="mx-2 my-8 space-y-6">
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
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
