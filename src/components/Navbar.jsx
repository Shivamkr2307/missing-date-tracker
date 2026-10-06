import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Wand2, 
  Sun, 
  Moon, 
  Download, 
  RotateCcw, 
  CheckCircle2,
  AlertTriangle,
  User,
  LogOut,
  ShieldCheck,
  ChevronDown,
  Cloud
} from 'lucide-react';

export default function Navbar({
  currentUser,
  onOpenAuth,
  onLogout,
  darkMode,
  setDarkMode,
  onOpenQuickAdd,
  onOpenUnscrambler,
  onOpenExport,
  onResetSampleData,
  stats
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
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
                <span className="px-2 py-0.5 text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 dark:border dark:border-indigo-800/50 rounded-full uppercase tracking-wider">
                  Problem #4
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium m-0 mt-0.5">
                Smart Deadline & Academic Hub
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hidden xl:flex items-center gap-4 px-4 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs">
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
            
            {/* Student Auth Portal Pill */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/80 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all text-left"
                >
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold overflow-hidden">
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                    ) : (
                      currentUser.name.charAt(0)
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-extrabold text-indigo-950 dark:text-indigo-200 leading-none">
                        {currentUser.name.split(' ')[0]}
                      </span>
                      <Cloud className="w-3 h-3 text-emerald-500 fill-emerald-500/20" title="Cloud Sync Active" />
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-none mt-0.5">
                      {currentUser.studentId}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-2 z-50 animate-fade-in">
                    <div className="p-2.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                      <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 block">
                        {currentUser.name}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5 truncate">
                        {currentUser.email}
                      </span>
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Data Auto-Saved & Synced</span>
                      </div>
                    </div>

                    <button
                      onClick={() => { setIsMenuOpen(false); onOpenAuth(); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <User className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Switch Student Account</span>
                    </button>

                    <button
                      onClick={() => { setIsMenuOpen(false); onLogout(); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Student Login</span>
              </button>
            )}

            {/* Smart Chat Un-scrambler Button */}
            <button
              onClick={onOpenUnscrambler}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-sm shadow-purple-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Parse raw WhatsApp chat messages into deadlines"
            >
              <Wand2 className="w-4 h-4" />
              <span className="hidden sm:inline">Un-scrambler</span>
            </button>

            {/* Quick Add Deadline Button */}
            <button
              onClick={onOpenQuickAdd}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>Add Deadline</span>
            </button>

            {/* Export & Reset Dropdown/Buttons */}
            <button
              onClick={onOpenExport}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Export to iCal / Calendar or Backup"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={onResetSampleData}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Reset Sample Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
