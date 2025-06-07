import { FiShoppingCart } from "react-icons/fi";
const Cart = () => {
  return (
    <div className="">
      <button className="relative text-dark hover:text-primary transition">
        <FiShoppingCart className="h-6 w-6" />
        <span className="absolute -top-2 -right-2 bg-warning text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          3
        </span>
      </button>
    </div>
  );
};

export default Cart;
