"use client";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/fragments/Navbar";
import { AllProductDropdown } from "@/components/core/Dropdown/all-product";
import { DatePicker } from "@/components/core/Button/date-picker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import CardInvoice from "@/components/core/Card/card-invoice";
import Invoice from "@/app/api/invoice/invoice";
import { getProductByProductId } from "@/app/api/product/detail_product";
import { db } from "@/app/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Product from "@/app/lib/model/product";
import { InvoiceData, ProductWithInvoice } from "@/app/lib/model/invoice";

export default function InvoicePage() {
  const [invoices, setInvoices] = useState<InvoiceData[]>([]);
  const [productData, setProductData] = useState<ProductWithInvoice[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("userSession");
      if (storedData) {
        const userData = JSON.parse(storedData);
        const userId = userData.user_id;
        if (userId) {
          const userInvoice = await Invoice({ userId });
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

  useEffect(() => {
    const fetchProductData = async () => {
      const allProducts = await Promise.all(
        invoices.flatMap(async (invoiceItem) => {
          const productId = invoiceItem.product_id[0]?.id;
          if (!productId) return null;

          const productDoc = doc(db, "product", productId);
          const productSnap = await getDoc(productDoc);
          return productSnap.exists()
            ? { ...productSnap.data(), invoice: invoiceItem }
            : null;
        }),
      );

      const filteredProducts = allProducts.filter(
        (product): product is ProductWithInvoice => product !== null,
      );
      setProductData(filteredProducts);
    };

    if (invoices.length > 0) {
      fetchProductData();
    }
  }, [invoices]);

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

          {productData.length > 0 ? (
            productData.map((product, index) => (
              <CardInvoice
                key={index}
                date={product.invoice.created_at}
                status={product.invoice.status}
                quantity={product.invoice.totalQuantity}
                paidAmount={product.invoice.paid_amount}
                price={product.price}
                name={product.name}
                imageURL={product.image_url}
                transactionId={product.invoice.transaksi_id}
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
