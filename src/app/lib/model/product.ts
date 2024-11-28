import Category from "@/app/lib/model/category";

interface Product {
  product_id: string;
  updated_at: { seconds: number; nanoseconds: number };
  created_at: { seconds: number; nanoseconds: number };
  price: number;
  description: string;
  user_id: string;
  category: string;
  quantityInStock: number;
  name: string;
  // category?: Category;
  image_url: string;
  color: string[];
  variant: string[];
}

export default Product;
