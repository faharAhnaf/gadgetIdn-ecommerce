interface Product {
  product_id: string;
  updated_at: Date;
  created_at: Date;
  price: number;
  description: string;
  user_id: string;
  category: string;
  quantityInStock: number;
  name: string;
  image: File | null;
  image_url: string;
  color: string[];
  variant: string[];
}

export default Product;
