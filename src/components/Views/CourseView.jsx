import React from 'react';
import DeadlineCard from '../DeadlineCard';
import { BookOpen, User, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CourseView({
  deadlines,
  courses,
  onToggleComplete,
  onToggleBookmark,
  onEdit,
  onDelete,
  onStartPomodoro
}) {
  // Group deadlines by course code
  const courseGroups = {};
  
  // Initialize with known courses
  courses.forEach(c => {
    courseGroups[c.code] = {
      course: c,
      items: []
    };
  });

  // Default group for general/other
  if (!courseGroups['ADMIN']) {
    courseGroups['ADMIN'] = {
      course: { id: 'ADMIN', code: 'ADMIN', name: 'General & Campus Fee Clearances', instructor: 'College Registrar', color: '#10b981' },
      items: []
    };
  }

  deadlines.forEach(dl => {
    const code = dl.courseCode || 'ADMIN';
    if (!courseGroups[code]) {
      courseGroups[code] = {
        course: { id: code, code, name: code, instructor: 'Course Faculty', color: '#6366f1' },
        items: []
      };
    }
    courseGroups[code].items.push(dl);
  });

  return (
    <div className="space-y-8">
      {Object.values(courseGroups).map(({ course, items }) => {
        if (items.length === 0) return null;

        const completedCount = items.filter(i => i.status === 'Completed').length;
        const totalCount = items.length;
        const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

        return (
          <div key={course.code} className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 p-5 shadow-sm">
            
            {/* Subject Header Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-md"
                  style={{ backgroundColor: course.color || '#6366f1' }}
                >
                  {course.code.substring(0, 3)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {course.code}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 m-0">
                      {course.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 m-0 mt-0.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{course.instructor}</span>
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full sm:w-48">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  <span>Progress</span>
                  <span>{progressPercent}% ({completedCount}/{totalCount})</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%`, backgroundColor: course.color || '#6366f1' }}
                  />
                </div>
              </div>
            </div>

            {/* Deadlines for this subject */}
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
      })}
    </div>
  );
}
