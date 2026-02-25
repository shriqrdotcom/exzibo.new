import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ReservationsScreen: React.FC = () => {
  const { addReservation } = useApp();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: 2,
    date: '',
    time: '',
    specialRequest: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReservation(formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({
      name: '',
      phone: '',
      guests: 2,
      date: '',
      time: '',
      specialRequest: ''
    });
  };

  if (isSubmitted) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-6 rounded-full bg-green-100 p-6 text-green-600"
        >
          <CheckCircle2 size={64} />
        </motion.div>
        <h2 className="font-serif text-3xl font-bold">Table Reserved!</h2>
        <p className="mt-2 text-gray-500">We've received your request. See you soon!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <header>
        <h1 className="font-serif text-3xl font-bold">Book a Table</h1>
        <p className="text-sm text-gray-500">Reserve your spot for a fine dining experience</p>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-gray-400">Full Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm focus:border-[#b32b1d] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-gray-400">Phone Number</label>
              <input
                required
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 234 567 890"
                className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-sm focus:border-[#b32b1d] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-400">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    required
                    type="date"
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-xl border border-gray-100 bg-gray-50 p-3 pl-10 text-sm focus:border-[#b32b1d] focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold uppercase text-gray-400">Time</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    required
                    type="time"
                    value={formData.time}
                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                    className="w-full rounded-xl border border-gray-100 bg-gray-50 p-3 pl-10 text-sm focus:border-[#b32b1d] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-gray-400">Number of Guests</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <select
                  value={formData.guests}
                  onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                  className="w-full appearance-none rounded-xl border border-gray-100 bg-gray-50 p-3 pl-10 text-sm focus:border-[#b32b1d] focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <option key={n} value={n}>{n} Guests</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold uppercase text-gray-400">Special Request</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-gray-400" size={16} />
                <textarea
                  value={formData.specialRequest}
                  onChange={e => setFormData({ ...formData, specialRequest: e.target.value })}
                  placeholder="Anniversary, allergies, etc."
                  rows={3}
                  className="w-full rounded-xl border border-gray-100 bg-gray-50 p-3 pl-10 text-sm focus:border-[#b32b1d] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-2xl bg-[#b32b1d] py-4 font-bold text-white shadow-lg shadow-red-200 transition-transform active:scale-95"
        >
          Confirm Reservation
        </button>
      </form>
    </div>
  );
};
