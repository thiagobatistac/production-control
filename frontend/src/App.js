import React, { useEffect, useState } from 'react';
import { getProducts } from './api/api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetch products from backend
    getProducts()
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Production Control System</h1>
        <h2>Products</h2>
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <ul>
            {products.map(product => (
              <li key={product.id}>
                {product.name} - R$ {product.value}
              </li>
            ))}
          </ul>
        )}
      </header>
    </div>
  );
}

export default App;