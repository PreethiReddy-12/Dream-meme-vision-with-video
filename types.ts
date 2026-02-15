
export interface DreamAnalysis {
  title: string;
  interpretation: string;
  mood: string;
  visualPrompt: string;
  memePrompt: string;
  memeCaption: string;
}

export interface DreamEntry {
  id: string;
  description: string;
  analysis: DreamAnalysis;
  visualUrl: string;
  memeUrl: string;
  timestamp: number;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  GENERATING_VISUAL = 'GENERATING_VISUAL',
  GENERATING_MEME = 'GENERATING_MEME',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}
