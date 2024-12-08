import Product from "./product";

export interface InvoiceData {
  address: string;
  amount: number[];
  color: string[];
  created_at: string;
  current_price: number[];
  ekspedisi_id: string;
  paid_amount: number;
  payer_email: string;
  payment_channel: string;
  payment_method: string;
  product_id: any[];
  recipient: string;
  shippingCost: number;
  shippingETA: string;
  shippingName: string;
  status: string;
  telepon: string;
  totalQuantity: number;
  transaksi_id: string;
  updated_at: string;
  user_id: string;
  variant: string[];
  products: Product[];
}
