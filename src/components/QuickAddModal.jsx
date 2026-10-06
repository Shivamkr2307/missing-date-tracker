import React, { useState, useEffect } from 'react';
import { X, Calendar, Plus, Save, Clock, MapPin, Tag, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

export default function QuickAddModal({
  isOpen,
  onClose,
  onSave,
  editingDeadline,
  courses
}) {
  const [formData, setFormData] = useState({
    title: '',
    courseCode: 'CS101',
    category: 'Assignment',
    dueDate: '',
    dueTime: '23:59',
    priority: 'Medium',
    status: 'Pending',
    description: '',
    location: '',
    weightage: '',
    bookmarked: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingDeadline) {
      const d = new Date(editingDeadline.dueDate);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');

      setFormData({
        title: editingDeadline.title || '',
        courseCode: editingDeadline.courseCode || 'CS101',
        category: editingDeadline.category || 'Assignment',
        dueDate: `${year}-${month}-${day}`,
        dueTime: `${hours}:${minutes}`,
        priority: editingDeadline.priority || 'Medium',
        status: editingDeadline.status || 'Pending',
        description: editingDeadline.description || '',
        location: editingDeadline.location || '',
        weightage: editingDeadline.weightage || '',
        bookmarked: !!editingDeadline.bookmarked
      });
    } else {
      // Default due date tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const year = tomorrow.getFullYear();
      const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const day = String(tomorrow.getDate()).padStart(2, '0');

      setFormData({
        title: '',
        courseCode: courses[0]?.code || 'CS101',
        category: 'Assignment',
        dueDate: `${year}-${month}-${day}`,
        dueTime: '23:59',
        priority: 'Medium',
        status: 'Pending',
        description: '',
        location: 'Canvas / LMS Portal',
        weightage: '',
        bookmarked: false
      });
    }
    setErrors({});
  }, [editingDeadline, isOpen, courses]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Title is required';
    if (!formData.dueDate) errs.dueDate = 'Due Date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const isoDate = new Date(`${formData.dueDate}T${formData.dueTime || '23:59'}:00`).toISOString();

    const payload = {
      id: editingDeadline ? editingDeadline.id : `dl-${Date.now()}`,
      title: formData.title.trim(),
      courseCode: formData.courseCode,
      courseId: formData.courseCode,
      category: formData.category,
      dueDate: isoDate,
      priority: formData.priority,
      status: formData.status,
      description: formData.description.trim(),
      location: formData.location.trim(),
      weightage: formData.weightage.trim(),
      bookmarked: formData.bookmarked,
      createdAt: editingDeadline ? editingDeadline.createdAt : new Date().toISOString()
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 m-0">
              {editingDeadline ? 'Edit Academic Deadline' : 'Add New Deadline'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Deadline Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Data Structures Mid-Term Exam, SRS Report 2"
              className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            {errors.title && (
              <p className="text-xs text-rose-500 mt-1 m-0 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.title}
              </p>
            )}
          </div>

          {/* Row: Subject & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Course / Subject *
              </label>
              <select
                value={formData.courseCode}
                onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {courses.map(c => (
                  <option key={c.id} value={c.code}>{c.code} - {c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                {CATEGORIES.filter(c => c.id !== 'all').map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row: Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Due Date *
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              {errors.dueDate && <p className="text-xs text-rose-500 mt-1 m-0">{errors.dueDate}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Due Time
              </label>
              <input
                type="time"
                value={formData.dueTime}
                onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Row: Priority & Weightage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Priority Level
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="High">High (Urgent / Exams)</option>
                <option value="Medium">Medium (Regular Assignments)</option>
                <option value="Low">Low (Optional / Readings)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Grade Weightage
              </label>
              <input
                type="text"
                value={formData.weightage}
                onChange={(e) => setFormData({ ...formData, weightage: e.target.value })}
                placeholder="e.g. 20% of final grade"
                className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>

          {/* Location / Portal */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Submission Portal / Exam Hall
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Hall 3B, Moodle Portal, Google Classroom"
              className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Notes & Instructions
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add syllabus topics, submission requirements, team member roles..."
              className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20"
            >
              <Save className="w-4 h-4" />
              <span>{editingDeadline ? 'Update Deadline' : 'Save Deadline'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
