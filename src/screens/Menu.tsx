import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category } from '../types';
import { cn } from '../lib/utils';
import { SafeImage } from '../components/SafeImage';

export const MenuScreen: React.FC = () => {
  const { menu, addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  const categories: (Category | 'All')[] = ['All', 'Starters', 'Main Course', 'Drinks'];

  const filteredMenu = activeCategory === 'All' 
    ? menu 
    : menu.filter(item => item.category === activeCategory);

  return (
    <div className="flex flex-col gap-6 p-6">
      <header>
        <h1 className="font-serif text-3xl font-bold">Our Menu</h1>
        <p className="text-sm text-gray-500">Discover the taste of tradition</p>
      </header>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "whitespace-nowrap rounded-full px-6 py-2 text-sm font-medium transition-all",
              activeCategory === cat 
                ? "bg-[#b32b1d] text-white shadow-lg shadow-red-200" 
                : "bg-white text-gray-600 border border-gray-100"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu List */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filteredMenu.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex gap-4 rounded-3xl bg-white p-3 shadow-sm"
            >
              <SafeImage
                src={item.image}
                alt={item.name}
                className="h-24 w-24 rounded-2xl object-cover"
              />
              <div className="flex flex-1 flex-col justify-between py-1">
                <div>
                  <h3 className="font-bold leading-tight">{item.name}</h3>
                  <p className="mt-1 line-clamp-2 text-[10px] text-gray-400">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#b32b1d]">₹{item.price.toFixed(2)}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fdfaf6] text-[#b32b1d] transition-colors hover:bg-[#b32b1d] hover:text-white"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Floating Cart Button (Mobile feel) */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-24 right-6 z-40"
      >
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-[#b32b1d] text-white shadow-xl shadow-red-200">
          <ShoppingCart size={24} />
        </button>
      </motion.div>
    </div>
  );
};
