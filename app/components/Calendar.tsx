'use client';

import { useState } from 'react';

interface CalendarProps {
  onDateSelect?: (startDate: Date | null, endDate: Date | null) => void;
  onHoverDateChange?: (date: Date | null) => void;
  unavailableDates?: Date[];
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
}

export function Calendar({ onDateSelect, onHoverDateChange, unavailableDates = [], initialStartDate, initialEndDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(initialStartDate ?? new Date());
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate ?? null);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate ?? null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const monthNames = [
    'Januar', 'Februar', 'Marec', 'April', 'Maj', 'Junij',
    'Julij', 'Avgust', 'September', 'Oktober', 'November', 'December'
  ];

  const dayNames = ['Ned', 'Pon', 'Tor', 'Sre', 'Čet', 'Pet', 'Sob'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isDateUnavailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;

    return unavailableDates.some(unavailableDate => isSameDay(date, unavailableDate));
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) {
      if (startDate && hoveredDate && hoveredDate > startDate) {
        return date > startDate && date < hoveredDate;
      }
      return false;
    }
    return date > startDate && date < endDate;
  };

  const isDateSelected = (date: Date) => {
    if (startDate && isSameDay(date, startDate)) return true;
    if (endDate && isSameDay(date, endDate)) return true;
    return false;
  };

  const handleDateClick = (date: Date) => {
    if (isDateUnavailable(date)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      onDateSelect?.(date, null);
    } else if (date < startDate) {
      setStartDate(date);
      setEndDate(null);
      onDateSelect?.(date, null);
    } else {
      setEndDate(date);
      onDateSelect?.(startDate, date);
    }
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const renderCalendarDays = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];

    // Empty cells for days before the month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square" />
      );
    }

    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const unavailable = isDateUnavailable(date);
      const selected = isDateSelected(date);
      const inRange = isDateInRange(date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          onMouseEnter={() => {
            if (!unavailable) {
              setHoveredDate(date);
              onHoverDateChange?.(date);
            }
          }}
          onMouseLeave={() => {
            setHoveredDate(null);
            onHoverDateChange?.(null);
          }}
          disabled={unavailable}
          className={`
            aspect-square rounded-xl font-semibold transition-all duration-200
            ${unavailable
              ? 'text-stone-300 dark:text-zinc-700 cursor-not-allowed line-through'
              : 'hover:bg-green-50 dark:hover:bg-zinc-700 cursor-pointer'
            }
            ${selected
              ? 'bg-green-700 text-stone-50 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 shadow-lg scale-105'
              : 'text-zinc-800 dark:text-stone-200'
            }
            ${inRange
              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
              : ''
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="bg-stone-50 dark:bg-zinc-800 rounded-3xl p-6 shadow-xl border border-stone-200 dark:border-zinc-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-stone-200 dark:hover:bg-zinc-700 rounded-xl transition-colors"
          aria-label="Prejšnji mesec"
        >
          <svg className="w-5 h-5 text-zinc-800 dark:text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h3 className="text-lg font-bold text-zinc-900 dark:text-stone-50">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>

        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-stone-200 dark:hover:bg-zinc-700 rounded-xl transition-colors"
          aria-label="Naslednji mesec"
        >
          <svg className="w-5 h-5 text-zinc-800 dark:text-stone-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map(day => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-zinc-600 dark:text-stone-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-stone-200 dark:border-zinc-700 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-700"></div>
          <span className="text-zinc-700 dark:text-stone-300">Izbrano</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900/30"></div>
          <span className="text-zinc-700 dark:text-stone-300">Obdobje</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-stone-200 dark:bg-zinc-700 relative">
            <div className="absolute inset-0 flex items-center justify-center text-xs">✕</div>
          </div>
          <span className="text-zinc-700 dark:text-stone-300">Nedostopno</span>
        </div>
      </div>
    </div>
  );
}
