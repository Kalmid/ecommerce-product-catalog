import React, { useState, useEffect } from 'react';
import API from '../services/api';
import '../styles.css';

function AddCategory() {
  const [category, setCategory] = useState('');
  const [, setCategories] = useState([]);

  useEffect(() => {
  API.get('/categories')
    .then((res) => setCategories(res.data))
    .catch((err) => console.error(err));
  }, []);


  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post('/categories', { name: category });
      alert('Category added!');
      setCategory('');
    } catch (err) {
      alert('Error adding category');
    }
  };

  return (
    <div className="add-category-container">
      <h2 className="">Add New Category</h2>
      <form onSubmit={handleAdd} className="add-category-form">
        <input
          type="text"
          placeholder="Category Name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="add-category-input"
        />
        <button type="submit" className="add-category-button">
          Add
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
