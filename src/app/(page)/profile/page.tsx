"use client";

import React, { useEffect, useState } from "react";
import updateDataProfile from "@/app/api/profile/update-profile";
import Swal from "sweetalert2";
import ProfileSidebar from "@/components/fragments/Sidebar/ProfileSidebar";
import { useParams, usePathname, useRouter } from "next/navigation";
import { getProfileByUserId } from "@/app/api/profile/profile";
import MyProfile from "./modals/MyProfile";
import UploadProduct from "./modals/UploadProduct";
import { ListProduct } from "./modals/ListProduct";
import UpdateProduct from "./modals/UpdateProduct";
import Navbar from "@/components/fragments/Navbar/Navbar";
import Profile from "@/interfaces/profile";
import { Form } from "@/interfaces/form";

export default function UserProfile() {
  const [data, setData] = useState<Profile>();
  const [formData, setFormData] = useState<Form>({
    name: "",
    email: "",
    phone: "",
    location: "",
    picture: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [session, setSession] = useState<string | null>(null);
  const router = useRouter();
  const { id } = useParams();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("userSession");
      setSession(userData);

      if (!userData) {
        router.push("/");
        return;
      }

      const user = JSON.parse(userData);
      (async () => {
        try {
          const userProfile = await getProfileByUserId(user.user_id);

          if (userProfile) {
            setData(userProfile);
            setFormData({
              name: userProfile.name || "",
              email: userProfile.email || "",
              phone: userProfile.phone || "",
              location: userProfile.location || "",
              picture: userProfile.picture || "",
            });
            setIsloading(false);
          }
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [session]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { name: string; value: string },
  ) => {
    const name = "target" in e ? e.target.name : e.name;
    const value = "target" in e ? e.target.value : e.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log("Form data submitted:", formData);

    try {
      const user_id = data?.user_id;
      if (user_id) {
        await updateDataProfile(
          user_id,
          formData.name,
          formData.email,
          formData.phone,
          formData.location,
        );
      }

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
    <>
      {session && (
        <div>
          <Navbar />
          <div className="mx-auto mb-10 mt-28 grid rounded-xl border-2 lg:mx-20 lg:grid-cols-2">
            <div className="grid w-full lg:border-r-2">
              {isLoading ? (
                <Skeleton />
              ) : (
                data && <ProfileSidebar data={data} />
              )}
            </div>
            <div className="grid">
              {pathname == "/profile" && (
                <MyProfile
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  formData={formData}
                  loading={loading}
                />
              )}
              {pathname == "/profile/upload-product" && <UploadProduct />}
              {pathname == "/profile/list-product" && <ListProduct />}
              {pathname == `/profile/list-product/${id}` && (
                <UpdateProduct productId={id} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const Skeleton = () => (
  <div className="m-10">
    <div className="animate-pulse">
      <div className="flex gap-4 border-b-2 py-5">
        <div className="group relative">
          <div className="h-24 w-24 rounded-full bg-gray-300" />
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
            <span className="text-lg text-white">Loading...</span>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-2">
          <div className="h-4 w-32 rounded bg-gray-300" />
          <div className="h-4 w-48 rounded bg-gray-300" />
        </div>
      </div>
      <div className="space-y-20">
        <ul className="mx-2 mt-8 space-y-6">
          <li className="flex flex-col">
            <div className="h-6 w-32 rounded bg-gray-300" />
          </li>
          <li className="flex flex-col">
            <div className="h-6 w-32 rounded bg-gray-300" />
          </li>
          <li className="flex cursor-pointer items-center gap-3">
            <div className="h-6 w-32 rounded bg-gray-300" />
          </li>
        </ul>
      </div>
    </div>
  </div>
);
