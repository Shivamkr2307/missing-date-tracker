import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Star, 
  Clock, 
  Calendar, 
  MapPin, 
  Tag, 
  Edit3, 
  Trash2, 
  Timer, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { formatDateTime, getUrgencyInfo } from '../utils/dateUtils';
import confetti from 'canvas-confetti';

export default function DeadlineCard({
  deadline,
  onToggleComplete,
  onToggleBookmark,
  onEdit,
  onDelete,
  onStartPomodoro
}) {
  const urgency = getUrgencyInfo(deadline.dueDate, deadline.status);
  const isDone = deadline.status === 'Completed';

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    if (!isDone) {
      // Trigger subtle confetti burst
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      } catch (err) {}
    }
    onToggleComplete(deadline.id);
  };

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'High':
        return <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300">HIGH</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300">MED</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">LOW</span>;
    }
  };

  return (
    <div 
      className={`group relative rounded-2xl border p-4 sm:p-5 transition-all duration-200 hover:shadow-md ${
        isDone 
          ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800 opacity-75' 
          : urgency.isOverdue
            ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60 hover:border-rose-400'
            : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700/80 hover:border-indigo-300 dark:hover:border-indigo-700'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        
        {/* Checkbox & Details Header */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          
          {/* Checkbox */}
          <button
            onClick={handleCheckboxClick}
            className="mt-0.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
            title={isDone ? 'Mark as Pending' : 'Mark as Completed'}
          >
            {isDone ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-500/10" />
            ) : (
              <Circle className="w-6 h-6 hover:scale-110 transition-transform" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              
              {/* Course Pill */}
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                {deadline.courseCode}
              </span>

              {/* Category Pill */}
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                {deadline.category}
              </span>

              {/* Priority */}
              {getPriorityBadge(deadline.priority)}

              {/* Urgency Badge */}
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1 ${urgency.badgeClass}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${urgency.dotColor}`} />
                {urgency.label}
              </span>

            </div>

            {/* Title */}
            <h4 className={`text-base font-bold tracking-tight text-slate-900 dark:text-slate-100 m-0 ${isDone ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
              {deadline.title}
            </h4>

            {/* Description */}
            {deadline.description && (
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed m-0">
                {deadline.description}
              </p>
            )}

            {/* Metadata Footer */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
              
              {/* Due Date & Time */}
              <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-semibold">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>{formatDateTime(deadline.dueDate)}</span>
              </div>

              {/* Location / Portal */}
              {deadline.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{deadline.location}</span>
                </div>
              )}

              {/* Weightage */}
              {deadline.weightage && (
                <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                  <span>Grade Weight: {deadline.weightage}</span>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 shrink-0">
          
          {/* Bookmark Star */}
          <button
            onClick={() => onToggleBookmark(deadline.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              deadline.bookmarked 
                ? 'text-amber-500 fill-amber-500' 
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
            title={deadline.bookmarked ? 'Remove Bookmark' : 'Star Bookmark'}
          >
            <Star className={`w-4 h-4 ${deadline.bookmarked ? 'fill-amber-500' : ''}`} />
          </button>

          {/* Pomodoro Focus Button */}
          {!isDone && (
            <button
              onClick={() => onStartPomodoro(deadline)}
              className="p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition-colors"
              title="Start Pomodoro Study Session"
            >
              <Timer className="w-4 h-4" />
            </button>
          )}

          {/* Edit */}
          <button
            onClick={() => onEdit(deadline)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            title="Edit Deadline"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(deadline.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            title="Delete Deadline"
          >
            <Trash2 className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
}
