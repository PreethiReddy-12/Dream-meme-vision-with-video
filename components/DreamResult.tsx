
import React from 'react';
import { DreamEntry } from '../types';

interface DreamResultProps {
  entry: DreamEntry;
}

const DreamResult: React.FC<DreamResultProps> = ({ entry }) => {
  return (
    <div className="space-y-12 py-8 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          {entry.analysis.title}
        </h2>
        <div className="flex justify-center gap-2">
          <span className="px-3 py-1 bg-purple-900/40 border border-purple-500/30 rounded-full text-xs font-bold uppercase tracking-widest text-purple-300">
            Mood: {entry.analysis.mood}
          </span>
          <span className="px-3 py-1 bg-blue-900/40 border border-blue-500/30 rounded-full text-xs font-bold uppercase tracking-widest text-blue-300">
            Dream Interpretation
          </span>
        </div>
        <p className="max-w-2xl mx-auto text-gray-300 leading-relaxed text-lg italic">
          "{entry.analysis.interpretation}"
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Visualization Card */}
        <div className="glass rounded-3xl overflow-hidden shadow-2xl group transition-all hover:scale-[1.01]">
          <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-display font-bold uppercase tracking-widest text-sm text-purple-400">Subconscious Vision</h3>
            <button className="text-gray-400 hover:text-white transition-colors">
              <i className="fa-solid fa-download"></i>
            </button>
          </div>
          <div className="relative aspect-square overflow-hidden bg-gray-900">
            <img 
              src={entry.visualUrl} 
              alt="Dream Visualization" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
              <p className="text-xs text-white/80 line-clamp-3">{entry.analysis.visualPrompt}</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-400 text-sm line-clamp-3">
              A high-definition manifestation of your dream's surreal architecture and mood.
            </p>
          </div>
        </div>

        {/* Meme Card */}
        <div className="glass rounded-3xl overflow-hidden shadow-2xl group transition-all hover:scale-[1.01]">
          <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
            <h3 className="font-display font-bold uppercase tracking-widest text-sm text-blue-400">The Meme Perspective</h3>
            <button className="text-gray-400 hover:text-white transition-colors">
              <i className="fa-solid fa-share-nodes"></i>
            </button>
          </div>
          <div className="relative aspect-square overflow-hidden bg-gray-900 flex flex-col">
            <div className="flex-1 overflow-hidden relative">
              <img 
                src={entry.memeUrl} 
                alt="Dream Meme" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-sm border-t border-white/10">
              <h4 className="font-display font-black text-center text-xl md:text-2xl uppercase italic tracking-tighter text-white drop-shadow-lg">
                {entry.analysis.memeCaption}
              </h4>
            </div>
          </div>
          <div className="p-6">
             <p className="text-gray-400 text-sm">
              Because even our deepest anxieties deserve to be mocked in 1080p resolution.
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-gray-500 hover:text-white transition-colors text-sm font-medium"
        >
          <i className="fa-solid fa-arrow-up mr-2"></i>
          Analyze Another Dream
        </button>
      </div>
    </div>
  );
};

export default DreamResult;
