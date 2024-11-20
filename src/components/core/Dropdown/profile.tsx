"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { FiUser } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { logout } from "@/app/api/auth/google";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function ProfileDropdown() {
  const router = useRouter();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logout();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="group flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-black hover:bg-white">
          <FontAwesomeIcon
            icon={faUser}
            className="cursor-pointer text-white group-hover:text-black"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3">
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem className="flex gap-3 p-2">
              <User />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <button
              onClick={(e: any) => handleLogout(e)}
              className="flex gap-3 p-2"
            >
              <LogOut />
              <span>Logout</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
