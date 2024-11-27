import Product from "./product";

export interface InvoiceData {
  created_at: string;
  ekspedisi_id: string;
  paid_amount: number;
  payer_email: string;
  payment_channel: string;
  payment_method: string;
  product_id: any;
  status: string;
  totalQuantity: number;
  transaksi_id: string;
  updated_at: string;
  user_id: string;
  variant: any;
}

export interface ProductWithInvoice extends Product {
  invoice: InvoiceData;
}
