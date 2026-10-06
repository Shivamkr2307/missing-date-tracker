import React from 'react';
import DeadlineCard from '../DeadlineCard';
import { Circle, Clock, CheckCircle2 } from 'lucide-react';

export default function KanbanView({
  deadlines,
  onToggleComplete,
  onToggleBookmark,
  onEdit,
  onDelete,
  onStartPomodoro
}) {
  const todoItems = deadlines.filter(d => d.status === 'Pending');
  const inProgressItems = deadlines.filter(d => d.status === 'In Progress');
  const completedItems = deadlines.filter(d => d.status === 'Completed');

  const renderColumn = (title, items, icon, borderTopClass, bgBadgeClass) => (
    <div className={`bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col min-h-[500px] border-t-4 ${borderTopClass}`}>
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 m-0">
            {title}
          </h3>
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${bgBadgeClass}`}>
          {items.length}
        </span>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400 dark:text-slate-500 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
            No deadlines in {title}
          </div>
        ) : (
          items.map(dl => (
            <DeadlineCard
              key={dl.id}
              deadline={dl}
              onToggleComplete={onToggleComplete}
              onToggleBookmark={onToggleBookmark}
              onEdit={onEdit}
              onDelete={onDelete}
              onStartPomodoro={onStartPomodoro}
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {renderColumn(
        'To Do',
        todoItems,
        <Circle className="w-4 h-4 text-indigo-500" />,
        'border-t-indigo-500',
        'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
      )}

      {renderColumn(
        'In Progress',
        inProgressItems,
        <Clock className="w-4 h-4 text-amber-500" />,
        'border-t-amber-500',
        'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
      )}

      {renderColumn(
        'Completed',
        completedItems,
        <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
        'border-t-emerald-500',
        'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
      )}
    </div>
  );
}
