import React, { useRef } from 'react';
import { X, Calendar, Download, Upload, FileCode, CheckCircle2 } from 'lucide-react';
import { exportDeadlinesToICS } from '../utils/icalExporter';

export default function ExportModal({ isOpen, onClose, deadlines, onImportJSON }) {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleExportICS = () => {
    exportDeadlinesToICS(deadlines);
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(deadlines, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'campusconnect-deadlines-backup.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const imported = JSON.parse(evt.target.result);
        if (Array.isArray(imported)) {
          onImportJSON(imported);
          alert('Deadlines imported successfully!');
          onClose();
        } else {
          alert('Invalid file format. Expected a JSON array of deadlines.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-lg overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 m-0">
              Export & Backup Calendar Hub
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          
          {/* iCal Option */}
          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-indigo-600 text-white">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
                  Export to Google / Apple Calendar
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                  Downloads standard .ics file compatible with all mobile calendar apps.
                </p>
              </div>
            </div>
            <button
              onClick={handleExportICS}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shrink-0"
            >
              Export .ics
            </button>
          </div>

          {/* JSON Backup Export Option */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-700 text-white">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
                  Download JSON Backup
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                  Full backup of all deadlines and custom tags.
                </p>
              </div>
            </div>
            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 shadow-sm shrink-0"
            >
              Save JSON
            </button>
          </div>

          {/* JSON Restore Import Option */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-600 text-white">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 m-0">
                  Restore from JSON Backup
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 m-0">
                  Import deadlines from a previously saved JSON file.
                </p>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shrink-0"
            >
              Import JSON
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
