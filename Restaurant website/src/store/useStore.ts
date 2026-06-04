import { create } from 'zustand';

interface AppState {
  currentScene: 'arrival' | 'lobby' | 'menu' | 'lab' | 'reservation';
  setCurrentScene: (scene: AppState['currentScene']) => void;
  progress: number; // 0 to 1 for scene transitions
  setProgress: (progress: number) => void;
  selectedDate: string;
  selectedTime: string;
  bookedTableIds: string[];
  selectedTableId: string;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  setBookedTableIds: (ids: string[]) => void;
  setSelectedTableId: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  currentScene: 'arrival',
  setCurrentScene: (scene) => set({ currentScene: scene }),
  progress: 0,
  setProgress: (progress) => set({ progress }),
  selectedDate: '',
  selectedTime: '',
  bookedTableIds: [],
  selectedTableId: 'chefs',
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setBookedTableIds: (ids) => set({ bookedTableIds: ids }),
  setSelectedTableId: (id) => set({ selectedTableId: id }),
}));
