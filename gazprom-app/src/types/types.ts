export interface User {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
}

export interface Post {
    id: number;
    user_id: number;
    title: string;
    body: string;
}

export interface Comment {
    id: number;
    post_id: number;
    name: string;
    email: string;
    body: string;
}

export interface PaginationParams {
    page: number;
    limit: number;
}

export interface ApiResponse<T> {
    data: T[];
    meta: {
        pagination: {
            total: number;
            pages: number;
            page: number;
            limit: number;
        };
    };
}

