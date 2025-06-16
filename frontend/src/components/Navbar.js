import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../services/auth';
import '../styles.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  //const role = getUserRole();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">My Store</Link>
      </div>
      <div className="navbar-links"> 
        <Link to="/" className="nav-link">Products</Link>{" | "}
        {!isAuthenticated() ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>{" | "}
            <Link to="/register" className="nav-link">Register</Link>
          </>
        ) : (
          <>
            <Link to="/admin/products" className="nav-link">Admin</Link>{" | "}

            <Link to="/admin/add-category" className="nav-link">Add Category</Link>{" | "}

            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
        
      </div>
    </nav>
  );
}

export default Navbar;
