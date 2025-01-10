// src/pages/ProductDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get<Product>(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      setProduct(response.data);
    } catch (err) {
      setError("Failed to fetch product details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center text-xl text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  if (!product) {
    return (
      <p className="text-center text-xl text-gray-500">Product not found</p>
    );
  }

  return (
    <section className="pt-[200px]">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-96 object-cover rounded mb-4"
        />
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-xl text-gray-700 mb-4">$ {product.price}</p>
        <p className="text-gray-600">{product.description}</p>
      </div>
    </section>
  );
};

export default DetailPage;
