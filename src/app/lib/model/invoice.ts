import Product from "./product";

export interface InvoiceData {
  created_at: Date;
  ekspedisi_id: string;
  paid_amount: number;
  payer_email: string;
  payment_channel: string;
  payment_method: string;
  product_id: any;
  status: string;
  totalQuantity: number;
  transaksi_id: string;
  updated_at: Date;
  user_id: string;
  variant: any;
  color: any;
}

export interface ProductWithInvoice extends Product {
  invoice: InvoiceData;
}
