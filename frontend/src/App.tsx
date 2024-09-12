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
        <header className="bottom-border-shadow fixed z-50 w-full bg-blue-600 p-4">
          <Header />
        </header>

        <main className="mt-20 p-4 df sm:mt-28">
          <div className="w-full max-w-7xl px-8">
            <Routes>
              <Route path="/" element={<Blogs />} />
              <Route path="/hub" element={<BlogHub />} />
              <Route path="/hub/:id" element={<EditBlog />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Account />} />
              <Route path="/:id" element={<BlogDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>

        <footer></footer>

        <ToastContainer theme="dark" />
      </div>
    </AuthContextProvider>
  );
}
