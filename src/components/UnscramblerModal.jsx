import React, { useState } from 'react';
import { X, Wand2, Sparkles, Plus, Check, MessageSquare, AlertCircle } from 'lucide-react';
import { parseUnstructuredText } from '../utils/textParser';
import { RAW_CHAT_EXAMPLES } from '../data/mockData';

export default function UnscramblerModal({ isOpen, onClose, onImportDeadlines }) {
  const [rawText, setRawText] = useState('');
  const [extractedItems, setExtractedItems] = useState([]);
  const [selectedIndices, setSelectedIndices] = useState([]);

  if (!isOpen) return null;

  const handleParse = () => {
    if (!rawText.trim()) return;
    const items = parseUnstructuredText(rawText);
    setExtractedItems(items);
    setSelectedIndices(items.map((_, i) => i));
  };

  const handleLoadSample = (sampleText) => {
    setRawText(sampleText);
    const items = parseUnstructuredText(sampleText);
    setExtractedItems(items);
    setSelectedIndices(items.map((_, i) => i));
  };

  const toggleSelectIndex = (idx) => {
    if (selectedIndices.includes(idx)) {
      setSelectedIndices(selectedIndices.filter(i => i !== idx));
    } else {
      setSelectedIndices([...selectedIndices, idx]);
    }
  };

  const handleConfirmImport = () => {
    const toImport = extractedItems.filter((_, idx) => selectedIndices.includes(idx));
    if (toImport.length > 0) {
      onImportDeadlines(toImport);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 m-0 leading-none">
                Smart Chat Un-scrambler
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 m-0">
                Paste raw WhatsApp chats, class notices or emails to auto-extract deadlines!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          
          {/* Quick Preset Chat Samples */}
          <div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-2">
              Try a Quick Preset Chat Example:
            </span>
            <div className="flex flex-wrap gap-2">
              {RAW_CHAT_EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleLoadSample(ex.text)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-950/60 hover:text-purple-700 dark:hover:text-purple-300 transition-colors border border-slate-200/80 dark:border-slate-700"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-purple-500" />
                  <span>{ex.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Textarea Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Raw Text Input
            </label>
            <textarea
              rows={4}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="Paste WhatsApp messages here, e.g.: 'CS101 assignment 3 due next Monday at 11:59 PM. PHY103 midterm exam on 30th Oct 10 AM...'"
              className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleParse}
                disabled={!rawText.trim()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Parse & Extract Deadlines</span>
              </button>
            </div>
          </div>

          {/* Extracted Preview List */}
          {extractedItems.length > 0 && (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Extracted Deadlines ({extractedItems.length} found)
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Select items to add to your hub
                </span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {extractedItems.map((item, idx) => {
                  const isSelected = selectedIndices.includes(idx);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleSelectIndex(idx)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-purple-50/60 dark:bg-purple-950/40 border-purple-300 dark:border-purple-800'
                          : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60 opacity-60'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center border mt-0.5 shrink-0 ${
                        isSelected ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                            {item.courseCode}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300">
                            {item.category}
                          </span>
                          <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 ml-auto">
                            {new Date(item.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 m-0">
                          {item.title}
                        </h5>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {selectedIndices.length} item(s) selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmImport}
              disabled={selectedIndices.length === 0}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Import Selected Deadlines</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
