import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store/store';
import { setUsers, setUsersPagination, setViewMode, setIsLoading, setError, setAccessToken } from '../redux/store/slices/appSlice';
import { apiService } from '../api/api';
import Pagination from '../components/Pagination';
import '../styles/main.css';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';
import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import ExitIcon from '../Icons/ExitIcon';
import { Card } from '@consta/uikit/Card';
import UsersTable from '../tables/UsersTable';


function UsersPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.appSlice.users);
    const usersPagination = useSelector((state: RootState) => state.appSlice.usersPagination);
    const viewMode = useSelector((state: RootState) => state.appSlice.viewMode);
    const isLoading = useSelector((state: RootState) => state.appSlice.isLoading);
    const error = useSelector((state: RootState) => state.appSlice.error);
    const loadUsers = async (page: number = 1, limit: number = 10) => {dispatch(setIsLoading(true)); setError('');

        try {
            const response = await apiService.getUsers(page, limit);
            dispatch(setUsers(response.data));
            dispatch(setUsersPagination({page, limit, total: response.meta.pagination.total, pages: response.meta.pagination.pages,}));
        } catch (err) {
            dispatch(
                setError('Ошибка при загрузке пользователей')
            );
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    useEffect(() => {
        if (usersPagination.total === 0) {
            loadUsers();
        }
    }, []);

    const handlePageChange = (page: number) => {loadUsers(page, usersPagination.limit)};
    const handleLimitChange = (limit: number) => {loadUsers(1, limit)};
    const handleUserClick = (userId: number) => {navigate(`/users/${userId}`)};

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        dispatch(setAccessToken(''));
        navigate('/')
    };
    
    return (
        <Theme preset={presetGpnDefault}>
        <div className="users-page">

            <header className="page-header">
                <Text
                view="primary"
                size="xl"
                weight="bold">
                    Пользователи
                </Text>
                <div className="header-controls">
                    <Button
                        label="Пользователи"
                        view={viewMode === 'users' ? 'primary' : 'ghost'}
                        onClick={() => dispatch(setViewMode('users'))}/>

                    <Button
                        label="Посты"
                        view={viewMode === 'posts' ? 'primary' : 'ghost'}
                        onClick={() => {dispatch(setViewMode('posts')); navigate('/posts')}}/>

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

                            <UsersTable
                                users={users}
                                onRowClick={handleUserClick}
                            />
                        </Card>

                        <Pagination
                            currentPage={usersPagination.page}
                            totalPages={usersPagination.pages}
                            limit={usersPagination.limit}
                            onPageChange={handlePageChange}
                            onLimitChange={handleLimitChange}/>
                    </>
                )}
            </main>
        </div>
        </Theme>
        );
}

export default UsersPage;