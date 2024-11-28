import { Button } from "@/components/ui/button";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleRight,
  faCircleInfo,
  faFileCirclePlus,
  faHeadphones,
  faKeyboard,
  faLaptop,
  faMobile,
  faPersonRunning,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getProductByProductId } from "@/app/api/product/detail_product";
import Product from "@/app/lib/model/product";
import { useParams } from "next/navigation";
import { faShoelace } from "@fortawesome/free-brands-svg-icons";

interface productType {
  name: string;
  icon: IconProp;
}

export default function UpdateProduct() {
  const { id } = useParams();
  const [data, setData] = useState<Product | null>();
  const [productTypeVal, setProductTypeVal] = useState<string>();
  const [dataInputPrice, setDataInputPrice] = useState<number>(0);
  const [dataInputStock, setDataInputStock] = useState<number>(0);
  const [dataInputName, setDataInputName] = useState<string>("");
  const [dataInputDescription, setDataInputDescription] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const dataProduct = await getProductByProductId(id);
      setData(dataProduct);
      setProductTypeVal(dataProduct?.category);
      setDataInputPrice(dataProduct?.price ?? 0);
      setDataInputStock(dataProduct?.quantityInStock ?? 0);
      setDataInputName(dataProduct?.name ?? "");
      setDataInputName(dataProduct?.description ?? "");
    };
    fetchData();
  }, [id]);

  const productType: productType[] = [
    {
      name: "Electronic",
      icon: faMobile,
    },
    {
      name: "Accessories",
      icon: faHeadphones,
    },
    {
      name: "Sports",
      icon: faPersonRunning,
    },
    {
      name: "Clothes",
      icon: faShirt,
    },
  ];

  const handleProductType = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: string,
  ) => {
    e.preventDefault();
    setProductTypeVal(type);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputPrice = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDataInputPrice(e.target.valueAsNumber);
  };

  const handleInputStock = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDataInputStock(e.target.valueAsNumber);
  };

  const handleInputName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDataInputName(e.target.value);
  };

  const handleInputDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setDataInputDescription(e.target.value);
  };

  return (
    <div className="m-10">
      <form onSubmit={handleSubmit}>
        <ul className="mx-2 mt-8 space-y-6">
          <li className="flex items-center gap-3 border-b-2 py-5">
            <FontAwesomeIcon icon={faCircleInfo} />
            <p>Update Product</p>
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
                  <p className="text-left">{type.name}</p>
                </Button>
              ))}
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 py-5">
            <p>Product Media</p>
            <div className="flex space-x-3">
              {data?.image_url ? (
                <Image
                  src={data?.image_url}
                  alt="priview image"
                  height={100}
                  width={100}
                  className="object-cover"
                />
              ) : (
                <p>No Image Available</p>
              )}
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
                <Input
                  value={dataInputPrice.toString()}
                  onChange={handleInputPrice}
                  type="number"
                  id="price"
                  placeholder="Input as number..."
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  value={dataInputStock.toString()}
                  onChange={handleInputStock}
                  type="number"
                  id="stock"
                  placeholder="stock..."
                />
              </div>
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 py-5">
            <p>Product Detail</p>
            <div className="flex gap-3">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  value={dataInputName}
                  onChange={handleInputName}
                  type="text"
                  id="name"
                  placeholder="product name..."
                />
              </div>
              {/* <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="brand-name">Brand Name</Label>
                <Input
                  type="text"
                  id="brand-name"
                  placeholder="brand name..."
                />
              </div> */}
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 py-5">
            <p>Product Detail</p>
            <div className="flex gap-3">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="brand-name">Description</Label>
                <Textarea
                  placeholder="Add Description Here..."
                  id="brand-name"
                  value={data?.description ?? ""}
                  onChange={handleInputDescription}
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
              type="submit"
            >
              Update Product
            </Button>
          </li>
        </ul>
      </form>
    </div>
  );
}
