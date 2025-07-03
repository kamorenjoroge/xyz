// components/MobileMenu.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiShoppingBag,
  FiClipboard,
  FiShoppingCart,
} from "react-icons/fi";

const MobileMenu = () => {
  const pathname = usePathname();

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-3">
        <Link
          href="/"
          className={`flex flex-col items-center transition ${
            isActive("/")
              ? "text-primary"
              : "text-gray-600 hover:text-primary"
          }`}
        >
          <FiHome className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center transition ${
            isActive("/shop")
              ? "text-primary"
              : "text-gray-600 hover:text-primary"
          }`}
        >
          <FiShoppingBag className="h-6 w-6" />
          <span className="text-xs mt-1">Shop</span>
        </Link>

        <Link
          href="/orders"
          className={`flex flex-col items-center transition ${
            isActive("/orders")
              ? "text-primary"
              : "text-gray-600 hover:text-primary"
          }`}
        >
          <FiClipboard className="h-6 w-6" />
          <span className="text-xs mt-1">Orders</span>
        </Link>

        <Link
          href="/checkout"
          className={`flex flex-col items-center transition ${
            isActive("/checkout")
              ? "text-primary"
              : "text-gray-600 hover:text-primary"
          }`}
        >
          <FiShoppingCart className="h-6 w-6" />
          <span className="text-xs mt-1">Checkout</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;