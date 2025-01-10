import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

interface CardProps {
  title: string;
  images: string[];
  description: string;
  price: number;
  onLearnMore: string;
  onAddToCart: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  images,
  description,
  price,
  onLearnMore,
  onAddToCart,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg w-80 relative overflow-hidden border-[2px] border-[#9d9797]">
      <div className="bg-white overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-52 w-80"
          style={{
            transform: `translateX(-${currentImageIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={title}
              className="w-80 h-80 object-cover hover:scale-110 transition-all duration-300 ease-in-out transform"
            />
          ))}
        </div>
      </div>

      {/* Tombol Prev */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-24 text-center transform bg-gray-800 text-white py-[6px] px-[12px] bg-opacity-50 rounded-full transition-all duration-300 hover:bg-gray-700"
      >
        &lt;
      </button>

      {/* Tombol Next */}
      <button
        onClick={nextImage}
        className="absolute top-24 right-2 text-center transform bg-gray-800 text-white py-[6px] px-[12px] bg-opacity-50 rounded-full transition-all duration-300 hover:bg-gray-700"
      >
        &gt;
      </button>
      <div className="p-6">
        <div className="mb-4">
          <h3 className="font-bold text-lg text-gray-800">
            {title.slice(0, 20)}...
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            {description.slice(0, 38)}...
          </p>
          <p className="text-2xl font-extrabold text-indigo-600 mt-3">
            ${price}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            to={onLearnMore}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-600 transition duration-300"
          >
            Learn More
          </Link>
          <button
            onClick={onAddToCart}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 hover:bg-indigo-700 focus:outline-none"
          >
            <FaShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
