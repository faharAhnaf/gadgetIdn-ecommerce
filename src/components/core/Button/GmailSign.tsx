"use client";

import Image from "next/image";
import { signInWithGoogle, logout } from "@/app/api/auth/google";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, useCallback } from "react";
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

  const handleLogin = useCallback(async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      // Ensure we're in a browser environment
      if (typeof window === 'undefined') return;

      // Add a small delay to ensure DOM is ready
      await new Promise(resolve => setTimeout(resolve, 100));

      await signInWithGoogle();

      // Only show success message if we get here (no error thrown)
      await Swal.fire({
        title: "Login Successful!",
        text: "You have successfully logged in.",
        icon: "success",
        confirmButtonText: "OK",
      });

      router.push("/");
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Don't show error if it's just the user closing the popup
      if (error.code !== 'auth/popup-closed-by-user') {
        await Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message || "Failed to login. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [router, isLoading]);

  const handleLogout = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      await Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Failed to logout. Please try again.",
      });
    } finally {
      setIsLoading(false);
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
          <span>{isLoading ? "Signing Out..." : "Sign Out"}</span>
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
            priority
          />
          <span>{isLoading ? "Signing In..." : "Sign In With Google"}</span>
        </button>
      )}
    </div>
  );
}
