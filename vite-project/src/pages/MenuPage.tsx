import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface MenuItem {
  _id: string;
  name: string;
  category: string;
  price: number;
}

export default function MenuPage() {
  const { tableId } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<{ id: string; qty: number }[]>([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/menu").then((res) => setMenu(res.data));
  }, []);

  const addToCart = (id: string) => {
    setCart((prev) => {
      const found = prev.find((item) => item.id === id);
      if (found) {
        return prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { id, qty: 1 }];
    });
  };

  const placeOrder = async () => {
    const res = await axios.post("http://localhost:5000/api/orders", {
      tableId,
      items: cart.map((c) => ({ menuItem: c.id, quantity: c.qty }))
    });
    navigate(`/order/${res.data._id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Menu for Table {tableId}</h1>
      <ul>
        {menu.map((item) => (
          <li key={item._id} className="flex justify-between mb-2">
            <span>{item.name} - ${item.price}</span>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => addToCart(item._id)}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
      {cart.length > 0 && (
        <button
          onClick={placeOrder}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Place Order
        </button>
      )}
    </div>
  );
}
