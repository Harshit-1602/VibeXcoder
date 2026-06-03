import { create } from 'zustand';

interface AppState {
  currentScene: 'arrival' | 'lobby' | 'menu' | 'lab' | 'reservation';
  setCurrentScene: (scene: AppState['currentScene']) => void;
  progress: number; // 0 to 1 for scene transitions
  setProgress: (progress: number) => void;
}

export const useStore = create<AppState>((set) => ({
  currentScene: 'arrival',
  setCurrentScene: (scene) => set({ currentScene: scene }),
  progress: 0,
  setProgress: (progress) => set({ progress }),
}));
