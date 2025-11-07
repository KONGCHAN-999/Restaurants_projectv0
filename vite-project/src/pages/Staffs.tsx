import React, { useState } from "react";
import { Plus, Edit2, Save, X, Trash2, User, CalendarCheck2, CalendarX2, Sun } from "lucide-react";

type Staff = {
  id: string;
  name: string;
  role: string;
  email: string;
  status: "present" | "absent" | "vacation";
  vacationDays: number; // days taken this month
};

export default function Staffs() {
  const [staffs, setStaffs] = useState<Staff[]>([
    { id: "1", name: "Alice Johnson", role: "Manager", email: "alice@bistro.com", status: "present", vacationDays: 2 },
    { id: "2", name: "Bob Smith", role: "Chef", email: "bob@bistro.com", status: "vacation", vacationDays: 5 },
    { id: "3", name: "Carol Lee", role: "Waiter", email: "carol@bistro.com", status: "absent", vacationDays: 0 }
  ]);
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [newStaff, setNewStaff] = useState<Omit<Staff, "id">>({ name: "", role: "", email: "", status: "present", vacationDays: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStaff, setEditStaff] = useState<Omit<Staff, "id">>({ name: "", role: "", email: "", status: "present", vacationDays: 0 });
  const [removingStaffId, setRemovingStaffId] = useState<string | null>(null);

  // Add staff
  const addStaff = () => {
    if (newStaff.name && newStaff.role && newStaff.email) {
      setStaffs([...staffs, { ...newStaff, id: Date.now().toString() }]);
      setNewStaff({ name: "", role: "", email: "", status: "present", vacationDays: 0 });
      setIsAddingStaff(false);
    }
  };

  // Edit staff
  const saveEditStaff = () => {
    setStaffs(staffs.map(s => (s.id === editingId ? { ...s, ...editStaff } : s)));
    setEditingId(null);
    setEditStaff({ name: "", role: "", email: "", status: "present", vacationDays: 0 });
  };

  // Remove staff (confirmed)
  const confirmRemoveStaff = () => {
    if (removingStaffId) {
      setStaffs(staffs.filter(s => s.id !== removingStaffId));
      setRemovingStaffId(null);
    }
  };

  // Update status
  const updateStatus = (id: string, status: Staff["status"]) => {
    setStaffs(staffs.map(s => s.id === id ? { ...s, status } : s));
  };

  // Update vacation days
  const updateVacationDays = (id: string, days: number) => {
    setStaffs(staffs.map(s => s.id === id ? { ...s, vacationDays: days } : s));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900 p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Staff Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your restaurant's staff members and roles</p>
          </div>
          <button
            onClick={() => setIsAddingStaff(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
          >
            <Plus size={20} />
            Add New Staff
          </button>
        </div>

        {/* Staff Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Staff Overview</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{staffs.length}</div>
              <div className="text-gray-600 dark:text-gray-400">Total Staff</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {staffs.filter(s => s.role.toLowerCase() === "manager").length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Managers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {staffs.filter(s => s.role.toLowerCase() === "chef").length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Chefs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {staffs.filter(s => s.role.toLowerCase() === "waiter").length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Waiters</div>
            </div>
          </div>
        </div>

        {/* Staff List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {staffs.map(staff => (
            <div
              key={staff.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4 p-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-3">
                  <User className="text-blue-600 dark:text-blue-400" size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{staff.name}</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{staff.role}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">{staff.email}</div>
                  {/* Status */}
                  <div className="mt-2 flex items-center gap-2">
                    {staff.status === "present" && (
                      <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
                        <CalendarCheck2 size={16} /> Present
                      </span>
                    )}
                    {staff.status === "absent" && (
                      <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold">
                        <CalendarX2 size={16} /> Absent
                      </span>
                    )}
                    {staff.status === "vacation" && (
                      <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 font-semibold">
                        <Sun size={16} /> On Vacation
                      </span>
                    )}
                  </div>
                  {/* Vacation Days */}
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Vacation days this month: <span className="font-bold">{staff.vacationDays}</span>
                  </div>
                  {/* Controls to update status and vacation */}
                  <div className="mt-2 flex gap-2 flex-wrap">
                    <button
                      onClick={() => updateStatus(staff.id, "present")}
                      className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-semibold hover:bg-green-200"
                    >
                      Present
                    </button>
                    <button
                      onClick={() => updateStatus(staff.id, "absent")}
                      className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200"
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => updateStatus(staff.id, "vacation")}
                      className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold hover:bg-yellow-200"
                    >
                      Vacation
                    </button>
                    <input
                      type="number"
                      min={0}
                      max={31}
                      value={staff.vacationDays}
                      onChange={e => updateVacationDays(staff.id, Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded border border-gray-200 text-xs"
                      title="Vacation days this month"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 p-4 border-t border-gray-100 dark:border-gray-700">
                <button
                  onClick={() => {
                    setEditingId(staff.id);
                    setEditStaff({ name: staff.name, role: staff.role, email: staff.email, status: staff.status, vacationDays: staff.vacationDays });
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors font-medium"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => setRemovingStaffId(staff.id)}
                  className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Staff Modal */}
        {isAddingStaff && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add New Staff</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newStaff.name}
                  onChange={e => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={newStaff.role}
                  onChange={e => setNewStaff({ ...newStaff, role: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newStaff.email}
                  onChange={e => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={addStaff}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
                >
                  <Save size={16} />
                  Save Staff
                </button>
                <button
                  onClick={() => setIsAddingStaff(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors font-medium"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Staff Modal */}
        {editingId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Staff</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={editStaff.name}
                  onChange={e => setEditStaff({ ...editStaff, name: e.target.value })}
                  className="w-full font-bold rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={editStaff.role}
                  onChange={e => setEditStaff({ ...editStaff, role: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editStaff.email}
                  onChange={e => setEditStaff({ ...editStaff, email: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  onClick={saveEditStaff}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
                >
                  <Save size={16} />
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors font-medium"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Remove Staff Confirmation Modal */}
        {removingStaffId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Confirm Remove</h3>
              <p className="mb-6 text-gray-700 dark:text-gray-300">
                Are you sure you want to remove this staff member?
              </p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={confirmRemoveStaff}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
                >
                  <Trash2 size={16} />
                  Yes, Remove
                </button>
                <button
                  onClick={() => setRemovingStaffId(null)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors font-medium"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}