interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
}

export default function MenuList({ menu, addToCart }: { menu: MenuItem[]; addToCart: (item: MenuItem) => void }) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {menu.map((item) => (
        <div key={item._id} className="p-4 border rounded-xl shadow">
          <h2 className="font-semibold">{item.name}</h2>
          <p>{item.description}</p>
          <p className="text-sm text-gray-600">${item.price}</p>
          {item.isAvailable ? (
            <button
              className="mt-2 bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => addToCart(item)}
            >
              Add
            </button>
          ) : (
            <span className="text-red-500">Unavailable</span>
          )}
        </div>
      ))}
    </div>
  );
}
