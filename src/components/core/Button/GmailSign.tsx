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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();

      // Hanya tampilkan success message jika login berhasil
      Swal.fire({
        title: "Login Berhasil!",
        text: "Anda telah berhasil masuk.",
        icon: "success",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          router.push("/");
        }
      });
    } catch (error: any) {
      // Tangani error dengan lebih spesifik
      let errorMessage = "Gagal masuk. Silakan coba lagi.";
      
      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Proses login terhenti. Mohon jangan tutup popup Google Sign In.";
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = "Popup diblokir oleh browser. Mohon izinkan popup untuk situs ini.";
      }

      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Gagal",
        text: "Gagal keluar dari akun. Silakan coba lagi.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center">
      {user ? (
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="mb-4 flex w-full flex-row justify-center rounded-lg border border-gray-300 bg-transparent px-4 py-2 font-semibold text-black shadow-md transition duration-700 hover:bg-red-600 hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 disabled:opacity-50"
        >
          <span>Sign Out</span>
        </button>
      ) : (
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="mb-4 flex w-full flex-row justify-center rounded-lg border border-gray-300 bg-transparent px-4 py-2 font-semibold text-black shadow-md transition duration-700 hover:bg-blue-600 hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 disabled:opacity-50"
        >
          <Image
            src="/assets/icon/Icon_Google.svg"
            width={20}
            height={20}
            className="mr-3"
            alt="Icon_Google"
          />
          <span>{isLoading ? "Sedang Masuk..." : "Sign In With Google"}</span>
        </button>
      )}
    </div>
  );
}
