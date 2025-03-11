import React from 'react';
import Home from './pages/Home';
import BookPage from './pages/BookPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:isbn" element={<BookPage />} />
    </Routes>
  );
}

export default App;
