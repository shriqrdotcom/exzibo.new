import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Calendar, 
  Utensils, 
  Check, 
  X, 
  Trash2, 
  Plus, 
  LogOut,
  Edit2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Category, MenuItem } from '../types';
import { cn } from '../lib/utils';
import { SafeImage } from '../components/SafeImage';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { 
    orders, reservations, menu, 
    updateOrderStatus, deleteOrder, 
    updateReservationStatus, deleteReservation,
    addMenuItem, updateMenuItem, deleteMenuItem,
    setIsAdmin 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'menu'>('orders');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const handleLogout = () => {
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">Manage your restaurant</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-red-50 hover:text-red-500"
        >
          <LogOut size={20} />
        </button>
      </header>

      {/* Admin Tabs */}
      <div className="flex gap-2 rounded-2xl bg-white p-1 shadow-sm">
        <button
          onClick={() => setActiveTab('orders')}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-sm font-bold transition-all",
            activeTab === 'orders' ? "bg-[#b32b1d] text-white" : "text-gray-500"
          )}
        >
          <ShoppingBag size={16} /> Orders
        </button>
        <button
          onClick={() => setActiveTab('reservations')}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-sm font-bold transition-all",
            activeTab === 'reservations' ? "bg-[#b32b1d] text-white" : "text-gray-500"
          )}
        >
          <Calendar size={16} /> Bookings
        </button>
        <button
          onClick={() => setActiveTab('menu')}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-xl py-2 text-sm font-bold transition-all",
            activeTab === 'menu' ? "bg-[#b32b1d] text-white" : "text-gray-500"
          )}
        >
          <Utensils size={16} /> Menu
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <AnimatePresence mode="wait">
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              {orders.length === 0 ? (
                <p className="py-10 text-center text-gray-400">No orders yet</p>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="rounded-3xl bg-white p-5 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-400">#{order.id}</span>
                      <span className={cn(
                        "rounded-full px-3 py-1 text-[10px] font-bold uppercase",
                        order.status === 'Pending' ? "bg-yellow-100 text-yellow-600" :
                        order.status === 'Confirmed' ? "bg-green-100 text-green-600" :
                        "bg-red-100 text-red-600"
                      )}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {order.items.map(item => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
                      <span className="font-bold text-[#b32b1d]">₹{order.total.toFixed(2)}</span>
                      <div className="flex gap-2">
                        {order.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => updateOrderStatus(order.id, 'Confirmed')}
                              className="rounded-full bg-green-50 p-2 text-green-600"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                              className="rounded-full bg-red-50 p-2 text-red-600"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => deleteOrder(order.id)}
                          className="rounded-full bg-gray-50 p-2 text-gray-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'reservations' && (
            <motion.div
              key="reservations"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              {reservations.length === 0 ? (
                <p className="py-10 text-center text-gray-400">No reservations yet</p>
              ) : (
                reservations.map(res => (
                  <div key={res.id} className="rounded-3xl bg-white p-5 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="font-bold">{res.name}</h3>
                      <span className={cn(
                        "rounded-full px-3 py-1 text-[10px] font-bold uppercase",
                        res.status === 'Pending' ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"
                      )}>
                        {res.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 text-xs text-gray-500">
                      <div className="flex items-center gap-2"><Calendar size={12} /> {res.date}</div>
                      <div className="flex items-center gap-2"><ShoppingBag size={12} /> {res.guests} Guests</div>
                      <div className="flex items-center gap-2"><Utensils size={12} /> {res.time}</div>
                      <div className="flex items-center gap-2"><ShoppingBag size={12} /> {res.phone}</div>
                    </div>
                    {res.specialRequest && (
                      <p className="mt-3 rounded-xl bg-gray-50 p-3 text-[10px] italic text-gray-400">
                        "{res.specialRequest}"
                      </p>
                    )}
                    <div className="mt-4 flex justify-end gap-2 border-t border-gray-50 pt-4">
                      {res.status === 'Pending' && (
                        <button
                          onClick={() => updateReservationStatus(res.id, 'Confirmed')}
                          className="rounded-full bg-green-50 p-2 text-green-600"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteReservation(res.id)}
                        className="rounded-full bg-gray-50 p-2 text-gray-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col gap-4"
            >
              <button
                onClick={() => setIsAddingItem(true)}
                className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 py-4 text-sm font-bold text-gray-400 hover:border-[#b32b1d] hover:text-[#b32b1d]"
              >
                <Plus size={18} /> Add New Item
              </button>

              {menu.map(item => (
                <div key={item.id} className="flex gap-4 rounded-3xl bg-white p-3 shadow-sm">
                  <SafeImage 
                    src={item.image} 
                    alt={item.name} 
                    className="h-16 w-16 rounded-xl object-cover" 
                  />
                  <div className="flex flex-1 flex-col justify-center">
                    <h3 className="text-sm font-bold">{item.name}</h3>
                    <span className="text-xs text-gray-400">{item.category} • ₹{item.price}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-2 text-gray-300 hover:text-blue-500"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteMenuItem(item.id)}
                      className="p-2 text-gray-300 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Add/Edit Modal */}
      {(isAddingItem || editingItem) && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm rounded-3xl bg-white p-6"
          >
            <h2 className="mb-4 font-serif text-xl font-bold">
              {editingItem ? 'Edit Item' : 'Add New Item'}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  name: formData.get('name') as string,
                  category: formData.get('category') as Category,
                  price: parseFloat(formData.get('price') as string),
                  image: formData.get('image') as string,
                  description: formData.get('description') as string,
                };
                if (editingItem) {
                  updateMenuItem({ ...data, id: editingItem.id });
                } else {
                  addMenuItem(data);
                }
                setIsAddingItem(false);
                setEditingItem(null);
              }}
              className="flex flex-col gap-3"
            >
              <input required name="name" defaultValue={editingItem?.name} placeholder="Item Name" className="rounded-xl bg-gray-50 p-3 text-sm" />
              <select required name="category" defaultValue={editingItem?.category} className="rounded-xl bg-gray-50 p-3 text-sm">
                <option value="Starters">Starters</option>
                <option value="Main Course">Main Course</option>
                <option value="Drinks">Drinks</option>
              </select>
              <input required name="price" type="number" step="0.01" defaultValue={editingItem?.price} placeholder="Price" className="rounded-xl bg-gray-50 p-3 text-sm" />
              <input required name="image" defaultValue={editingItem?.image} placeholder="Image URL" className="rounded-xl bg-gray-50 p-3 text-sm" />
              <textarea required name="description" defaultValue={editingItem?.description} placeholder="Description" rows={2} className="rounded-xl bg-gray-50 p-3 text-sm" />
              
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => { setIsAddingItem(false); setEditingItem(null); }}
                  className="flex-1 rounded-xl bg-gray-100 py-3 text-sm font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-[#b32b1d] py-3 text-sm font-bold text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
