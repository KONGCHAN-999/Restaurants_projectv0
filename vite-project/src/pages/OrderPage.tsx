import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Order {
  _id: string;
  status: string;
  items: { menuItem: { name: string }; quantity: number }[];
}

export default function OrderPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
      setOrder(res.data);
    };
    fetchOrder();

    const interval = setInterval(fetchOrder, 5000); // poll every 5s
    return () => clearInterval(interval);
  }, [orderId]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Order #{order._id}</h1>
      <p>Status: {order.status}</p>
      <ul className="mt-4">
        {order.items.map((i, idx) => (
          <li key={idx}>
            {i.menuItem.name} x {i.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
