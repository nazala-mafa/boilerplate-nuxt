import type { PaginatedData } from "./paginatedData"

export interface User {
    id: number
    name: string
    password?: string
    email: string
    email_verified_at: string
    created_at: string
    updated_at: string
}

export interface UserPaginatedData extends PaginatedData <User> {}