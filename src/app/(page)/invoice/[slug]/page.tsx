"use client";

import { InvoiceData, ProductWithInvoice } from "@/app/lib/model/invoice";
import Navbar from "@/components/fragments/Navbar";
import { Button } from "@/components/ui/button";
import {
  faAngleRight,
  faArrowTurnUp,
  faCircleInfo,
  faComment,
  faLocationDot,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import Invoice from "@/app/api/invoice/invoice";
import { db } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";
import detailInvoice from "@/app/api/transaksi/detail-transaksi";
import React from "react";
import { Ekspedisi } from "@/app/lib/model/ekspedisi";
import { Profile } from "@/app/lib/model/profile";

export default function DetailInvoice({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [dataInvoice, setDataInvoice] = useState<ProductWithInvoice[]>([]);
  const [dataEkspedisi, setDataEkspedisi] = useState<Ekspedisi[]>([]);
  const [dataUser, setDataUser] = useState<Profile[]>([]);

  const unwrappedParams = React.use(params);
  const slug = unwrappedParams.slug;

  useEffect(() => {
    const fetchData = async () => {
      const data = await detailInvoice({ transaksiId: slug });
      if (data?.product) {
        setDataInvoice([data.product]);
      }

      if (data?.ekspedisi) {
        setDataEkspedisi([data.ekspedisi]);
      }

      if (data?.user) {
        setDataUser([data.user]);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <div>
      <Navbar></Navbar>
      <div className="mt-16 flex min-h-[93vh] items-center">
        <div className="mx-auto">
          <p className="flex w-1/6 justify-center rounded-t-lg bg-[#A3D3BD] px-5 py-2">
            Pesanan Selesai
          </p>
          <div className="flex gap-20">
            <div className="grid space-y-6">
              <div className="w-[70vh] rounded-b-lg rounded-r-lg bg-[#D9D9D9] p-5">
                <div className="border-b-2 border-black">
                  <p>Info Pengiriman</p>
                  <p className="text-gray-500">GXP Standart : GXPID123456789</p>
                </div>
                <div>
                  <ul className="space-y-3">
                    <li>
                      <p>Alamat Pengiriman</p>
                    </li>
                    <li className="flex">
                      <div className="w-10 flex-shrink-0">
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className="text-lg"
                        />
                      </div>
                      <div className="">
                        <p>
                          {dataUser[0]?.name}{" "}
                          <span className="text-gray-500">
                            (+62) 888-8888-8888
                          </span>
                        </p>
                        <p>
                          Jl. Moch Kahfi II. Gg. Suro, Cipedak, Kec. Jagakarsa,
                          Kota Jakarta Selatan,Daerah Khusus Ibukota Jakarta,
                          Kode Pos 12630.
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="w-10">
                        <FontAwesomeIcon icon={faTruck} className="text-lg" />
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
                          <FontAwesomeIcon
                            icon={faArrowTurnUp}
                            className="-rotate-90 text-lg"
                          />
                        )}
                        {field === "Hubungi Penjual" && (
                          <FontAwesomeIcon
                            icon={faComment}
                            className="text-lg"
                          />
                        )}
                        {field === "Pusat Bantuan" && (
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            className="text-lg"
                          />
                        )}
                      </div>
                      <div className="flex w-full items-center border-b-2 border-black pb-2">
                        <p>{field}</p>
                        <FontAwesomeIcon
                          icon={faAngleRight}
                          className="ml-auto text-lg"
                        />
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
            <div className="w-[55vh] rounded-lg bg-[#d9d9d9]">
              <div className="space-y-3 rounded-t-lg bg-blue-500 p-5">
                <div className="flex items-center gap-3">
                  <input type="checkbox" />
                  <p>Realme Official Store</p>
                </div>
                <div className="flex gap-3">
                  <Image
                    src={`/assets/image/bank.jpg`}
                    alt="tes 123"
                    height={150}
                    width={150}
                    className="rounded-xl"
                  ></Image>
                  <div className="leading-tight">
                    <p>{dataInvoice[0]?.name}</p>
                    <p>Variant : {dataInvoice[0]?.invoice.variant}</p>
                    <p>Color : {dataInvoice[0]?.color[0]}</p>
                  </div>
                </div>
                <p className="flex justify-end">
                  <span className="mr-5">
                    x{dataInvoice[0]?.invoice.totalQuantity}
                  </span>{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(dataInvoice[0]?.price)}
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
                      }).format(dataInvoice[0]?.price)}
                    </p>
                  </li>
                  <li className="flex justify-between border-b-2 border-black">
                    <p>Subtotal Pengiriman</p>
                    <p>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(dataEkspedisi[0]?.price)}
                    </p>
                  </li>
                  <li className="flex justify-between font-bold">
                    <p>Total Pesanan:</p>
                    <p>
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(
                        dataEkspedisi[0]?.price + dataInvoice[0]?.price,
                      )}
                    </p>
                  </li>
                  <li className="flex items-center justify-between">
                    <p>No. Pesanan</p>
                    <div className="flex items-center gap-3">
                      <p>
                        {dataInvoice[0]?.invoice.transaksi_id.substring(0, 20) +
                          "..."}
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
                    <p>{dataInvoice[0]?.invoice.payment_method}</p>
                  </li>
                  <li className="flex justify-between">
                    <p>Waktu Pemesanan</p>
                    <p>08-11-2024 17.49</p>
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
