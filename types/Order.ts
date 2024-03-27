import type { Product } from "~/types/Product";
import type {Customer} from "~/types/Customer";

export interface Order {
    order_id: string
    customerName?: string
    customerEmail?: string
    customerPhoneNumber?: string

    items: OrderItem[]
    payment?: OrderPayment

    courier_name?: string
    additionalInfo?: string

    amountPaid?: number,
    paidUsing?: string
}

export interface DetailedOrder {
    order_id: string
    customer: Customer
    items: OrderItem[]
    payment: OrderPayment
    delivery_information: OrderDelivery
    total_price: number
    status: string
    created_at: string
}

export interface OrderItem {
    product: Product,
    quantity: number,
    type: string
}

export interface OrderPayment {
    paymongo_id: string
    amount_paid: number
    net_amount: number
    fee: number
    paid_using: string
    status: string
    paid_at: string
}

export interface OrderDelivery {
    customer_name: string
    email: string
    phone_number: string
    courier_name: string
    additional_info: string
    status: string
}