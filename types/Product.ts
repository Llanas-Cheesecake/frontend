export interface Product {
    product_id: number
    slug: string
    name: string
    description: string
    category: string
    thumbnail: string
    price: number
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