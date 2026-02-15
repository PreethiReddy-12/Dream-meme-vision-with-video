
import React from 'react';
import { AppState } from '../types';

interface LoadingOverlayProps {
  state: AppState;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ state }) => {
  if (state === AppState.IDLE || state === AppState.COMPLETE || state === AppState.ERROR) return null;

  const messages = {
    [AppState.ANALYZING]: {
      title: "Decoding the Subconscious",
      subtitle: "Interpreting symbols and extracting artistic motifs...",
      icon: "fa-brain"
    },
    [AppState.GENERATING_VISUAL]: {
      title: "Rendering the Dreamscape",
      subtitle: "Materializing your subconscious vision into pixels...",
      icon: "fa-palette"
    },
    [AppState.GENERATING_MEME]: {
      title: "Manufacturing the Relatability",
      subtitle: "Distilling existential dread into internet humor...",
      icon: "fa-face-grin-tears"
    }
  };

  const current = messages[state as keyof typeof messages] || messages[AppState.ANALYZING];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#030014]/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="text-center space-y-8 p-12 glass rounded-[3rem] max-w-md w-full border-purple-500/20 glow">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-purple-500 blur-3xl opacity-20 animate-pulse"></div>
          <i className={`fa-solid ${current.icon} text-6xl text-purple-500 mb-6 relative z-10 animate-bounce`}></i>
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-bold text-white tracking-wide">
            {current.title}
          </h2>
          <p className="text-gray-400 font-light leading-relaxed">
            {current.subtitle}
          </p>
        </div>
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 animate-[loading_2s_infinite]"></div>
        </div>
        <style>{`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoadingOverlay;
