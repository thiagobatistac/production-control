import React, { useState, useEffect } from 'react';
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  searchProducts 
} from '../api/api';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // form fields
  const [formData, setFormData] = useState({
    name: '',
    value: ''
  });

  // load products on mount
  useEffect(() => {
    loadProducts();
  }, []);

  // load all products
  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // handle search
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadProducts();
      return;
    }

    try {
      setLoading(true);
      const response = await searchProducts(searchTerm);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to search products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // open form to create new product
  const handleCreate = () => {
    setEditingProduct(null);
    setFormData({ name: '', value: '' });
    setShowForm(true);
  };

  // open form to edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      value: product.value
    });
    setShowForm(true);
  };

  // submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate
    if (!formData.name.trim()) {
      alert('Product name is required');
      return;
    }
    if (!formData.value || parseFloat(formData.value) <= 0) {
      alert('Product value must be greater than zero');
      return;
    }

    try {
      if (editingProduct) {
        // update
        await updateProduct(editingProduct.id, formData);
      } else {
        // create
        await createProduct(formData);
      }
      
      setShowForm(false);
      setFormData({ name: '', value: '' });
      setEditingProduct(null);
      loadProducts();
    } catch (err) {
      alert('Failed to save product: ' + (err.response?.data?.message || err.message));
      console.error(err);
    }
  };

  // delete product
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      alert('Failed to delete product: ' + (err.response?.data?.message || err.message));
      console.error(err);
    }
  };

  // cancel form
  const handleCancel = () => {
    setShowForm(false);
    setFormData({ name: '', value: '' });
    setEditingProduct(null);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <div className="card">
        <h2>Products Management</h2>
        
        {/* search bar */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={{ flex: 1, padding: '0.5rem', fontSize: '1rem' }}
          />
          <button onClick={handleSearch} className="btn btn-secondary">
            Search
          </button>
          <button onClick={loadProducts} className="btn btn-secondary">
            Clear
          </button>
          <button onClick={handleCreate} className="btn btn-primary">
            + New Product
          </button>
        </div>

        {/* form */}
        {showForm && (
          <div className="card" style={{ backgroundColor: '#f8f9fa' }}>
            <h3>{editingProduct ? 'Edit Product' : 'New Product'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Value (R$) *</label>
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0.01"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-success">
                  {editingProduct ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* table */}
        {products.length === 0 ? (
          <p>No products found. Create your first product!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Value (R$)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>R$ {parseFloat(product.value).toFixed(2)}</td>
                  <td>
                    <button 
                      onClick={() => handleEdit(product)} 
                      className="btn btn-primary"
                      style={{ marginRight: '0.5rem' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)} 
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;