import React from 'react';
import DeadlineCard from '../DeadlineCard';
import { AlertTriangle, Clock, CalendarDays, CheckCircle2, Sparkles } from 'lucide-react';
import { getUrgencyInfo } from '../../utils/dateUtils';

export default function ListView({
  deadlines,
  onToggleComplete,
  onToggleBookmark,
  onEdit,
  onDelete,
  onStartPomodoro
}) {
  if (deadlines.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-12 text-center my-6">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 mx-auto flex items-center justify-center mb-3">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 m-0">
          No deadlines found
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 m-0">
          No academic deadlines match your current search or filter parameters.
        </p>
      </div>
    );
  }

  // Group deadlines into 5 logical categories
  const overdue = [];
  const dueToday = [];
  const dueThisWeek = [];
  const later = [];
  const completed = [];

  deadlines.forEach(item => {
    if (item.status === 'Completed') {
      completed.push(item);
    } else {
      const urgency = getUrgencyInfo(item.dueDate, item.status);
      if (urgency.isOverdue) {
        overdue.push(item);
      } else if (urgency.status === 'Due Today') {
        dueToday.push(item);
      } else if (urgency.status === 'Due Soon') {
        dueThisWeek.push(item);
      } else {
        later.push(item);
      }
    }
  });

  const renderSection = (title, items, icon, colorClass, borderClass) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-8">
        <div className={`flex items-center gap-2 mb-3 pb-2 border-b ${borderClass}`}>
          {icon}
          <h3 className={`text-sm font-extrabold m-0 ${colorClass}`}>
            {title} ({items.length})
          </h3>
        </div>
        <div className="space-y-3">
          {items.map(dl => (
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
      </div>
    );
  };

  return (
    <div>
      {renderSection(
        'Overdue Deadlines - Immediate Action',
        overdue,
        <AlertTriangle className="w-4 h-4 text-rose-500 animate-bounce" />,
        'text-rose-600 dark:text-rose-400',
        'border-rose-200 dark:border-rose-900/60'
      )}

      {renderSection(
        'Due Today',
        dueToday,
        <Clock className="w-4 h-4 text-amber-500" />,
        'text-amber-600 dark:text-amber-400',
        'border-amber-200 dark:border-amber-900/60'
      )}

      {renderSection(
        'Due Next 3-7 Days',
        dueThisWeek,
        <CalendarDays className="w-4 h-4 text-indigo-500" />,
        'text-indigo-600 dark:text-indigo-400',
        'border-indigo-200 dark:border-indigo-900/60'
      )}

      {renderSection(
        'Upcoming Later',
        later,
        <CalendarDays className="w-4 h-4 text-slate-400" />,
        'text-slate-700 dark:text-slate-300',
        'border-slate-200 dark:border-slate-800'
      )}

      {renderSection(
        'Completed Deadlines',
        completed,
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
        'text-emerald-600 dark:text-emerald-400',
        'border-emerald-200 dark:border-emerald-900/60'
      )}
    </div>
  );
}
