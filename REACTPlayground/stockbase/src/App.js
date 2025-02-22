import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import StockFavoritesPage from './StockFavoritesPage';
import StockExaminer from './StockExaminer';
import TestStockExaminer from './TestStockExaminer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/stockexaminer/:symbol" element={<StockExaminer />} />
        <Route path="/stockfavorites" element={< StockFavoritesPage/>} />
        <Route path="/teststockexaminer/:symbol" element={<TestStockExaminer />} />
      </Routes>
    </Router>
  );
}

export default App;


