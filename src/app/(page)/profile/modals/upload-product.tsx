import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faKeyboard } from "@fortawesome/free-regular-svg-icons";
import {
  faAngleRight,
  faCircleInfo,
  faFileCirclePlus,
  faHeadphones,
  faLaptop,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

interface productType {
  name: string;
  icon: IconProp;
}

export default function UploadProduct() {
  const [productTypeVal, setProductTypeVal] = useState<string>("");
  const productType: productType[] = [
    {
      name: "Mobile Phone",
      icon: faMobile,
    },
    {
      name: "Laptop and PC",
      icon: faLaptop,
    },
    {
      name: "Headphone",
      icon: faHeadphones,
    },
    {
      name: "Keyboard",
      icon: faKeyboard,
    },
  ];

  const handleProductType = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: string,
  ) => {
    e.preventDefault();
    setProductTypeVal(type);
  };
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  // };
  return (
    <div className="m-10">
      <form>
        <ul className="mx-2 mt-8 space-y-6">
          <li className="flex items-center gap-3 border-b-2 py-5">
            <FontAwesomeIcon icon={faCircleInfo} />
            <p>Upload Product</p>
            <FontAwesomeIcon icon={faAngleRight} className="ml-auto" />
          </li>
          <li className="grid items-center justify-between gap-3 border-b-2 py-5">
            <p>Product Type</p>
            <div className="flex space-x-3">
              {productType.map((type, index) => (
                <Button
                  variant={`outline`}
                  key={index}
                  className={`m-0 grid size-28 flex-1 items-center justify-normal gap-0 whitespace-normal py-5 ${productTypeVal === type.name && "bg-slate-300"}`}
                  onClick={(e) => handleProductType(e, type.name)}
                >
                  <FontAwesomeIcon icon={type.icon} />
                  <p className="mr-auto">{type.name}</p>
                </Button>
              ))}
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 py-5">
            <p>Product Media</p>
            <div className="flex space-x-3">
              <Image
                src={`/assets/image/bank.jpg`}
                alt="priview image"
                height={100}
                width={100}
                className="object-cover"
              />
              <div className="flex items-center">
                <label className="flex cursor-pointer flex-col items-center justify-center rounded text-[13px] text-blue-500 duration-300 hover:text-blue-600">
                  <FontAwesomeIcon
                    icon={faFileCirclePlus}
                    className="text-3xl"
                  />
                  Upload Image
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 py-5">
            <p>Pricing</p>
            <div className="flex gap-3">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="price">Price</Label>
                <Input type="text" id="price" placeholder="price..." />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="discount">Discount</Label>
                <Input type="text" id="discount" placeholder="discount..." />
              </div>
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 py-5">
            <p>Product Detail</p>
            <div className="flex gap-3">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Product Name</Label>
                <Input type="text" id="name" placeholder="product name..." />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="brand-name">Brand Name</Label>
                <Input
                  type="text"
                  id="brand-name"
                  placeholder="brand name..."
                />
              </div>
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 py-5">
            <p>Product Detail</p>
            <div className="flex gap-3">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="brand-name">Brand Name</Label>
                <Textarea
                  placeholder="Add Description Here..."
                  id="brand-name"
                />
              </div>
            </div>
          </li>
          <li className="flex items-center justify-end gap-3 py-5">
            <Button
              variant={"outline"}
              className="hover:bg-blue-500 hover:text-white"
            >
              Discard
            </Button>
            <Button
              variant={"outline"}
              className="hover:bg-blue-500 hover:text-white"
            >
              Add Product
            </Button>
          </li>
        </ul>
      </form>
    </div>
  );
}
