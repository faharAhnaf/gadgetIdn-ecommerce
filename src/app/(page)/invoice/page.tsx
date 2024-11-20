"use client";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/fragments/Navbar";
import { AllProductDropdown } from "@/components/core/Dropdown/all-product";
import { DatePicker } from "@/components/core/Button/date-picker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import CardInvoice from "@/components/core/Card/card-invoice";

export default function InvoicePage() {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="mt-20">
      <Navbar />
      <div className="mx-10 grid">
        <p className="m-10 text-3xl font-bold">Daftar Transaksi</p>
        <div className="space-y-10 rounded-lg border-4 border-[#D9D9D9] px-10 py-5 shadow-md">
          <div className="grid grid-cols-3 gap-5">
            <Input
              type="email"
              placeholder="Search"
              onChange={(e: any) => setSearch(e.event.target)}
            />
            <AllProductDropdown />
            <DatePicker />
          </div>
          <div className={cn(`flex items-center gap-8`)}>
            <p>Status</p>
            <Button variant={"outline"}>Semua</Button>
            <Button variant={"outline"}>Berlangsung</Button>
            <Button variant={"outline"}>Berhasil</Button>
            <Button variant={"outline"}>Batal</Button>
            <p>reset filter</p>
          </div>

          <CardInvoice />
        </div>
      </div>
    </div>
  );
}
