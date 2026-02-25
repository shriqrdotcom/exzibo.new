import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, Utensils, ShoppingCart, Calendar, User, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { cn } from '../lib/utils';

export const Layout: React.FC = () => {
  const { cart, isAdmin } = useApp();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fdfaf6] pb-20 font-sans text-[#2d241e]">
      {/* Main Content */}
      <main className="mx-auto max-w-md">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#e8d5c4] bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-md items-center justify-around py-3 px-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn("flex flex-col items-center gap-1 transition-colors", isActive ? "text-[#b32b1d]" : "text-[#8c7e73]")
            }
          >
            <Home size={22} />
            <span className="text-[10px] font-medium uppercase tracking-wider">Home</span>
          </NavLink>

          <NavLink
            to="/menu"
            className={({ isActive }) =>
              cn("flex flex-col items-center gap-1 transition-colors", isActive ? "text-[#b32b1d]" : "text-[#8c7e73]")
            }
          >
            <Utensils size={22} />
            <span className="text-[10px] font-medium uppercase tracking-wider">Menu</span>
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              cn("flex flex-col items-center gap-1 transition-colors relative", isActive ? "text-[#b32b1d]" : "text-[#8c7e73]")
            }
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#b32b1d] text-[10px] text-white">
                {cartCount}
              </span>
            )}
            <span className="text-[10px] font-medium uppercase tracking-wider">Cart</span>
          </NavLink>

          <NavLink
            to="/reservations"
            className={({ isActive }) =>
              cn("flex flex-col items-center gap-1 transition-colors", isActive ? "text-[#b32b1d]" : "text-[#8c7e73]")
            }
          >
            <Calendar size={22} />
            <span className="text-[10px] font-medium uppercase tracking-wider">Booking</span>
          </NavLink>

          <NavLink
            to={isAdmin ? "/admin/dashboard" : "/admin/login"}
            className={({ isActive }) =>
              cn("flex flex-col items-center gap-1 transition-colors", isActive ? "text-[#b32b1d]" : "text-[#8c7e73]")
            }
          >
            {isAdmin ? <ShieldCheck size={22} /> : <User size={22} />}
            <span className="text-[10px] font-medium uppercase tracking-wider">Admin</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};
