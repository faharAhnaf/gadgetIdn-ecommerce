"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/fragments/Navbar";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import updateDataProfile from "../../../api/profile/update-profile";
import Swal from "sweetalert2";
import { getProfileByUserId } from "../../../api/profile/profile";
import ProfileSidebar from "@/components/fragments/Sidebar/sidebar-profile";
import { SaveChangeButton } from "@/components/core/Button/save-change";
import updatePicture from "@/app/api/profile/update-picture";
import { Form } from "@/app/lib/model/form";
import MyProfile from "../modals/my-profile";
import { useParams, usePathname } from "next/navigation";
import UploadProduct from "../modals/upload-product";

const UserProfile = () => {
  const [data, setData] = useState<any>({});
  const [formData, setFormData] = useState<Form>({
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

  const params = usePathname();

  return (
    <div>
      <div className="mx-28 mb-10 mt-28 grid grid-cols-2 rounded-xl border-2">
        <div className="grid w-full border-r-2">
          <ProfileSidebar data={data} isAdmin={isAdmin} />
        </div>
        <div className="flex justify-center">
          {params == "/profile/my-profile" && (
            <MyProfile
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              formData={formData}
              loading={loading}
            />
          )}
          {params == "/profile/upload-product" && <UploadProduct />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
