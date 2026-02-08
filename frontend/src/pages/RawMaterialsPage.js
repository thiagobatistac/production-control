import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchRawMaterials,
  addRawMaterial,
  editRawMaterial,
  removeRawMaterial,
  fetchRawMaterialsInStock
} from '../redux/slices/rawMaterialsSlice';

function RawMaterialsPage() {
  // redux state
  const dispatch = useDispatch();
  const { items: rawMaterials, loading, error } = useSelector(state => state.rawMaterials);

  // local state
  const [showForm, setShowForm] = useState(false);
  const [editingRawMaterial, setEditingRawMaterial] = useState(null);
  const [showOnlyInStock, setShowOnlyInStock] = useState(false);
  
  // form fields
  const [formData, setFormData] = useState({
    name: '',
    stockQuantity: ''
  });

  // load raw materials on mount
  useEffect(() => {
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  // load all raw materials
  const loadAllRawMaterials = () => {
    dispatch(fetchRawMaterials());
    setShowOnlyInStock(false);
  };

  // load only raw materials with stock
  const loadRawMaterialsInStock = () => {
    dispatch(fetchRawMaterialsInStock());
    setShowOnlyInStock(true);
  };

  // handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // open form to create new raw material
  const handleCreate = () => {
    setEditingRawMaterial(null);
    setFormData({ name: '', stockQuantity: '' });
    setShowForm(true);
  };

  // open form to edit raw material
  const handleEdit = (rawMaterial) => {
    setEditingRawMaterial(rawMaterial);
    setFormData({
      name: rawMaterial.name,
      stockQuantity: rawMaterial.stockQuantity
    });
    setShowForm(true);
  };

  // submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate
    if (!formData.name.trim()) {
      alert('Raw material name is required');
      return;
    }
    if (formData.stockQuantity === '' || parseFloat(formData.stockQuantity) < 0) {
      alert('Stock quantity must be zero or greater');
      return;
    }

    try {
      if (editingRawMaterial) {
        // update
        await dispatch(editRawMaterial({ id: editingRawMaterial.id, rawMaterialData: formData })).unwrap();
      } else {
        // create
        await dispatch(addRawMaterial(formData)).unwrap();
      }
      
      setShowForm(false);
      setFormData({ name: '', stockQuantity: '' });
      setEditingRawMaterial(null);
    } catch (err) {
      alert('Failed to save raw material: ' + (err.message || 'Unknown error'));
    }
  };

  // delete raw material
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this raw material?')) {
      return;
    }

    try {
      await dispatch(removeRawMaterial(id)).unwrap();
    } catch (err) {
      alert('Failed to delete raw material: ' + (err.message || 'Unknown error'));
    }
  };

  // cancel form
  const handleCancel = () => {
    setShowForm(false);
    setFormData({ name: '', stockQuantity: '' });
    setEditingRawMaterial(null);
  };

  if (loading && rawMaterials.length === 0) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <div className="card">
        <h2>Raw Materials Management</h2>
        
        {/* action buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button onClick={loadAllRawMaterials} className="btn btn-secondary">
            Show All
          </button>
          <button onClick={loadRawMaterialsInStock} className="btn btn-secondary">
            Show Only In Stock
          </button>
          <button onClick={handleCreate} className="btn btn-primary" style={{ marginLeft: 'auto' }}>
            + New Raw Material
          </button>
        </div>

        {showOnlyInStock && (
          <p style={{ color: '#007bff', marginBottom: '1rem' }}>
            Showing only raw materials with stock available
          </p>
        )}

        {/* form */}
        {showForm && (
          <div className="card" style={{ backgroundColor: '#f8f9fa' }}>
            <h3>{editingRawMaterial ? 'Edit Raw Material' : 'New Raw Material'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Raw Material Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter raw material name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Stock Quantity *</label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-success">
                  {editingRawMaterial ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={handleCancel} className="btn btn-secondary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* table */}
        {rawMaterials.length === 0 ? (
          <p>No raw materials found. Create your first raw material!</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Stock Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rawMaterials.map(rawMaterial => (
                <tr key={rawMaterial.id}>
                  <td>{rawMaterial.id}</td>
                  <td>{rawMaterial.name}</td>
                  <td>{parseFloat(rawMaterial.stockQuantity).toFixed(2)}</td>
                  <td>
                    <button 
                      onClick={() => handleEdit(rawMaterial)} 
                      className="btn btn-primary"
                      style={{ marginRight: '0.5rem' }}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(rawMaterial.id)} 
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

export default RawMaterialsPage;