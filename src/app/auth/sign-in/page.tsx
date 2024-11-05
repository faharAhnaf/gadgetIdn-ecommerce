"use client";

import Image from 'next/image';
import Link from 'next/link';
import PasswordInput from '@/components/core/Input/password'
import GmailSign from '@/components/core/Button/GmailSign'
import { useState } from 'react';

import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/api/auth/login';

export default function Sign_In() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
  };

  const handleSubmit = async () => {

    try {
      setError('');
      setSuccess('');

      Swal.fire({
          title: 'Validation...',
          text: 'Please wait, the system is processing.',
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          },
      });

      const response = await loginUser({ email, password });

      setSuccess(response.message || "Verification successful!");

      Swal.fire({
          title: 'Successful Verification!',
          text: 'Happy Exploring.',
          icon: 'success',
          confirmButtonText: 'OK',
      }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
              router.push('/');
          }
      });
      
    } catch (error: any) {
      setError(error.message);

      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
          footer: '<a href="#">Why do I have this issue?</a>'
      });
    }

  };

    return (
    <div className="flex justify-center items-center h-screen px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row items-center rounded-[12px] shadow-lg w-full max-w-[1000px] lg:h-[500px] bg-white p-5">
        {/* Bagian Gambar */}
        <div className="hidden lg:block w-1/2">
          <Image
            src="/assets/image/sign_in.png"
            width={500}
            height={500}
            alt="layanan"
            className="hover:scale-[90%] duration-500 rounded-[8px] mx-auto lg:mx-0"
          />
        </div>

        {/* Bagian Form */}
        <div className="p-5 w-full lg:w-1/2">
          <h1 className="mb-4 text-2xl font-semibold text-center lg:text-left">Welcome Back, 👋🏻</h1>

          <div className="flex flex-col w-full mb-3">
            <label className="text-sm font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="JohnDoe@gmail.com"
              className="border border-gray-300 rounded-lg shadow-sm px-3 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Password Input */}
          <PasswordInput onPasswordChange={handlePasswordChange} />

          <button 
            onClick={handleSubmit}
            className="bg-blue-500 mb-3 w-full hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-700 focus:ring-opacity-75">
            Sign In
          </button>

          <GmailSign />

          <h4 className="text-base font-medium text-center">
            Forgot Your Password?
            <Link href="/auth/sign-up" className="ml-3 text-base duration-300 text-sky-400 hover:text-sky-500">
              Sign Up
            </Link>
          </h4>
        </div>
      </div>
    </div>
    );
  }
  