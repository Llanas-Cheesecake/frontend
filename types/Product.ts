export interface Product {
    product_id: number
    slug: string
    name: string
    description: string
    category: string
    thumbnail: string
    price: number
    stock: number
    images: ProductImage[]

    ratings?: ProductRating[]
    average_ratings: number
    total_ratings: number
    is_wishlisted: boolean
    is_deleted?: boolean
}

interface ProductImage {
    image: string
}

export interface ProductRating {
    rating_id?: number
    reviewer_name: string
    rating: number
    headline: string
    review: string
    published_at: string
}

export interface ProductInventory {
    id: number
    quantity: number
    expiry_date: string
    created_at: string
    updated_at: string
}