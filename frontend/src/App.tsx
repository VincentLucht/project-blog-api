import './css/App.css';
import 'react-toastify/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './components/auth/AuthContextProvider';

import Header from './components/header/Header';

import Blogs from './components/blogs/Blogs';
import { BlogDetail } from './components/blogs/BlogDetail/BlogDetail';

import SignUp from './components/auth/user/SignUp';
import Login from './components/header/login/Login';
import Account from './components/account/Account';

import { ToastContainer } from 'react-toastify';
import NotFound from './components/partials/NotFound';
import BlogHub from './components/blogs/CreateBlog/BlogHub';
import EditBlog from './components/blogs/CreateBlog/EditBlog';
import Help from './components/blogs/CreateBlog/edit components/Help';

export const API_URL = import.meta.env.VITE_API_URL;

export default function App() {
  return (
    <AuthContextProvider>
      <div className="flex min-h-screen flex-col">
        <header className="fixed z-50 w-full bg-blue-600 p-4 bottom-border-shadow">
          <Header />
        </header>

        <main className="mt-20 p-4 df sm:mt-28">
          <div className="w-full max-w-7xl px-8">
            <Routes>
              <Route path="/" element={<Blogs />} />
              <Route path="/hub" element={<BlogHub />} />
              <Route path="/hub/:id" element={<EditBlog />} />
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/account" element={<Account />} />
              <Route path="/:id" element={<BlogDetail />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>

        <footer></footer>

        <ToastContainer
          theme="dark"
          position="top-center"
          className="toast-small-screen"
        />
      </div>
    </AuthContextProvider>
  );
}
