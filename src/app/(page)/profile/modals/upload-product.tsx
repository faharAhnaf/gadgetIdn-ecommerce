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
import { useEffect, useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getProductByProductId } from "@/app/api/product/detail_product";
import Product from "@/app/lib/model/product";
import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import updateDataProduct from "@/app/api/product/update_product";
import uploadDataProduct from "@/app/api/product/upload_product";
import Swal from "sweetalert2";

interface productType {
  name: string;
  icon: IconProp;
}

export default function UploadProduct() {
  const [productTypeVal, setProductTypeVal] = useState<string>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [user, setUser] = useState<string>("");
  const [file, setFile] = useState<File | undefined>();

  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<Product>({
    defaultValues: {
      category: "",
      image_url: "",
      price: 0,
      quantityInStock: 0,
      name: "",
      description: "",
    },
  });

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
    setValue("category", type);
  };

  const storedData = localStorage.getItem("userSession");
  useEffect(() => {
    if (storedData) {
      const userData = JSON.parse(storedData);
      setUser(userData.user_id);
    }
  });

  const onSubmit: SubmitHandler<Product> = async (dataSubmit) => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch("/api/upload-product", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();

      await uploadDataProduct(
        dataSubmit.name,
        Number(dataSubmit.price),
        Number(dataSubmit.quantityInStock),
        dataSubmit.category,
        dataSubmit.description,
        result.filename,
        user,
      );
      router.replace("/profile/list-product");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("image_url", file.name);
    }
  };

  return (
    <div className="m-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="mx-2 mt-8 space-y-6">
          <li className="flex items-center gap-3 border-b-2 pb-5">
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
                  className={`m-0 grid size-28 flex-1 items-center justify-normal gap-0 whitespace-normal py-5 ${productTypeVal === type.name && "bg-blue-500 text-white"}`}
                  onClick={(e) => handleProductType(e, type.name)}
                >
                  <FontAwesomeIcon icon={type.icon} />
                  <p className="text-left">{type.name}</p>
                  <Input type="hidden" {...register("category")}></Input>
                </Button>
              ))}
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 pb-5">
            <p>Product Media</p>
            <div className="flex space-x-3">
              {imagePreview ? (
                <Image
                  src={imagePreview}
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
                  <input
                    type="file"
                    {...register("image_url")}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 pb-5">
            <div className="flex gap-3">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="price" className="text-base">
                  Price
                </Label>
                <Input
                  {...register("price")}
                  type="number"
                  id="price"
                  placeholder="Input as number..."
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="stock" className="text-base">
                  Stock
                </Label>
                <Input
                  {...register("quantityInStock")}
                  type="number"
                  id="stock"
                  placeholder="stock..."
                />
              </div>
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 pb-5">
            <div className="flex gap-3">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name" className="text-base">
                  Product Name
                </Label>
                <Input
                  {...register("name")}
                  type="text"
                  id="name"
                  placeholder="product name..."
                />
              </div>
            </div>
          </li>
          <li className="grid items-center gap-3 border-b-2 pb-5">
            <div className="flex gap-3">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="brand-name" className="text-base">
                  Description
                </Label>
                <Textarea
                  placeholder="Add Description Here..."
                  id="brand-name"
                  {...register("description")}
                  className="h-60"
                />
              </div>
            </div>
          </li>
          <li className="flex items-center justify-end gap-3 pb-5">
            <Button
              variant={"outline"}
              className="hover:bg-blue-500 hover:text-white"
              onClick={router.back}
              type="button"
            >
              Back
            </Button>
            <Button
              variant={"outline"}
              className="hover:bg-blue-500 hover:text-white"
              type="submit"
            >
              Upload Product
            </Button>
          </li>
        </ul>
      </form>
    </div>
  );
}
