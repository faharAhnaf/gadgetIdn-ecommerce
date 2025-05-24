"use client";

import { SaveChangeButton } from "@/components/core/Button/SaveChangeButton";
import { PhoneInput } from "@/components/ui/phone-input";
import { Form } from "@/interfaces/form";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronRight } from "lucide-react";

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { name: string; value: string },
  ) => void;
  formData: Form;
  loading: boolean;
}

export default function MyProfile({
  handleSubmit,
  handleChange,
  formData,
  loading,
}: Props) {
  return (
    <div className="mx-auto w-full px-10">
      <form onSubmit={handleSubmit}>
        <ul className="mt-8 space-y-6">
          <li className="flex items-center gap-3 border-b-2 py-5">
            <FontAwesomeIcon icon={faUser} />
            <p>Profil Saya</p>
            <ChevronRight className="ml-auto" />
          </li>
          {["name", "email", "phone", "location"].map((field) => (
            <li
              key={field}
              className="flex flex-col gap-3 border-b-2 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <label htmlFor={field} className="font-medium">
                {field === "name"
                  ? "Nama"
                  : field === "email"
                    ? "Email"
                    : field === "phone"
                      ? "Telepon"
                      : field === "location"
                        ? "Alamat"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === "phone" ? (
                <PhoneInput
                  className="h-10 w-full sm:w-1/2"
                  maxLength={13}
                  limitMaxLength
                  defaultCountry="ID"
                  name={field}
                  id={field}
                  value={formData.phone}
                  onChange={(value) => {
                    handleChange({ name: field, value });
                  }}
                />
              ) : field === "location" ? (
                <textarea
                  id={field}
                  name={field}
                  className="min-h-[100px] w-full resize-y rounded-lg border p-2 sm:w-1/2"
                  value={formData[field as keyof Form]}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan alamat lengkap Anda"
                />
              ) : (
                <input
                  id={field}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  className="h-10 w-full rounded-lg border p-2 sm:w-1/2"
                  value={formData[field as keyof Form]}
                  onChange={handleChange}
                  required
                />
              )}
            </li>
          ))}
          <li className="flex items-center justify-end gap-3 py-5">
            <SaveChangeButton loading={loading} className="p-3" />
          </li>
        </ul>
      </form>
    </div>
  );
}
