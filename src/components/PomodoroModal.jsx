import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, CheckCircle2, Timer, Flame, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PomodoroModal({ isOpen, onClose, deadline, onMarkComplete }) {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Session complete!
          setIsActive(false);
          try {
            confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
          } catch (e) {}
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  if (!isOpen || !deadline) return null;

  const handleReset = () => {
    setIsActive(false);
    setMinutes(25);
    setSeconds(0);
  };

  const handleCompleteAndClose = () => {
    onMarkComplete(deadline.id);
    onClose();
  };

  const totalSeconds = 25 * 60;
  const currentSeconds = minutes * 60 + seconds;
  const progressPercent = Math.round(((totalSeconds - currentSeconds) / totalSeconds) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-md overflow-hidden flex flex-col text-center">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent">
          <div className="flex items-center gap-2 text-left">
            <Timer className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              Focus Study Session
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Target Deadline Badge */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {deadline.courseCode}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {deadline.category}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
              {deadline.title}
            </h4>
          </div>

          {/* Pomodoro Timer Display */}
          <div className="relative flex flex-col items-center justify-center my-4">
            <div className="w-48 h-48 rounded-full border-8 border-indigo-100 dark:border-slate-800 flex flex-col items-center justify-center relative shadow-inner">
              <span className="text-4xl font-black tracking-tight text-slate-900 dark:text-slate-100 font-mono">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                {isActive ? 'Deep Work Mode' : 'Paused'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all ${
                isActive 
                  ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20' 
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'
              }`}
            >
              {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isActive ? 'Pause Timer' : 'Start Focus'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Reset 25-Min Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Mark Done Action */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={handleCompleteAndClose}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Finished Task! Mark Completed</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
