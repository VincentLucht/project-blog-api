import './css/App.css';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './components/auth/AuthContextProvider';

import Blogs from './components/blogs/Blogs';
import Header from './components/header/Header';
import Login from './components/header/login/Login';
import Account from './components/account/Account';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

export const API_URL = 'http://localhost:3000';

export default function App() {
  return (
    <AuthContextProvider>
      <div className="flex min-h-screen flex-col">
        <header>
          <Header />
        </header>

        <main className="flex flex-grow items-center justify-center">
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element="Not found" />
          </Routes>
        </main>

        <footer></footer>

        <ToastContainer theme="dark" />
      </div>
    </AuthContextProvider>
  );
}
