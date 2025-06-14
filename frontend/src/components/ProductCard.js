import React from 'react';

function ProductCard({ product, onDelete }) {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><strong>Rs. {product.price}</strong></p>
      <p>Category: {product.category}</p>
      {onDelete && (
        <button onClick={() => onDelete(product._id)} style={{ background: 'red', color: 'white' }}>
          Delete
        </button>
      )}
    </div>
  );
}

export default ProductCard;
