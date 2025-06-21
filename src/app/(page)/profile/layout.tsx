"use client";
import React from "react";
import Navbar from "@/components/fragments/Navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
