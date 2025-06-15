//productlist
import React, { useEffect, useState } from 'react';
import API from '../services/api';
import ProductCard from '../components/ProductCard';
import '../styles.css';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-600 text-center mt-4">Product Catalog</h2>
      <div className="product-list">
      <ul className="product-list">
        {products.map((p) => (
          <ProductCard key={p._id} product={p}/>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default ProductList;


