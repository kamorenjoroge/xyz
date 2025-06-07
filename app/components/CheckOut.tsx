// components/CheckOut.tsx
"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiShoppingCart, FiUser, FiCreditCard, FiCheckCircle } from 'react-icons/fi';

const CheckOut = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    mpesaCode: '',
    deliveryAddress: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sample cart items
  const cartItems = [
    {
      id: 'ITEM-001',
      name: 'CNC Milling Machine X200',
      image: '/images/cnc-machine.jpg',
      price: 2200,
      quantity: 1
    },
    {
      id: 'ITEM-002',
      name: 'Machine Lubricant (1L)',
      image: '/images/lubricant.jpg',
      price: 250.75,
      quantity: 2
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = 150;
  const total = subtotal + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically process the payment and order
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 bg-light rounded-lg shadow-sm">
        <div className="text-center py-12">
          <FiCheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-dark mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <div className="bg-white p-6 rounded-lg border border-gray-200 max-w-md mx-auto">
            <h3 className="font-medium text-dark mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">MPESA Code:</span>
              <span className="font-medium">{formData.mpesaCode}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total Paid:</span>
              <span className="font-medium">KES {total.toLocaleString()}</span>
            </div>
          </div>
          <Link
            href="/orders"
            className="inline-block mt-8 px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium"
          >
            View Your Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-secondary'>
    <div className=" container mx-auto px-4 py-8">
      <div className="  bg-light p-6 rounded-lg shadow-sm">
        <h1 className="text-2xl md:text-3xl font-bold text-dark mb-8 flex items-center gap-2">
          <FiShoppingCart className="h-8 w-8 text-primary" />
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-x-auto">
          {/* Customer Information Form */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-dark mb-6 flex items-center gap-2">
              <FiUser className="h-5 w-5 text-primary" />
              Customer Information
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label htmlFor="mpesaCode" className="block text-sm font-medium text-gray-700 mb-1">
                    MPESA Transaction Code *
                  </label>
                  <input
                    type="text"
                    id="mpesaCode"
                    name="mpesaCode"
                    value={formData.mpesaCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                    required
                    placeholder="e.g. MGS76HJ90K"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Address *
                </label>
                <textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                  required
                ></textarea>
              </div>

              <div className="flex items-center mb-6">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-primary hover:underline">terms and conditions</a>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <FiCreditCard className="h-5 w-5" />
                Complete Purchase
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit sticky top-4">
            <h2 className="text-xl font-semibold text-dark mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start border-b pb-4">
                  <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-md overflow-hidden mr-4">
                    <Image
                      width={64}
                      height={64}
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-dark">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-dark">
                      KES {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">KES {shippingFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-dark pt-2">
                <span>Total</span>
                <span>KES {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary rounded-lg">
              <h3 className="font-medium text-dark mb-2 flex items-center gap-2">
                <FiCreditCard className="h-5 w-5 text-primary" />
                MPESA Payment Instructions
              </h3>
              <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
                <li>Go to M-PESA on your phone</li>
                <li>Select Lipa na M-PESA</li>
                <li>Select Pay Bill</li>
                <li>Enter Business No: 123456</li>
                <li>Enter Account No: Your Phone Number</li>
                <li>Enter Amount: KES {total.toLocaleString()}</li>
                <li>Enter your M-PESA PIN</li>
                <li>Submit and enter the code above</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CheckOut;