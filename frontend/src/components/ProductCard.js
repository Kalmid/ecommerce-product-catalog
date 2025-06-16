import React from 'react';
import '../styles.css';

function ProductCard({ product, onDelete, onAddToCart }) {
  return (
    <div className="product-card">
      <h3>{product.imageUrl && (
        <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"/>
      )}</h3>
      <h3 className="product-title">{product.name}</h3>
      <p className="product-desc">{product.description}</p>
      <p className="product-price"><strong>Rs. {product.price}</strong></p>
      {/* <p className="product-category">Category: {product.category}</p> */}
      <div className="product-actions">
        {onAddToCart && (
        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      )}
      {/* {onDelete && (
        <button onClick={() => onDelete(product._id)} className="delete-btn">
          Delete
        </button>
      )} */}
      </div>
    </div>
  );
}

export default ProductCard;
