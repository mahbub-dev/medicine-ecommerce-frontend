import GlobalPagination from "@/components/common/Pagination"; // Import the pagination component
import React, { useState } from "react";
import { Order } from "./types"; // Import the order type

interface OrderListProps {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (id: string) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const filteredOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg mt-4">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Customer</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Total</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {filteredOrders.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="py-3 px-6">{order.customerName}</td>
              <td className="py-3 px-6">{order.date}</td>
              <td className="py-3 px-6">{order.status}</td>
              <td className="py-3 px-6">${order.totalAmount.toFixed(2)}</td>
              <td className="py-3 px-6 flex space-x-2">
                <button
                  onClick={() => onEdit(order)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(order._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <GlobalPagination
        // currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default OrderList;
