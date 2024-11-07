"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/fragments/Navbar";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import updateDataProfile from "../api/profile/update-profile";
import Swal from "sweetalert2";
import { getProfileByUserId } from "../api/profile/profile";
import ProfileSidebar from "@/components/fragments/Sidebar/Profile";

const UserProfile = () => {
  const [data, setData] = useState<any>({});
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedData = localStorage.getItem("userSession");
      if (storedData) {
        const userData = JSON.parse(storedData);
        const userProfile = await getProfileByUserId(userData.user_id);

        if (userProfile) {
          setData(userProfile);
          setName(userProfile.name || "");
          setEmail(userProfile.email || "");
          setPhone(userProfile.phone || "");
          setLocation(userProfile.location || "");
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedData = {
        ...data,
        name,
        email,
        phone,
        location,
      };

      await updateDataProfile(
        updatedData.user_id,
        updatedData.name,
        updatedData.email,
        updatedData.phone,
        updatedData.location
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully.",
      });

      setData(updatedData);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "An error occurred while updating the profile. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <Navbar />
      <ProfileSidebar data={data} />

      <div className="m-10 my-28 w-[50%] p-5 shadow-xl rounded-xl">
        <form onSubmit={handleSubmit}>
          <ul className="mx-2 my-8 space-y-6">
            <li className="flex items-center gap-3 border-b-2 py-5">
              <FontAwesomeIcon icon={faUser} />
              <p>My Profile</p>
              <FontAwesomeIcon icon={faAngleRight} className="ml-auto" />
            </li>
            <li className="flex items-center gap-3 py-5 border-b-2 justify-between">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className="w-1/2 h-10 text-right"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </li>
            <li className="flex items-center gap-3 py-5 border-b-2 justify-between">
              <label htmlFor="email">Email Account</label>
              <input
                id="email"
                type="text"
                className="w-1/2 h-10 text-right"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </li>
            <li className="flex items-center gap-3 py-5 border-b-2 justify-between">
              <label htmlFor="phone">Mobile Number</label>
              <input
                id="phone"
                type="text"
                className="w-1/2 h-10 text-right"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </li>
            <li className="flex items-center gap-3 py-5 border-b-2 justify-between">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                className="w-1/2 h-10 text-right"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </li>
            <li className="flex items-center gap-3 py-5 justify-between">
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Change"}
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
