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
import { getProductByProductId } from "@/app/api/detail_product";

interface DocumentReference {
  id: string;
}
interface InvoiceData {
  product_id: DocumentReference[];
  paid_amount: number;
  totalQuantity: number;
  created_at: string;
  status: string;
}

interface ProductData {
  image_url: string;
  name: string;
}

export default function InvoicePage() {
  const [invoiceData, setinvoiceData] = useState<InvoiceData>({
    product_id: [],
    paid_amount: 0,
    totalQuantity: 0,
    created_at: "",
    status: "",
  });

  // const [productData, setProductData] = useState<ProductData>({
  //   image_url: "",
  //   name: "",
  // });

  const [invoice, setInvoice] = useState<InvoiceData[]>([]);
  const [productData, setProductData] = useState<ProductData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("userSession");
      if (storedData) {
        const userData = JSON.parse(storedData);
        const userId = userData.user_id;
        if (userId) {
          const userInvoice = await Invoice({ userId });
          if (userInvoice) {
            setinvoiceData({
              product_id: Array.isArray(userInvoice.product_id)
                ? userInvoice.product_id
                : [{ id: userInvoice.product_id }],
              paid_amount: userInvoice.paid_amount || 0,
              totalQuantity: userInvoice.totalQuantity || 0,
              created_at: userInvoice.created_at || "",
              status: userInvoice.status || "",
            });
          }
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      const productId = invoiceData.product_id[0]?.id;
      if (productId) {
        const product = await getProductByProductId(productId);
        if (product) {
          setProductData([
            {
              image_url: product.image_url || "",
              name: product.name,
            },
          ]);
        } else {
          console.error("product not found");
        }
      }
    };

    fetchProductData();
  }, [invoiceData.product_id]);

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

          <CardInvoice
            date={invoiceData.created_at}
            status={invoiceData.status}
            quantity={invoiceData.totalQuantity}
            paidAmount={invoiceData.paid_amount}
            name={productData[0]?.name}
          />
        </div>
      </div>
    </div>
  );
}
