// components/Navbar.tsx
import Link from 'next/link';
import Cart from './Cart';
import User from './User';

const Navbar = () => {
  return (
    <header className="bg-light shadow-sm border border-primary sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left section - Logo and name */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-dark font-bold text-xl">X</span>
          </div>
          <Link href="/" className="text-dark font-bold text-xl hover:text-primary transition">
            XYZ Machine
          </Link>
        </div>

        {/* Middle section - Navigation items */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-dark hover:text-primary font-medium transition">
            Home
          </Link>
          <Link href="/shop" className="text-dark hover:text-primary font-medium transition">
            Shop
          </Link>
          <Link href="/orders" className="text-dark hover:text-primary font-medium transition">
            Orders
          </Link>
          <Link href="/checkout" className="text-dark hover:text-primary font-medium transition">
            Checkout
          </Link>
        </nav>

        {/* Right section - Icons */}
        <div className="flex items-center space-x-6">
          <Cart/>
          <User/>
         
        </div>
      </div>
    </header>
  );
};

export default Navbar;
