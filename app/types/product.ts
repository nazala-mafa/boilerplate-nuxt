import type { PaginatedData } from "./paginatedData"
import type { User } from "./user"

export interface Product {
    id?: number
    user_id?: number
    user?: User
    name?: string
    description?: string
    price?: number
    image_url?: string
    created_at?: string
    updated_at?: string
    [key: string]: any
}

export interface ProductForm {
    data: Product,
    errors: any
}

export interface ProductPaginatedData extends PaginatedData <Product> {}