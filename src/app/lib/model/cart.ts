import Product from '@/app/lib/model/product'

interface Cart {
    cart_id: string;
    user_id: string;
    created_at: Date;
    order_id: string;
    price: number;
    product_id: string;
    product?: Product;
    quantity: number;
    totalPrice: number;
    updated_at: Date;
}

export default Cart