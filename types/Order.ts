import type { Product } from "~/types/Product";

export interface Order {
    id: string
    customerName: string
    customerEmail: string
    customerPhoneNumber: string

    items: OrderItem[]

    deliveryAddress: string
    additionalInfo: string

    amountPaid: number,
    paidUsing: string
}

export interface OrderItem {
    product: Product,
    quantity: number,
    type: string
}