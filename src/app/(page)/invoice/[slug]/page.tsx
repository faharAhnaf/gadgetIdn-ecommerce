"use client";

import { ProductWithInvoice } from "@/app/lib/model/invoice";
import Navbar from "@/components/fragments/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { detailInvoice } from "@/app/api/transaksi/detail-transaksi";
import React from "react";
import { Ekspedisi } from "@/app/lib/model/ekspedisi";
import Profile from "@/app/lib/model/profile";
import {
  BadgeInfo,
  ChevronRight,
  MapPin,
  MessageCircleMore,
  Truck,
  Undo2,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function DetailInvoice({ params }: Props) {
  const [dataInvoice, setDataInvoice] = useState<ProductWithInvoice>();
  const [dataEkspedisi, setDataEkspedisi] = useState<Ekspedisi>();
  const [dataUser, setDataUser] = useState<Profile>();

  useEffect(() => {
    try {
      (async () => {
        const slug = (await params).slug;
        const data = await detailInvoice({ transaksiId: slug });
        if (data?.product) {
          setDataInvoice(data.product);
        }

        if (data?.ekspedisi) {
          setDataEkspedisi(data.ekspedisi);
        }

        if (data?.user) {
          setDataUser(data.user);
        }
      })();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const subTotal =
    (dataInvoice?.price || 0) * (dataInvoice?.invoice.totalQuantity || 0);

  return (
    <div className="flex min-h-screen justify-center">
      <Navbar></Navbar>
      <div className="flex items-center">
        <div className="mx-auto">
          <p className="flex w-1/6 justify-center rounded-t-lg bg-[#A3D3BD] px-5 py-2 font-bold">
            {dataInvoice?.invoice.status}
          </p>
          <div className="mx-auto flex gap-10">
            <div className="grid w-[80vh] space-y-6">
              <div className="rounded-b-lg rounded-r-lg bg-[#D9D9D9] p-5">
                <div className="border-b-2 border-black">
                  <p>Info Pengiriman</p>
                </div>
                <div>
                  <ul className="space-y-3">
                    <li>
                      <p>Alamat Pengiriman</p>
                    </li>
                    <li className="flex">
                      <div className="w-10 flex-shrink-0">
                        <MapPin className="text-lg" />
                      </div>
                      <div className="">
                        <p>
                          {dataUser?.name ?? ""}{" "}
                          <span className="text-gray-500">
                            {dataUser?.phone}
                          </span>
                        </p>
                        <p>{dataUser?.location}</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="w-10">
                        <Truck className="text-lg" />
                      </div>
                      <div>
                        <p>
                          Pesanan Telah Sampai, Diterima Oleh Pemesan Langsung
                        </p>
                        <p className="text-gray-500">11-11-2024 14.48</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-3 rounded-lg bg-[#D9D9D9] p-5">
                <p>Butuh Bantuan ?</p>
                <ul className="space-y-3">
                  {[
                    "Ajukan Pengembalian",
                    "Hubungi Penjual",
                    "Pusat Bantuan",
                  ].map((field, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-10 pb-2">
                        {field === "Ajukan Pengembalian" && (
                          <Undo2 className="text-lg" />
                        )}
                        {field === "Hubungi Penjual" && (
                          <MessageCircleMore className="text-lg" />
                        )}
                        {field === "Pusat Bantuan" && (
                          <BadgeInfo className="text-lg" />
                        )}
                      </div>
                      <div className="flex w-full items-center border-b-2 border-black pb-2">
                        <p>{field}</p>
                        <ChevronRight className="ml-auto text-lg" />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center gap-5 rounded-lg">
                <Button
                  variant={"secondary"}
                  className="w-1/2 border border-gray-500 bg-transparent"
                >
                  Lihat Penilaian
                </Button>
                <Button
                  variant={"secondary"}
                  className="w-1/2 border border-gray-500 bg-transparent"
                >
                  Beli Lagi
                </Button>
              </div>
            </div>
            <div className="w-[60vh] rounded-lg bg-[#d9d9d9]">
              <div className="space-y-3 rounded-t-lg bg-blue-500 p-5 text-white">
                {/* <div className="flex items-center gap-3">
                  <input type="checkbox" />
                  <p>Realme Official Store</p>
                </div> */}
                <div className="flex gap-3">
                  <Image
                    src={`/assets/image/bank.jpg`}
                    alt="tes 123"
                    height={150}
                    width={150}
                    className="rounded-xl"
                  ></Image>
                  <div className="leading-6">
                    <p>{dataInvoice?.name ?? ""}</p>
                    <p>Variant : {dataInvoice?.invoice.variant ?? ""}</p>
                    <p>Color : {dataInvoice?.invoice.color ?? ""}</p>
                  </div>
                </div>
                <p className="flex justify-end">
                  <span className="mr-5">
                    x{dataInvoice?.invoice.totalQuantity}
                  </span>{" "}
                  {dataInvoice?.price
                    ? new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(dataInvoice.price)
                    : 0}
                </p>
              </div>
              <div className="p-5">
                <ul className="space-y-1">
                  <li className="flex justify-between">
                    <p>Subtotal Produk</p>
                    <p>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(subTotal)}
                    </p>
                  </li>
                  <li className="flex justify-between border-b-2 border-black">
                    <p>Subtotal Pengiriman</p>
                    <p>
                      {dataEkspedisi?.price
                        ? new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(dataEkspedisi.price)
                        : 0}
                    </p>
                  </li>
                  <li className="flex justify-between font-bold">
                    <p>Total Pesanan:</p>
                    <p>
                      {dataEkspedisi?.price
                        ? new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(dataEkspedisi.price + subTotal)
                        : 0}
                    </p>
                  </li>
                  <li className="flex items-center justify-between">
                    <p>No. Pesanan</p>
                    <div className="flex items-center gap-3">
                      <p>
                        {dataInvoice?.invoice.transaksi_id
                          ? dataInvoice.invoice.transaksi_id.substring(0, 20) +
                            "..."
                          : "..."}
                      </p>
                      <Button
                        variant="outline"
                        className="w-15 h-9 border-gray-500 bg-transparent"
                      >
                        Salin
                      </Button>
                    </div>
                  </li>
                  <li className="flex justify-between border-b-2 border-black">
                    <p>Metode Pembayaran</p>
                    <p>{dataInvoice?.invoice.payment_method}</p>
                  </li>
                  <li className="flex justify-between">
                    <p>Waktu Pemesanan</p>
                    <p>
                      {dataInvoice?.updated_at
                        ? new Date(
                            dataInvoice.invoice.updated_at,
                          ).toLocaleString("en-US")
                        : "N/A"}
                    </p>
                  </li>
                  <li className="flex justify-between">
                    <p>Waktu Pengiriman</p>
                    <p>09-11-2024 09.24</p>
                  </li>
                  <li className="flex justify-between">
                    <p>Waktu Pembayaran</p>
                    <p>11-11-2024 14.48</p>
                  </li>
                  <li className="flex justify-between">
                    <p>Waktu Pesanan Selesai</p>
                    <p>11-11-2024 14.48</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
