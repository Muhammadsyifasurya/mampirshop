import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const CartPage: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    calculateTotal,
    setCartItems, // Mengakses setCartItems dari context
  } = useCart();

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Keranjang Anda kosong! Tambahkan produk terlebih dahulu.");
      return;
    }

    // Set checkout success
    setCheckoutSuccess(true);

    // Kosongkan keranjang setelah pembayaran berhasil
    setCartItems([]);

    // Reset checkout success message setelah 3 detik
    setTimeout(() => {
      setCheckoutSuccess(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-50 p-6 w-[50%] mt-[100px] rounded-xl">
        <h2 className="text-4xl font-bold text-center text-[#333] mb-6">
          Keranjang Anda
        </h2>

        {cartItems.length === 0 ? (
          <div className="flex flex-col justify-center items-center mt-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h18M3 3l9 18 9-18"
              />
            </svg>
            <p className="text-center text-xl text-gray-500 mt-4">
              Keranjang Anda masih kosong.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-lg text-[#333]">
                      {item.title}
                    </h4>
                    <p className="text-gray-600">$ {item.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 12h12"
                          />
                        </svg>
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m6-6H6"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 font-bold hover:text-red-600 transition"
                >
                  Hapus
                </button>
              </div>
            ))}

            <div className="text-right font-semibold text-xl text-[#333] mb-6">
              <p>
                Total:{" "}
                <span className="text-green-600">$ {calculateTotal()}</span>
              </p>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
            >
              Checkout
            </button>
          </div>
        )}

        {checkoutSuccess && (
          <div className="fixed top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg z-50">
            <h3 className="text-3xl font-bold text-center text-green-600 mb-4">
              Pembayaran Berhasil!
            </h3>
            <p className="text-center text-gray-600">
              Terima kasih telah berbelanja dengan kami.
            </p>
            <div className="text-center mt-6">
              <button
                onClick={() => setCheckoutSuccess(false)} // Hide success popup
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
