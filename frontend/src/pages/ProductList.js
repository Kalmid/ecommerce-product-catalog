import React, { useEffect, useState, useCallback } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import '../styles.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, ] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      const res = await API.get(`/products?search=${search}`);
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products');
    }
  }, [search]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    API.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);


  useEffect(() => {
    API.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

   const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="product-page">
      
       <div className="search-bar-container">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className=""
        >
          <option value="">All Categories</option>
            {categories.map((cat, index) => (
            <option key={index} value={cat.name || cat}>{cat.name || cat}</option>
            ))}
        </select>
      </div>

      <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No products found.</p>
        ) : (
        filteredProducts.map((p) => (
          <ProductCard key={p._id} product={p} onAddToCart={handleAddToCart}/>
        ))
      )}
      </div>
    </div>
  );
}

export default ProductList;


