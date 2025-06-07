// components/Footer.tsx
import Link from 'next/link';
import { AiFillTikTok } from 'react-icons/ai';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-dark font-bold text-xl">X</span>
              </div>
              <span className="text-xl font-bold">XYZ Machine</span>
            </div>
            <p className="text-gray-300">
              Premium industrial machinery solutions for your business needs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition">
                <FiFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition">
                <FiTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition">
                <FiInstagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition">
                <AiFillTikTok className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-primary transition">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-primary transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-primary transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products/cnc-machines" className="text-gray-300 hover:text-primary transition">
                  CNC Machines
                </Link>
              </li>
              <li>
                <Link href="/products/lathes" className="text-gray-300 hover:text-primary transition">
                  Lathes
                </Link>
              </li>
              <li>
                <Link href="/products/milling-machines" className="text-gray-300 hover:text-primary transition">
                  Milling Machines
                </Link>
              </li>
              <li>
                <Link href="/products/grinders" className="text-gray-300 hover:text-primary transition">
                  Grinders
                </Link>
              </li>
              <li>
                <Link href="/products/accessories" className="text-gray-300 hover:text-primary transition">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <FiMapPin className="h-5 w-5 mt-0.5 text-primary" />
                <p className="text-gray-300">123 Industrial Park, Machine City, MC 12345</p>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="h-5 w-5 text-primary" />
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="h-5 w-5 text-primary" />
                <p className="text-gray-300">info@xyzmachine.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} XYZ Machine. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-primary text-sm transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-primary text-sm transition">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-primary text-sm transition">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;