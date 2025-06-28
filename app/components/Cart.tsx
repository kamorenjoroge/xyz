"use client";
import { FiShoppingCart, FiX } from "react-icons/fi";
import { useState } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import Image from "next/image";
import Link from "next/link";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, getTotalItems, getTotalPrice } = useCartStore();

  const itemCount = getTotalItems();
  const totalAmount = getTotalPrice();

  const toggleCart = () => setIsOpen(!isOpen);
  const closeCart = () => setIsOpen(false);

  return (
    <div className="relative">
      <button
        className="relative text-dark hover:text-primary transition flex items-center"
        onClick={toggleCart}
      >
        <FiShoppingCart className="h-6 w-6" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-4 w-72 bg-white rounded-md shadow-lg z-50 border border-primary">
          {/* Dropdown Header with Close Button */}
          <div className="flex justify-between items-center p-3 bg-primary/20 border-b">
            <h3 className="font-medium text-gray-900">
              Your Cart ({itemCount})
            </h3>
            <button
              onClick={closeCart}
              className="text-gray-500 hover:text-dark transition-colors"
              aria-label="Close cart"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4">
            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                Your cart is empty
              </p>
            ) : (
              <>
                <div className="max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center py-2 border-b border-gray-900"
                    >
                      <Image
                        width={1000}
                        height={1000}
                        src={item.image}
                        alt={item.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                      <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {item.quantity} × KES {item.price.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-900 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-2 pt-3">
                  <div className="flex justify-between font-medium text-gray-900">
                    <span>Subtotal:</span>
                    <span>KES {totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Link href="/checkout">
                      <button className="flex-1 bg-primary text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-dark transition">
                        Check Out
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
