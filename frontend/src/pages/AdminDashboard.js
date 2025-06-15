//admindashboard
import React, { useEffect, useState, useCallback } from 'react';
import API from '../services/api';
import '../styles.css';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', imageUrl: '' });
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await API.get(`/products?search=${search}`);
      setProducts(res.data);
    } catch (err) {
      alert('Failed to fetch products');
    }
  }, [search]);

   useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ecommerce_uploads");
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dvowxfxtn/image/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setForm({ ...form, imageUrl: data.secure_url });
    } catch (err) {
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, form);
        alert('Product updated!');
      } else {
        await API.post('/products', form);
        alert('Product added!');
      }
      fetchProducts();
      setModalOpen(false);
      setEditingProduct(null);
      setForm({ name: '', description: '', price: '', category: '', imageUrl: '' });
    } catch {
      alert('Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Product Management</h2>

      {/* Search and Add Button */}
      <div className="admin-dashboard-header">
        <input
          type="text"
          placeholder="Search by name..."
          className="admin-dashboard-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchProducts()}
        />
        <button
          onClick={() => {
            setEditingProduct(null);
            setForm({ name: '', description: '', price: '', category: '', imageUrl: '' });
            setModalOpen(true);
          }}
          className="admin-dashboard-add-button"
        >
          + Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="admin-dashboard-table">
          <thead className="">
            <tr>
              <th className="">Image</th>
              <th className="">Name</th>
              <th className="">Price</th>
              <th className="">Category</th>
              <th className="">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td className="p-2 border">
                  {p.imageUrl && (
                    <img src={p.imageUrl} alt={p.name} className="admin-dashboard-img" />
                  )}
                </td>
                <td className="">{p.name}</td>
                <td className="">Rs. {p.price}</td>
                <td className="">{p.category}</td>
                <td className="">
                  <button
                    onClick={() => {
                      setEditingProduct(p);
                      setForm(p);
                      setModalOpen(true);
                    }}
                    className="admin-dashboard-action-btn admin-dashboard-edit"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="admin-dashboard-action-btn admin-dashboard-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '1rem', color: '#6b7280' }}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="admin-dashboard-modal-overlay">
          <div className="admin-dashboard-modal">
            <h3 className="">
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h3>
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={form.name}
                required
              />
              <input
                name="description"
                placeholder="Description"
                onChange={handleChange}
                value={form.description}
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                onChange={handleChange}
                value={form.price}
                required
              />
              <input
                name="category"
                placeholder="Category"
                onChange={handleChange}
                value={form.category}
                required
              />
              <input type="file" accept="image/*" onChange={handleImageUpload}/>
              <div className="admin-dashboard-modal-buttons">
                <button
                  type="submit"
                  className="admin-dashboard-save-btn"
                >
                  {editingProduct ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="admin-dashboard-cancel-btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;



