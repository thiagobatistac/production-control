import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchProducts,
  addProduct,
  editProduct,
  removeProduct,
  searchProductsByName
} from '../redux/slices/productsSlice';

function ProductsPage() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(state => state.products);

  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    price: ''
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      dispatch(fetchProducts());
      return;
    }
    dispatch(searchProductsByName(searchTerm));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setFormData({ name: '', price: '' });
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price || ''
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Product name is required');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert('Product price must be greater than zero');
      return;
    }

    const productToSave = {
      name: formData.name,
      price: parseFloat(formData.price)
    };

    try {
      if (editingProduct) {
        await dispatch(editProduct({ id: editingProduct.id, productData: productToSave })).unwrap();
      } else {
        await dispatch(addProduct(productToSave)).unwrap();
      }
      
      setShowForm(false);
      setFormData({ name: '', price: '' });
      setEditingProduct(null);
    } catch (err) {
      alert('Failed to save product: ' + (err.message || 'Unknown error'));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await dispatch(removeProduct(id)).unwrap();
    } catch (err) {
      alert('Failed to delete product: ' + (err.message || 'Unknown error'));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ name: '', price: '' });
    setEditingProduct(null);
  };

  if (loading && products.length === 0) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <div className="card">
        <h2>Products Management</h2>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={{ flex: 1, minWidth: '200px', padding: '0.5rem', fontSize: '1rem' }}
          />
          <button onClick={handleSearch} className="btn btn-secondary">
            Search
          </button>
          <button onClick={() => dispatch(fetchProducts())} className="btn btn-secondary">
            Clear
          </button>
          <button onClick={handleCreate} className="btn btn-primary">
            + New Product
          </button>
        </div>

        {showForm && (
          <div className="card" style={{ backgroundColor: '#f8f9fa' }}>
            <h3>{editingProduct ? 'Edit Product' : 'New Product'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="product-name">Product Name *</label>
                <input
                  id="product-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="product-price">Price (R$) *</label>
                <input
                  id="product-price"
                  type="number"
                  name="price"
                  value={formData.price}
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

        {products.length === 0 ? (
          <p>No products found. Create your first product!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price (R$)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td data-label="ID">{product.id}</td>
                  <td data-label="Name">{product.name}</td>
                  <td data-label="Price">R$ {parseFloat(product.price).toFixed(2)}</td>
                  <td data-label="Actions">
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