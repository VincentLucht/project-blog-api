import './css/App.css';
import 'react-toastify/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './components/auth/AuthContextProvider';

import Header from './components/header/Header';

import Blogs from './components/blogs/Blogs';
import { BlogDetail } from './components/blogs/BlogDetail/BlogDetail';

import Login from './components/header/login/Login';
import Account from './components/account/Account';

import { ToastContainer } from 'react-toastify';
import NotFound from './components/partials/NotFound';
import BlogHub from './components/blogs/CreateBlog/BlogHub';
import EditBlog from './components/blogs/CreateBlog/EditBlog';

export const API_URL = 'http://localhost:3000';

export default function App() {
  return (
    <AuthContextProvider>
      <div className="flex min-h-screen flex-col">
        <header>
          <Header />
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/:id" element={<BlogDetail />} />
            <Route path="/hub" element={<BlogHub />} />
            <Route path="/hub/:id" element={<EditBlog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer></footer>

        <ToastContainer theme="dark" />
      </div>
    </AuthContextProvider>
  );
}
