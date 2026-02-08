import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/slices/productsSlice';
import { fetchRawMaterials } from '../redux/slices/rawMaterialsSlice';
import { 
  getCompositionsByProduct,
  addComposition,
  updateComposition,
  deleteComposition
} from '../api/api';

function ProductCompositionPage() {
  // redux state
  const dispatch = useDispatch();
  const { items: products } = useSelector(state => state.products);
  const { items: rawMaterials } = useSelector(state => state.rawMaterials);

  // local state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [compositions, setCompositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingComposition, setEditingComposition] = useState(null);
  
  // form fields
  const [formData, setFormData] = useState({
    rawMaterialId: '',
    quantityRequired: ''
  });

  // load products and raw materials on mount
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  // load compositions for selected product
  const loadCompositions = async (productId) => {
    try {
      setLoading(true);
      const response = await getCompositionsByProduct(productId);
      setCompositions(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load compositions');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // handle product selection
  const handleSelectProduct = (productId) => {
    const product = products.find(p => p.id === parseInt(productId));
    setSelectedProduct(product);
    if (product) {
      loadCompositions(product.id);
    } else {
      setCompositions([]);
    }
    setShowForm(false);
  };

  // handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // open form to add composition
  const handleAdd = () => {
    if (!selectedProduct) {
      alert('Please select a product first');
      return;
    }
    setEditingComposition(null);
    setFormData({ rawMaterialId: '', quantityRequired: '' });
    setShowForm(true);
  };

  // open form to edit composition
  const handleEdit = (composition) => {
    setEditingComposition(composition);
    setFormData({
      rawMaterialId: composition.rawMaterialId,
      quantityRequired: composition.quantityRequired
    });
    setShowForm(true);
  };

  // submit form (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate
    if (!formData.rawMaterialId) {
      alert('Please select a raw material');
      return;
    }
    if (!formData.quantityRequired || parseFloat(formData.quantityRequired) <= 0) {
      alert('Quantity required must be greater than zero');
      return;
    }

    try {
      if (editingComposition) {
        // update - only quantity can change
        await updateComposition(editingComposition.id, {
          rawMaterialId: editingComposition.rawMaterialId,
          quantityRequired: formData.quantityRequired
        });
      } else {
        // add
        await addComposition(selectedProduct.id, formData);
      }
      
      setShowForm(false);
      setFormData({ rawMaterialId: '', quantityRequired: '' });
      setEditingComposition(null);
      loadCompositions(selectedProduct.id);
    } catch (err) {
      alert('Failed to save composition: ' + (err.response?.data?.message || err.message));
      console.error(err);
    }
  };

  // delete composition
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this raw material from the product?')) {
      return;
    }

    try {
      await deleteComposition(id);
      loadCompositions(selectedProduct.id);
    } catch (err) {
      alert('Failed to delete composition: ' + (err.response?.data?.message || err.message));
      console.error(err);
    }
  };

  // cancel form
  const handleCancel = () => {
    setShowForm(false);
    setFormData({ rawMaterialId: '', quantityRequired: '' });
    setEditingComposition(null);
  };

  if (loading && compositions.length === 0 && selectedProduct) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <div className="card">
        <h2>Product Composition</h2>
        <p>Associate raw materials with products and define required quantities</p>
        
        {/* product selector */}
        <div className="form-group">
          <label>Select Product *</label>
          <select 
            value={selectedProduct?.id || ''} 
            onChange={(e) => handleSelectProduct(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          >
            <option value="">-- Select a product --</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} (R$ {parseFloat(product.value).toFixed(2)})
              </option>
            ))}
          </select>
        </div>

        {selectedProduct && (
          <>
            <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '4px', marginBottom: '1rem' }}>
              <h3>Selected Product: {selectedProduct.name}</h3>
              <p>Value: R$ {parseFloat(selectedProduct.value).toFixed(2)}</p>
            </div>

            <button onClick={handleAdd} className="btn btn-primary" style={{ marginBottom: '1rem' }}>
              + Add Raw Material
            </button>

            {/* form */}
            {showForm && (
              <div className="card" style={{ backgroundColor: '#f8f9fa' }}>
                <h3>{editingComposition ? 'Edit Composition' : 'Add Raw Material to Product'}</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Raw Material *</label>
                    <select
                      name="rawMaterialId"
                      value={formData.rawMaterialId}
                      onChange={handleInputChange}
                      disabled={editingComposition !== null}
                      style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
                      required
                    >
                      <option value="">-- Select a raw material --</option>
                      {rawMaterials.map(rm => (
                        <option key={rm.id} value={rm.id}>
                          {rm.name} (Stock: {parseFloat(rm.stockQuantity).toFixed(2)})
                        </option>
                      ))}
                    </select>
                    {editingComposition && (
                      <small style={{ color: '#6c757d' }}>
                        Raw material cannot be changed when editing. Delete and create a new one if needed.
                      </small>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Quantity Required *</label>
                    <input
                      type="number"
                      name="quantityRequired"
                      value={formData.quantityRequired}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      step="0.01"
                      min="0.01"
                      required
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn btn-success">
                      {editingComposition ? 'Update' : 'Add'}
                    </button>
                    <button type="button" onClick={handleCancel} className="btn btn-secondary">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* compositions table */}
            {compositions.length === 0 ? (
              <p>No raw materials associated with this product yet. Add the first one!</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Raw Material</th>
                    <th>Quantity Required</th>
                    <th>Available Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {compositions.map(composition => {
                    const rawMaterial = rawMaterials.find(rm => rm.id === composition.rawMaterialId);
                    const stock = rawMaterial ? rawMaterial.stockQuantity : 0;
                    const canProduce = Math.floor(stock / composition.quantityRequired);
                    
                    return (
                      <tr key={composition.id}>
                        <td>{composition.rawMaterialName}</td>
                        <td>{parseFloat(composition.quantityRequired).toFixed(2)}</td>
                        <td>
                          {parseFloat(stock).toFixed(2)}
                          <br />
                          <small style={{ color: canProduce > 0 ? '#28a745' : '#dc3545' }}>
                            (Can produce: {canProduce} units)
                          </small>
                        </td>
                        <td>
                          <button 
                            onClick={() => handleEdit(composition)} 
                            className="btn btn-primary"
                            style={{ marginRight: '0.5rem' }}
                          >
                            Edit Quantity
                          </button>
                          <button 
                            onClick={() => handleDelete(composition.id)} 
                            className="btn btn-danger"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductCompositionPage;