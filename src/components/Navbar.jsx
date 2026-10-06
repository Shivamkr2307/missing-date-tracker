import React from 'react';
import { 
  Calendar, 
  Plus, 
  Wand2, 
  Sun, 
  Moon, 
  Download, 
  RotateCcw, 
  Sparkles,
  BookMarked,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function Navbar({
  darkMode,
  setDarkMode,
  onOpenQuickAdd,
  onOpenUnscrambler,
  onOpenExport,
  onResetSampleData,
  stats
}) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-indigo-200 dark:to-slate-200 bg-clip-text text-transparent m-0 leading-none">
                  CampusConnect
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 dark:border dark:border-indigo-800/50 rounded-full uppercase tracking-wider">
                  Problem #4
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium m-0 mt-0.5">
                Smart Deadline & Academic Calendar Hub
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs">
            {stats.overdue > 0 && (
              <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{stats.overdue} Overdue</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>{stats.dueToday} Due Today</span>
            </div>
            <div className="w-px h-3 bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{stats.completed}/{stats.total} Done</span>
            </div>
          </div>

          {/* Actions & Controls */}
          <div className="flex items-center gap-2">
            
            {/* Smart Chat Un-scrambler Button */}
            <button
              onClick={onOpenUnscrambler}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-sm shadow-purple-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Parse raw WhatsApp chat messages into deadlines"
            >
              <Wand2 className="w-4 h-4" />
              <span className="hidden sm:inline">Un-scrambler</span>
            </button>

            {/* Quick Add Deadline Button */}
            <button
              onClick={onOpenQuickAdd}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Deadline</span>
            </button>

            {/* Export & Reset Dropdown/Buttons */}
            <button
              onClick={onOpenExport}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Export to iCal / Calendar or Backup"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={onResetSampleData}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Reset Sample Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
