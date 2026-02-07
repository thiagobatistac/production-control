import React, { useState } from 'react';
import { getProductionSuggestions } from '../api/api';

function ProductionSuggestionPage() {
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // load production suggestions
  const loadSuggestions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProductionSuggestions();
      setSuggestions(response.data);
    } catch (err) {
      setError('Failed to load production suggestions');
      console.error(err);
      setSuggestions(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="card">
        <h2>Production Suggestions</h2>
        <p>Calculate what can be produced with available raw materials stock</p>
        
        <button 
          onClick={loadSuggestions} 
          className="btn btn-primary"
          disabled={loading}
          style={{ marginBottom: '1rem' }}
        >
          {loading ? 'Calculating...' : '🔄 Calculate Production Suggestions'}
        </button>

        {error && (
          <div className="error" style={{ marginTop: '1rem' }}>
            {error}
          </div>
        )}

        {suggestions && (
          <>
            {/* summary card */}
            <div 
              className="card" 
              style={{ 
                backgroundColor: '#28a745', 
                color: 'white',
                marginTop: '1rem'
              }}
            >
              <h3 style={{ margin: 0, marginBottom: '0.5rem' }}>Total Production Value</h3>
              <h1 style={{ margin: 0, fontSize: '2.5rem' }}>
                R$ {parseFloat(suggestions.totalValue).toFixed(2)}
              </h1>
            </div>

            {/* suggestions list */}
            {suggestions.suggestions.length === 0 ? (
              <div 
                className="card" 
                style={{ 
                  backgroundColor: '#ffc107', 
                  color: '#000',
                  marginTop: '1rem'
                }}
              >
                <h3>⚠️ No Products Can Be Produced</h3>
                <p>
                  There are no raw materials available in stock to produce any products.
                  Please add more raw materials to enable production.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>
                  Suggested Production ({suggestions.suggestions.length} {suggestions.suggestions.length === 1 ? 'product' : 'products'})
                </h3>
                
                <table>
                  <thead>
                    <tr>
                      <th>Priority</th>
                      <th>Product</th>
                      <th>Unit Value (R$)</th>
                      <th>Quantity to Produce</th>
                      <th>Total Value (R$)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suggestions.suggestions.map((suggestion, index) => (
                      <tr key={suggestion.productId}>
                        <td>
                          <span 
                            style={{
                              backgroundColor: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : index === 2 ? '#cd7f32' : '#e0e0e0',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '4px',
                              fontWeight: 'bold'
                            }}
                          >
                            #{index + 1}
                          </span>
                        </td>
                        <td>
                          <strong>{suggestion.productName}</strong>
                        </td>
                        <td>
                          R$ {parseFloat(suggestion.productValue).toFixed(2)}
                        </td>
                        <td>
                          <span 
                            style={{
                              fontSize: '1.2rem',
                              fontWeight: 'bold',
                              color: '#007bff'
                            }}
                          >
                            {suggestion.quantity}
                          </span>
                          {suggestion.quantity === 1 ? ' unit' : ' units'}
                        </td>
                        <td>
                          <strong style={{ color: '#28a745' }}>
                            R$ {parseFloat(suggestion.totalValue).toFixed(2)}
                          </strong>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* explanation */}
                <div 
                  className="card" 
                  style={{ 
                    backgroundColor: '#e7f3ff', 
                    marginTop: '2rem',
                    border: '1px solid #007bff'
                  }}
                >
                  <h4 style={{ marginTop: 0 }}>ℹ️ How it works</h4>
                  <ul style={{ marginBottom: 0, paddingLeft: '1.5rem' }}>
                    <li>Products are prioritized by <strong>highest value first</strong></li>
                    <li>The algorithm calculates the maximum quantity of each product that can be produced</li>
                    <li>Raw materials are consumed virtually as each product is calculated</li>
                    <li>Products that share raw materials are optimized for maximum total value</li>
                    <li>The total production value shows how much revenue can be generated</li>
                  </ul>
                </div>
              </>
            )}
          </>
        )}

        {!suggestions && !loading && !error && (
          <div 
            className="card" 
            style={{ 
              backgroundColor: '#f8f9fa',
              textAlign: 'center',
              marginTop: '2rem'
            }}
          >
            <h3>👆 Click the button above to calculate production suggestions</h3>
            <p>
              The system will analyze available raw materials stock and suggest 
              which products can be manufactured, prioritizing by highest value.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductionSuggestionPage;