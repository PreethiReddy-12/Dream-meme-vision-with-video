
import React, { useState } from 'react';

interface DreamInputProps {
  onAnalyze: (description: string) => void;
  isLoading: boolean;
}

const DreamInput: React.FC<DreamInputProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim().length < 10) return;
    onAnalyze(text);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="relative group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe your dream in detail... (e.g., 'I was flying over a city of clocks and then a giant cat offered me tea...')"
          className="w-full h-48 p-6 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-lg resize-none placeholder-gray-500 font-light"
          disabled={isLoading}
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-4">
          <span className="text-xs text-gray-500 font-medium">
            {text.length} characters
          </span>
          <button
            type="submit"
            disabled={isLoading || text.trim().length < 10}
            className={`px-8 py-3 rounded-xl font-display font-bold text-sm tracking-widest uppercase transition-all flex items-center gap-2 ${
              isLoading || text.trim().length < 10
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg glow transform hover:-translate-y-0.5'
            }`}
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-spinner animate-spin"></i>
                Channeling...
              </>
            ) : (
              <>
                Manifest Dream
                <i className="fa-solid fa-wand-sparkles"></i>
              </>
            )}
          </button>
        </div>
      </form>
      <p className="text-center text-gray-400 text-sm italic">
        "Dreams are the touchstones of our characters." — Henry David Thoreau
      </p>
    </div>
  );
};

export default DreamInput;
