import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { faBagShopping, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

interface Props {
  date?: string;
  status?: string;
  name?: string;
  quantity?: number;
  paidAmount?: number;
}

export default function CardInvoice({
  date = "",
  status = "",
  name,
  quantity = 0,
  paidAmount = 0,
}: Props) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
      return "";
    }
    return Intl.DateTimeFormat("id-ID").format(dateObj);
  };

  return (
    <div className="rounded-lg border border-[#D9D9D9] shadow-md">
      <div className="flex items-center gap-10 bg-[#D9D9D9] px-10 py-5">
        <FontAwesomeIcon icon={faBagShopping} className="text-4xl" />
        <p>Belanja</p>
        <p>{formatDate(date)}</p>
        <p className={`rounded-lg bg-[#A3D3BD] p-2`}>
          {status?.charAt(0) + status?.slice(1).toLowerCase()}
        </p>
        <p>INV/20229999</p>
      </div>
      <div className="grid grid-cols-2 p-10">
        <div className="space-y-5">
          <div className="flex items-center gap-5">
            <Image
              src="/assets/image/claw.png"
              width={20}
              height={20}
              alt="Claw Image"
            ></Image>
            <p>Scratch Store</p>
          </div>
          <div className="flex gap-8">
            <Image
              src="/assets/image/headset.png"
              width={70}
              height={70}
              alt="Claw Image"
            />
            <ul>
              <li>
                <p>{name} - HITAM</p>
              </li>
              <li>
                <p>
                  {quantity} barang x &nbsp;
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(paidAmount)}
                </p>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-5">
          <ul className="grid grid-cols-3 gap-3 text-end">
            <li className="col-span-2">
              <p>Total Belanja</p>
              <p>
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(quantity * paidAmount)}
              </p>
            </li>
          </ul>
          <div className="grid grid-cols-3 items-center gap-3">
            <Button
              variant={"ghost"}
              className={cn(`mx-auto w-full rounded-xl`)}
            >
              Lihat Detail Transaksi
            </Button>
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
