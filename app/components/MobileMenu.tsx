// components/MobileMenu.tsx
import Link from "next/link";
import {
  FiHome,
  FiShoppingBag,
  FiClipboard,
  FiShoppingCart,
} from "react-icons/fi";

const MobileMenu = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-light shadow-lg border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-3">
        <Link
          href="/"
          className="flex flex-col items-center text-dark hover:text-primary transition"
        >
          <FiHome className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          href="/shop"
          className="flex flex-col items-center text-dark hover:text-primary transition"
        >
          <FiShoppingBag className="h-6 w-6" />
          <span className="text-xs mt-1">Shop</span>
        </Link>
        <Link
          href="/orders"
          className="flex flex-col items-center text-dark hover:text-primary transition"
        >
          <FiClipboard className="h-6 w-6" />
          <span className="text-xs mt-1">Orders</span>
        </Link>

        <Link
          href="/checkout"
          className="flex flex-col items-center text-dark hover:text-primary transition"
        >
          <FiShoppingCart className="h-6 w-6" />
          <span className="text-xs mt-1">Checkout</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
