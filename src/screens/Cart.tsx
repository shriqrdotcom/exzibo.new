import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { SafeImage } from '../components/SafeImage';

export const CartScreen: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, placeOrder } = useApp();
  const [isOrdered, setIsOrdered] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    placeOrder();
    setIsOrdered(true);
    setTimeout(() => setIsOrdered(false), 3000);
  };

  if (isOrdered) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="mb-6 rounded-full bg-green-100 p-6 text-green-600"
        >
          <CheckCircle2 size={64} />
        </motion.div>
        <h2 className="font-serif text-3xl font-bold">Order Placed!</h2>
        <p className="mt-2 text-gray-500">Your delicious meal is being prepared.</p>
        <Link
          to="/"
          className="mt-8 rounded-full bg-[#b32b1d] px-8 py-3 font-bold text-white"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center p-6 text-center">
        <div className="mb-6 rounded-full bg-gray-100 p-6 text-gray-400">
          <ShoppingBag size={64} />
        </div>
        <h2 className="font-serif text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">Looks like you haven't added anything yet.</p>
        <Link
          to="/menu"
          className="mt-8 rounded-full bg-[#b32b1d] px-8 py-3 font-bold text-white"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm font-medium text-gray-400 hover:text-red-500"
        >
          Clear All
        </button>
      </header>

      <div className="flex flex-col gap-4">
        <AnimatePresence>
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-4 rounded-3xl bg-white p-3 shadow-sm"
            >
              <SafeImage
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-2xl object-cover"
              />
              <div className="flex flex-1 flex-col gap-1">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm font-bold text-[#b32b1d]">₹{item.price.toFixed(2)}</p>
                <div className="mt-1 flex items-center gap-3">
                  <button
                    onClick={() => updateCartQuantity(item.id, -1)}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-gray-500"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, 1)}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-gray-500"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-gray-300 hover:text-red-500"
              >
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Summary */}
      <div className="mt-4 rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Delivery Fee</span>
            <span>₹40.00</span>
          </div>
          <div className="my-2 h-px bg-gray-100" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-[#b32b1d]">₹{(total + 40).toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={handlePlaceOrder}
          className="mt-6 w-full rounded-2xl bg-[#b32b1d] py-4 font-bold text-white shadow-lg shadow-red-200 transition-transform active:scale-95"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
