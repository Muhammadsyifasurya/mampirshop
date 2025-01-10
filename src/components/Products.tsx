import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Card from "../components/Card";
import Popup from "./Popup";
import "../index.css";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleShowPopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        "https://api.escuelajs.co/api/v1/products"
      );
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
    handleShowPopup();
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.scrollWidth / products.length;
      carouselRef.current.scrollTo({
        left: currentIndex * scrollAmount,
        behavior: "smooth",
      });
    }
  }, [currentIndex, products.length]);

  // Automatic sliding logic
  useEffect(() => {
    timerRef.current = setInterval(() => {
      handleNext();
    }, 4000); // 4 seconds

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [products.length]);

  return (
    <div className=" md:pt-[100px]">
      <Popup
        message="Item Berhasil ditambahkan ke keranjang !"
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
      />

      <h2 className="text-4xl font-bold text-center mb-6">Product List</h2>

      {loading && (
        <div className="flex justify-center items-center min-h-screen -mt-40">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce200"></div>
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce400"></div>
          </div>
          <p className="ml-4 text-lg font-semibold text-gray-600">
            Memuat konten...
          </p>
        </div>
      )}

      {error && <p className="text-center text-xl text-red-500">{error}</p>}

      <div className="relative">
        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="carousel-container bg-[#0a192f] overflow-hidden flex gap-20 rounded-3xl p-10 mx-80"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="carousel-item min-w-[300px] flex-shrink-0 translate-x-8"
            >
              <Card
                title={product.title}
                images={product.images}
                description={product.description}
                price={product.price}
                onLearnMore={`/product/${product.id}`}
                onAddToCart={() => handleAddToCart(product)}
              />
            </div>
          ))}
        </div>

        {/* Tombol Prev */}
        <button
          onClick={handlePrev}
          className="absolute left-[17%] bottom-[220px] text-white px-2 py-1 text-[60px] ml-1 rounded-full z-10"
        >
          &lt;
        </button>
        {/* Tombol Next */}
        <button
          onClick={handleNext}
          className="absolute right-[17%] bottom-[220px] text-white px-2 py-1 text-[60px] mr-2 rounded-full z-10"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Products;
