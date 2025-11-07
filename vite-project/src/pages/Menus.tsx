import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Filter, Search, Sun, Moon, Upload, Image as ImageIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isVegetarian: boolean;
  isSpicy: boolean;
  isAvailable: boolean;
}

// interface MenuItem {
//   _id: string;
//   name: string;
//   category: string;
//   price: number;
// }

interface Category {
  id: string;
  name: string;
  color: string;
  darkColor: string;
  icon: string;
}

const Menus = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh tomatoes, mozzarella, and basil',
      price: 18.99,
      category: 'Pizza',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
      isVegetarian: true,
      isSpicy: false,
      isAvailable: true
    },
    {
      id: '2',
      name: 'Grilled Salmon',
      description: 'Atlantic salmon with lemon butter sauce and vegetables',
      price: 24.99,
      category: 'Main Course',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
      isVegetarian: false,
      isSpicy: false,
      isAvailable: true
    },
    {
      id: '3',
      name: 'Spicy Thai Curry',
      description: 'Red curry with coconut milk, vegetables, and jasmine rice',
      price: 16.99,
      category: 'Main Course',
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
      isVegetarian: true,
      isSpicy: true,
      isAvailable: false
    },
    {
      id: '4',
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with parmesan cheese and croutons',
      price: 12.99,
      category: 'Appetizers',
      image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop',
      isVegetarian: true,
      isSpicy: false,
      isAvailable: true
    },
    {
      id: '5',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center and vanilla ice cream',
      price: 8.99,
      category: 'Desserts',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop',
      isVegetarian: true,
      isSpicy: false,
      isAvailable: true
    },
    {
      id: '6',
      name: 'Fresh Orange Juice',
      description: 'Freshly squeezed orange juice served chilled',
      price: 4.99,
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop',
      isVegetarian: true,
      isSpicy: false,
      isAvailable: true
    }
  ]);

  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Appetizers',
      color: 'bg-orange-500',
      darkColor: 'bg-orange-600',
      icon: '🥗'
    },
    {
      id: '2',
      name: 'Pizza',
      color: 'bg-red-500',
      darkColor: 'bg-red-600',
      icon: '🍕'
    },
    {
      id: '3',
      name: 'Main Course',
      color: 'bg-blue-500',
      darkColor: 'bg-blue-600',
      icon: '🍽️'
    },
    {
      id: '4',
      name: 'Desserts',
      color: 'bg-pink-500',
      darkColor: 'bg-pink-600',
      icon: '🍰'
    },
    {
      id: '5',
      name: 'Beverages',
      color: 'bg-green-500',
      darkColor: 'bg-green-600',
      icon: '🥤'
    }
  ]);

  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    description: '',
    price: 0,
    category: 'Appetizers',
    image: '',
    isVegetarian: false,
    isSpicy: false,
    isAvailable: true
  });

  const [isManagingCategories, setIsManagingCategories] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', color: 'bg-gray-500', darkColor: 'bg-gray-600', icon: '🍴' });
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editCategoryForm, setEditCategoryForm] = useState(newCategory);

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addMenuItem = () => {
    if (newItem.name && newItem.price > 0) {
      const item: MenuItem = {
        ...newItem,
        id: Date.now().toString()
      };
      setMenuItems([...menuItems, item]);
      setNewItem({
        name: '',
        description: '',
        price: 0,
        category: 'Appetizers',
        image: '',
        isVegetarian: false,
        isSpicy: false,
        isAvailable: true
      });
      setIsAddingItem(false);
    }
  };

  const updateMenuItem = (id: string, updatedItem: Partial<MenuItem>) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, ...updatedItem } : item
    ));
    setEditingItem(null);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
    ));
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    if (!category) return 'bg-gray-500 dark:bg-gray-600';
    return isDarkMode ? category.darkColor : category.color;
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.icon : '🍴';
  };

  const handleImageUpload = (file: File, callback: (url: string) => void) => {
    // In a real app, you'd upload to a server or cloud storage
    // For demo purposes, we'll create a local URL
    const url = URL.createObjectURL(file);
    callback(url);
  };

  const ItemCard = ({ item }: { item: MenuItem }) => {
    const [editForm, setEditForm] = useState<MenuItem>(item);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleImageUpload(file, (url) => {
          if (editingItem === item.id) {
            setEditForm({ ...editForm, image: url });
          } else {
            setNewItem({ ...newItem, image: url });
          }
        });
      }
    };

    return (
      <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] ${!item.isAvailable ? 'opacity-60' : ''}`}>
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <ImageIcon size={48} className="text-gray-400 dark:text-gray-500" />
            </div>
          )}
          <div className="absolute top-2 right-2 flex gap-1">
            <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getCategoryColor(item.category)} flex items-center gap-1`}>
              <span>{getCategoryIcon(item.category)}</span>
              {item.category}
            </span>
          </div>
          {!item.isAvailable && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Unavailable
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              {editingItem === item.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full text-xl font-bold rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
                    rows={2}
                  />
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                        className="w-24 rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
                        step="0.01"
                      />
                      <select
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.name}>{cat.icon} {cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        placeholder="Image URL"
                        value={editForm.image || ''}
                        onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                        className="flex-1 rounded-xl px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      />
                      <label className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl cursor-pointer flex items-center gap-1 transition-colors">
                        <Upload size={16} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{item.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{item.description}</p>
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    {item.isVegetarian && (
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-sm font-medium">
                        🌱 Vegetarian
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-sm font-medium">
                        🌶️ Spicy
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${editingItem === item.id ? editForm.price.toFixed(2) : item.price.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-2">
              {editingItem === item.id ? (
                <div className="flex flex-wrap gap-2">
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={editForm.isVegetarian}
                      onChange={(e) => setEditForm({ ...editForm, isVegetarian: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={editForm.isSpicy}
                      onChange={(e) => setEditForm({ ...editForm, isSpicy: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Spicy</span>
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={editForm.isAvailable}
                      onChange={(e) => setEditForm({ ...editForm, isAvailable: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Available</span>
                  </label>
                </div>
              ) : (
                <button
                  onClick={() => toggleAvailability(item.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${item.isAvailable
                    ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50'
                    : 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50'
                    }`}
                >
                  {item.isAvailable ? 'Available' : 'Unavailable'}
                </button>
              )}
            </div>

            <div className="flex gap-2 flex-wrap">
              {editingItem === item.id ? (
                <>
                  <button
                    onClick={() => updateMenuItem(item.id, editForm)}
                    className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors font-medium"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditingItem(item.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors font-medium"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMenuItem(item.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const addCategory = () => {
    if (newCategory.name) {
      setCategories([...categories, {
        id: Date.now().toString(),
        ...newCategory
      }]);
      setNewCategory({ name: '', color: 'bg-gray-500', darkColor: 'bg-gray-600', icon: '🍴' });
      setIsManagingCategories(false);
    }
  };

  const updateCategory = (id: string) => {
    const idx = categories.findIndex(cat => cat.id === id);
    if (idx !== -1) {
      setCategories(categories.map((cat, index) => index === idx ? { ...cat, ...editCategoryForm } : cat));
      setEditingCategoryId(null);
    }
  };

  const deleteCategory = (id: string) => {
    const idx = categories.findIndex(cat => cat.id === id);
    if (idx !== -1) {
      setCategories(categories.filter((cat, index) => index !== idx));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Restaurant Menu Manager</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your restaurant's menu items, categories, and availability</p>
          </div>
        </div>

        {/* Category Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h3>
            <button
              onClick={() => setIsManagingCategories(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
            >
              <Edit2 size={16} />
              Manage Categories
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map(category => {
              const count = menuItems.filter(item => item.category === category.name).length;
              return (
                <div
                  key={category.id}
                  className={`p-4 rounded-xl ${getCategoryColor(category.name)} text-white text-center cursor-pointer transition-transform hover:scale-105 ${selectedCategory === category.name ? 'ring-4 ring-white ring-opacity-50' : ''}`}
                  onClick={() => setSelectedCategory(selectedCategory === category.name ? 'All' : category.name)}
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="font-semibold">{category.name}</div>
                  <div className="text-sm opacity-90">{count} items</div>
                </div>
              );
            })}
          </div>


          {/* Summary */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Menu Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{menuItems.length}</div>
                <div className="text-gray-600 dark:text-gray-400">Total Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{menuItems.filter(item => item.isAvailable).length}</div>
                <div className="text-gray-600 dark:text-gray-400">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{menuItems.filter(item => item.isVegetarian).length}</div>
                <div className="text-gray-600 dark:text-gray-400">Vegetarian</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{menuItems.filter(item => item.isSpicy).length}</div>
                <div className="text-gray-600 dark:text-gray-400">Spicy</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-full md:w-64 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none text-gray-900 dark:text-white"
                >
                  <option value="All">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={() => setIsAddingItem(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
            >
              <Plus size={20} />
              Add New Item
            </button>
          </div>
        </div>

        {/* Add Item Form */}
        {isAddingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add New Menu Item</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Item name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newItem.price || ''}
                  onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
                  className="rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  step="0.01"
                />
                <textarea
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="md:col-span-2 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  rows={2}
                />
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.icon} {cat.name}</option>
                  ))}
                </select>
                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={newItem.image || ''}
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                    className="flex-1 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  <label className="px-3 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl cursor-pointer flex items-center gap-1 transition-colors">
                    <Upload size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageUpload(file, (url) => {
                            setNewItem({ ...newItem, image: url });
                          });
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex gap-4 items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newItem.isVegetarian}
                      onChange={(e) => setNewItem({ ...newItem, isVegetarian: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-gray-600 dark:text-gray-400">🌱 Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={newItem.isSpicy}
                      onChange={(e) => setNewItem({ ...newItem, isSpicy: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-gray-600 dark:text-gray-400">🌶️ Spicy</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={addMenuItem}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
                >
                  <Save size={16} />
                  Save Item
                </button>
                <button
                  onClick={() => setIsAddingItem(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors font-medium"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No menu items found</h3>
              <p className="text-gray-500 dark:text-gray-500">Try adjusting your search or filter criteria, or add a new item.</p>
            </div>
          </div>
        )}

        {/* Manage Categories Modal */}
        {isManagingCategories && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Manage Categories</h3>
              <div className="space-y-4">
                {categories.map(cat => (
                  <div key={cat.id} className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-white ${cat.color}`}>{cat.icon} {cat.name}</span>
                    <button
                      onClick={() => {
                        setEditingCategoryId(cat.id);
                        setEditCategoryForm(cat);
                      }}
                      className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteCategory(cat.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
              {/* Edit Category Form */}
              {editingCategoryId && (
                <div className="mt-6 space-y-3">
                  <input
                    type="text"
                    value={editCategoryForm.name}
                    onChange={e => setEditCategoryForm({ ...editCategoryForm, name: e.target.value })}
                    placeholder="Category name"
                    className="w-full rounded px-3 py-2 border border-gray-300"
                  />
                  <input
                    type="text"
                    value={editCategoryForm.icon}
                    onChange={e => setEditCategoryForm({ ...editCategoryForm, icon: e.target.value })}
                    placeholder="Icon (emoji)"
                    className="w-full rounded px-3 py-2 border border-gray-300"
                  />
                  <button
                    onClick={() => updateCategory(editingCategoryId)}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save Changes
                  </button>
                </div>
              )}
              {/* Add Category Form */}
              <div className="mt-6 space-y-3">
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="New category name"
                  className="w-full rounded px-3 py-2 border border-gray-300"
                />
                <input
                  type="text"
                  value={newCategory.icon}
                  onChange={e => setNewCategory({ ...newCategory, icon: e.target.value })}
                  placeholder="Icon (emoji)"
                  className="w-full rounded px-3 py-2 border border-gray-300"
                />
                <button
                  onClick={addCategory}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Category
                </button>
              </div>
              <button
                onClick={() => {
                  setIsManagingCategories(false);
                  setEditingCategoryId(null);
                }}
                className="mt-6 w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menus;