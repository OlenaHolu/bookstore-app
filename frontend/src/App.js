import React from 'react';
import './App.css';
import Home from './pages/Home';
import BookPage from './pages/BookPage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:isbn" element={<BookPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
