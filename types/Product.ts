export interface Product {
    slug: string
    name: string
    description: string
    category: string
    thumbnail: string
    price: number
    averageRatings: number

    images: ProductImage[]
}

interface ProductImage {
    image: string
}