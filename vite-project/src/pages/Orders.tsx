import React, { useState, useEffect } from 'react';
import {
    Clock,
    Users,
    ChefHat,
    CheckCircle,
    XCircle,
    AlertCircle,
    Filter,
    Search,
    Plus,
    Minus,
    Eye,
    Edit3,
    Trash2,
    Bell,
    DollarSign,
    Calendar,
    MapPin
} from "lucide-react";

interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    notes?: string;
    status: 'pending' | 'preparing' | 'ready';
}

interface Order {
    id: string;
    tableNumber: number;
    customerName: string;
    items: OrderItem[];
    status: 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled';
    priority: 'low' | 'normal' | 'high';
    orderTime: Date;
    estimatedTime: number; // minutes
    total: number;
    notes?: string;
    waiter: string;
}

export default function OrderManagement() {
    const [orders, setOrders] = useState<Order[]>([
        {
            id: 'ORD-001',
            tableNumber: 5,
            customerName: 'Johnson Family',
            items: [
                { id: '1', name: 'Grilled Salmon', quantity: 2, price: 24.99, status: 'preparing' },
                { id: '2', name: 'Caesar Salad', quantity: 1, price: 12.50, status: 'ready' },
                { id: '3', name: 'Wine - Chardonnay', quantity: 1, price: 8.99, status: 'ready' }
            ],
            status: 'preparing',
            priority: 'high',
            orderTime: new Date(Date.now() - 25 * 60000),
            estimatedTime: 15,
            total: 58.48,
            waiter: 'Sarah M.',
            notes: 'Customer allergic to nuts'
        },
        {
            id: 'ORD-002',
            tableNumber: 12,
            customerName: 'David Chen',
            items: [
                { id: '4', name: 'Margherita Pizza', quantity: 1, price: 16.99, status: 'pending' },
                { id: '5', name: 'Garlic Bread', quantity: 1, price: 6.99, status: 'pending' }
            ],
            status: 'pending',
            priority: 'normal',
            orderTime: new Date(Date.now() - 10 * 60000),
            estimatedTime: 20,
            total: 23.98,
            waiter: 'Mike R.'
        },
        {
            id: 'ORD-003',
            tableNumber: 8,
            customerName: 'Emma Wilson',
            items: [
                { id: '6', name: 'Beef Steak', quantity: 1, price: 29.99, status: 'ready' },
                { id: '7', name: 'Mashed Potatoes', quantity: 1, price: 7.50, status: 'ready' },
                { id: '8', name: 'Red Wine', quantity: 1, price: 12.99, status: 'ready' }
            ],
            status: 'ready',
            priority: 'high',
            orderTime: new Date(Date.now() - 45 * 60000),
            estimatedTime: 5,
            total: 50.48,
            waiter: 'Anna L.',
            notes: 'Medium rare steak'
        }
    ]);

    const [filter, setFilter] = useState<'all' | 'pending' | 'preparing' | 'ready' | 'served'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        );
    };

    const updateItemStatus = (orderId: string, itemId: string, newStatus: OrderItem['status']) => {
        setOrders(prevOrders =>
            prevOrders.map(order =>
                order.id === orderId
                    ? {
                        ...order,
                        items: order.items.map(item =>
                            item.id === itemId ? { ...item, status: newStatus } : item
                        )
                    }
                    : order
            )
        );
    };

    const getTimeElapsed = (orderTime: Date) => {
        const elapsed = Math.floor((Date.now() - orderTime.getTime()) / 60000);
        return elapsed;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            case 'preparing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            case 'ready': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'served': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
            case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'border-l-4 border-red-500';
            case 'normal': return 'border-l-4 border-blue-500';
            case 'low': return 'border-l-4 border-gray-400';
            default: return 'border-l-4 border-gray-400';
        }
    };

    const filteredOrders = orders.filter(order => {
        const matchesFilter = filter === 'all' || order.status === filter;
        const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.tableNumber.toString().includes(searchTerm);
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Order Management
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Track and manage all restaurant orders in real-time
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex gap-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-lg border border-gray-100 dark:border-gray-700">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {orders.filter(o => o.status === 'pending').length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Pending</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-lg border border-gray-100 dark:border-gray-700">
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                {orders.filter(o => o.status === 'preparing').length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Preparing</div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-lg border border-gray-100 dark:border-gray-700">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {orders.filter(o => o.status === 'ready').length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Ready</div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search orders, customers, or table numbers..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Filter */}
                        <div className="flex gap-2">
                            {['all', 'pending', 'preparing', 'ready', 'served'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilter(status as any)}
                                    className={`px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${filter === status
                                            ? 'bg-blue-500 text-white shadow-lg'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Orders Grid */}
                <div className="grid gap-6">
                    {filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 ${getPriorityColor(order.priority)}`}
                        >
                            <div className="p-6">
                                {/* Order Header */}
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                                            <ChefHat className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                    {order.id}
                                                </h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                                {order.priority === 'high' && (
                                                    <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                                        <Bell className="w-3 h-3" />
                                                        Priority
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-4 h-4" />
                                                    Table {order.tableNumber}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-4 h-4" />
                                                    {order.customerName}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {getTimeElapsed(order.orderTime)} min ago
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                                ${order.total.toFixed(2)}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Est. {order.estimatedTime} min
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="space-y-3 mb-6">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Order Items</h4>
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <span className="font-medium text-gray-900 dark:text-white">
                                                        {item.quantity}x {item.name}
                                                    </span>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                                {item.notes && (
                                                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                        Note: {item.notes}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="font-semibold text-gray-900 dark:text-white">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                                <div className="flex gap-1">
                                                    {item.status !== 'ready' && (
                                                        <button
                                                            onClick={() => updateItemStatus(order.id, item.id, item.status === 'pending' ? 'preparing' : 'ready')}
                                                            className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Notes and Waiter */}
                                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                                    {order.notes && (
                                        <div className="flex-1 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                                            <div className="flex items-center gap-2 mb-2">
                                                <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Special Notes</span>
                                            </div>
                                            <p className="text-sm text-yellow-700 dark:text-yellow-300">{order.notes}</p>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Users className="w-4 h-4" />
                                        Served by: {order.waiter}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    {order.status === 'pending' && (
                                        <button
                                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
                                        >
                                            <ChefHat className="w-4 h-4" />
                                            Start Preparing
                                        </button>
                                    )}
                                    {order.status === 'preparing' && (
                                        <button
                                            onClick={() => updateOrderStatus(order.id, 'ready')}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            Mark Ready
                                        </button>
                                    )}
                                    {order.status === 'ready' && (
                                        <button
                                            onClick={() => updateOrderStatus(order.id, 'served')}
                                            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-medium"
                                        >
                                            <Users className="w-4 h-4" />
                                            Mark Served
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                                    >
                                        <Eye className="w-4 h-4" />
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors font-medium"
                                    >
                                        <XCircle className="w-4 h-4" />
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
                            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                No orders found
                            </h3>
                            <p className="text-gray-500 dark:text-gray-500">
                                Try adjusting your search or filter criteria
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}