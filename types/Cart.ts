import type { Product } from "~/types/Product";

export interface Cart {
    cart_id?: string
    items?: CartItem[]
}

export interface CartItem {
    product: Product
    quantity: number
    discounted_price: number
    type: string
}