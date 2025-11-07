import { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import OrderSummary from './OrderSummary';

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

type CategoryId = 'starters' | 'mains' | 'desserts' | 'beverages';

type CartItem = MenuItem & { quantity: number };

type Cart = {
  [id: number]: CartItem;
};

type MenuData = {
  [key in CategoryId]: MenuItem[];
};

export default function HomePage() {
  const [cart, setCart] = useState<Cart>({});
  const [activeCategory, setActiveCategory] = useState<CategoryId>('starters');
  const [orderVisible, setOrderVisible] = useState(false);
  const [orders, setOrders] = useState<Cart[]>([]);
  const [ordersModal, setOrdersModal] = useState(false);

  const menuData: MenuData = {
    starters: [
      { id: 1, name: 'Caesar Salad', price: 12.99, description: 'Fresh romaine lettuce, parmesan cheese, croutons, caesar dressing', image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop' },
      { id: 2, name: 'Bruschetta', price: 9.99, description: 'Grilled bread topped with fresh tomatoes, garlic, basil', image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&h=300&fit=crop' },
      { id: 3, name: 'Buffalo Wings', price: 14.99, description: '8 pieces of spicy chicken wings with blue cheese dip', image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&h=300&fit=crop' },
    ],
    mains: [
      { id: 4, name: 'Grilled Salmon', price: 24.99, description: 'Atlantic salmon with lemon herbs, served with vegetables', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop' },
      { id: 5, name: 'Ribeye Steak', price: 32.99, description: '12oz ribeye steak cooked to perfection with garlic mashed potatoes', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop' },
      { id: 6, name: 'Chicken Parmesan', price: 19.99, description: 'Breaded chicken breast with marinara sauce and mozzarella', image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=400&h=300&fit=crop' },
      { id: 7, name: 'Pasta Carbonara', price: 17.99, description: 'Creamy pasta with bacon, eggs, parmesan cheese', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop' },
    ],
    desserts: [
      { id: 8, name: 'Chocolate Lava Cake', price: 8.99, description: 'Warm chocolate cake with molten center, vanilla ice cream', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop' },
      { id: 9, name: 'Tiramisu', price: 7.99, description: 'Classic Italian dessert with coffee-soaked ladyfingers', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop' },
      { id: 10, name: 'Cheesecake', price: 6.99, description: 'New York style cheesecake with berry compote', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=300&fit=crop' },
    ],
    beverages: [
      { id: 11, name: 'Fresh Orange Juice', price: 4.99, description: 'Freshly squeezed orange juice', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&h=300&fit=crop' },
      { id: 12, name: 'Coffee', price: 3.99, description: 'Premium roasted coffee beans', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop' },
      { id: 13, name: 'Craft Beer', price: 5.99, description: 'Local craft beer selection', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=300&fit=crop' },
    ],
  };

  const categories: { id: CategoryId; name: string; icon: string }[] = [
    { id: 'starters', name: 'Starters', icon: '🥗' },
    { id: 'mains', name: 'Main Courses', icon: '🍽️' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'beverages', name: 'Beverages', icon: '☕' },
  ];

  const addToCart = (item: MenuItem) => {
    setCart(prev => ({
      ...prev,
      [item.id]: {
        ...item,
        quantity: (prev[item.id]?.quantity || 0) + 1
      }
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => {
      const updated = { ...prev };
      if (updated[itemId]?.quantity > 1) {
        updated[itemId]!.quantity -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const getTotalPrice = (): string => {
    return Object.values(cart).reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const getTotalItems = (): number => {
    return Object.values(cart).reduce((total: number, item: CartItem) => total + item.quantity, 0);
  };

  const getCurrentCategoryName = () => {
    const category = categories.find(cat => cat.id === activeCategory);
    return category?.name || 'Menu';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Bistro Restaurant</h1>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <button
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer w-full sm:w-auto justify-center hover:bg-red-700 transition-colors"
                onClick={() => setOrderVisible(v => !v)}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-semibold">Order</span>
                <span className="text-red-200">|</span>
                <span className="font-bold">${getTotalPrice()}</span>
              </button>
              <button
                onClick={() => setOrdersModal(true)}
                className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-gray-800 transition-colors duration-200 w-full sm:w-auto justify-center"
              >
                <span>All Orders</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 py-4">
        {/* Category Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${activeCategory === category.id
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center md:text-left">
            {getCurrentCategoryName()}
          </h2>
        </div>

        {/* Menu Categories & Items */}
        <div className="space-y-10">
          {categories.map(category => (
            <div key={category.id}>
              {/* Category Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {category.name}
              </h2>

              {/* Items Grid */}
              <div className="grid grid-cols-2 gap-2">
                {menuData[category.id]?.map((item: MenuItem) => (
                  <div
                    key={item.id}
                    className="bg-gray-100 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Menu Item Image */}
                    <div className="w-full h-40 bg-red-400 rounded-md overflow-hidden mb-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-base font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm font-bold text-gray-800">${item.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>

                    {/* Cart Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {cart[item.id] && (
                          <>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="font-bold text-gray-900 text-lg min-w-[2rem] text-center">
                              {cart[item.id]!.quantity}
                            </span>
                          </>
                        )}
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* {cart[item.id] && (
                        <span className="text-lg font-bold text-gray-900">
                          ${(item.price * cart[item.id]!.quantity).toFixed(2)}
                        </span>
                      )} */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Summary */}
      {getTotalItems() > 0 && (
        <OrderSummary
          cart={cart}
          getTotalItems={getTotalItems}
          getTotalPrice={getTotalPrice}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          visible={orderVisible}
          setVisible={setOrderVisible}
          onConfirmOrder={() => {
            setOrders(prev => [...prev, cart]);
            setCart({});
          }}
        />
      )}

      {/* Orders Modal */}
      {ordersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
          <div className="bg-white rounded-lg shadow-xl p-4 sm:p-8 w-full max-w-md sm:max-w-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">All Your Orders</h2>
            {orders.length === 0 ? (
              <p className="text-gray-600">No orders yet.</p>
            ) : (
              <ul className="space-y-6">
                {orders.map((order, idx) => (
                  <li key={idx} className="border-b pb-4">
                    <h3 className="font-semibold mb-2">Order #{idx + 1}</h3>
                    <ul>
                      {Object.values(order).map(item => (
                        <li key={item.id} className="flex justify-between items-center mb-1 text-sm sm:text-base">
                          <span>{item.name} x{item.quantity}</span>
                          <span className="text-red-600 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-end font-bold mt-2">
                      Total: ${Object.values(order).reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <button
              className="mt-6 w-full bg-gray-800 text-white py-2 rounded-lg font-bold hover:bg-gray-900 transition-colors"
              onClick={() => setOrdersModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}