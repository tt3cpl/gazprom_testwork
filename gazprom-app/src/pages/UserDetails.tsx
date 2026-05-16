import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store/store';
import { setSelectedUser, setIsLoading, setError } from '../redux/store/slices/appSlice';
import { apiService } from '../api/api';
import '../styles/main.css';
import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import { Card } from '@consta/uikit/Card';
import { Text } from '@consta/uikit/Text';
import { Button } from '@consta/uikit/Button';





function UserDetailsPage() {
    const { id } = useParams<{id: string;}>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.appSlice.selectedUser);
    const isLoading = useSelector((state: RootState) => state.appSlice.isLoading);
    const error = useSelector((state: RootState) => state.appSlice.error);

    useEffect(() => {
        const loadUser = async () => {
            dispatch(setIsLoading(true));
            dispatch(setError(null));

            try {
                if (id) {
                    const userData = await apiService.getUserById(parseInt(id));
                    dispatch(setSelectedUser(userData));
                }
            } catch (err) {
                dispatch(
                    setError('Ошибка при загрузке пользователя')
                );
            } finally {
                dispatch(setIsLoading(false));
            }
        };

        loadUser();

        return () => {
            dispatch(setSelectedUser(null));
        };
    }, [id, dispatch]);

    if (isLoading) {
        return (
            <Theme preset={presetGpnDefault}>
            <div className="loading-page">
                <Text
                view="secondary"
                size="3xl">
                    Загрузка...
                </Text>
            </div>
            </Theme>
        );
    }

    if (error || !user) {
        return (
            <Theme preset={presetGpnDefault}>
            <div className="error-page">
                <Card
                    className="error-content"
                    verticalSpace="xl"
                    horizontalSpace="xl">
                    <Text
                        size="xl"
                        weight="bold">
                        Ошибка
                    </Text>

                    <Text
                        size="m"
                        view="alert">
                        {error || 'Пользователь не найден'}
                    </Text>

                    <Button
                        label="Вернуться к списку"
                        view="primary"
                        onClick={() => navigate('/users')}/>
                </Card>
            </div>
            </Theme>
        );
    }

    return (
        <Theme preset={presetGpnDefault}>
            <Button
            className="back-button"
            label="Вернуться"
            view="primary"
            onClick={() => navigate('/users')}/>
            <Card
                className="details-container"
                verticalSpace="xl"
                horizontalSpace="xl">
                    <Text
                        size="3xl"
                        weight="bold"
                        style={{ marginBottom: '32px' }}>
                        {user.name}
                    </Text>

                        <div className="details-grid">
                            <Card
                            className="detail-item"
                            verticalSpace="m"
                            horizontalSpace="l">
                                <Text
                                    className="label"
                                    view="secondary"
                                    size="s">
                                    ID
                                </Text>
                                <Text
                                    className="value"
                                    size="m"
                                    weight="bold">
                                    {user.id}
                                </Text>
                            </Card>

                            <Card
                            className="detail-item"
                            verticalSpace="m"
                            horizontalSpace="l">
                                <Text
                                    className="label"
                                    view="secondary"
                                    size="s">
                                    Email
                                </Text>
                                <Text
                                    className="value"
                                    size="m"
                                    weight="bold">
                                    {user.email}
                                </Text>
                            </Card>
        
                            <Card
                            className="detail-item"
                            verticalSpace="m"
                            horizontalSpace="l">
                                <Text
                                    className="label"
                                    view="secondary"
                                    size="s">
                                    Пол
                                </Text>
                                <Text
                                    className="value"
                                    size="m"
                                    weight="bold">
                                    {user.gender === 'male' ? 'Мужской' : 'Женский'}
                                </Text>
                            </Card>
        
                            <Card
                            className="detail-item"
                            verticalSpace="m"
                            horizontalSpace="l">
                                <Text
                                    className="label"
                                    view="secondary"
                                    size="s">
                                    Статус
                                </Text>
                                <Text
                                    className="value"
                                    size="m"
                                    weight="bold">
                                    {user.status === 'active' ? 'Активен' : 'Неактивен'}
                                </Text>
                            </Card>

                        </div>
                </Card>
        </Theme>
    );
}

export default UserDetailsPage;