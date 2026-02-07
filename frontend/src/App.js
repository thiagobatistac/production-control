import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import RawMaterialsPage from './pages/RawMaterialsPage';
import ProductCompositionPage from './pages/ProductCompositionPage';
import ProductionSuggestionPage from './pages/ProductionSuggestionPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <h1>Production Control System</h1>
        <ul className="nav-menu">
          <li><Link to="/">Products</Link></li>
          <li><Link to="/raw-materials">Raw Materials</Link></li>
          <li><Link to="/compositions">Product Composition</Link></li>
          <li><Link to="/suggestions">Production Suggestions</Link></li>
        </ul>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/raw-materials" element={<RawMaterialsPage />} />
          <Route path="/compositions" element={<ProductCompositionPage />} />
          <Route path="/suggestions" element={<ProductionSuggestionPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;