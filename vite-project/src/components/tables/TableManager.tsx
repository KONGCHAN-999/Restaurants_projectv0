import React, { useMemo, useState } from 'react';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Users,
  MapPin,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Filter,
  Grid,
  List,
  Eye,
  Settings,
  Coffee,
  Utensils
} from 'lucide-react';

interface Table {
  id: string;
  name: string;
  seats: number;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  notes?: string;
  location?: string;
  server?: string;
  reservedUntil?: Date;
  lastCleaned?: Date;
}

// Sample data for demonstration
const sampleTables: Table[] = [
  {
    id: '1',
    name: 'Table 1',
    seats: 4,
    status: 'available',
    location: 'Main Dining',
    server: 'Sarah M.',
    lastCleaned: new Date(Date.now() - 30 * 60000)
  },
  {
    id: '2',
    name: 'Table 2',
    seats: 2,
    status: 'occupied',
    location: 'Window Side',
    server: 'Mike R.',
    notes: 'VIP customer'
  },
  {
    id: '3',
    name: 'Table 3',
    seats: 6,
    status: 'reserved',
    location: 'Private Section',
    reservedUntil: new Date(Date.now() + 60 * 60000),
    notes: 'Birthday celebration'
  },
  {
    id: '4',
    name: 'Table 4',
    seats: 4,
    status: 'maintenance',
    location: 'Main Dining',
    notes: 'Chair needs repair'
  },
  {
    id: '5',
    name: 'Table 5',
    seats: 8,
    status: 'available',
    location: 'Terrace',
    server: 'Anna L.',
    lastCleaned: new Date(Date.now() - 15 * 60000)
  },
  {
    id: '6',
    name: 'Bar Counter',
    seats: 12,
    status: 'occupied',
    location: 'Bar Area',
    server: 'Tom K.'
  }
];

interface TableFormProps {
  initial: Table | null;
  onSubmit: (values: Omit<Table, 'id'>) => void;
  onCancel: () => void;
}

function TableForm({ initial, onSubmit, onCancel }: TableFormProps) {
  const [formData, setFormData] = useState({
    name: initial?.name || '',
    seats: initial?.seats || 2,
    status: initial?.status || 'available',
    location: initial?.location || '',
    notes: initial?.notes || '',
    server: initial?.server || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<Table, 'id'>);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Table Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
            placeholder="e.g., Table 1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Seats
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={formData.seats}
            onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
            required
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Table['status'] })}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="reserved">Reserved</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
            placeholder="e.g., Main Dining, Terrace"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Assigned Server
        </label>
        <input
          type="text"
          value={formData.server}
          onChange={(e) => setFormData({ ...formData, server: e.target.value })}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
          placeholder="e.g., Sarah M."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white resize-none"
          placeholder="Any special notes about this table..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
        >
          {initial?.id ? 'Update Table' : 'Create Table'}
        </button>
      </div>
    </form>
  );
}

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

function Modal({ open, title, onClose, children, actions }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {children}
        </div>
        {actions && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TableManager() {
  const [tables, setTables] = useState<Table[]>(sampleTables);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [editing, setEditing] = useState<Table | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Table | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filtered = tables;

    if (q) {
      filtered = filtered.filter(t =>
        [t.name, t.status, String(t.seats), t.notes ?? '', t.location ?? '', t.server ?? '']
          .join(' ')
          .toLowerCase()
          .includes(q)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter);
    }

    return filtered;
  }, [tables, query, statusFilter]);

  function add(values: Omit<Table, 'id'>) {
    const next: Table = {
      id: crypto.randomUUID(),
      ...values,
      lastCleaned: new Date()
    };
    const newList = [next, ...tables];
    setTables(newList);
    setEditing(null);
  }

  function update(values: Omit<Table, 'id'>) {
    if (!editing) return;
    const newList = tables.map(t =>
      t.id === editing.id ? { ...editing, ...values } : t
    );
    setTables(newList);
    setEditing(null);
  }

  function remove(item: Table) {
    const newList = tables.filter(t => t.id !== item.id);
    setTables(newList);
    setConfirmDelete(null);
  }

  const getStatusIcon = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'occupied':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'reserved':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'maintenance':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: Table['status']) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'occupied':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'maintenance':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800';
    }
  };

  const statusCounts = {
    available: tables.filter(t => t.status === 'available').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    reserved: tables.filter(t => t.status === 'reserved').length,
    maintenance: tables.filter(t => t.status === 'maintenance').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Table Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your restaurant tables and seating arrangements
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4 flex-wrap">
            <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {statusCounts.available}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Available</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {statusCounts.occupied}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Occupied</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {statusCounts.reserved}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Reserved</div>
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
                placeholder="Search tables by name, location, server..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              {['all', 'available', 'occupied', 'reserved', 'maintenance'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${statusFilter === status
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== 'all' && (
                    <span className="ml-2 bg-white/20 px-1.5 py-0.5 rounded-full text-xs">
                      {statusCounts[status as keyof typeof statusCounts]}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* View Toggle */}
           

            {/* Add Table Button */}
            <button
              onClick={() => setEditing({ id: '', name: '', seats: 2, status: 'available' })}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium shadow-lg"
            >
              <Plus className="w-5 h-5" />
              New Table
            </button>
          </div>
        </div>

        {/* Tables Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((table) => (
              <div
                key={table.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                        <Utensils className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {table.name}
                        </h3>
                        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {table.seats} seats
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(table.status)}`}>
                      {table.status}
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    {table.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {table.location}
                      </div>
                    )}
                    {table.server && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Coffee className="w-4 h-4" />
                        {table.server}
                      </div>
                    )}
                    {table.notes && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-2">
                        <div className="text-sm text-yellow-800 dark:text-yellow-200">
                          {table.notes}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditing(table)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors text-sm font-medium"
                    >
                      <Edit3 className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={() => setConfirmDelete(table)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm font-medium"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Table</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Seats</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Location</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Server</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {filtered.map((table) => (
                    <tr key={table.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Utensils className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{table.name}</div>
                            {table.notes && (
                              <div className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-32">
                                {table.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-gray-900 dark:text-white">
                          <Users className="w-4 h-4 text-gray-500" />
                          {table.seats}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(table.status)}`}>
                          {getStatusIcon(table.status)}
                          {table.status}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-900 dark:text-white">
                        {table.location || '—'}
                      </td>
                      <td className="py-4 px-6 text-gray-900 dark:text-white">
                        {table.server || '—'}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex gap-1">
                          <button
                            onClick={() => setEditing(table)}
                            className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setConfirmDelete(table)}
                            className="p-1 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
              <Utensils className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No tables found
              </h3>
              <p className="text-gray-500 dark:text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>
        )}

        {/* Modals */}
        <Modal
          open={!!editing}
          title={editing?.id ? 'Edit Table' : 'New Table'}
          onClose={() => setEditing(null)}
        >
          <TableForm
            initial={editing && editing.id ? editing : null}
            onSubmit={(values) => (editing && editing.id ? update(values) : add(values))}
            onCancel={() => setEditing(null)}
          />
        </Modal>

        <Modal
          open={!!confirmDelete}
          title="Delete Table"
          onClose={() => setConfirmDelete(null)}
          actions={
            <>
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete && remove(confirmDelete)}
                className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
              >
                Delete Table
              </button>
            </>
          }
        >
          <div className="text-center py-6">
            <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-xl mb-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <p className="text-gray-900 dark:text-white">
                Are you sure you want to delete <strong>{confirmDelete?.name}</strong>?
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}