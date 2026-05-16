import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store/store';
import { setPosts, setPostsPagination, setViewMode, setIsLoading, setError, setAccessToken } from '../redux/store/slices/appSlice';
import { apiService } from '../api/api';
import Pagination from '../components/Pagination';
import '../styles/main.css';
import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import ExitIcon from '../Icons/ExitIcon';
import PostsTable from '../tables/PostsTable';
import { Card } from '@consta/uikit/Card';



function PostsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const posts = useSelector((state: RootState) => state.appSlice.posts);
    const postsPagination = useSelector((state: RootState) => state.appSlice.postsPagination);
    const viewMode = useSelector((state: RootState) => state.appSlice.viewMode);
    const isLoading = useSelector((state: RootState) => state.appSlice.isLoading);
    const error = useSelector((state: RootState) => state.appSlice.error);
    const loadPosts = async (page: number = 1, limit: number = 10) => {
        dispatch(setIsLoading(true));
        dispatch(setError(null));

        try {
            const response = await apiService.getPosts(page, limit);
            dispatch(setPosts(response.data));
            dispatch(setPostsPagination({page, limit, total: response.meta.pagination.total, pages: response.meta.pagination.pages}));
        } catch (err) {
            dispatch(setError(
                    'Ошибка при загрузке постов'
            ));
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    useEffect(() => {
        if (postsPagination.total === 0) {
            loadPosts();
        }
    }, []);

    const handlePageChange = (page: number) => {loadPosts(page, postsPagination.limit)};
    const handleLimitChange = (limit: number) => {loadPosts(1, limit)};
    const handlePostClick = (postId: number) => {navigate(`/posts/${postId}`)};
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        dispatch(setAccessToken(''));
        navigate('/')
    };

    return (
        <Theme preset={presetGpnDefault}>
        <div className="posts-page">
            <header className="page-header">
                <Text
                view="primary"
                size="xl"
                weight="bold">
                    Посты
                </Text>
                <div className="header-controls">
                    <Button
                        label="Пользователи"
                        view={viewMode === 'users' ? 'primary' : 'ghost'}
                        onClick={() => {dispatch(setViewMode('users')); navigate('/users')}}/>

                    <Button
                        label="Посты"
                        view={viewMode === 'posts' ? 'primary' : 'ghost'}
                        onClick={() => dispatch(setViewMode('posts'))}/>

                    <Button
                        label="Выход"
                        view="ghost"
                        iconRight={ExitIcon} onlyIcon
                        onClick={handleLogout}/>
                </div>
            </header>
            <main className="page-content">
                {(error) && (
                    <Card
                        className="error-banner"
                        verticalSpace="s"
                        horizontalSpace="m">
                        <Text view="alert" size="s">
                            {error}
                        </Text>
                    </Card>
                )}
                {isLoading ? (
                    <Card
                        className="loading"
                        verticalSpace="xl"
                        horizontalSpace="xl">
                        <Text size="m">Загрузка...</Text>
                    </Card>
                ) : (
                    <>

                        <Card
                            className="table-container"
                            verticalSpace="xl"
                            horizontalSpace="xl">

                            <PostsTable
                                posts={posts}
                                onRowClick={handlePostClick}
                            />
                        </Card>

                        <Pagination
                            currentPage={postsPagination.page}
                            totalPages={postsPagination.pages}
                            limit={postsPagination.limit}
                            onPageChange={handlePageChange}
                            onLimitChange={handleLimitChange}/>
                    </>
                )}
            </main>
        </div>
        </Theme>
    );
}

export default PostsPage;