
import React, { useState, useEffect } from 'react';
import API from '../services/api';

function AdminDashboard() {
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '' });
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    API.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => alert(err.response?.data?.message));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await API.post('/products', form);
      setForm({ name: '', description: '', price: '', category: '' });
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.message || 'Create failed');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div>
      <h2>Admin: Manage Products</h2>
      <form onSubmit={handleCreate}>
        <input name="name" placeholder="Name" onChange={handleChange} value={form.name} required />
        <input name="description" placeholder="Description" onChange={handleChange} value={form.description} />
        <input name="price" placeholder="Price" type="number" onChange={handleChange} value={form.price} required />
        <input name="category" placeholder="Category" onChange={handleChange} value={form.category} required />
        <button type="submit">Add Product</button>
      </form>

      <ul>
        {products.map((p) => (
          <li key={p._id}>
            <strong>{p.name}</strong> - Rs. {p.price} ({p.category})
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
