import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, Post, Comment } from '../../../types/types';

interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

interface AppState {
    accessToken: string;

    users: User[];
    usersPagination: Pagination;

    posts: Post[];
    postsPagination: Pagination;

    selectedUser: User | null;
    selectedPost: Post | null;
    selectedPostComments: Comment[];

    viewMode: 'users' | 'posts';

    isLoading: boolean;
    error: string | null;
}

const initialState: AppState = {
    accessToken: localStorage.getItem('accessToken') || '',

    users: [],
    usersPagination: {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0,
    },

    posts: [],
    postsPagination: {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0,
    },

    selectedUser: null,
    selectedPost: null,
    selectedPostComments: [],

    viewMode: 'users',

    isLoading: false,
    error: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAccessToken(state, action: PayloadAction<string>) {
            state.accessToken = action.payload;
            localStorage.setItem('accessToken', action.payload);
        },

        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
        },

        setUsersPagination(state, action: PayloadAction<Pagination>) {
            state.usersPagination = action.payload;
        },

        setPosts(state, action: PayloadAction<Post[]>) {
            state.posts = action.payload;
        },

        setPostsPagination(state, action: PayloadAction<Pagination>) {
            state.postsPagination = action.payload;
        },

        setSelectedUser(state, action: PayloadAction<User | null>) {
            state.selectedUser = action.payload;
        },

        setSelectedPost(state, action: PayloadAction<Post | null>) {
            state.selectedPost = action.payload;
        },

        setSelectedPostComments(state, action: PayloadAction<Comment[]>) {
            state.selectedPostComments = action.payload;
        },

        setViewMode(state, action: PayloadAction<'users' | 'posts'>) {
            state.viewMode = action.payload;
        },

        setIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },

        setError(state, action: PayloadAction<string | null>) {
            state.error = action.payload;
        },
    },
});

export const { setAccessToken,setUsers, setUsersPagination, setPosts, setPostsPagination, setSelectedUser, setSelectedPost,
    setSelectedPostComments, setViewMode, setIsLoading, setError } = appSlice.actions;
    
export default appSlice.reducer;