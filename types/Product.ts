export interface Product {
    product_id: number
    slug: string
    name: string
    description: string
    category: string
    thumbnail: string
    price: number
    averageRatings: number
    totalRatings: number

    images: ProductImage[]
}

interface ProductImage {
    image: string
}