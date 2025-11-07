import React, { useState } from 'react';

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

type CartItem = MenuItem & { quantity: number };

type Cart = {
  [id: number]: CartItem;
};

type OrderSummaryProps = {
  cart: Cart;
  getTotalItems: () => number;
  getTotalPrice: () => string;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmOrder: () => void; // <-- Add this line
};

export default function OrderSummary({
  cart,
  getTotalItems,
  getTotalPrice,
  addToCart,
  removeFromCart,
  visible,
  setVisible,
  onConfirmOrder,
}: OrderSummaryProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handlePlaceOrder = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onConfirmOrder(); // <-- Call this
    alert('Order placed!');
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full sm:bottom-4 sm:right-4 sm:left-auto sm:w-[420px]">
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded-t-lg shadow-lg absolute right-0 -top-12"
        onClick={() => setVisible(v => !v)}
      >
        {visible ? 'Hide Order' : 'Show Order'}
      </button>
      {visible && (
        <div className="bg-white rounded-t-lg sm:rounded-lg shadow-2xl p-4 sm:p-6 md:p-8 w-full border border-gray-200">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4">Order Summary</h2>
          <ul className="divide-y divide-gray-200 mb-4 max-h-48 sm:max-h-64 overflow-y-auto">
            {Object.values(cart).map(item => (
              <li key={item.id} className="py-2 sm:py-3 flex items-center justify-between text-xs sm:text-sm md:text-base">
                <div>
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-gray-500 ml-2">x{item.quantity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-red-100 text-red-600 p-1 rounded-full hover:bg-red-200"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove"
                  >
                    -
                  </button>
                  <button
                    className="bg-green-100 text-green-600 p-1 rounded-full hover:bg-green-200"
                    onClick={() => addToCart(item)}
                    aria-label="Add"
                  >
                    +
                  </button>
                </div>
                <span className="font-bold text-red-600">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center font-semibold text-base sm:text-lg">
            <span>Total Items:</span>
            <span>{getTotalItems()}</span>
          </div>
          <div className="flex justify-between items-center font-bold text-lg sm:text-xl mt-2">
            <span>Total Price:</span>
            <span>${getTotalPrice()}</span>
          </div>
          <button
            className="mt-6 w-full bg-red-600 text-white py-2 sm:py-3 rounded-lg font-bold hover:bg-red-700 transition-colors"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
          {showConfirm && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 px-2">
              <div className="bg-white rounded-lg shadow-xl p-4 sm:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md">
                <h3 className="text-base sm:text-lg font-bold mb-4">Confirm Your Order</h3>
                <p className="mb-6 text-sm sm:text-base">Are you sure you want to place this order?</p>
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 rounded bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300"
                    onClick={handleCancel}
                  >
                    No
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-700"
                    onClick={handleConfirm}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}