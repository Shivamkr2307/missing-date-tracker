import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import CountdownBanner from './components/CountdownBanner';
import StatSummary from './components/StatSummary';
import FilterBar from './components/FilterBar';
import ListView from './components/Views/ListView';
import CalendarView from './components/Views/CalendarView';
import CourseView from './components/Views/CourseView';
import KanbanView from './components/Views/KanbanView';

import QuickAddModal from './components/QuickAddModal';
import UnscramblerModal from './components/UnscramblerModal';
import PomodoroModal from './components/PomodoroModal';
import ExportModal from './components/ExportModal';

import { INITIAL_DEADLINES, INITIAL_COURSES } from './data/mockData';
import { getUrgencyInfo } from './utils/dateUtils';
import './App.css';

export default function App() {
  // Persistence in LocalStorage
  const [deadlines, setDeadlines] = useState(() => {
    try {
      const saved = localStorage.getItem('campusconnect_deadlines');
      return saved ? JSON.parse(saved) : INITIAL_DEADLINES;
    } catch (e) {
      return INITIAL_DEADLINES;
    }
  });

  const [courses] = useState(INITIAL_COURSES);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('campusconnect_dark');
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch (e) {
      return false;
    }
  });

  // Sync dark mode class with HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('campusconnect_dark', JSON.stringify(darkMode));
  }, [darkMode]);

  // Sync deadlines with local storage
  useEffect(() => {
    try {
      localStorage.setItem('campusconnect_deadlines', JSON.stringify(deadlines));
    } catch (e) {}
  }, [deadlines]);

  // Filter & Search Controls
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [statusFilter, setStatusFilter] = useState('All'); // All, Overdue, DueToday, DueWeek, Bookmarked, Completed
  const [sortBy, setSortBy] = useState('dueDate');
  const [viewMode, setViewMode] = useState('list'); // list, calendar, courses, kanban

  // Modals state
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [editingDeadline, setEditingDeadline] = useState(null);
  const [isUnscramblerOpen, setIsUnscramblerOpen] = useState(false);
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [pomodoroTarget, setPomodoroTarget] = useState(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Calculated Stats
  const stats = useMemo(() => {
    const now = new Date();
    let overdue = 0;
    let dueToday = 0;
    let dueThisWeek = 0;
    let completed = 0;
    let bookmarked = 0;

    deadlines.forEach(item => {
      if (item.bookmarked) bookmarked++;
      if (item.status === 'Completed') {
        completed++;
      } else {
        const urgency = getUrgencyInfo(item.dueDate, item.status);
        if (urgency.isOverdue) overdue++;
        if (urgency.status === 'Due Today') dueToday++;
        if (urgency.status === 'Due Soon' || urgency.status === 'Due Today') dueThisWeek++;
      }
    });

    return {
      total: deadlines.length,
      overdue,
      dueToday,
      dueThisWeek,
      completed,
      bookmarked
    };
  }, [deadlines]);

  // Closest Urgent Deadline for Countdown Banner
  const mostUrgentDeadline = useMemo(() => {
    const pendingItems = deadlines.filter(d => d.status !== 'Completed');
    if (pendingItems.length === 0) return null;

    // Sort by due date ascending
    return [...pendingItems].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))[0];
  }, [deadlines]);

  // Filtered & Sorted Deadlines List
  const filteredDeadlines = useMemo(() => {
    return deadlines.filter(item => {
      // Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchCourse = item.courseCode.toLowerCase().includes(q);
        const matchDesc = (item.description || '').toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        if (!matchTitle && !matchCourse && !matchDesc && !matchCategory) return false;
      }

      // Category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      // Course
      if (selectedCourse !== 'all' && item.courseCode !== selectedCourse) return false;

      // Priority
      if (selectedPriority !== 'all' && item.priority !== selectedPriority) return false;

      // Status Filter
      if (statusFilter === 'Overdue') {
        if (item.status === 'Completed') return false;
        const urgency = getUrgencyInfo(item.dueDate, item.status);
        if (!urgency.isOverdue) return false;
      } else if (statusFilter === 'DueToday') {
        if (item.status === 'Completed') return false;
        const urgency = getUrgencyInfo(item.dueDate, item.status);
        if (urgency.status !== 'Due Today') return false;
      } else if (statusFilter === 'DueWeek') {
        if (item.status === 'Completed') return false;
        const urgency = getUrgencyInfo(item.dueDate, item.status);
        if (urgency.status !== 'Due Soon' && urgency.status !== 'Due Today') return false;
      } else if (statusFilter === 'Bookmarked') {
        if (!item.bookmarked) return false;
      } else if (statusFilter === 'Completed') {
        if (item.status !== 'Completed') return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === 'priority') {
        const pMap = { High: 1, Medium: 2, Low: 3 };
        return pMap[a.priority] - pMap[b.priority];
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'course') {
        return a.courseCode.localeCompare(b.courseCode);
      }
      return 0;
    });
  }, [deadlines, searchQuery, selectedCategory, selectedCourse, selectedPriority, statusFilter, sortBy]);

  // Action Handlers
  const handleToggleComplete = (id) => {
    setDeadlines(prev => prev.map(d => {
      if (d.id === id) {
        const nextStatus = d.status === 'Completed' ? 'Pending' : 'Completed';
        return { ...d, status: nextStatus };
      }
      return d;
    }));
  };

  const handleToggleBookmark = (id) => {
    setDeadlines(prev => prev.map(d => {
      if (d.id === id) return { ...d, bookmarked: !d.bookmarked };
      return d;
    }));
  };

  const handleDeleteDeadline = (id) => {
    if (confirm('Are you sure you want to delete this deadline?')) {
      setDeadlines(prev => prev.filter(d => d.id !== id));
    }
  };

  const handleSaveDeadline = (deadlineObj) => {
    setDeadlines(prev => {
      const exists = prev.some(d => d.id === deadlineObj.id);
      if (exists) {
        return prev.map(d => d.id === deadlineObj.id ? deadlineObj : d);
      }
      return [deadlineObj, ...prev];
    });
  };

  const handleImportUnscrambled = (newItems) => {
    setDeadlines(prev => [...newItems, ...prev]);
  };

  const handleResetSampleData = () => {
    if (confirm('Reset to initial sample campus deadlines?')) {
      setDeadlines(INITIAL_DEADLINES);
      localStorage.removeItem('campusconnect_deadlines');
    }
  };

  const handleStartPomodoro = (deadline) => {
    setPomodoroTarget(deadline);
    setIsPomodoroOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 flex flex-col">
      
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenQuickAdd={() => { setEditingDeadline(null); setIsQuickAddOpen(true); }}
        onOpenUnscrambler={() => setIsUnscramblerOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onResetSampleData={handleResetSampleData}
        stats={stats}
      />

      {/* Live Urgent Countdown Banner */}
      <CountdownBanner
        urgentDeadline={mostUrgentDeadline}
        onSelectDeadline={(dl) => handleStartPomodoro(dl)}
      />

      {/* Main Content Hub */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Statistics Metric Cards */}
        <StatSummary
          stats={stats}
          activeFilter={statusFilter}
          onSelectStatusFilter={(filter) => setStatusFilter(filter)}
        />

        {/* Filter, Search & View Controls */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          courses={courses}
        />

        {/* View Layout Renderer */}
        {viewMode === 'list' && (
          <ListView
            deadlines={filteredDeadlines}
            onToggleComplete={handleToggleComplete}
            onToggleBookmark={handleToggleBookmark}
            onEdit={(dl) => { setEditingDeadline(dl); setIsQuickAddOpen(true); }}
            onDelete={handleDeleteDeadline}
            onStartPomodoro={handleStartPomodoro}
          />
        )}

        {viewMode === 'calendar' && (
          <CalendarView
            deadlines={filteredDeadlines}
            onToggleComplete={handleToggleComplete}
            onToggleBookmark={handleToggleBookmark}
            onEdit={(dl) => { setEditingDeadline(dl); setIsQuickAddOpen(true); }}
            onDelete={handleDeleteDeadline}
            onStartPomodoro={handleStartPomodoro}
          />
        )}

        {viewMode === 'courses' && (
          <CourseView
            deadlines={filteredDeadlines}
            courses={courses}
            onToggleComplete={handleToggleComplete}
            onToggleBookmark={handleToggleBookmark}
            onEdit={(dl) => { setEditingDeadline(dl); setIsQuickAddOpen(true); }}
            onDelete={handleDeleteDeadline}
            onStartPomodoro={handleStartPomodoro}
          />
        )}

        {viewMode === 'kanban' && (
          <KanbanView
            deadlines={filteredDeadlines}
            onToggleComplete={handleToggleComplete}
            onToggleBookmark={handleToggleBookmark}
            onEdit={(dl) => { setEditingDeadline(dl); setIsQuickAddOpen(true); }}
            onDelete={handleDeleteDeadline}
            onStartPomodoro={handleStartPomodoro}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>CampusConnect &copy; 2026 • 4-Hour Hackathon Problem Statement #4</span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Smart Deadline & Academic Calendar Hub
          </span>
        </div>
      </footer>

      {/* Modals */}
      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onSave={handleSaveDeadline}
        editingDeadline={editingDeadline}
        courses={courses}
      />

      <UnscramblerModal
        isOpen={isUnscramblerOpen}
        onClose={() => setIsUnscramblerOpen(false)}
        onImportDeadlines={handleImportUnscrambled}
      />

      <PomodoroModal
        isOpen={isPomodoroOpen}
        onClose={() => setIsPomodoroOpen(false)}
        deadline={pomodoroTarget}
        onMarkComplete={handleToggleComplete}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        deadlines={deadlines}
        onImportJSON={(imported) => setDeadlines(imported)}
      />

    </div>
  );
}
