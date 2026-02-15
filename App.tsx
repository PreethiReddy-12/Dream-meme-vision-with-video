
import React, { useState, useEffect, useCallback } from 'react';
import { analyzeDream, generateImage } from './services/gemini';
import { DreamEntry, AppState } from './types';
import DreamInput from './components/DreamInput';
import DreamResult from './components/DreamResult';
import History from './components/History';
import LoadingOverlay from './components/LoadingOverlay';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [history, setHistory] = useState<DreamEntry[]>([]);
  const [currentDream, setCurrentDream] = useState<DreamEntry | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('somnia_archive');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('somnia_archive', JSON.stringify(history));
  }, [history]);

  const handleAnalyze = async (description: string) => {
    setError(null);
    setState(AppState.ANALYZING);
    setCurrentDream(null);

    try {
      // 1. Analyze Dream Text
      const analysis = await analyzeDream(description);
      
      // 2. Generate Visual
      setState(AppState.GENERATING_VISUAL);
      const visualUrl = await generateImage(analysis.visualPrompt);
      
      // 3. Generate Meme
      setState(AppState.GENERATING_MEME);
      const memeUrl = await generateImage(analysis.memePrompt);

      const newEntry: DreamEntry = {
        id: crypto.randomUUID(),
        description,
        analysis,
        visualUrl,
        memeUrl,
        timestamp: Date.now(),
      };

      setCurrentDream(newEntry);
      setHistory(prev => [newEntry, ...prev.slice(0, 19)]);
      setState(AppState.COMPLETE);
      
      // Scroll to result
      setTimeout(() => {
        document.getElementById('dream-result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "The dream collapsed before it could be manifested.");
      setState(AppState.ERROR);
    }
  };

  const selectHistory = useCallback((entry: DreamEntry) => {
    setCurrentDream(entry);
    document.getElementById('dream-result')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen dream-gradient selection:bg-purple-500/30">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-40 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full"></div>
      </div>

      <LoadingOverlay state={state} />

      <header className="relative z-10 pt-16 pb-8 text-center px-4">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 glass rounded-full border-purple-500/30">
          <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-purple-300">Somnia Engine v3.0</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
          SOMNIA
        </h1>
        <p className="max-w-xl mx-auto text-gray-400 text-lg font-light leading-relaxed">
          The ultimate portal for translating your nocturnal hallucinations into 
          <span className="text-white font-medium"> surreal art</span> and 
          <span className="text-white font-medium"> viral memes</span>.
        </p>
      </header>

      <main className="relative z-10 px-4 max-w-6xl mx-auto pb-32">
        <section className="py-10">
          <DreamInput onAnalyze={handleAnalyze} isLoading={state !== AppState.IDLE && state !== AppState.COMPLETE && state !== AppState.ERROR} />
        </section>

        {error && (
          <div className="max-w-2xl mx-auto mb-10 p-6 glass border-red-500/50 rounded-2xl text-center text-red-400 flex items-center gap-4 justify-center">
            <i className="fa-solid fa-circle-exclamation text-xl"></i>
            <p>{error}</p>
            <button onClick={() => setState(AppState.IDLE)} className="text-xs uppercase font-bold text-white bg-red-500/20 px-3 py-1 rounded-lg hover:bg-red-500/30">Dismiss</button>
          </div>
        )}

        {currentDream && (
          <section id="dream-result">
            <DreamResult entry={currentDream} />
          </section>
        )}

        <History entries={history} onSelect={selectHistory} />
      </main>

      <footer className="relative z-10 py-10 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Somnia • Built with Gemini 2.5 Image • For the Dreamers</p>
      </footer>
    </div>
  );
};

export default App;
