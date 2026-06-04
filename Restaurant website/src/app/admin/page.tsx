'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getMenuItems,
  saveMenuItem,
  deleteMenuItem,
  getReservations,
  updateReservationStatus,
  isSupabaseConfigured,
  MenuItem,
  Reservation
} from '../../lib/db';

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Data State
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeTab, setActiveTab] = useState<'reservations' | 'menu' | 'database'>('reservations');
  const [loading, setLoading] = useState(true);

  // New Menu Item Form State
  const [newItem, setNewItem] = useState({
    category: 'Tasting Menu',
    course: '',
    name: '',
    desc: '',
    price: ''
  });

  // Access validation
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === 'elan2026') {
      setAuthorized(true);
      setAuthError('');
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('elan_admin_authed', 'true');
      }
    } else {
      setAuthError('Invalid Access Code');
    }
  };

  // Load state on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuthed = sessionStorage.getItem('elan_admin_authed');
      if (isAuthed === 'true') {
        setAuthorized(true);
      }
    }
  }, []);

  // Fetch data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [resData, menuData] = await Promise.all([
        getReservations(),
        getMenuItems()
      ]);
      setReservations(resData);
      setMenuItems(menuData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authorized) {
      loadData();
    }
  }, [authorized, loadData]);

  // Handle Reservation status updates
  const handleUpdateStatus = async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      const updated = await updateReservationStatus(id, status);
      if (updated) {
        setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    }
  };

  // Handle adding a menu item
  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.course || !newItem.price) {
      alert('Please fill out Name, Course, and Price.');
      return;
    }

    try {
      const saved = await saveMenuItem(newItem);
      setMenuItems(prev => [...prev, saved]);
      // Reset form (keep category)
      setNewItem(prev => ({
        ...prev,
        course: '',
        name: '',
        desc: '',
        price: ''
      }));
    } catch (err) {
      console.error(err);
      alert('Failed to add menu item.');
    }
  };

  // Handle deleting a menu item
  const handleDeleteMenuItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    try {
      const success = await deleteMenuItem(id);
      if (success) {
        setMenuItems(prev => prev.filter(i => i.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete item.');
    }
  };

  // Log out
  const handleLogout = () => {
    setAuthorized(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('elan_admin_authed');
    }
  };

  const sqlCode = `-- Create menu_items table
create table public.menu_items (
  id uuid default gen_random_uuid() primary key,
  category text not null,
  course text not null,
  name text not null,
  "desc" text,
  price text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create reservations table
create table public.reservations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  date date not null,
  time time not null,
  guests text not null,
  requests text,
  table_id text not null,
  status text default 'confirmed'::text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS & Add Public Access Policies (for anon API keys)
alter table public.menu_items enable row level security;
alter table public.reservations enable row level security;

create policy "Allow public read access to menu_items" on public.menu_items for select using (true);
create policy "Allow public write access to menu_items" on public.menu_items for all using (true);
create policy "Allow public read access to reservations" on public.reservations for select using (true);
create policy "Allow public write access to reservations" on public.reservations for all using (true);`;

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-4 font-sans text-[#f0ece4]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md p-8 bg-[#121218] border border-[#d4a853]/15 shadow-2xl rounded-sm text-center"
        >
          <h1 className="text-xl font-light tracking-[0.3em] uppercase mb-2 text-[#f0ece4] font-serif">
            ÉLAN PARIS
          </h1>
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8694] mb-8">
            Staff Portal Administration
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 text-left">
              <label htmlFor="code" className="text-[10px] uppercase tracking-[0.25em] text-[#8a8694]">
                Staff Access Code
              </label>
              <input
                id="code"
                type="password"
                placeholder="••••••••"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                required
                className="w-full bg-transparent border-b border-[#d4a853]/25 py-3 text-center text-lg text-[#f0ece4] placeholder:text-[#8a8694]/25 focus:outline-none focus:border-[#d4a853] transition-colors"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-500 tracking-wider uppercase">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-[#d4a853] text-[#0a0a0f] uppercase tracking-[0.3em] text-[10px] font-semibold hover:bg-[#e8c97a] hover:shadow-[0_0_20px_rgba(212,168,83,0.3)] transition-all duration-300 rounded-sm cursor-pointer"
            >
              Authenticate Portal
            </button>
          </form>

          <div className="mt-8 text-[9px] tracking-[0.15em] uppercase text-[#8a8694]/40">
            <Link href="/" className="hover:text-[#d4a853] transition-colors">
              ← Return to Main Page
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0ece4] font-sans">
      {/* Header */}
      <header className="border-b border-[#d4a853]/15 bg-[#121218]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-light tracking-[0.35em] uppercase text-[#f0ece4] font-serif hover:text-[#d4a853] transition-colors">
            ÉLAN
          </Link>
          <span className="text-[9px] uppercase tracking-[0.2em] bg-[#d4a853]/10 text-[#d4a853] border border-[#d4a853]/20 px-2 py-0.5 rounded-sm">
            Admin Dashboard
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="text-[9px] uppercase tracking-[0.2em] text-[#8a8694] hover:text-[#d4a853] transition-colors border border-[#d4a853]/10 px-3 py-1.5 rounded-sm bg-transparent cursor-pointer"
        >
          Logout
        </button>
      </header>

      <div className="max-w-7xl mx-auto p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 flex flex-col space-y-2">
          <button
            onClick={() => setActiveTab('reservations')}
            className={`w-full text-left px-5 py-4 text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 border cursor-pointer ${
              activeTab === 'reservations'
                ? 'bg-[#d4a853]/10 border-[#d4a853] text-[#d4a853] font-medium'
                : 'bg-[#121218]/40 border-white/5 text-[#8a8694] hover:bg-[#121218] hover:text-[#f0ece4]'
            }`}
          >
            Reservations ({reservations.length})
          </button>
          <button
            onClick={() => setActiveTab('menu')}
            className={`w-full text-left px-5 py-4 text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 border cursor-pointer ${
              activeTab === 'menu'
                ? 'bg-[#d4a853]/10 border-[#d4a853] text-[#d4a853] font-medium'
                : 'bg-[#121218]/40 border-white/5 text-[#8a8694] hover:bg-[#121218] hover:text-[#f0ece4]'
            }`}
          >
            Menu Editor ({menuItems.length})
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`w-full text-left px-5 py-4 text-xs uppercase tracking-[0.2em] rounded-sm transition-all duration-300 border cursor-pointer ${
              activeTab === 'database'
                ? 'bg-[#d4a853]/10 border-[#d4a853] text-[#d4a853] font-medium'
                : 'bg-[#121218]/40 border-white/5 text-[#8a8694] hover:bg-[#121218] hover:text-[#f0ece4]'
            }`}
          >
            Database Settings
          </button>

          {/* Connection Pill */}
          <div className="mt-8 p-4 bg-[#121218]/40 border border-[#d4a853]/10 rounded-sm">
            <p className="text-[8px] uppercase tracking-[0.2em] text-[#8a8694] mb-2">Backend Connection</p>
            <div className="flex items-center gap-2">
              <span className={`w-2 height-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} style={{ height: '8px', width: '8px' }} />
              <span className="text-[10px] font-semibold tracking-wider uppercase text-[#f0ece4]">
                {isSupabaseConfigured ? 'Supabase Live' : 'LocalStorage Demo'}
              </span>
            </div>
            {!isSupabaseConfigured && (
              <p className="text-[9px] text-[#8a8694] mt-2 leading-relaxed">
                Running in Demo Mode. Connect Supabase to save changes permanently.
              </p>
            )}
          </div>
        </aside>

        {/* Dashboard Panels */}
        <main className="lg:col-span-9">
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="text-xs uppercase tracking-[0.3em] text-[#d4a853] animate-pulse">
                Fetching records...
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {/* RESERVATIONS TAB */}
              {activeTab === 'reservations' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-[#d4a853]/15 pb-4">
                    <h2 className="text-2xl font-light tracking-widest uppercase font-serif text-[#f0ece4]">
                      Reservations List
                    </h2>
                    <button
                      onClick={loadData}
                      className="text-[9px] uppercase tracking-[0.25em] text-[#d4a853] hover:text-[#e8c97a] border border-[#d4a853]/20 bg-transparent px-3 py-1.5 rounded-sm cursor-pointer"
                    >
                      Refresh
                    </button>
                  </div>

                  {reservations.length === 0 ? (
                    <div className="p-12 border border-[#d4a853]/10 bg-[#121218]/20 rounded-sm text-center">
                      <p className="text-sm font-light text-[#8a8694] uppercase tracking-wider">No reservations found.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reservations.map(res => (
                        <div
                          key={res.id}
                          className="bg-[#121218]/40 border border-[#d4a853]/15 p-6 rounded-sm space-y-4 hover:shadow-[0_0_15px_rgba(212,168,83,0.03)] transition-all"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#d4a853]/10 pb-3">
                            <div className="space-y-1">
                              <h3 className="text-lg font-light tracking-wide text-[#f0ece4] font-serif">{res.name}</h3>
                              <p className="text-xs text-[#8a8694] font-light">
                                {res.email} • {res.phone || 'No phone'}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-[9px] uppercase tracking-[0.2em] px-2 py-1 rounded-sm border font-light ${
                                res.status === 'confirmed'
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                  : res.status === 'cancelled'
                                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                                    : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                              }`}>
                                {res.status}
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-light">
                            <div>
                              <p className="text-[9px] uppercase tracking-[0.2em] text-[#8a8694] mb-1">Date</p>
                              <p className="text-[#f0ece4]">{res.date}</p>
                            </div>
                            <div>
                              <p className="text-[9px] uppercase tracking-[0.2em] text-[#8a8694] mb-1">Time</p>
                              <p className="text-[#f0ece4]">{res.time}</p>
                            </div>
                            <div>
                              <p className="text-[9px] uppercase tracking-[0.2em] text-[#8a8694] mb-1">Guests</p>
                              <p className="text-[#f0ece4]">{res.guests}</p>
                            </div>
                            <div>
                              <p className="text-[9px] uppercase tracking-[0.2em] text-[#8a8694] mb-1">Preferred Table</p>
                              <p className="text-[#d4a853] uppercase tracking-wider font-semibold">{res.table_id}</p>
                            </div>
                          </div>

                          {res.requests && (
                            <div className="bg-[#121218]/80 p-3 rounded-sm border border-white/5 text-xs text-[#8a8694] leading-relaxed">
                              <span className="text-[9px] uppercase tracking-[0.2em] text-[#d4a853] block mb-1">Special Requests</span>
                              {res.requests}
                            </div>
                          )}

                          <div className="flex justify-end gap-3 pt-2 border-t border-white/5">
                            {res.status !== 'cancelled' && (
                              <button
                                onClick={() => handleUpdateStatus(res.id, 'cancelled')}
                                className="text-[9px] uppercase tracking-[0.2em] text-rose-400 hover:text-rose-300 px-3 py-1.5 border border-rose-500/20 hover:border-rose-500/40 rounded-sm bg-transparent cursor-pointer transition-colors"
                              >
                                Cancel Booking
                              </button>
                            )}
                            {res.status !== 'confirmed' && (
                              <button
                                onClick={() => handleUpdateStatus(res.id, 'confirmed')}
                                className="text-[9px] uppercase tracking-[0.2em] text-emerald-400 hover:text-emerald-300 px-3 py-1.5 border border-emerald-500/20 hover:border-emerald-500/40 rounded-sm bg-transparent cursor-pointer transition-colors"
                              >
                                Confirm Booking
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* MENU EDITOR TAB */}
              {activeTab === 'menu' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  {/* Title */}
                  <div className="border-b border-[#d4a853]/15 pb-4">
                    <h2 className="text-2xl font-light tracking-widest uppercase font-serif text-[#f0ece4]">
                      Menu Items Manager
                    </h2>
                  </div>

                  {/* Add Item Form */}
                  <form onSubmit={handleAddMenuItem} className="bg-[#121218]/40 border border-[#d4a853]/15 p-6 rounded-sm space-y-6">
                    <h3 className="text-sm uppercase tracking-[0.2em] text-[#d4a853] font-serif border-b border-[#d4a853]/10 pb-2">
                      Add New Dish
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-[#8a8694]">Category</label>
                        <select
                          value={newItem.category}
                          onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full bg-[#0a0a0f] border-b border-[#d4a853]/15 py-2 text-xs text-[#f0ece4] focus:outline-none focus:border-[#d4a853]"
                        >
                          <option>Tasting Menu</option>
                          <option>À La Carte</option>
                          <option>Wine Pairing</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-[#8a8694]">Course Label</label>
                        <input
                          type="text"
                          placeholder="e.g. Starter, Fish, Meat"
                          value={newItem.course}
                          onChange={(e) => setNewItem(prev => ({ ...prev, course: e.target.value }))}
                          required
                          className="w-full bg-transparent border-b border-[#d4a853]/15 py-2 text-xs text-[#f0ece4] placeholder:text-[#8a8694]/20 focus:outline-none focus:border-[#d4a853]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-[0.2em] text-[#8a8694]">Price</label>
                        <input
                          type="text"
                          placeholder="e.g. €48"
                          value={newItem.price}
                          onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                          required
                          className="w-full bg-transparent border-b border-[#d4a853]/15 py-2 text-xs text-[#f0ece4] placeholder:text-[#8a8694]/20 focus:outline-none focus:border-[#d4a853]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-[#8a8694]">Dish Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Dark Chocolate Sphere"
                        value={newItem.name}
                        onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="w-full bg-transparent border-b border-[#d4a853]/15 py-2 text-xs text-[#f0ece4] placeholder:text-[#8a8694]/20 focus:outline-none focus:border-[#d4a853]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-[0.2em] text-[#8a8694]">Description</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Dark chocolate sphere, raspberry, gold dust"
                        value={newItem.desc}
                        onChange={(e) => setNewItem(prev => ({ ...prev, desc: e.target.value }))}
                        className="w-full bg-transparent border-b border-[#d4a853]/15 py-2 text-xs text-[#f0ece4] placeholder:text-[#8a8694]/20 focus:outline-none focus:border-[#d4a853] resize-none"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-[#d4a853] text-[#0a0a0f] uppercase tracking-[0.25em] text-[9px] font-semibold hover:bg-[#e8c97a] hover:shadow-[0_0_15px_rgba(212,168,83,0.3)] transition-all rounded-sm cursor-pointer"
                      >
                        Add Item to Menu
                      </button>
                    </div>
                  </form>

                  {/* Menu Items List */}
                  <div className="space-y-6">
                    {['Tasting Menu', 'À La Carte', 'Wine Pairing'].map(cat => {
                      const items = menuItems.filter(item => item.category === cat);
                      return (
                        <div key={cat} className="space-y-4">
                          <h3 className="text-sm font-light tracking-[0.25em] uppercase text-[#d4a853] font-serif border-b border-white/5 pb-2">
                            {cat}
                          </h3>
                          {items.length === 0 ? (
                            <p className="text-xs text-[#8a8694] italic px-4">No dishes added yet.</p>
                          ) : (
                            <div className="grid grid-cols-1 gap-3">
                              {items.map(item => (
                                <div
                                  key={item.id}
                                  className="bg-[#121218]/20 border border-white/5 px-5 py-4 rounded-sm flex items-center justify-between gap-4 hover:border-[#d4a853]/30 transition-all"
                                >
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-[8px] uppercase tracking-widest text-[#d4a853] border border-[#d4a853]/20 px-1 py-0.5 bg-[#d4a853]/5">
                                        {item.course}
                                      </span>
                                      <h4 className="text-sm font-medium tracking-wide text-[#f0ece4] font-serif">{item.name}</h4>
                                    </div>
                                    <p className="text-[10px] text-[#8a8694] font-light leading-relaxed">{item.desc}</p>
                                  </div>
                                  <div className="flex items-center gap-4 shrink-0">
                                    <span className="text-xs text-[#d4a853] font-medium">{item.price}</span>
                                    <button
                                      onClick={() => handleDeleteMenuItem(item.id)}
                                      className="text-rose-400 hover:text-rose-300 text-[10px] uppercase tracking-wider hover:underline bg-transparent border-0 cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* DATABASE TAB */}
              {activeTab === 'database' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="border-b border-[#d4a853]/15 pb-4">
                    <h2 className="text-2xl font-light tracking-widest uppercase font-serif text-[#f0ece4]">
                      Supabase SQL Schema
                    </h2>
                  </div>

                  <div className="bg-[#121218]/50 border border-[#d4a853]/15 p-6 rounded-sm space-y-4">
                    <p className="text-xs text-[#8a8694] leading-relaxed">
                      To connect your site to a live database, create a free project on{' '}
                      <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[#d4a853] hover:underline">
                        Supabase
                      </a>{' '}
                      and copy the SQL script below. Go to the **SQL Editor** tab in your Supabase dashboard, paste this script, and click **Run**.
                    </p>
                    <p className="text-xs text-[#8a8694] leading-relaxed">
                      Then, add the project URL and Anon key to your Netlify Environment Variables:
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>`NEXT_PUBLIC_SUPABASE_URL`</li>
                        <li>`NEXT_PUBLIC_SUPABASE_ANON_KEY`</li>
                      </ul>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-[#d4a853] font-serif block">
                      Setup SQL Script
                    </label>
                    <div className="relative">
                      <pre className="w-full bg-[#0a0a0f] border border-white/5 p-4 rounded-sm text-[10px] text-zinc-400 overflow-x-auto leading-relaxed max-h-96">
                        {sqlCode}
                      </pre>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(sqlCode);
                          alert('SQL code copied to clipboard!');
                        }}
                        className="absolute top-2 right-2 bg-[#d4a853]/10 hover:bg-[#d4a853]/25 text-[#d4a853] border border-[#d4a853]/25 px-2 py-1 rounded-sm text-[8px] uppercase tracking-widest font-semibold cursor-pointer transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </main>
      </div>
    </div>
  );
}
