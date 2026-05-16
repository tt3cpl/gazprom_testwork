import './styles/main.css'
import HomePage from './pages/Home';
import UsersPage from './pages/Users';
import UserDetailsPage from './pages/UserDetails';
import PostsPage from './pages/Posts';
import PostDetailsPage from './pages/PostDetails';
import Test from './pages/test'
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import type { RootState } from './redux/store/store';

function App() {
  const accessToken = useSelector((state: RootState) => state.appSlice.accessToken);

  if (!accessToken) {
    return <HomePage />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserDetailsPage />} />
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/posts/:id" element={<PostDetailsPage />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;

