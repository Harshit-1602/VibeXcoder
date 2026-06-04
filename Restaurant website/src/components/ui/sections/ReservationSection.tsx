'use client';

import { motion } from 'framer-motion';
import { Section } from '../Section';
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '../Toast';
import { useStore } from '../../../store/useStore';
import { createReservation, getReservations } from '../../../lib/db';

export function ReservationSection() {
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();
  
  const {
    selectedDate,
    selectedTime,
    bookedTableIds,
    selectedTableId,
    setSelectedDate,
    setSelectedTime,
    setBookedTableIds,
  } = useStore();

  const handleDateChange = useCallback(async (dateStr: string) => {
    setSelectedDate(dateStr);
    if (dateStr) {
      try {
        const resList = await getReservations(dateStr);
        const bookedIds = resList
          .filter((r) => r.status !== 'cancelled')
          .map((r) => r.table_id);
        setBookedTableIds(bookedIds);
      } catch (err) {
        console.error('Failed to load reservations for date:', err);
      }
    } else {
      setBookedTableIds([]);
    }
  }, [setSelectedDate, setBookedTableIds]);

  // Set default date to today and default time to 19:30
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    handleDateChange(today);
    setSelectedTime('19:30');
  }, [handleDateChange, setSelectedTime]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nameVal = formData.get('name') as string;
    const emailVal = formData.get('email') as string;
    const phoneVal = formData.get('phone') as string;
    const dateVal = formData.get('date') as string;
    const timeVal = formData.get('time') as string;
    const guestsVal = formData.get('guests') as string;
    const requestsVal = formData.get('requests') as string;

    if (!dateVal) {
      showToast('Please select a date for your reservation.', 'info');
      return;
    }

    if (bookedTableIds.includes(selectedTableId)) {
      showToast('The selected table is already booked for this date. Please select another table.', 'info');
      return;
    }

    try {
      await createReservation({
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        date: dateVal,
        time: timeVal,
        guests: guestsVal,
        requests: requestsVal,
        table_id: selectedTableId,
      });

      setSubmitted(true);
      showToast('Reservation confirmed! We look forward to welcoming you.', 'success');

      // Refresh booked tables
      const resList = await getReservations(dateVal);
      const bookedIds = resList
        .filter((r) => r.status !== 'cancelled')
        .map((r) => r.table_id);
      setBookedTableIds(bookedIds);

      // Reset form text fields (excluding date/time to keep view state)
      const formEl = e.currentTarget;
      const nameInput = formEl.querySelector('#res-name') as HTMLInputElement | null;
      const emailInput = formEl.querySelector('#res-email') as HTMLInputElement | null;
      const phoneInput = formEl.querySelector('#res-phone') as HTMLInputElement | null;
      const requestsInput = formEl.querySelector('#res-requests') as HTMLTextAreaElement | null;
      
      if (nameInput) nameInput.value = '';
      if (emailInput) emailInput.value = '';
      if (phoneInput) phoneInput.value = '';
      if (requestsInput) requestsInput.value = '';

      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error(err);
      showToast('Failed to save reservation. Please try again.', 'info');
    }
  }, [selectedTableId, bookedTableIds, showToast, setBookedTableIds]);

  return (
    <Section id="reservation">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full max-w-md p-8 md:p-12 bg-[#121218]/50 backdrop-blur-md border border-[#d4a853]/15 shadow-2xl shadow-black/90 rounded-sm mx-4"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl font-light tracking-[0.3em] uppercase mb-4 text-[#f0ece4] font-serif">
            Reservation
          </h2>
          <div className="h-[1px] w-12 bg-[#d4a853] mx-auto" />
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-8 space-y-6"
          >
            {/* Animated Checkmark */}
            <svg className="checkmark-svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" stroke="#10b981" strokeWidth="2" />
              <path className="checkmark-check" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14 27l7 7 16-16" />
            </svg>
            <div className="text-center space-y-2">
              <p className="text-sm font-light tracking-widest uppercase text-[#f0ece4]">Confirmed</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a8694]">
                You will receive a confirmation email shortly
              </p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-7">
            <div className="space-y-2">
              <label htmlFor="res-name" className="text-[10px] uppercase tracking-[0.25em] text-[#8a8694]">
                Name
              </label>
              <input
                id="res-name"
                name="name"
                type="text"
                placeholder="Your name"
                required
                className="w-full bg-transparent border-b border-[#d4a853]/15 py-2 text-sm text-[#f0ece4] placeholder:text-[#8a8694]/30 focus:outline-none focus:border-[#d4a853] transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="res-email" className="text-[10px] uppercase tracking-[0.25em] text-[#8a8694]">
                Email
              </label>
              <input
                id="res-email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="w-full bg-transparent border-b border-[#d4a853]/15 py-2 text-sm text-[#f0ece4] placeholder:text-[#8a8694]/30 focus:outline-none focus:border-[#d4a853] transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="res-phone" className="text-[10px] uppercase tracking-[0.25em] text-[#8a8694]">
                Phone
              </label>
              <input
                id="res-phone"
                name="phone"
                type="tel"
                placeholder="+33 1 00 00 00 00"
                className="w-full bg-transparent border-b border-[#d4a853]/15 py-2 text-sm text-[#f0ece4] placeholder:text-[#8a8694]/30 focus:outline-none focus:border-[#d4a853] transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="res-date" className="text-[10px] uppercase tracking-[0.25em] text-[#8a8694]">
                Date
              </label>
              <input
                id="res-date"
                name="date"
                type="date"
                value={selectedDate}
                onChange={(e) => handleDateChange(e.target.value)}
                required
                className="w-full bg-transparent border-b border-[#d4a853]/15 py-2 text-sm text-[#f0ece4] focus:outline-none focus:border-[#d4a853] transition-colors [color-scheme:dark]"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="res-time" className="text-[10px] uppercase tracking-[0.25em] text-[#8a8694]">
                  Time
                </label>
                <input
                  id="res-time"
                  name="time"
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-[#d4a853]/15 py-2 text-sm text-[#f0ece4] focus:outline-none focus:border-[#d4a853] transition-colors [color-scheme:dark]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="res-guests" className="text-[10px] uppercase tracking-[0.25em] text-[#8a8694]">
                  Guests
                </label>
                <select
                  id="res-guests"
                  name="guests"
                  className="w-full bg-transparent border-b border-[#d4a853]/15 py-2 text-sm text-[#f0ece4] focus:outline-none focus:border-[#d4a853] transition-colors appearance-none [&>option]:bg-[#121218] [&>option]:text-[#f0ece4]"
                >
                  <option>2 Guests</option>
                  <option>4 Guests</option>
                  <option>6 Guests</option>
                  <option>8+ Guests</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="res-requests" className="text-[10px] uppercase tracking-[0.25em] text-[#8a8694]">
                Special Requests
              </label>
              <textarea
                id="res-requests"
                name="requests"
                rows={2}
                placeholder="Dietary requirements, celebrations, seating preferences..."
                className="w-full bg-transparent border-b border-[#d4a853]/15 py-2 text-sm text-[#f0ece4] placeholder:text-[#8a8694]/30 focus:outline-none focus:border-[#d4a853] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-[#d4a853] text-[#0a0a0f] uppercase tracking-[0.35em] text-[10px] font-semibold hover:bg-[#e8c97a] hover:shadow-[0_0_20px_rgba(212,168,83,0.35)] transition-all duration-300 mt-2 rounded-sm cursor-pointer"
            >
              Confirm Reservation
            </button>
          </form>
        )}

        {/* Call alternative */}
        <div className="text-center mt-8 pt-6 border-t border-[#d4a853]/10">
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#8a8694]/50 mb-1">Or call us directly</p>
          <a href="tel:+33142868788" className="text-xs font-light text-[#d4a853] hover:text-[#e8c97a] transition-colors cursor-pointer">
            +33 1 42 86 87 88
          </a>
        </div>
      </motion.div>
    </Section>
  );
}
