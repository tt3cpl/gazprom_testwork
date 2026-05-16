import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store/store';
import { setAccessToken, setViewMode } from '../redux/store/slices/appSlice';
import { apiService } from '../api/api';
import '../styles/main.css';
import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import { Button } from '@consta/uikit/Button';
import { Text } from '@consta/uikit/Text';
import { Card } from '@consta/uikit/Card';
import { TextField } from '@consta/uikit/TextField';





function HomePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const viewMode = useSelector((state: RootState) => state.appSlice.viewMode);
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleTokenSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError('');

        if (!token.trim()) {
            setError('Токен не может быть пустым');
            return;
        }

        setIsLoading(true);

        try {
            apiService.setAccessToken(token);
            await apiService.getUsers(1, 1);
            dispatch(setAccessToken(token));
            setToken('');
            navigate(viewMode === 'users' ? '/users' : '/posts');
        } catch (err) {
            setError('Неверный токен. Пожалуйста, проверьте и попробуйте снова.');

            setToken('');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Theme preset={presetGpnDefault}>
        <div className="home-page">
            <div className="home-container">
                <Text
                view="primary"
                size="3xl"
                font="primary"
                weight="bold"
                className="home-title">
                    GazProm TestWork
                </Text>

                <Text
                view="secondary"
                className="home-subtitle">
                Введите ваш access token от https://gorest.co.in
                </Text>

                <Card className="token-form">
                    <div className="form-group">
                        <TextField
                            onChange={(value) => setToken(value || '')}
                            value={token}
                            type="password"
                            placeholder="Введите access token..."
                            className="token-input"
                            disabled={isLoading}/>
                        {error && (
                            <Text
                                className="error-message"
                                size="s"
                                view="alert">
                                {error}
                            </Text>
                        )}
                    </div>
                    <Button
                        className="submit-button"
                        type="submit"
                        label={isLoading ? 'Загрузка...' : 'Вход'}
                        disabled={isLoading || !token.trim()}
                        view="primary"
                        onClick={handleTokenSubmit}/>
                </Card>

                <div className="mode-selector">
                    <Text className="mode-label"
                    view="primary"
                    size="s">
                        Выберите режим:
                    </Text>

                    <div className="mode-buttons">
                        <Button
                            className="mode-button"
                            label="Пользователи"
                            view={viewMode === 'users' ? 'primary' : 'ghost'}
                            onClick={() => dispatch(setViewMode('users'))}/>
                        
                        <Button
                            className="mode-button"
                            label="Посты"
                            view={viewMode === 'posts' ? 'primary' : 'ghost'}
                            onClick={() => dispatch(setViewMode('posts'))}/>
                    </div>
                </div>
            </div>
        </div>
        </Theme>
    );
}

export default HomePage