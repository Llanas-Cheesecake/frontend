export interface Product {
    product_id: number
    slug: string
    name: string
    description: string
    category: string
    thumbnail: string
    price: number
    images: ProductImage[]

    average_ratings: number
    total_ratings: number
    is_wishlisted: boolean
}

interface ProductImage {
    image: string
}