import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Users,
    ShoppingCart,
    Clock,
    Calendar,
    Filter,
    Download,
    RefreshCw,
    Eye,
    PieChart,
    BarChart3,
    Activity,
    Star,
    ChefHat,
    Sun,
    Moon
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell, XAxis, Pie, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface SalesData {
    date: string;
    revenue: number;
    orders: number;
    customers: number;
    avgOrderValue: number;
}

interface MenuItem {
    id: string;
    name: string;
    category: string;
    orders: number;
    revenue: number;
    rating: number;
}

interface CustomerData {
    newCustomers: number;
    returningCustomers: number;
    totalCustomers: number;
}

interface PeakHours {
    hour: string;
    orders: number;
    revenue: number;
}

const RestaurantAnalytics = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'year'>('week');
    const [selectedMetric, setSelectedMetric] = useState<'revenue' | 'orders' | 'customers'>('revenue');

    // Sample data
    const [salesData] = useState<SalesData[]>([
        { date: '2024-01-15', revenue: 2400, orders: 45, customers: 38, avgOrderValue: 53.33 },
        { date: '2024-01-16', revenue: 2800, orders: 52, customers: 42, avgOrderValue: 53.85 },
        { date: '2024-01-17', revenue: 3200, orders: 58, customers: 48, avgOrderValue: 55.17 },
        { date: '2024-01-18', revenue: 2900, orders: 49, customers: 41, avgOrderValue: 59.18 },
        { date: '2024-01-19', revenue: 3800, orders: 68, customers: 56, avgOrderValue: 55.88 },
        { date: '2024-01-20', revenue: 4200, orders: 72, customers: 61, avgOrderValue: 58.33 },
        { date: '2024-01-21', revenue: 3600, orders: 63, customers: 52, avgOrderValue: 57.14 }
    ]);

    const [topMenuItems] = useState<MenuItem[]>([
        { id: '1', name: 'Grilled Salmon', category: 'Main Course', orders: 156, revenue: 3892.44, rating: 4.8 },
        { id: '2', name: 'Margherita Pizza', category: 'Pizza', orders: 142, revenue: 2408.58, rating: 4.6 },
        { id: '3', name: 'Caesar Salad', category: 'Appetizers', orders: 98, revenue: 1225.02, rating: 4.5 },
        { id: '4', name: 'Beef Steak', category: 'Main Course', orders: 89, revenue: 2669.11, rating: 4.9 },
        { id: '5', name: 'Chocolate Cake', category: 'Desserts', orders: 76, revenue: 683.24, rating: 4.7 }
    ]);

    const [peakHoursData] = useState<PeakHours[]>([
        { hour: '11:00', orders: 8, revenue: 420 },
        { hour: '12:00', orders: 24, revenue: 1280 },
        { hour: '13:00', orders: 32, revenue: 1760 },
        { hour: '14:00', orders: 18, revenue: 950 },
        { hour: '15:00', orders: 12, revenue: 640 },
        { hour: '16:00', orders: 6, revenue: 320 },
        { hour: '17:00', orders: 14, revenue: 840 },
        { hour: '18:00', orders: 28, revenue: 1680 },
        { hour: '19:00', orders: 42, revenue: 2520 },
        { hour: '20:00', orders: 38, revenue: 2280 },
        { hour: '21:00', orders: 22, revenue: 1320 },
        { hour: '22:00', orders: 8, revenue: 480 }
    ]);

    const categoryData = [
        { name: 'Main Course', value: 45, color: '#3B82F6' },
        { name: 'Pizza', value: 25, color: '#EF4444' },
        { name: 'Appetizers', value: 15, color: '#F59E0B' },
        { name: 'Desserts', value: 10, color: '#EC4899' },
        { name: 'Beverages', value: 5, color: '#10B981' }
    ];

    const customerData: CustomerData = {
        newCustomers: 142,
        returningCustomers: 318,
        totalCustomers: 460
    };

    // Apply dark mode class to document
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const getCurrentTotal = (metric: string) => {
        return salesData.reduce((sum, day) => {
            switch (metric) {
                case 'revenue': return sum + day.revenue;
                case 'orders': return sum + day.orders;
                case 'customers': return sum + day.customers;
                default: return sum;
            }
        }, 0);
    };

    const getGrowthRate = (metric: string) => {
        const current = getCurrentTotal(metric);
        const previous = current * 0.85; // Simulated previous period data
        return ((current - previous) / previous * 100).toFixed(1);
    };

    const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                    <div className="flex items-center gap-1 mt-2">
                        {parseFloat(change) >= 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${parseFloat(change) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {change}%
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">vs last period</span>
                    </div>
                </div>
                <div className={`p-4 rounded-xl ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
        </div>
    );

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 shadow-lg">
                    <p className="text-gray-900 dark:text-white font-medium">{`Date: ${label}`}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm" style={{ color: entry.color }}>
                            {`${entry.dataKey}: ${entry.value}`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 p-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Restaurant Analytics
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Monitor your restaurant's performance and insights
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Time Range Selector */}
                        <div className="flex gap-2">
                            {['today', 'week', 'month', 'year'].map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range as any)}
                                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                                        timeRange === range
                                            ? 'bg-blue-500 text-white shadow-lg'
                                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600'
                                    }`}
                                >
                                    {range.charAt(0).toUpperCase() + range.slice(1)}
                                </button>
                            ))}
                        </div>
                        
                        {/* Dark Mode Toggle */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            {isDarkMode ? (
                                <Sun className="text-yellow-500" size={20} />
                            ) : (
                                <Moon className="text-gray-600 dark:text-gray-400" size={20} />
                            )}
                        </button>
                        
                        {/* Action Buttons */}
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium">
                            <RefreshCw size={16} />
                            Refresh
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium">
                            <Download size={16} />
                            Export
                        </button>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Revenue"
                        value={`$${getCurrentTotal('revenue').toLocaleString()}`}
                        change={getGrowthRate('revenue')}
                        icon={DollarSign}
                        color="bg-green-500"
                    />
                    <StatCard
                        title="Total Orders"
                        value={getCurrentTotal('orders').toLocaleString()}
                        change={getGrowthRate('orders')}
                        icon={ShoppingCart}
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="Customers"
                        value={customerData.totalCustomers.toLocaleString()}
                        change="12.5"
                        icon={Users}
                        color="bg-purple-500"
                    />
                    <StatCard
                        title="Avg Order Value"
                        value={`$${(getCurrentTotal('revenue') / getCurrentTotal('orders')).toFixed(2)}`}
                        change="8.2"
                        icon={TrendingUp}
                        color="bg-orange-500"
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Revenue Trend */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
                            <div className="flex gap-2">
                                {['revenue', 'orders', 'customers'].map((metric) => (
                                    <button
                                        key={metric}
                                        onClick={() => setSelectedMetric(metric as any)}
                                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                            selectedMetric === metric
                                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        {metric.charAt(0).toUpperCase() + metric.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                                <XAxis 
                                    dataKey="date" 
                                    stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
                                    tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
                                />
                                <YAxis 
                                    stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
                                    tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey={selectedMetric}
                                    stroke="#3B82F6"
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Category Distribution */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Sales by Category</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <RechartsPieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${percent !== undefined ? (percent * 100).toFixed(0) : '0'}%`}
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Peak Hours Chart */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Peak Hours Analysis</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={peakHoursData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#E5E7EB'} />
                            <XAxis 
                                dataKey="hour" 
                                stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
                                tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
                            />
                            <YAxis 
                                stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
                                tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="orders" fill="#3B82F6" name="Orders" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Menu Items */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Menu Items</h3>
                            <button className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                                <Eye size={14} />
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            {topMenuItems.map((item, index) => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-semibold text-sm">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{item.category}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900 dark:text-white">${item.revenue.toFixed(2)}</p>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">{item.rating}</span>
                                            <span className="text-sm text-gray-500 dark:text-gray-500">({item.orders})</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customer Analytics */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Customer Analytics</h3>
                        <div className="space-y-6">
                            {/* Customer Distribution */}
                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-gray-600 dark:text-gray-400">New Customers</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{customerData.newCustomers}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div 
                                        className="bg-blue-500 h-2 rounded-full" 
                                        style={{ width: `${(customerData.newCustomers / customerData.totalCustomers) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-gray-600 dark:text-gray-400">Returning Customers</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{customerData.returningCustomers}</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div 
                                        className="bg-green-500 h-2 rounded-full" 
                                        style={{ width: `${(customerData.returningCustomers / customerData.totalCustomers) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                        {((customerData.returningCustomers / customerData.totalCustomers) * 100).toFixed(1)}%
                                    </div>
                                    <div className="text-sm text-blue-700 dark:text-blue-300">Customer Retention</div>
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
                                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">4.7</div>
                                    <div className="text-sm text-green-700 dark:text-green-300">Avg Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantAnalytics;

 {/* Summary */}
        //   <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
        //     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Menu Summary</h3>
        //     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        //       <div className="text-center">
        //         <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{menuItems.length}</div>
        //         <div className="text-gray-600 dark:text-gray-400">Total Items</div>
        //       </div>
        //       <div className="text-center">
        //         <div className="text-2xl font-bold text-green-600 dark:text-green-400">{menuItems.filter(item => item.isAvailable).length}</div>
        //         <div className="text-gray-600 dark:text-gray-400">Available</div>
        //       </div>
        //       <div className="text-center">
        //         <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{menuItems.filter(item => item.isVegetarian).length}</div>
        //         <div className="text-gray-600 dark:text-gray-400">Vegetarian</div>
        //       </div>
        //       <div className="text-center">
        //         <div className="text-2xl font-bold text-red-600 dark:text-red-400">{menuItems.filter(item => item.isSpicy).length}</div>
        //         <div className="text-gray-600 dark:text-gray-400">Spicy</div>
        //       </div>
        //     </div>
        //   </div>



        // <div className="mb-8">
        //   <div className="flex flex-wrap gap-2 justify-center">
        //     {categories.map(category => (
        //       <button
        //         key={category.id}
        //         onClick={() => setActiveCategory(category.id)}
        //         className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
        //           activeCategory === category.id
        //             ? 'bg-red-600 text-white'
        //             : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
        //         }`}
        //       >
        //         <span className="mr-2">{category.icon}</span>
        //         {category.name}
        //       </button>
        //     ))}
        //   </div>
        // </div>