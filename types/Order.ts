import type { Product } from "~/types/Product";

export interface Order {
    order_id: string
    customerName?: string
    customerEmail?: string
    customerPhoneNumber?: string

    items: OrderItem[]
    payment?: OrderPayment

    deliveryAddress?: string
    additionalInfo?: string

    amountPaid?: number,
    paidUsing?: string
}

export interface OrderItem {
    product: Product,
    quantity: number,
    type: string
}

export interface OrderPayment {
    amount_paid: number
    paid_using: string
    status: string
    paid_at: string
}