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
  // redux state
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(state => state.products);

  // local state
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
    dispatch(fetchProducts());
  }, [dispatch]);

  // handle search
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      dispatch(fetchProducts());
      return;
    }
    dispatch(searchProductsByName(searchTerm));
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
        await dispatch(editProduct({ id: editingProduct.id, productData: formData })).unwrap();
      } else {
        // create
        await dispatch(addProduct(formData)).unwrap();
      }
      
      setShowForm(false);
      setFormData({ name: '', value: '' });
      setEditingProduct(null);
    } catch (err) {
      alert('Failed to save product: ' + (err.message || 'Unknown error'));
    }
  };

  // delete product
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

  // cancel form
  const handleCancel = () => {
    setShowForm(false);
    setFormData({ name: '', value: '' });
    setEditingProduct(null);
  };

  if (loading && products.length === 0) return <div className="loading">Loading...</div>;
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
          <button onClick={() => dispatch(fetchProducts())} className="btn btn-secondary">
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