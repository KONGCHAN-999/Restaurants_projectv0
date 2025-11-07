import { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "../components/OrderCard";

interface OrderItem {
  _id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  status: "pending" | "preparing" | "ready" | "served";
}

interface Order {
  _id: string;
  tableId: { _id: string; tableNumber: number };
  status: "pending" | "preparing" | "served" | "closed";
  items: OrderItem[];
  paymentStatus: "unpaid" | "paid";
}

export default function StaffDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:4000/api/orders");
    setOrders(res.data);
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    await axios.put(`http://localhost:4000/api/orders/${orderId}/status`, { status });
    fetchOrders();
  };

  const updateItemStatus = async (orderId: string, itemId: string, status: string) => {
    await axios.put(`http://localhost:4000/api/orders/${orderId}/status`, { itemId, status });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Staff Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            updateOrderStatus={updateOrderStatus}
            updateItemStatus={updateItemStatus}
          />
        ))}
      </div>
    </div>
  );
}
