"use client";
import { useState } from "react";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { useCartStore } from "../../lib/store/cartStore";
import toast from "react-hot-toast";

interface AddtoCartProps {
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  productQuantity: number;
  productColor: string[]; // Added color prop
  className?: string;
}

const AddToCartMain = ({
  productId,
  productName,
  productPrice,
  productImage,
  productQuantity,
  productColor,
  className = "",
}: AddtoCartProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      addToCart(
        {
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          color: productColor, // Added color to cart item
        },
        1
      );

      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 3000);
      toast.success(`${productName} added to cart`);
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <button
        onClick={handleAddToCart}
        disabled={isAdding || isAdded || productQuantity === 0}
        className={`py-1 px-3 rounded-md text-white text-sm flex items-center justify-center ${
          isAdded
            ? "bg-green-500"
            : isAdding
            ? "bg-primary/80"
            : productQuantity === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary hover:bg-primary/90"
        }`}
      >
        {productQuantity === 0 ? (
          "Out of Stock"
        ) : isAdding ? (
          "Adding..."
        ) : isAdded ? (
          <>
            <FaCheck className="mr-1" /> Added to Cart
          </>
        ) : (
          <>
            <FaShoppingCart className="mr-1" /> Add to Cart
          </>
        )}
      </button>
    </div>
  );
};

export default AddToCartMain;
