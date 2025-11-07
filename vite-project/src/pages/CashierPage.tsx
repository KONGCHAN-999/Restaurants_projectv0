import { useEffect, useState } from "react";
import axios from "axios";

interface Payment {
  _id: string;
  order: {
    _id: string;
    items: { menuItem: { name: string }; quantity: number }[];
  };
  table: { tableNumber: number };
  amount: number;
  method: string;
  status: string;
}

export default function CashierPage() {
  const [payments, setPayments] = useState<Payment[]>([]);

  const fetchPayments = async () => {
    const res = await axios.get("http://localhost:5000/api/payments");
    setPayments(res.data);
  };

  const payPayment = async (id: string) => {
    await axios.put(`http://localhost:5000/api/payments/${id}/pay`);
    fetchPayments();
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Unpaid Orders</h1>
      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment._id} className="p-4 border rounded shadow">
            <h2 className="font-bold">Table {payment.table.tableNumber}</h2>
            <ul>
              {payment.order.items.map((item, idx) => (
                <li key={idx}>{item.menuItem.name} x {item.quantity}</li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">Amount: ${payment.amount.toFixed(2)}</p>
            <p>Payment Method: {payment.method}</p>
            <button
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => payPayment(payment._id)}
            >
              Mark as Paid
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
