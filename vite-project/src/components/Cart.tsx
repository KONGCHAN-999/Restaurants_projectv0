interface CartProps {
  cart: { item: { _id: string; name: string; price: number }; quantity: number }[];
  placeOrder: () => void;
}

export default function Cart({ cart, placeOrder }: CartProps) {
  const total = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);

  return (
    <div className="mt-6 p-4 border rounded-xl shadow">
      <h2 className="font-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items</p>
      ) : (
        <>
          <ul>
            {cart.map((c) => (
              <li key={c.item._id}>
                {c.item.name} x {c.quantity}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">Total: ${total.toFixed(2)}</p>
          <button
            onClick={placeOrder}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}
