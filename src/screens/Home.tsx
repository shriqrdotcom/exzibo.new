import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SafeImage } from '../components/SafeImage';

export const HomeScreen: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <SafeImage
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format"
          alt="Restaurant Interior"
          className="h-full w-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-5xl font-bold tracking-tight text-[#f1c40f]">
              Saffron <span className="text-white">&</span> Spice
            </h1>
            <p className="mt-4 text-lg font-light italic text-gray-200">
              Authentic Indian Flavors, Modern Elegance
            </p>
            <Link
              to="/menu"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#b32b1d] px-8 py-3 font-semibold text-white transition-transform hover:scale-105 active:scale-95"
            >
              Explore Menu <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="grid grid-cols-3 gap-4 px-6">
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm">
          <Star className="text-[#f1c40f]" size={20} />
          <span className="text-xs font-bold">4.9/5</span>
          <span className="text-[10px] text-gray-400 uppercase">Rating</span>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm">
          <Clock className="text-[#b32b1d]" size={20} />
          <span className="text-xs font-bold">20-30m</span>
          <span className="text-[10px] text-gray-400 uppercase">Delivery</span>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm">
          <MapPin className="text-[#27ae60]" size={20} />
          <span className="text-xs font-bold">2.4km</span>
          <span className="text-[10px] text-gray-400 uppercase">Distance</span>
        </div>
      </section>

      {/* Featured Items */}
      <section className="px-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold">Chef's Specials</h2>
          <Link to="/menu" className="text-sm font-medium text-[#b32b1d]">View All</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {[
            { name: 'Butter Chicken', price: '₹549', img: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop' },
            { name: 'Paneer Tikka', price: '₹349', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&auto=format&fit=crop' },
            { name: 'Dal Makhani', price: '₹399', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop' }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="min-w-[200px] overflow-hidden rounded-3xl bg-white shadow-md"
            >
              <SafeImage
                src={item.img}
                alt={item.name}
                className="h-32 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold">{item.name}</h3>
                <p className="mt-1 text-sm font-bold text-[#b32b1d]">{item.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Reservation Teaser */}
      <section className="mx-6 rounded-3xl bg-[#2d241e] p-8 text-white">
        <h2 className="font-serif text-2xl font-bold text-[#f1c40f]">Plan a Visit?</h2>
        <p className="mt-2 text-sm text-gray-300">Book your table in advance for a seamless dining experience.</p>
        <Link
          to="/reservations"
          className="mt-6 inline-block rounded-xl border border-[#f1c40f] px-6 py-2 text-sm font-bold text-[#f1c40f] transition-colors hover:bg-[#f1c40f] hover:text-[#2d241e]"
        >
          Book Now
        </Link>
      </section>
    </div>
  );
};
