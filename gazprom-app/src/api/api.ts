import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { User, Post, Comment, ApiResponse } from '../types/types';

const BASE_URL = 'https://gorest.co.in/public/v2';

class GoRestAPI {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    setAccessToken(token: string) {
        this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    async getUsers(page: number = 1, limit: number = 10): Promise<ApiResponse<User>> {
        try {
            const response = await this.client.get('/users', {
                params: {
                    page,
                    per_page: limit,
                },
            });

            const total = parseInt(response.headers['x-pagination-total'] || '0');
            const pages = Math.ceil(total / limit);

            return {
                data: response.data,
                meta: {
                    pagination: {
                        total,
                        pages,
                        page,
                        limit,
                    },
                },
            };
        } catch (error) {
            throw new Error('Ошибка');
        }
    }

    async getUserById(id: number): Promise<User> {
        try {
            const response = await this.client.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Ошибка');
        }
    }

    async getUserPosts(userId: number): Promise<Post[]> {
        try {
            const response = await this.client.get(`/users/${userId}/posts`);
            return response.data;
        } catch (error) {
            throw new Error('Ошибка');
        }
    }

    async getPosts(page: number = 1, limit: number = 10): Promise<ApiResponse<Post>> {
        try {
            const response = await this.client.get('/posts', {
                params: {
                    page,
                    per_page: limit,
                },
            });

            const total = parseInt(response.headers['x-pagination-total'] || '0');
            const pages = Math.ceil(total / limit);

            return {
                data: response.data,
                meta: {
                    pagination: {
                        total,
                        pages,
                        page,
                        limit,
                    },
                },
            };
        } catch (error) {
            throw new Error('Ошибка');
        }
    }

    async getPostById(id: number): Promise<Post> {
        try {
            const response = await this.client.get(`/posts/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Ошибка');
        }
    }

    async getPostComments(postId: number): Promise<Comment[]> {
        try {
            const response = await this.client.get(`/posts/${postId}/comments`);
            return response.data;
        } catch (error) {
            throw new Error('Ошибка');
        }
    }
}

export const apiService = new GoRestAPI();
