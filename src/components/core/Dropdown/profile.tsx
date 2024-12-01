"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { logout } from "@/app/api/auth/google";

export function ProfileDropdown() {
  const handleLogout = async (e: any) => {
    e.preventDefault();
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="group flex size-10 cursor-pointer items-center justify-center rounded-full bg-black hover:bg-white">
          <User className="cursor-pointer text-white group-hover:text-black" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-3">
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem className="flex gap-3 p-2 hover:bg-slate-200">
              <User />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <button
              onClick={(e: any) => handleLogout(e)}
              className="flex w-full gap-3 p-2 hover:bg-slate-200"
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
