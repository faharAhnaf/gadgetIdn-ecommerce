import User from "./user";

export default interface ProductList {
  product_id: string;
  name: string;
  description: string;
  price: number;
  user?: User;
}
