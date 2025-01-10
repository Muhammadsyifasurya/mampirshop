// src/routes/AppRoutes.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/HomePage";
import Categories from "../pages/Categories";
import Cart from "../pages/CartPage";
import Products from "../components/Products";
import DetailPage from "../pages/DetailPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<DetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRoutes;
