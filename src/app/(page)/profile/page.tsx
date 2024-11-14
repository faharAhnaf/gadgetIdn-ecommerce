"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/fragments/Navbar";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import updateDataProfile from "../../api/profile/update-profile";
import Swal from "sweetalert2";
import { getProfileByUserId } from "../../api/profile/profile";
import ProfileSidebar from "@/components/fragments/Sidebar/sidebar-profile";
import { SaveChangeButton } from "@/components/core/Button/save-change";
import updatePicture from "@/app/api/profile/update-picture";

// Define the type for formData
interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  picture: string;
}

const UserProfile = () => {
  const [data, setData] = useState<any>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    picture: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const storedData = localStorage.getItem("userSession");
      if (storedData) {
        const userData = JSON.parse(storedData);
        const userProfile = await getProfileByUserId(userData.user_id);
        if (userProfile) {
          setData(userProfile);
          setFormData({
            name: userProfile.name || "",
            email: userProfile.email || "",
            phone: userProfile.phone || "",
            location: userProfile.location || "",
            picture: userProfile.picture || "",
          });
          setIsAdmin(userProfile.role);
        }
      }
    };
    fetchUserProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user_id } = data;
      await Promise.all([
        updatePicture(user_id, formData.picture),
        updateDataProfile(
          user_id,
          formData.name,
          formData.email,
          formData.phone,
          formData.location,
        ),
      ]);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Profile updated successfully.",
      });

      setData((prev: any) => ({ ...prev, ...formData }));
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
      <ProfileSidebar data={data} isAdmin={isAdmin} />
      <div className="m-10 my-28 w-[50%] rounded-xl p-5 shadow-xl">
        <form onSubmit={handleSubmit}>
          <ul className="mx-2 my-8 space-y-6">
            <li className="flex items-center gap-3 border-b-2 py-5">
              <FontAwesomeIcon icon={faUser} />
              <p>My Profile</p>
              <FontAwesomeIcon icon={faAngleRight} className="ml-auto" />
            </li>
            {["name", "email", "phone", "location"].map((field) => (
              <li
                key={field}
                className="flex items-center justify-between gap-3 border-b-2 py-5"
              >
                <label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  name={field}
                  type="text"
                  className="h-10 w-1/2 p-1 text-right"
                  value={formData[field as keyof FormData]}
                  onChange={handleChange}
                  required
                />
              </li>
            ))}
            <li className="flex items-center justify-between gap-3 py-5">
              <SaveChangeButton loading={loading} className="p-3" />
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
