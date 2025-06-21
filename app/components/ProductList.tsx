// components/ProductList.tsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  FiFilter,
  FiHeart,
  FiShoppingCart,
  FiChevronDown,
  FiEye,
  FiSearch,
} from "react-icons/fi";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  brand: string;
  category: string;
  quantity: number;
  description: string;
  price: number;
  color: string[];
  image: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("Featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("/api/tools"),
          axios.get("/api/category"),
        ]);

        setProducts(productsRes.data.data);
        setFilteredProducts(productsRes.data.data);
        setCategories(categoriesRes.data.data);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort products
  const handleFilter = () => {
    let filtered = products;

    // Category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Price filter
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter((product) => {
        const min = priceRange.min ? parseInt(priceRange.min) : 0;
        const max = priceRange.max ? parseInt(priceRange.max) : Infinity;
        return product.price >= min && product.price <= max;
      });
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case "Price: Low to High":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      default:
        // Featured - no sorting
        break;
    }

    setFilteredProducts(filtered);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  if (loading) {
    return (
      <section className="bg-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-light min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-light min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Industrial Machinery Catalog
          </h1>
          <p className="text-gray-600 text-lg">
            Professional-grade machinery for your industrial needs
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-6">
                  <FiFilter className="mr-2" /> Filters
                </h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === "All"}
                        onChange={() => setSelectedCategory("All")}
                        className="mr-3 text-primary focus:ring-primary"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900 transition">
                        All
                      </span>
                    </label>
                    {categories.map((category) => (
                      <label
                        key={category._id}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.name}
                          onChange={() => setSelectedCategory(category.name)}
                          className="mr-3 text-primary focus:ring-primary"
                        />
                        <span className="text-gray-700 group-hover:text-gray-900 transition">
                          {category.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">
                    Price Range
                  </h4>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, min: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) =>
                        setPriceRange({ ...priceRange, max: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Sort By</h4>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none w-full p-3 border border-gray-300 rounded-lg pr-10 focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option>Featured</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                  </div>
                </div>

                <button
                  onClick={handleFilter}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              {/* Left side: Heading + Category */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <h2 className="text-xl font-semibold text-gray-900">
                  Showing {filteredProducts.length} products
                </h2>
                {selectedCategory !== "All" && (
                  <span className="bg-primary/10 px-3 py-1 rounded-full text-sm text-dark">
                    {selectedCategory}
                  </span>
                )}
              </div>

              {/* Right side: Search Bar */}
              <div className="w-full sm:w-auto">
                <div className="relative max-w-md">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search machinery..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleFilter()}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search term
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden"
                  >
                    <div className="relative h-48 bg-gray-50">
                      {product.image.length > 0 && (
                        <Image
                          src={product.image[0]}
                          alt={product.name}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                      )}

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleFavorite(product._id)}
                          className={`p-2 rounded-full shadow-lg transition-colors ${
                            favorites.includes(product._id)
                              ? "bg-red-500 text-white"
                              : "bg-white text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          <FiHeart
                            className="h-4 w-4"
                            fill={
                              favorites.includes(product._id)
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                        <button className="p-2 bg-white text-gray-600 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                          <FiEye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {product.brand} • {product.category}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-1xl font-bold text-gray-900">
                            KES {product.price.toLocaleString()}
                          </span>
                          {product.quantity > 0 && (
                            <span className="block text-xs text-green-600">
                              In Stock ({product.quantity})
                            </span>
                          )}
                        </div>

                        <button
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                            product.quantity > 0
                              ? "bg-primary hover:bg-primary/90 text-white hover:scale-105"
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                          }`}
                          disabled={product.quantity <= 0}
                        >
                          <FiShoppingCart className="h-4 w-4" />
                          <span>
                            {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="sr-only">Previous</span>
                    &laquo;
                  </button>
                  <button className="px-4 py-3 bg-primary text-white rounded-lg font-medium">
                    1
                  </button>
                  {[2, 3, 4].map((page) => (
                    <button
                      key={page}
                      className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {page}
                    </button>
                  ))}
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="sr-only">Next</span>
                    &raquo;
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;