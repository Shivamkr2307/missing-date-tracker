import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, ArrowRight, Bell, Sparkles } from 'lucide-react';
import { calculateTimeRemaining, formatDateTime } from '../utils/dateUtils';

export default function CountdownBanner({ urgentDeadline, onSelectDeadline }) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!urgentDeadline) return;

    const updateTimer = () => {
      const remaining = calculateTimeRemaining(urgentDeadline.dueDate);
      setTime(remaining);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [urgentDeadline]);

  if (!urgentDeadline) {
    return (
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border-b border-emerald-500/20 py-2.5 px-4 text-center text-xs font-medium text-emerald-700 dark:text-emerald-300">
        <Sparkles className="inline-block w-4 h-4 mr-2" />
        All caught up! No urgent pending deadlines remaining. Enjoy your study break!
      </div>
    );
  }

  const isOverdue = new Date(urgentDeadline.dueDate) < new Date();

  return (
    <div className={`relative overflow-hidden border-b transition-colors ${
      isOverdue 
        ? 'bg-gradient-to-r from-rose-900/90 via-red-900/90 to-rose-950 text-white border-rose-700' 
        : 'bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white border-indigo-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Target Info */}
          <div className="flex items-center gap-3 text-left w-full md:w-auto">
            <div className={`p-2.5 rounded-xl ${isOverdue ? 'bg-rose-500/20 text-rose-300' : 'bg-indigo-500/20 text-indigo-300'} shrink-0`}>
              {isOverdue ? <AlertTriangle className="w-5 h-5 text-rose-400 animate-bounce" /> : <Clock className="w-5 h-5 text-indigo-300" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-white">
                  {isOverdue ? 'CRITICAL OVERDUE' : 'NEXT URGENT DEADLINE'}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/30 text-indigo-200">
                  {urgentDeadline.courseCode}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white mt-0.5 m-0 line-clamp-1">
                {urgentDeadline.title}
              </h3>
              <p className="text-xs text-indigo-200/80 m-0">
                Due: {formatDateTime(urgentDeadline.dueDate)} {urgentDeadline.location ? `• ${urgentDeadline.location}` : ''}
              </p>
            </div>
          </div>

          {/* Countdown Clock or Overdue Notice */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            {!isOverdue ? (
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-sm min-w-[48px]">
                  <span className="text-lg font-extrabold leading-none text-white">{String(time.days).padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-wider text-indigo-200 font-semibold mt-0.5">Days</span>
                </div>
                <span className="text-lg font-bold text-white/50">:</span>
                <div className="flex flex-col items-center px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-sm min-w-[48px]">
                  <span className="text-lg font-extrabold leading-none text-white">{String(time.hours).padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-wider text-indigo-200 font-semibold mt-0.5">Hours</span>
                </div>
                <span className="text-lg font-bold text-white/50">:</span>
                <div className="flex flex-col items-center px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-sm min-w-[48px]">
                  <span className="text-lg font-extrabold leading-none text-white">{String(time.minutes).padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-wider text-indigo-200 font-semibold mt-0.5">Mins</span>
                </div>
                <span className="text-lg font-bold text-white/50">:</span>
                <div className="flex flex-col items-center px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-sm min-w-[48px]">
                  <span className="text-lg font-extrabold leading-none text-amber-300">{String(time.seconds).padStart(2, '0')}</span>
                  <span className="text-[9px] uppercase tracking-wider text-amber-200 font-semibold mt-0.5">Secs</span>
                </div>
              </div>
            ) : (
              <div className="px-3 py-1.5 rounded-lg bg-rose-500/30 text-rose-200 text-xs font-semibold flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-rose-400" />
                Action Required Immediately
              </div>
            )}

            <button
              onClick={() => onSelectDeadline(urgentDeadline)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-white text-indigo-950 hover:bg-indigo-50 transition-colors shadow-sm shrink-0"
            >
              <span>View & Focus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
