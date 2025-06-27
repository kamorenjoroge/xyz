"use client"
import { FiShoppingCart, FiX, FiChevronRight } from "react-icons/fi";
import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/lib/store/cartStore";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    cart: cartItems,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  const cartCount = getTotalItems();
  const subtotal = getTotalPrice();
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="relative">
      {/* Cart Icon Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-dark hover:text-primary transition"
        aria-label="Cart"
      >
        <FiShoppingCart className="h-6 w-6" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-warning text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/30 z-40 md:bg-primary/10 md:bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Cart Content - Updated for mobile responsiveness */}
          <div className="fixed inset-0 top-0 h-screen w-screen bg-white z-50 overflow-y-auto md:inset-auto md:right-4 md:top-16 md:h-auto md:w-full md:max-w-md md:rounded-lg md:shadow-xl">
            {/* Header with close button */}
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center z-10">
              <h2 className="text-lg font-bold text-dark">Your Cart ({cartCount})</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-dark"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-4">
              {cartItems.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-4">
                      <div className="flex gap-3 sm:gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-16 w-16 rounded-md object-cover sm:h-20 sm:w-20"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-dark truncate">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-warning flex-shrink-0 ml-2"
                            >
                              <FiX className="h-4 w-4" />
                            </button>
                          </div>
                          {item.color && (
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              Color: {item.color.join(', ')}
                            </p>
                          )}
                          <div className="mt-2 flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="px-2 text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                            <p className="text-sm font-medium text-dark">
                              KES {(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Cart Summary - Sticky at bottom on mobile */}
            {cartItems.length > 0 && (
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 md:static">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>KES {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>KES {shipping.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-dark">
                    <span>Total</span>
                    <span>KES {total.toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-primary hover:bg-primary/90 text-white rounded-md font-medium">
                  Proceed to Checkout <FiChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;