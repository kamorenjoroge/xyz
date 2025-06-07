// components/Orders.tsx
"use client";
import Image from 'next/image';
import { useState } from 'react';
import { FiEye, FiX } from 'react-icons/fi';

type OrderItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
};

const Orders = () => {
  // Sample orders data
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-78901',
      date: '2023-05-15',
      total: 2450.75,
      status: 'Delivered',
      items: [
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
          quantity: 1
        }
      ]
    },
    {
      id: 'ORD-78902',
      date: '2023-06-20',
      total: 18500.00,
      status: 'Shipped',
      items: [
        {
          id: 'ITEM-003',
          name: 'Industrial Lathe L500',
          image: '/images/lathe.jpg',
          price: 18500,
          quantity: 1
        }
      ]
    },
    {
      id: 'ORD-78903',
      date: '2023-07-05',
      total: 6420.50,
      status: 'Processing',
      items: [
        {
          id: 'ITEM-004',
          name: 'Precision Grinder G200',
          image: '/images/grinder.jpg',
          price: 3200,
          quantity: 2
        }
      ]
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-light p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-dark mb-6">Your Orders</h2>
      
      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dark">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Kes {order.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => openOrderDetails(order)}
                    className="text-primary hover:text-primary/80 flex items-center gap-1"
                  >
                    <FiEye className="h-4 w-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-secondary/40  flex items-center justify-center p-4 z-50">
          <div className="bg-light  border border-primary rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-semibold text-dark">
                Order Details - {selectedOrder.id}
              </h3>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Order Date</h4>
                  <p className="text-dark">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Order Total</h4>
                  <p className="text-dark">Kes {selectedOrder.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
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
                        Kes {(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-xs text-gray-500">Kes {item.price.toLocaleString('en-US')} each</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t">
                <div className="flex justify-end">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Subtotal</p>
                    <p className="text-lg font-semibold text-dark">
                      Kes {selectedOrder.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
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