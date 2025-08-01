"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FiEye, FiX } from 'react-icons/fi';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

type OrderItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type Order = {
  _id: string;
  createdAt: string;
  total: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'shipped';
  items: OrderItem[];
  customerEmail?: string;
};

const Orders = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/orders');
        const allOrders = response.data;
        setOrders(allOrders);

        if (isSignedIn && user?.primaryEmailAddress?.emailAddress) {
          const userEmail = user.primaryEmailAddress.emailAddress;
          const userOrders = allOrders.filter((order: Order) => 
            order.customerEmail === userEmail
          );
          setFilteredOrders(userOrders);
        } else {
          setFilteredOrders(allOrders);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded) {
      fetchOrders();
    }
  }, [isLoaded, isSignedIn, user]);

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isLoaded) {
    return (
      <div className="p-8 text-center text-lg text-gray-600">Loading user data...</div>
    );
  }

  if (loading) {
    return (
      <div className="p-8 text-center text-lg text-gray-600">Loading orders...</div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!filteredOrders.length) {
    return (
      <div className="p-8  text-center">
        <div className="text-lg text-gray-600 mb-4">
          {isSignedIn ? 'You have no orders yet.' : 'No orders found. Please sign in to view your orders.'}
        </div>
        {isSignedIn ? (
          <a 
            href="/shop" 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark inline-block"
          >
            Start Shopping
          </a>
        ) : (
          <a 
            href="/sign-in" 
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark inline-block"
          >
            Sign In
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="bg-light p-6  rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-dark mb-6">Your Orders</h2>

    <div className="space-y-4">
  <h2 className="text-lg font-semibold text-gray-900 px-4 sm:px-0">Your Orders</h2>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Order ID</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {filteredOrders.map((order) => (
          <tr key={order._id} className="hover:bg-gray-50">
            {/* Hidden on mobile */}
            <td className="px-6 py-4 text-sm font-medium text-dark hidden sm:table-cell">
              {order._id.slice(-6)}
            </td>
            <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
              {new Date(order.createdAt).toLocaleDateString()}
            </td>
            
            {/* Always visible columns */}
            <td className="px-6 py-4 text-sm font-medium text-gray-900">
              Kes {order.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </td>
            <td className="px-6 py-4">
              <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </td>
            <td className="px-6 py-4 text-sm text-primary">
              <button 
                onClick={() => openOrderDetails(order)} 
                className="flex items-center gap-1 hover:underline"
              >
                <FiEye className="h-4 w-4" />
                <span className="hidden sm:inline">View</span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-secondary/40 flex items-center justify-center p-4 z-50">
          <div className="bg-secondary border border-primary rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold text-dark">
                Order Details - {selectedOrder._id.slice(-6)}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Order Date</h4>
                  <p className="text-dark">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Order Total</h4>
                  <p className="text-dark">Kes {selectedOrder.total.toLocaleString('en-US')}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Status</h4>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              <h4 className="text-lg font-medium text-dark mb-4">Order Items</h4>
              <div className="space-y-4">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-start border-b pb-4">
                    <div className="flex-shrink-0 h-16 w-16 bg-gray-200 rounded-md overflow-hidden">
                      <Image
                        width={64}
                        height={64}
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h5 className="text-sm font-medium text-dark">{item.name}</h5>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-dark">
                        Kes {(item.price * item.quantity).toLocaleString('en-US')}
                      </p>
                      <p className="text-xs text-gray-500">Kes {item.price.toLocaleString('en-US')} each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t p-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;