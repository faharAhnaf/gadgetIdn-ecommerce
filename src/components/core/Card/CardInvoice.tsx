import { ConfirmTransaction } from "@/app/api/transaksi/konfirmasi-transaksi";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Product from "@/interfaces/product";
import { cn } from "@/lib/utils";
import { faBagShopping, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Props {
  date?: Date;
  status?: string;
  quantity?: number;
  paidAmount?: number;
  products?: Product[];
  transactionId: string;
  productAmount: number[];
  confirmed: boolean;
}

export default function CardInvoice({
  date,
  status = "",
  paidAmount = 0,
  transactionId = "",
  products,
  productAmount,
  confirmed,
}: Props) {
  const [confirm, setConfirm] = useState<boolean>(confirmed);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleConfirmTransaction = async () => {
    setLoading(true);
    try {
      const confirmed = await ConfirmTransaction(transactionId, true);
      if (confirmed) {
        setConfirm(true);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: `Transaksi berhasil dikonfirmasi.`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat mengkonfirmasi transaksi.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmed = () => {
    if (confirm) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Transaksi Anda Sudah Dikonfirmasi!",
      });
    }
  };

  const changeStatus =
    status && confirmed ? "Pesanan Selesai" : "Pesanan Sedang Diproses";

  const getStatusDisplay = (status: string) => {
    switch (status.toUpperCase()) {
      case "PROCESSING":
        return "Sedang di proses";
      case "SHIPPING":
        return "Sedang dikirim";
      case "COMPLETED":
        return "Pesanan selesai";
      default:
        return status;
    }
  };

  return (
    <div className="rounded-lg border border-[#D9D9D9] shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#D9D9D9] px-4 py-3 sm:gap-4 sm:px-6 md:px-10 md:py-5">
        <div className="flex items-center gap-2 sm:gap-4">
          <FontAwesomeIcon
            icon={faBagShopping}
            className="text-2xl sm:text-3xl md:text-4xl"
          />
          <p className="font-medium">Belanja</p>
        </div>
        <p className="text-sm sm:text-base">
          {date?.toLocaleString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <div className="flex flex-wrap gap-2">
          <p
            className={`rounded-lg bg-[#A3D3BD] p-1.5 text-xs sm:p-2 sm:text-sm`}
          >
            {changeStatus}
          </p>
        </div>
      </div>
      <div className="grid lg:grid-cols-2">
        <div className="grid space-y-3 p-4 sm:p-6 md:p-10">
          {products?.map((product, index) => (
            <div
              key={product.product_id}
              className="grid space-y-3 sm:space-y-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                <div className="mx-auto sm:mx-0">
                  <Image
                    src={`/assets${product.image_url}`}
                    width={70}
                    height={70}
                    alt="Gambar Produk"
                    className="h-[70px] w-[70px] object-cover"
                  />
                </div>
                <ul className="text-center sm:text-left">
                  <li>
                    <p>{product.name}</p>
                  </li>
                  <li>
                    <p>
                      {productAmount[index]}&nbsp;
                      {productAmount[index] === 1 ? `Barang` : `Barang`} x
                      &nbsp;
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(product.price)}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
        <div className="grid">
          <ul className="grid gap-3 p-4 text-end sm:p-6 md:p-10 lg:grid-cols-3">
            <li className="col-span-2 grid items-end">
              <div>
                <p>Total Pembayaran</p>
                <p className="text-lg font-bold sm:text-xl">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(paidAmount)}
                </p>
              </div>
            </li>
          </ul>
          <div className="grid grid-cols-1 items-center gap-3 p-4 sm:grid-cols-5 sm:p-6 md:p-10 lg:grid-cols-3">
            <Link
              href={`/invoice/${transactionId}`}
              className="col-span-1 sm:col-span-2"
            >
              <Button
                variant={"ghost"}
                className={cn(`w-full rounded-xl border border-gray-300`)}
              >
                Lihat Detail Transaksi
              </Button>
            </Link>
            <Button
              variant={"outline"}
              onClick={() => router.push("/search-list")}
              className={cn(
                `col-span-1 w-full rounded-xl bg-blue-500 text-white hover:bg-blue-600 hover:text-white sm:col-span-2`,
              )}
            >
              Beli Lagi
            </Button>

            {!confirm && !loading && (
              <Button
                variant="outline"
                className="w-full border-none outline-none"
                onClick={handleConfirmTransaction}
              >
                Konfirmasi Pesanan
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
