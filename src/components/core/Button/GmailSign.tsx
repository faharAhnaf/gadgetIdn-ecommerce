"use client";

import Image from 'next/image';
import { auth, signInWithGoogle, logout } from '@/app/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function GmailSign() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            await signInWithGoogle();
            alert('Login with Google successful!');
        } catch (error) {
            console.error(error);
            alert('Failed to login');
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            alert('Logged out successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to logout');
        }
    };

    return (
        <div className="flex flex-col items-center">
            {user ? (
                <button
                    onClick={handleLogout}
                    className="flex flex-row justify-center bg-transparent w-full mb-4 hover:bg-red-600 hover:text-white text-black font-semibold py-2 px-4 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition duration-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                >
                    <span>Sign Out</span>
                </button>
            ) : (
                <button
                    onClick={handleLogin}
                    className="flex flex-row justify-center bg-transparent w-full mb-4 hover:bg-blue-600 hover:text-white text-black font-semibold py-2 px-4 rounded-lg shadow-md border border-gray-300 hover:shadow-lg transition duration-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
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
