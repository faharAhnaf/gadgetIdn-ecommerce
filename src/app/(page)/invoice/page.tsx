"use client";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/fragments/Navbar";
import { AllProductDropdown } from "@/components/core/Dropdown/all-product";
import { DatePicker } from "@/components/core/Button/date-picker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import CardInvoice from "@/components/core/Card/card-invoice";
import { InvoiceData } from "@/app/lib/model/invoice";
import invoice from "@/app/api/invoice/invoice";

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  // const [productData, setProductData] = useState<ProductWithInvoice[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("userSession");
      if (storedData) {
        const userData = JSON.parse(storedData);
        const userId: string = userData.user_id;

        if (userId) {
          const userInvoice = await invoice({ userId });
          console.log("tes: ", userInvoice);

          if (userInvoice) {
            console.log("Invoices fetched: ", userInvoice);
            setInvoices(userInvoice);
          } else {
            console.error("No invoices found for this user.");
          }
        }
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const fetchProductData = async () => {
  //     const allProducts = await Promise.all(
  //       invoices.flatMap(async (invoiceItem) => {
  //         return await Promise.all(
  //           invoiceItem.product_id.map(async (id) => {
  //             if (!id) return null;

  //             const productDoc = doc(db, "product", id.id);
  //             const productSnap = await getDoc(productDoc);
  //             return productSnap.exists()
  //               ? { ...productSnap.data(), invoice: invoiceItem }
  //               : null;
  //           }),
  //         );
  //       }),
  //     );

  //     const filteredProducts = allProducts
  //       .flat()
  //       .filter((product): product is ProductWithInvoice => product !== null);
  //     setProductData(filteredProducts);
  //   };

  //   if (invoices.length > 0) {
  //     fetchProductData();
  //   }
  // }, [invoices]);

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
              // onChange={(e: any) => setSearch(e.event.target)}
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

          {invoices.length > 0 ? (
            invoices.map((product) => (
              <CardInvoice
                key={product.transaksi_id}
                date={product.updated_at}
                status={product.status}
                quantity={product.totalQuantity}
                paidAmount={product.paid_amount}
                products={product.products}
                transactionId={product.transaksi_id}
                productAmount={product.amount}
              />
            ))
          ) : (
            <p> data not found</p>
          )}
        </div>
      </div>
    </div>
  );
}
