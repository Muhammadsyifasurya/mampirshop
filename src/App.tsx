// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import AppRoutes from "./Routes/AppRoutes";

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <div>
          <AppRoutes />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
