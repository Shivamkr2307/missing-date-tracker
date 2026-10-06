import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  CalendarDays, 
  BookMarked, 
  TrendingUp 
} from 'lucide-react';

export default function StatSummary({ stats, activeFilter, onSelectStatusFilter }) {
  const percentCompleted = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      
      {/* Overdue Card */}
      <button
        onClick={() => onSelectStatusFilter(activeFilter === 'Overdue' ? 'All' : 'Overdue')}
        className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
          activeFilter === 'Overdue'
            ? 'bg-rose-500/10 border-rose-500 ring-2 ring-rose-500/20 dark:bg-rose-950/30'
            : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-rose-300 dark:hover:border-rose-700'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Overdue</span>
          <div className="p-2 rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-black text-rose-600 dark:text-rose-400">{stats.overdue}</span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Requires Action</span>
        </div>
      </button>

      {/* Due Today Card */}
      <button
        onClick={() => onSelectStatusFilter(activeFilter === 'DueToday' ? 'All' : 'DueToday')}
        className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
          activeFilter === 'DueToday'
            ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20 dark:bg-amber-950/30'
            : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-amber-300 dark:hover:border-amber-700'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Due Today</span>
          <div className="p-2 rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-black text-amber-600 dark:text-amber-400">{stats.dueToday}</span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">24 Hour Window</span>
        </div>
      </button>

      {/* Due This Week Card */}
      <button
        onClick={() => onSelectStatusFilter(activeFilter === 'DueWeek' ? 'All' : 'DueWeek')}
        className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
          activeFilter === 'DueWeek'
            ? 'bg-indigo-500/10 border-indigo-500 ring-2 ring-indigo-500/20 dark:bg-indigo-950/30'
            : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:border-indigo-700'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Next 7 Days</span>
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
            <CalendarDays className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{stats.dueThisWeek}</span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Upcoming</span>
        </div>
      </button>

      {/* Bookmarked Card */}
      <button
        onClick={() => onSelectStatusFilter(activeFilter === 'Bookmarked' ? 'All' : 'Bookmarked')}
        className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
          activeFilter === 'Bookmarked'
            ? 'bg-purple-500/10 border-purple-500 ring-2 ring-purple-500/20 dark:bg-purple-950/30'
            : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-purple-300 dark:hover:border-purple-700'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Bookmarked</span>
          <div className="p-2 rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400">
            <BookMarked className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-black text-purple-600 dark:text-purple-400">{stats.bookmarked}</span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">Starred</span>
        </div>
      </button>

      {/* Completion Progress Card */}
      <button
        onClick={() => onSelectStatusFilter(activeFilter === 'Completed' ? 'All' : 'Completed')}
        className={`col-span-2 sm:col-span-1 p-4 rounded-xl border text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${
          activeFilter === 'Completed'
            ? 'bg-emerald-500/10 border-emerald-500 ring-2 ring-emerald-500/20 dark:bg-emerald-950/30'
            : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/80 hover:border-emerald-300 dark:hover:border-emerald-700'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Completed Rate</span>
          <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{percentCompleted}%</span>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{stats.completed}/{stats.total}</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
          <div 
            className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
            style={{ width: `${percentCompleted}%` }} 
          />
        </div>
      </button>

    </div>
  );
}
