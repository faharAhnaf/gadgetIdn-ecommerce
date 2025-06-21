"use client";

import { Input } from "@/components/ui/input";
import Navbar from "@/components/fragments/Navbar/Navbar";
import { DatePicker } from "@/components/core/Button/DatePicker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import CardInvoice from "@/components/core/Card/CardInvoice";
import invoice from "@/app/api/invoice/invoice";
import CardInvoiceSkeleton from "@/components/core/Skeleton/CardInvoiceSkeleton";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { ArrowLeft, Filter, Search } from "lucide-react";
import { InvoiceData } from "@/interfaces/invoice";

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [orderStatus, setOrderStatus] = useState<string | null>("processing");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [session, setSession] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userSession = localStorage.getItem("userSession");
      setSession(userSession);
      if (!userSession) {
        router.push("/");
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const userData = JSON.parse(session);
        const userId: string = userData.user_id;

        if (userId) {
          const userInvoice = await invoice({ userId });
          setLoading(false);
          if (userInvoice) {
            setInvoices(userInvoice);
          } else {
            console.log("Tidak ada faktur ditemukan untuk pengguna ini.");
          }
        }
      }
    };
    fetchData();
  }, [session]);

  const handleFilterStatus = (status: string | null) => {
    setOrderStatus(status);
  };

  const handleDateChange = (date: string | null) => {
    setSelectedDate(date);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setOrderStatus(null);
    setSelectedDate(null);
  };

  const filteredInvoices = invoices.filter((invoice) => {
    let mappedStatus = invoice.status;
    if (invoice.status === "PAID") {
      mappedStatus = invoice.confirmed ? "COMPLETED" : "PROCESSING";
    }
    // Filter berdasarkan status pesanan
    if (orderStatus !== null) {
      if (orderStatus !== mappedStatus.toLowerCase()) {
        return false;
      }
    }
    if (
      searchTerm &&
      !invoice.products.some((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    ) {
      return false;
    }
    if (
      selectedDate &&
      !dayjs(invoice.created_at).isSame(dayjs(selectedDate), "day")
    ) {
      return false;
    }
    return true;
  });

  const getButtonStyle = (status: string | null) => {
    if (orderStatus === status) {
      return "bg-blue-100 text-blue-700 border-blue-300 hover:bg-blue-200";
    }
    return "bg-white hover:bg-gray-100";
  };

  return (
    <>
      {session && (
        <div className="my-24 flex items-center">
          <Navbar />
          <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="my-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden sm:inline">Beranda</span>
            </Button>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-md sm:p-6 md:p-8">
              <h1 className="mb-6 text-2xl font-bold text-gray-800 sm:text-3xl">
                Riwayat Transaksi
              </h1>

              <div className="mb-8 space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Cari berdasarkan nama produk"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full pl-10"
                    />
                  </div>
                  <DatePicker
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-600" />
                    <p className="font-medium text-gray-700">Status:</p>
                  </div>
                  <Button
                    onClick={() => handleFilterStatus("processing")}
                    variant={"outline"}
                    size="sm"
                    className={cn(getButtonStyle("processing"), "rounded-full")}
                  >
                    Sedang di proses
                  </Button>
                  <Button
                    onClick={() => handleFilterStatus("shipping")}
                    variant={"outline"}
                    size="sm"
                    className={cn(getButtonStyle("shipping"), "rounded-full")}
                  >
                    Sedang dikirim
                  </Button>
                  <Button
                    onClick={() => handleFilterStatus("completed")}
                    variant={"outline"}
                    size="sm"
                    className={cn(getButtonStyle("completed"), "rounded-full")}
                  >
                    Pesanan selesai
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {!loading ? (
                  filteredInvoices.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                      {filteredInvoices.map((product) => (
                        <CardInvoice
                          key={product.transaksi_id}
                          date={product.created_at}
                          status={product.status}
                          quantity={product.totalQuantity}
                          paidAmount={product.paid_amount}
                          products={product.products}
                          transactionId={product.transaksi_id}
                          productAmount={product.amount}
                          confirmed={product.confirmed}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mb-4 h-16 w-16 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <p className="text-gray-600">
                        Tidak ada transaksi ditemukan dengan filter yang
                        dipilih.
                      </p>
                      <Button
                        onClick={resetFilters}
                        variant={"outline"}
                        size="sm"
                        className="mt-4 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100"
                      >
                        Tampilkan Semua Transaksi
                      </Button>
                    </div>
                  )
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    <CardInvoiceSkeleton />
                    <CardInvoiceSkeleton />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
