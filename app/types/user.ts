import type { PaginatedData } from "./paginatedData"
import type { PaginatedCursorData } from "./paginatedData"

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
export interface UserPaginatedCursorData extends PaginatedCursorData <User> {}
