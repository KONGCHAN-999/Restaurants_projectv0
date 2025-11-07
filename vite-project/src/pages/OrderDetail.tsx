import React, { useState } from 'react';
import {
  X,
  Clock,
  Users,
  MapPin,
  Phone,
  CreditCard,
  Receipt,
  Printer,
  Download,
  Edit3,
  Check,
  AlertCircle,
  ChefHat,
  DollarSign,
  Calendar,
  Star,
  Utensils,
  Coffee,
  Wine,
  Cake
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  category: 'appetizer' | 'main' | 'dessert' | 'beverage';
  quantity: number;
  price: number;
  notes?: string;
  status: 'pending' | 'preparing' | 'ready' | 'served';
  customizations?: string[];
}

interface OrderDetails {
  id: string;
  tableNumber: number;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled';
  priority: 'low' | 'normal' | 'high';
  orderTime: Date;
  servedTime?: Date;
  estimatedTime: number;
  subtotal: number;
  tax: number;
  tip: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'digital' | 'pending';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  notes?: string;
  waiter: string;
  waiterId: string;
  specialRequests?: string[];
}

interface OrderDetailViewProps {
  order: OrderDetails;
  onClose: () => void;
  onUpdateOrder?: (orderId: string, updates: Partial<OrderDetails>) => void;
}

export default function OrderDetailView({ order, onClose, onUpdateOrder }: OrderDetailViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(order.notes || '');
  const [editedTip, setEditedTip] = useState(order.tip);

  // Sample order data for demonstration
  const sampleOrder: OrderDetails = {
    id: 'ORD-001',
    tableNumber: 5,
    customerName: 'Johnson Family',
    customerPhone: '+1 (555) 123-4567',
    customerEmail: 'johnson.family@email.com',
    items: [
      {
        id: '1',
        name: 'Grilled Atlantic Salmon',
        category: 'main',
        quantity: 2,
        price: 24.99,
        status: 'served',
        notes: 'Extra lemon on the side',
        customizations: ['No skin', 'Medium cooking']
      },
      {
        id: '2',
        name: 'Caesar Salad',
        category: 'appetizer',
        quantity: 1,
        price: 12.50,
        status: 'served',
        customizations: ['Extra croutons', 'Dressing on side']
      },
      {
        id: '3',
        name: 'Wine - Chardonnay',
        category: 'beverage',
        quantity: 1,
        price: 8.99,
        status: 'served'
      },
      {
        id: '4',
        name: 'Chocolate Lava Cake',
        category: 'dessert',
        quantity: 1,
        price: 9.99,
        status: 'served',
        notes: 'Vanilla ice cream instead of whipped cream'
      },
      {
        id: '5',
        name: 'Sparkling Water',
        category: 'beverage',
        quantity: 2,
        price: 3.50,
        status: 'served'
      }
    ],
    status: 'served',
    priority: 'high',
    orderTime: new Date(Date.now() - 90 * 60000),
    servedTime: new Date(Date.now() - 15 * 60000),
    estimatedTime: 45,
    subtotal: 66.97,
    tax: 5.36,
    tip: 12.00,
    discount: 3.33,
    total: 81.00,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    waiter: 'Sarah Mitchell',
    waiterId: 'EMP-023',
    notes: 'Customer allergic to nuts - informed kitchen staff',
    specialRequests: ['Quiet table requested', 'Celebrating anniversary', 'No nuts in any dish']
  };

  const displayOrder = order || sampleOrder;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'appetizer': return <Utensils className="w-4 h-4" />;
      case 'main': return <ChefHat className="w-4 h-4" />;
      case 'dessert': return <Cake className="w-4 h-4" />;
      case 'beverage': return <Coffee className="w-4 h-4" />;
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'preparing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'ready': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'served': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-green-600 dark:text-green-400';
      case 'pending': return 'text-yellow-600 dark:text-yellow-400';
      case 'refunded': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const handleSaveEdit = () => {
    if (onUpdateOrder) {
      onUpdateOrder(displayOrder.id, {
        notes: editedNotes,
        tip: editedTip,
        total: displayOrder.subtotal + displayOrder.tax + editedTip - displayOrder.discount
      });
    }
    setIsEditing(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Receipt className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Order Details & Bill</h2>
                <p className="text-blue-100">Order ID: {displayOrder.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors">
                <Printer className="w-5 h-5" />
              </button>
              <button className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Order Status & Info */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Customer & Table Info */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customer Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{displayOrder.customerName}</div>
                    {displayOrder.customerPhone && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">{displayOrder.customerPhone}</div>
                    )}
                    {displayOrder.customerEmail && (
                      <div className="text-sm text-gray-600 dark:text-gray-400">{displayOrder.customerEmail}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-900 dark:text-white">Table {displayOrder.tableNumber}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">Served by: {displayOrder.waiter}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">ID: {displayOrder.waiterId}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Status & Timing */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Status</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-2 rounded-xl text-sm font-medium ${getStatusColor(displayOrder.status)}`}>
                    {displayOrder.status.toUpperCase()}
                  </span>
                  {displayOrder.priority === 'high' && (
                    <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 px-3 py-1 rounded-xl text-sm font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      High Priority
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{formatDate(displayOrder.orderTime)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Ordered at {formatTime(displayOrder.orderTime)}</div>
                  </div>
                </div>
                {displayOrder.servedTime && (
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Served at {formatTime(displayOrder.servedTime)}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Total time: {Math.round((displayOrder.servedTime.getTime() - displayOrder.orderTime.getTime()) / 60000)} minutes
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Items</h3>
            <div className="space-y-4">
              {displayOrder.items.map((item, index) => (
                <div key={item.id} className="bg-white dark:bg-gray-700 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          {getCategoryIcon(item.category)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {item.quantity}x {item.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                            {item.category}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(item.status)}`}>
                          {item.status}
                        </span>
                      </div>
                      
                      {item.customizations && item.customizations.length > 0 && (
                        <div className="mb-2">
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customizations:</div>
                          <div className="flex flex-wrap gap-1">
                            {item.customizations.map((custom, idx) => (
                              <span key={idx} className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-lg text-xs">
                                {custom}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {item.notes && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-2 mb-2">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-yellow-800 dark:text-yellow-200">{item.notes}</div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        ${item.price.toFixed(2)} each
                      </div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Requests & Notes */}
          {(displayOrder.specialRequests || displayOrder.notes) && (
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-200 dark:border-amber-800">
              <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-4">Special Notes & Requests</h3>
              
              {displayOrder.specialRequests && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">Special Requests:</div>
                  <div className="space-y-1">
                    {displayOrder.specialRequests.map((request, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Star className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        <span className="text-sm text-amber-700 dark:text-amber-300">{request}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {displayOrder.notes && (
                <div>
                  <div className="text-sm font-medium text-amber-800 dark:text-amber-200 mb-2">Order Notes:</div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    {isEditing ? (
                      <div className="flex-1">
                        <textarea
                          value={editedNotes}
                          onChange={(e) => setEditedNotes(e.target.value)}
                          className="w-full p-2 border border-amber-300 dark:border-amber-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                          rows={2}
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={handleSaveEdit}
                            className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-sm text-amber-700 dark:text-amber-300">{displayOrder.notes}</span>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="ml-2 p-1 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bill Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Bill Summary</h3>
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                  {displayOrder.paymentMethod}
                </span>
                <span className={`text-sm font-medium capitalize ${getPaymentStatusColor(displayOrder.paymentStatus)}`}>
                  {displayOrder.paymentStatus}
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Subtotal ({displayOrder.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>${displayOrder.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Tax (8%)</span>
                <span>${displayOrder.tax.toFixed(2)}</span>
              </div>
              
              {displayOrder.discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Discount</span>
                  <span>-${displayOrder.discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Tip</span>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedTip}
                    onChange={(e) => setEditedTip(parseFloat(e.target.value) || 0)}
                    className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm text-right"
                    step="0.01"
                    min="0"
                  />
                ) : (
                  <span>${displayOrder.tip.toFixed(2)}</span>
                )}
              </div>
              
              <div className="border-t border-gray-300 dark:border-gray-600 pt-3">
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>${displayOrder.total.toFixed(2)}</span>
                </div>
              </div>
              
              {displayOrder.paymentStatus === 'paid' && (
                <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 mt-4">
                  <div className="flex items-center gap-3">
                    <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <div>
                      <div className="font-semibold text-green-800 dark:text-green-200">Payment Completed</div>
                      <div className="text-sm text-green-600 dark:text-green-400">
                        Paid via {displayOrder.paymentMethod} • Receipt available
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium">
              <Printer className="w-4 h-4" />
              Print Receipt
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-medium">
              <Receipt className="w-4 h-4" />
              Email Receipt
            </button>
            {displayOrder.paymentStatus === 'paid' && (
              <button className="flex items-center gap-2 px-6 py-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors font-medium">
                <CreditCard className="w-4 h-4" />
                Process Refund
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}