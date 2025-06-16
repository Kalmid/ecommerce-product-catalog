import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import AddCategory from './pages/AddCategory';
import "./styles.css";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/admin/products' element={<AdminDashboard />} />
        <Route path="/admin/add-category" element={<AddCategory />} />
      </Routes>
    </Router>
  );
}

export default App;





