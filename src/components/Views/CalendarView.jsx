import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, AlertTriangle } from 'lucide-react';
import DeadlineCard from '../DeadlineCard';

export default function CalendarView({
  deadlines,
  onToggleComplete,
  onToggleBookmark,
  onEdit,
  onDelete,
  onStartPomodoro
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Month navigation
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const todayMonth = () => setCurrentDate(new Date());

  // Generate calendar days
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Map deadlines to date keys YYYY-MM-DD
  const deadlinesByDate = {};
  deadlines.forEach(dl => {
    const d = new Date(dl.dueDate);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (!deadlinesByDate[key]) deadlinesByDate[key] = [];
    deadlinesByDate[key].push(dl);
  });

  const now = new Date();
  const todayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

  const selectedDeadlines = selectedDateStr ? (deadlinesByDate[selectedDateStr] || []) : [];

  return (
    <div className="space-y-6">
      
      {/* Calendar Header Card */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm">
        
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 m-0">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={todayMonth}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
            >
              Today
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-slate-400 dark:text-slate-500 mb-2">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>

        {/* Calendar Days Grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {daysArray.map((dayNum, idx) => {
            if (!dayNum) {
              return <div key={`empty-${idx}`} className="h-20 sm:h-24 rounded-xl bg-slate-50/40 dark:bg-slate-900/30 border border-transparent" />;
            }

            const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const dayItems = deadlinesByDate[dateKey] || [];
            const isToday = dateKey === todayKey;
            const isSelected = dateKey === selectedDateStr;

            const hasOverdue = dayItems.some(i => i.status !== 'Completed' && new Date(i.dueDate) < new Date());

            return (
              <div
                key={dateKey}
                onClick={() => setSelectedDateStr(dateKey)}
                className={`h-20 sm:h-24 p-1.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'ring-2 ring-indigo-500 border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/40'
                    : isToday
                      ? 'bg-amber-50/60 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700'
                      : dayItems.length > 0
                        ? 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                        : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                    isToday ? 'bg-amber-500 text-white' : 'text-slate-700 dark:text-slate-300'
                  }`}>
                    {dayNum}
                  </span>
                  {hasOverdue && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  )}
                </div>

                {/* Event Markers */}
                <div className="space-y-1 overflow-hidden">
                  {dayItems.slice(0, 2).map((item, i) => (
                    <div
                      key={i}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold truncate ${
                        item.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : new Date(item.dueDate) < new Date()
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                            : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                      }`}
                    >
                      {item.courseCode}: {item.title}
                    </div>
                  ))}
                  {dayItems.length > 2 && (
                    <span className="text-[9px] font-semibold text-slate-400 block text-right">
                      +{dayItems.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Selected Day Details Section */}
      {selectedDateStr && (
        <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 m-0">
              Deadlines for {new Date(selectedDateStr).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })} ({selectedDeadlines.length})
            </h3>
            <button
              onClick={() => setSelectedDateStr(null)}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Clear selection
            </button>
          </div>

          {selectedDeadlines.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 m-0 py-4 text-center">
              No deadlines scheduled on this date.
            </p>
          ) : (
            <div className="space-y-3">
              {selectedDeadlines.map(dl => (
                <DeadlineCard
                  key={dl.id}
                  deadline={dl}
                  onToggleComplete={onToggleComplete}
                  onToggleBookmark={onToggleBookmark}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onStartPomodoro={onStartPomodoro}
                />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
