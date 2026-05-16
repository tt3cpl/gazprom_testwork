import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/store/store';
import { setSelectedPost, setSelectedPostComments, setIsLoading, setError } from '../redux/store/slices/appSlice';
import { apiService } from '../api/api';
import '../styles/main.css';
import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import { Text } from '@consta/uikit/Text';
import { Card } from '@consta/uikit/Card';
import { Button } from '@consta/uikit/Button';

function PostDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const post = useSelector((state: RootState) => state.appSlice.selectedPost);
    const comments = useSelector((state: RootState) => state.appSlice.selectedPostComments);
    const isLoading = useSelector((state: RootState) => state.appSlice.isLoading);
    const error = useSelector((state: RootState) => state.appSlice.error);

    useEffect(() => {
        const loadPost = async () => {
            dispatch(setIsLoading(true));
            dispatch(setError(null));

            try {
                if (id) {
                    const postData = await apiService.getPostById(parseInt(id));
                    dispatch(setSelectedPost(postData));
                    const commentsData = await apiService.getPostComments(parseInt(id));
                    dispatch(setSelectedPostComments(commentsData));
                }
            } catch (err) {
                dispatch(
                    setError('Ошибка при загрузке поста')
                );
            } finally {
                dispatch(setIsLoading(false));
            }
        };

        loadPost();

        return () => {
            dispatch(setSelectedPost(null));
            dispatch(setSelectedPostComments([]));
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

    if (error || !post) {
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
                        size="l"
                        view="alert">
                        {error || 'Пост не найден'}
                    </Text>

                    <Button
                        label="Вернуться к списку"
                        view="primary"
                        onClick={() => navigate('/posts')}/>
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
            onClick={() => navigate('/posts')}/>
            <div className="details-container">
                <Card
                verticalSpace="xl"
                horizontalSpace="xl">
                    <Text
                        size="3xl"
                        weight="bold"
                        style={{ marginBottom: '16px' }}>
                        {post.title}
                    </Text>
                    <Text
                        className="post-meta"
                        view="secondary"
                        size="s"
                        style={{ marginBottom: '32px' }}>
                        ID поста: {post.id}
                    </Text>
                        <div className="post-body">
                            <Text
                                size="xl"
                                weight="bold"
                                style={{ marginBottom: '16px' }}>
                                Содержание:
                            </Text>
                            <Text
                                size="m"
                                lineHeight="m">
                                {post.body}
                            </Text>
                        </div>
                </Card>
                
                <Card
                className="comments-section"
                verticalSpace="xl"
                horizontalSpace="xl">
                    <Text
                        className="comments-title"
                        size="2xl"
                        weight="bold"
                        style={{ marginBottom: '24px' }}>
                        Комментарии ({comments.length})
                    </Text>
                    {comments.length > 0 ? (
                    <div className="comments-list">
                        {comments.map((comment) => (
                        <Card
                            key={comment.id}
                            className="comment-item"
                            verticalSpace="l"
                            horizontalSpace="l"
                            style={{ marginBottom: '16px' }}>
                            <div className="comment-header">
                                <Text
                                    className="comment-name"
                                    size="m"
                                    weight="bold">
                                    {comment.name}
                                </Text>
                                <Text
                                    className="comment-email"
                                    view="secondary"
                                    size="s">
                                    {comment.email}
                                </Text>
                            </div>
                            <Text
                                className="comment-body"
                                size="m"
                                style={{ marginTop: '16px' }}>
                                {comment.body}
                            </Text>
                        </Card>
                        ))}
                    </div>
                ) : (
                    <Card
                    className="no-comments"
                    verticalSpace="l"
                    horizontalSpace="l">
                        <Text
                            view="secondary"
                            size="m">
                            Комментариев нет
                        </Text>
                    </Card>
                )}
            </Card>
        </div>
        </Theme>
    );
}

export default PostDetailsPage;