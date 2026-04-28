import type { PaginatedCursorData, PaginatedData } from "./paginatedData"

export interface User {
    id: number
    name: string
    email: string
    email_verified_at: string,
    password?: string,
    password_confirmation?: string,
    created_at: string
    updated_at: string
}

export interface UserPaginatedData extends PaginatedData <User> {}

export interface UserPaginatedCursorData extends PaginatedCursorData <User> {}
