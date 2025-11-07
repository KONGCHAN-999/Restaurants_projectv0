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
  status: string;
  items: OrderItem[];
  paymentStatus: string;
}

export default function OrderCard({
  order,
  updateOrderStatus,
  updateItemStatus,
}: {
  order: Order;
  updateOrderStatus: (orderId: string, status: string) => void;
  updateItemStatus: (orderId: string, itemId: string, status: string) => void;
}) {
  return (
    <div className="p-4 border rounded-xl shadow bg-white">
      <h2 className="font-bold">Table {order.tableId.tableNumber}</h2>
      <p>Status: <span className="font-semibold">{order.status}</span></p>

      <ul className="mt-2 space-y-1">
        {order.items.map((item) => (
          <li key={item._id} className="flex justify-between items-center">
            <span>
              {item.name} x {item.quantity} — {item.status}
            </span>
            <select
              className="border rounded px-2 py-1"
              value={item.status}
              onChange={(e) => updateItemStatus(order._id, item._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="served">Served</option>
            </select>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded mr-2"
          onClick={() => updateOrderStatus(order._id, "preparing")}
        >
          Preparing
        </button>
        <button
          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
          onClick={() => updateOrderStatus(order._id, "served")}
        >
          Served
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => updateOrderStatus(order._id, "closed")}
        >
          Close Order
        </button>
      </div>
    </div>
  );
}
