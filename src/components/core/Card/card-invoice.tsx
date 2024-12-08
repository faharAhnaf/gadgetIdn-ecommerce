import Product from "@/app/lib/model/product";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { faBagShopping, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

interface Props {
  date?: string;
  status?: string;
  quantity?: number;
  paidAmount?: number;
  products?: Product[];
  transactionId: string;
  productAmount: number[];
}

export default function CardInvoice({
  date,
  status = "",
  paidAmount = 0,
  transactionId = "",
  products,
  productAmount,
}: Props) {
  return (
    <div className="rounded-lg border border-[#D9D9D9] shadow-md">
      <div className="flex items-center gap-10 bg-[#D9D9D9] px-10 py-5">
        <FontAwesomeIcon icon={faBagShopping} className="text-4xl" />
        <p>Belanja</p>
        <p>{date && new Date(date).toLocaleString("en-US")}</p>
        <p className={`rounded-lg bg-[#A3D3BD] p-2`}>
          {status?.charAt(0) + status?.slice(1).toLowerCase()}
        </p>
      </div>
      <div className="flex justify-between">
        <div className="grid space-y-3 p-10">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              width={30}
              height={30}
              alt="Claw Image"
            ></Image>
            <p>BelanjaKuy</p>
          </div>
          {products?.map((product, index) => (
            <div key={product.product_id} className="grid space-y-5">
              <div className="flex gap-8">
                <img
                  src={product.image_url}
                  width={70}
                  height={70}
                  alt="Claw Image"
                />
                <ul>
                  <li>
                    <p>{product.name}</p>
                  </li>
                  <li>
                    <p>
                      {productAmount[index]} barang x &nbsp;
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
        <div className="grid gap-5">
          <ul className="grid grid-cols-3 gap-3 text-end">
            <li className="col-span-2 grid items-center">
              <div>
                <p>Total Belanja</p>
                <p>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(paidAmount)}
                </p>
              </div>
            </li>
          </ul>
          <div className="grid grid-cols-3 items-center gap-3">
            <Link href={`/invoice/${transactionId}`}>
              <Button
                variant={"ghost"}
                className={cn(`mx-auto w-full rounded-xl`)}
              >
                Lihat Detail Transaksi
              </Button>
            </Link>
            <Button
              variant={"outline"}
              className={cn(
                `mx-auto w-full rounded-xl bg-[#A3D3BD] hover:bg-[#76c8a4]`,
              )}
            >
              Beli Lagi
            </Button>
            <FontAwesomeIcon icon={faEllipsis} className="mx-5 text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
