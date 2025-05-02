"use client";

import Image from "next/image";
import { signInWithGoogle, logout } from "@/app/api/auth/google";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

export default function GmailSign() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();

      Swal.fire({
        title: "Login Successful!",
        text: "You have successfully logged in.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          router.push("/");
        }
      });
    } catch (error) {
      alert("Failed to login");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      alert("Failed to logout");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {user ? (
        <button
          onClick={handleLogout}
          className="mb-4 flex w-full flex-row justify-center rounded-lg border border-gray-300 bg-transparent px-4 py-2 font-semibold text-black shadow-md transition duration-700 hover:bg-red-600 hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          <span>Sign Out</span>
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="mb-4 flex w-full flex-row justify-center rounded-lg border border-gray-300 bg-transparent px-4 py-2 font-semibold text-black shadow-md transition duration-700 hover:bg-blue-600 hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          <Image
            src="/assets/icon/Icon_Google.svg"
            width={20}
            height={20}
            className="mr-3"
            alt="Icon_Google"
          />
          <span>Sign In With Google</span>
        </button>
      )}
    </div>
  );
}
