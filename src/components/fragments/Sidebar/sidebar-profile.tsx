import updatePicture from "@/app/api/profile/update-picture";
import { SaveChangeButton } from "@/components/core/Button/save-change";
import ProfileAnimateDropdown from "@/components/core/Dropdown/Sidebar";
import TokoAnimateDropdown from "@/components/core/Dropdown/Toko";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { logout } from "@/app/api/auth/google";
import { ChevronRight, LogOut, Settings, Store } from "lucide-react";

type Props = {
  data: any;
  isAdmin: boolean;
};

const ProfileSidebar = ({ data, isAdmin }: Props) => {
  const [currentMenu, setCurrentMenu] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [pictureUrl, setPictureUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => (oldValue === value ? "" : value));
  };

  useEffect(() => {
    if (data.picture) {
      setPictureUrl(`/assets/picture/${data.picture}`);
      setIsLoading(false);
    }
  }, [data.picture]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      setLoading(false);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      setPictureUrl(`/assets/picture/${result.filename}`);
      await updatePicture(data.user_id, result.filename);

      setIsDialogOpen(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "An error occurred while updating the profile. Please try again.",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logout();
  };

  return (
    <div className="m-10">
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <div className="flex gap-4 border-b-2 py-5">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger>
                <div className="group relative">
                  {pictureUrl && (
                    <Image
                      src={pictureUrl || "/assets/picture/bussiness-man.png"}
                      width={500}
                      height={500}
                      className="h-24 w-24 rounded-full object-cover transition duration-300 ease-in-out"
                      alt="empty"
                      priority
                    />
                  )}

                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
                    <span className="text-lg text-white">Update Picture</span>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Image</DialogTitle>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3 grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="picture">Profile Picture</Label>
                      <Input
                        id="picture"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                    <SaveChangeButton loading={loading} className="p-2" />
                  </form>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <div className="flex flex-col justify-center">
              <p>{data.name}</p>
              <p>{data.email}</p>
            </div>
          </div>

          <div className="space-y-20">
            <ul className="mx-2 mt-8 space-y-6">
              <li className="flex flex-col">
                <button
                  type="button"
                  className={`${currentMenu === "settings" ? "active" : ""}`}
                  onClick={() => toggleMenu("settings")}
                >
                  <div className="flex items-center gap-3">
                    <Settings className="w-5" />
                    <span className="text-black">Settings</span>
                    <div
                      className={`ml-auto ${
                        currentMenu === "settings" ? "rotate-90" : ""
                      } duration-300`}
                    >
                      <ChevronRight />
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
                      <Store className="w-5" />
                      <span className="text-black">Toko</span>
                      <div
                        className={`ml-auto ${
                          currentMenu === "toko" ? "rotate-90" : ""
                        } duration-300`}
                      >
                        <ChevronRight />
                      </div>
                    </div>
                  </button>

                  <TokoAnimateDropdown currentMenu={currentMenu} />
                </li>
              )}

              <li
                className="flex cursor-pointer items-center gap-3"
                onClick={(e) => handleLogout(e)}
              >
                <LogOut className="w-5" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

const Skeleton = () => (
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
);

export default ProfileSidebar;
