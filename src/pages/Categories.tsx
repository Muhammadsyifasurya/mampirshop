import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useCart } from "../context/CartContext";
import Popup from "../components/Popup";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId: number;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [filterTitle, setFilterTitle] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(
        "https://api.escuelajs.co/api/v1/categories"
      );
      setCategories(response.data);
    } catch (err) {
      setError("Failed to fetch categories");
      console.log(err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    let url = "https://api.escuelajs.co/api/v1/products?";

    // Filter by title
    if (filterTitle) {
      url += `title=${filterTitle}&`;
    }

    // Filter by category
    if (selectedCategory) {
      url += `categoryId=${selectedCategory}&`;
    }

    // Filter by price range
    url += `price_min=${minPrice}&price_max=${maxPrice}`;

    try {
      const response = await axios.get<Product[]>(url);
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filterTitle, selectedCategory, minPrice, maxPrice]);

  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleShowPopup = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000); // Popup akan hilang setelah 3 detik
  };

  const { addToCart } = useCart(); // Mengambil addToCart dari CartContext

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0], // Ambil gambar pertama sebagai representasi produk
    });
    handleShowPopup();
  };

  return (
    <div className="pt-[100px]">
      <Popup
        message="You successfully added product to your cart!"
        isVisible={showPopup}
        onClose={() => setShowPopup(false)}
      />
      <h2 className="text-4xl font-bold text-center mb-6">Categories</h2>
      <div className="mb-6 flex flex-wrap justify-center gap-11">
        {/* Filter by title */}
        <input
          type="text"
          placeholder="Search by title..."
          className="p-2 border border-gray-300 rounded"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
        />

        {/* Filter by category */}
        <select
          title="category"
          className="p-2 border border-gray-300 rounded"
          value={selectedCategory ?? ""}
          onChange={(e) => setSelectedCategory(Number(e.target.value))}
        >
          <option value="">All Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Filter by price range */}
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Min Price"
            className="p-2 border border-gray-300 rounded"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="p-2 border border-gray-300 rounded"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
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
      {error && (
        <div className="flex flex-col justify-center items-center p-6 bg-red-100 rounded-lg shadow-md border border-red-300 max-w-md mx-auto mt-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-500 animate-shake"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.29 3.86L1.82 18a1.37 1.37 0 001.2 2h17.96a1.37 1.37 0 001.2-2L13.71 3.86a1.37 1.37 0 00-2.42 0zM12 9v4m0 4h.01"
            />
          </svg>
          <h2 className="text-xl font-semibold text-red-700 mt-4">
            Oops, ada kesalahan!
          </h2>
          <p className="text-sm text-red-600 mt-2 text-center">{error}</p>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-10 mx-52">
        {products.map((product) => (
          <div key={product.id} className="relative">
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
    </div>
  );
};

export default Categories;
