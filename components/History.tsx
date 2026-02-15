
import React from 'react';
import { DreamEntry } from '../types';

interface HistoryProps {
  entries: DreamEntry[];
  onSelect: (entry: DreamEntry) => void;
}

const History: React.FC<HistoryProps> = ({ entries, onSelect }) => {
  if (entries.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto py-20 border-t border-white/10">
      <h3 className="font-display font-bold text-2xl mb-8 flex items-center gap-3">
        <i className="fa-solid fa-clock-rotate-left text-purple-500"></i>
        Previous Dream Archives
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {entries.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onSelect(entry)}
            className="group relative aspect-square rounded-2xl overflow-hidden glass hover:glow transition-all"
          >
            <img 
              src={entry.visualUrl} 
              alt={entry.analysis.title} 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
              <p className="text-xs font-bold text-white uppercase tracking-wider truncate">
                {entry.analysis.title}
              </p>
              <p className="text-[10px] text-gray-400">
                {new Date(entry.timestamp).toLocaleDateString()}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default History;
