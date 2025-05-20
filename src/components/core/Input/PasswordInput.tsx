"use client";

import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface PasswordInputProps {
  onPasswordChange: (password: string) => void;
}

export default function PasswordInput({
  onPasswordChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    onPasswordChange(newPassword);
  };

  return (
    <div className="mb-5 flex w-full flex-col">
      <label className="mb-1 text-sm font-semibold text-gray-700">
        Kata Sandi
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="************"
          value={password}
          onChange={handlePasswordChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible size={20} />
          ) : (
            <AiOutlineEye size={20} />
          )}
        </button>
      </div>
    </div>
  );
}
