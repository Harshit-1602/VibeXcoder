import { createClient } from '@supabase/supabase-js';

export interface MenuItem {
  id: string;
  category: 'Tasting Menu' | 'À La Carte' | 'Wine Pairing' | string;
  course: string;
  name: string;
  desc: string;
  price: string;
  created_at?: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  requests: string;
  table_id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at?: string;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

// Initialize Supabase if credentials exist
const supabase = isSupabaseConfigured ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// Initial fallback/default menus
const DEFAULT_MENU_ITEMS: MenuItem[] = [
  // Tasting Menu
  { id: 't1', category: 'Tasting Menu', course: 'Amuse-Bouche', name: 'The Gold Leaf', desc: 'Aged wagyu, 24k gold, truffle essence', price: '€48' },
  { id: 't2', category: 'Tasting Menu', course: 'First Course', name: "Ocean's Whisper", desc: 'Bluefin tuna, sea foam, kelp oil', price: '€62' },
  { id: 't3', category: 'Tasting Menu', course: 'Fish', name: 'Arctic Silk', desc: 'Halibut, champagne beurre blanc, caviar', price: '€78' },
  { id: 't4', category: 'Tasting Menu', course: 'Meat', name: 'Forest Soul', desc: 'Wild mushrooms, venison, pine needle jus', price: '€92' },
  { id: 't5', category: 'Tasting Menu', course: 'Cheese', name: 'The Meadow', desc: 'Aged comté, fig, walnut, honeycomb', price: '€38' },
  { id: 't6', category: 'Tasting Menu', course: 'Dessert', name: 'Eclipse', desc: 'Dark chocolate sphere, raspberry, gold dust', price: '€44' },

  // À La Carte
  { id: 'a1', category: 'À La Carte', course: 'Starter', name: 'Velouté of Truffle', desc: 'Black truffle, crème fraîche, brioche crouton', price: '€36' },
  { id: 'a2', category: 'À La Carte', course: 'Starter', name: 'Foie Gras Terrine', desc: 'Sauternes jelly, toasted pain de campagne', price: '€42' },
  { id: 'a3', category: 'À La Carte', course: 'Main', name: 'Roasted Lobster', desc: 'Vanilla butter, heritage carrots, bisque', price: '€88' },
  { id: 'a4', category: 'À La Carte', course: 'Main', name: 'Rack of Lamb', desc: 'Herb crust, provençal ratatouille, jus', price: '€76' },
  { id: 'a5', category: 'À La Carte', course: 'Dessert', name: 'Tarte Tatin', desc: 'Caramelized apple, vanilla bean ice cream', price: '€28' },
  { id: 'a6', category: 'À La Carte', course: 'Dessert', name: 'Crème Brûlée', desc: 'Madagascan vanilla, lavender shortbread', price: '€24' },

  // Wine Pairing
  { id: 'w1', category: 'Wine Pairing', course: 'Aperitif', name: 'Krug Grande Cuvée', desc: 'Reims, Champagne · NV', price: '€45' },
  { id: 'w2', category: 'Wine Pairing', course: 'White', name: 'Puligny-Montrachet', desc: 'Domaine Leflaive · 2019', price: '€55' },
  { id: 'w3', category: 'Wine Pairing', course: 'Red', name: 'Châteauneuf-du-Pape', desc: 'Château Rayas · 2017', price: '€65' },
  { id: 'w4', category: 'Wine Pairing', course: 'Red', name: 'Barolo Riserva', desc: 'Giacomo Conterno · 2015', price: '€75' },
  { id: 'w5', category: 'Wine Pairing', course: 'Sweet', name: 'Sauternes', desc: "Château d'Yquem · 2016", price: '€55' },
  { id: 'w6', category: 'Wine Pairing', course: 'Digestif', name: 'Cognac XO', desc: 'Rémy Martin · Louis XIII', price: '€85' }
];

// Helper to get local data safely
function getLocalData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  return JSON.parse(data);
}

// Helper to save local data safely
function setLocalData<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// DATABASE INTERFACE METHODS

// MENU CRUD OPERATIONS
export async function getMenuItems(): Promise<MenuItem[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (!error && data) return data as MenuItem[];
    console.error('Error fetching from Supabase, falling back to local storage:', error);
  }
  return getLocalData<MenuItem[]>('elan_menu_items', DEFAULT_MENU_ITEMS);
}

export async function saveMenuItem(item: Omit<MenuItem, 'id'> & { id?: string }): Promise<MenuItem> {
  const newItem = {
    ...item,
    id: item.id || Math.random().toString(36).substring(2, 9),
    created_at: item.id ? undefined : new Date().toISOString()
  };

  if (supabase) {
    const { data, error } = await supabase
      .from('menu_items')
      .upsert(newItem)
      .select()
      .single();
    
    if (!error && data) return data as MenuItem;
    console.error('Error saving to Supabase, saving to local storage:', error);
  }

  const items = getLocalData<MenuItem[]>('elan_menu_items', DEFAULT_MENU_ITEMS);
  const index = items.findIndex(i => i.id === newItem.id);
  if (index >= 0) {
    items[index] = newItem as MenuItem;
  } else {
    items.push(newItem as MenuItem);
  }
  setLocalData('elan_menu_items', items);
  return newItem as MenuItem;
}

export async function deleteMenuItem(id: string): Promise<boolean> {
  if (supabase) {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);
    if (!error) return true;
    console.error('Error deleting from Supabase, deleting from local storage:', error);
  }

  const items = getLocalData<MenuItem[]>('elan_menu_items', DEFAULT_MENU_ITEMS);
  const filtered = items.filter(i => i.id !== id);
  setLocalData('elan_menu_items', filtered);
  return true;
}


// RESERVATIONS OPERATIONS
export async function getReservations(date?: string): Promise<Reservation[]> {
  if (supabase) {
    let query = supabase.from('reservations').select('*');
    if (date) {
      query = query.eq('date', date);
    }
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (!error && data) return data as Reservation[];
    console.error('Error fetching reservations from Supabase, falling back to local storage:', error);
  }

  const all = getLocalData<Reservation[]>('elan_reservations', []);
  if (date) {
    return all.filter(r => r.date === date);
  }
  return all;
}

export async function createReservation(booking: Omit<Reservation, 'id' | 'status'> & { id?: string; status?: string }): Promise<Reservation> {
  const newBooking: Reservation = {
    ...booking,
    id: booking.id || Math.random().toString(36).substring(2, 9),
    status: (booking.status as 'pending' | 'confirmed' | 'cancelled') || 'confirmed',
    created_at: new Date().toISOString()
  };

  if (supabase) {
    const { data, error } = await supabase
      .from('reservations')
      .insert(newBooking)
      .select()
      .single();
    
    if (!error && data) return data as Reservation;
    console.error('Error saving reservation to Supabase, saving to local storage:', error);
  }

  const bookings = getLocalData<Reservation[]>('elan_reservations', []);
  bookings.push(newBooking);
  setLocalData('elan_reservations', bookings);
  return newBooking;
}

export async function updateReservationStatus(id: string, status: 'pending' | 'confirmed' | 'cancelled'): Promise<Reservation | null> {
  if (supabase) {
    const { data, error } = await supabase
      .from('reservations')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (!error && data) return data as Reservation;
    console.error('Error updating reservation on Supabase, updating local storage:', error);
  }

  const bookings = getLocalData<Reservation[]>('elan_reservations', []);
  const index = bookings.findIndex(b => b.id === id);
  if (index >= 0) {
    bookings[index].status = status;
    setLocalData('elan_reservations', bookings);
    return bookings[index];
  }
  return null;
}
