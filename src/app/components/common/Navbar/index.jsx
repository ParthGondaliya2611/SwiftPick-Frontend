import React, { useEffect, useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { MdDashboard } from "react-icons/md";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import Token from "../../../../utils/Token";

import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import FetchcartData from "../../../../utils/CartData";
import Searchinput from "../SearchInput";
import { useCart } from "../../../../context/CartContext";

const Navbar = ({ children }) => {
  const token = Token();
  const { cart, setcart } = useCart();
  const [isLogin, setIsLogin] = useState(token?.token ? true : false);

  const getcartProduct = async () => {
    const data = await FetchcartData(token);
    setcart(data?.cart?.products?.length);
  };

  useEffect(() => {
    getcartProduct();
    // eslint-disable-next-line
  }, []);

  const handleinput = () => {
    localStorage.removeItem("auth");
    setIsLogin(false);
    toast.success("Logged out successfully!");
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "py-1.5 px-6 bg-indigo-500/20 text-indigo-400 font-bold rounded-full border border-indigo-500/30 transition-all"
      : "py-1.5 px-6 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold rounded-full transition-all";

  return (
    <>
      <div className="min-h-screen bg-slate-950">
        <Disclosure
          as="nav"
          className="glass-panel sticky top-0 w-full z-50 border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              {/* Logo Area */}
              <div className="flex items-center gap-8">
                <Link to="/" className="flex-shrink-0 group">
                  <span className="text-2xl font-black text-gradient tracking-tighter group-hover:scale-105 transition-transform inline-block">
                    SWIFTPICK
                  </span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center space-x-2">
                  <NavLink to="/" className={navLinkClass}>Home</NavLink>
                  <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
                  <NavLink to="/services" className={navLinkClass}>Services</NavLink>
                </div>
              </div>

              {/* Desktop Icons/Profile */}
              <div className="hidden md:flex items-center gap-6">
                <div className="w-64">
                  <Searchinput />
                </div>
                
                <Link to="/cart" className="group">
                  <button type="button" className="relative p-2 rounded-xl glass hover:bg-white/10 transition-all text-slate-300 hover:text-white">
                    <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                    {cart > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white shadow-lg shadow-indigo-500/50">
                        {cart}
                      </span>
                    )}
                  </button>
                </Link>

                <Menu as="div" className="relative">
                  <MenuButton className="relative flex items-center rounded-full glass border-white/20 p-0.5 hover:border-indigo-500/50 transition-colors">
                    <img
                      alt="user"
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                      className="h-9 w-9 rounded-full bg-slate-800"
                    />
                  </MenuButton>

                  <MenuItems className="absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-2xl glass-panel p-2 shadow-2xl border border-white/10 focus:outline-none">
                    {isLogin === true ? (
                      <div className="space-y-1">
                        <MenuItem>
                          {({ active }) => (
                            <NavLink to="/dashboard" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${active ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-300 hover:bg-white/5'}`}>
                              <MdDashboard className="text-xl" /> Dashboard
                            </NavLink>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <NavLink to="/YourOrder" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${active ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-300 hover:bg-white/5'}`}>
                              <MdOutlineFavoriteBorder className="text-xl" /> My Orders
                            </NavLink>
                          )}
                        </MenuItem>
                        <div className="h-px bg-white/5 my-1" />
                        <MenuItem>
                          {({ active }) => (
                            <button onClick={handleinput} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${active ? 'bg-red-500/20 text-red-400' : 'text-slate-300 hover:bg-white/5'}`}>
                              <FiLogOut className="text-xl" /> Logout
                            </button>
                          )}
                        </MenuItem>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <MenuItem>
                          {({ active }) => (
                            <NavLink to="/login" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${active ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-300 hover:bg-white/5'}`}>
                              Login
                            </NavLink>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ active }) => (
                            <NavLink to="/register" className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${active ? 'bg-indigo-500/20 text-indigo-400' : 'text-slate-300 hover:bg-white/5'}`}>
                              Register
                            </NavLink>
                          )}
                        </MenuItem>
                      </div>
                    )}
                  </MenuItems>
                </Menu>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-4">
                <Link to="/cart" className="relative p-2 text-slate-300">
                  <ShoppingCartIcon className="h-6 w-6" />
                  {cart > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[8px] font-bold text-white">
                      {cart}
                    </span>
                  )}
                </Link>
                <DisclosureButton className="p-2 rounded-xl glass text-indigo-400">
                  <Bars3Icon className="block h-6 w-6 group-data-[open]:hidden" />
                  <XMarkIcon className="hidden h-6 w-6 group-data-[open]:block" />
                </DisclosureButton>
              </div>
            </div>
          </div>

          <DisclosurePanel className="md:hidden glass-panel border-t border-white/5 animate-fade-in">
            <div className="px-4 pt-2 pb-6 space-y-4">
              <div className="py-2">
                <Searchinput />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <NavLink to="/" className={({ isActive }) => `text-center py-2 text-sm font-medium rounded-xl ${isActive ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-slate-300'}`}>Home</NavLink>
                <NavLink to="/contact" className={({ isActive }) => `text-center py-2 text-sm font-medium rounded-xl ${isActive ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-slate-300'}`}>Contact</NavLink>
                <NavLink to="/services" className={({ isActive }) => `text-center py-2 text-sm font-medium rounded-xl ${isActive ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-slate-300'}`}>Services</NavLink>
              </div>
              
              <div className="pt-4 border-t border-white/5">
                {isLogin ? (
                  <div className="space-y-2">
                    <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-300 bg-white/5 rounded-xl">
                      <MdDashboard /> Dashboard
                    </Link>
                    <Link to="/YourOrder" className="flex items-center gap-3 px-4 py-3 text-slate-300 bg-white/5 rounded-xl">
                      <MdOutlineFavoriteBorder /> My Orders
                    </Link>
                    <button onClick={handleinput} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 bg-red-500/10 rounded-xl">
                      <FiLogOut /> Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Link to="/login" className="text-center py-3 bg-white/5 text-indigo-400 rounded-xl font-bold">Login</Link>
                    <Link to="/register" className="text-center py-3 bg-indigo-500 text-white rounded-xl font-bold">Register</Link>
                  </div>
                )}
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>

        <main className="animate-fade-in relative z-0 mt-0">
          {children}
        </main>
      </div>
    </>
  );
};

export default Navbar;
