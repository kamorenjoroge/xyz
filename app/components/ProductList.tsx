// components/ProductList.tsx
"use client";
import { useState } from "react";
import {
  FiFilter,
  FiStar,
  FiHeart,
  FiShoppingCart,
  FiChevronDown,
  FiEye,
  FiSearch,
} from "react-icons/fi";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Industrial CNC Machine X2000",
    price: 12500,
    category: "CNC Machines",
    rating: 4.8,
    reviews: 124,
    image: "/bb.png",
    description:
      'Precision CNC machine with automated tool changer and 15" display',
    inStock: true,
    isNew: true,
  },
  {
    id: 2,
    name: "Heavy Duty Lathe Machine Pro",
    price: 8900,
    category: "Lathes",
    rating: 4.6,
    reviews: 89,
    image: "/bb.png",
    description:
      "High-precision lathe machine for heavy-duty industrial applications",
    inStock: true,
    isNew: false,
  },
  {
    id: 3,
    name: "Vertical Milling Machine VM-500",
    price: 15750,
    category: "Milling",
    rating: 4.9,
    reviews: 67,
    image: "/bb.png",
    description:
      "Advanced vertical milling machine with digital readout system",
    inStock: false,
    isNew: false,
  },
  {
    id: 4,
    name: "Surface Grinder SG-200",
    price: 6200,
    category: "Grinders",
    rating: 4.5,
    reviews: 156,
    image: "/bb.png",
    description:
      "Precision surface grinder with magnetic chuck and coolant system",
    inStock: true,
    isNew: true,
  },
  {
    id: 5,
    name: "Hydraulic Press HP-1000",
    price: 22000,
    category: "Press Machines",
    rating: 4.7,
    reviews: 43,
    image: "/bb.png",
    description: "Heavy-duty hydraulic press with programmable controls",
    inStock: true,
    isNew: false,
  },
  {
    id: 6,
    name: "Band Saw BS-450",
    price: 3400,
    category: "Cutting Tools",
    rating: 4.4,
    reviews: 201,
    image: "/bb.png",
    description: "Industrial band saw with variable speed and auto-feed system",
    inStock: true,
    isNew: false,
  },
  {
    id: 7,
    name: "Surface Grinder SG-200",
    price: 6200,
    category: "Grinders",
    rating: 4.5,
    reviews: 156,
    image: "/bb.png",
    description:
      "Precision surface grinder with magnetic chuck and coolant system",
    inStock: true,
    isNew: true,
  },
  {
    id: 8,
    name: "Hydraulic Press HP-1000",
    price: 22000,
    category: "Press Machines",
    rating: 4.7,
    reviews: 43,
    image: "/bb.png",
    description: "Heavy-duty hydraulic press with programmable controls",
    inStock: true,
    isNew: false,
  },
  {
    id: 9,
    name: "Band Saw BS-450",
    price: 3400,
    category: "Cutting Tools",
    rating: 4.4,
    reviews: 201,
    image: "/bb.png",
    description: "Industrial band saw with variable speed and auto-feed system",
    inStock: true,
    isNew: false,
  },
];

const categories = [
  "All",
  "CNC Machines",
  "Lathes",
  "Milling",
  "Grinders",
  "Press Machines",
  "Cutting Tools",
];

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("Featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);

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
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "Newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // Featured - no sorting
        break;
    }

    setFilteredProducts(filtered);
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

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
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center cursor-pointer group"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="mr-3 text-primary focus:ring-primary"
                        />
                        <span className="text-gray-700 group-hover:text-gray-900 transition">
                          {category}
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
                    {" "}
                    {/* Changed from block to flex */}
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
                      <option>Rating</option>
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
                  <span className="bg-primary/10  px-3 py-1 rounded-full text-sm text-dark">
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden"
                >
                  <div className="relative h-48 bg-gray-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          New
                        </span>
                      )}
                      {!product.inStock && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-2 rounded-full shadow-lg transition-colors ${
                          favorites.includes(product.id)
                            ? "bg-red-500 text-white"
                            : "bg-white text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <FiHeart
                          className="h-4 w-4"
                          fill={
                            favorites.includes(product.id)
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
                          {product.category}
                        </p>
                      </div>
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                        <FiStar className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium ml-1 text-gray-700">
                          {product.rating}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-1xl font-bold text-gray-900">
                          Kes {product.price.toLocaleString()}
                        </span>
                        
                      </div>

                      <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                          product.inStock
                            ? "bg-primary hover:bg-primary/90 text-white hover:scale-105"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                        disabled={!product.inStock}
                      >
                        <FiShoppingCart className="h-4 w-4" />
                        <span>
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
