export interface Link {
    active: boolean;
    label: string;
    page: string | null;
    url: string | null;
}

export interface PaginatedData <Data>{
    current_page: number;
    data: Data[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface PaginatedCursorData <Data> {
    data: Data[],
    path: string,
    per_page: number,
    next_cursor: string | null,
    next_page_url: string | null,
    prev_cursor: string | null,
    prev_page_url: string | null
}