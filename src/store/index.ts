import { create } from 'zustand';

interface StoreState {
  apiKeys: {
    chatgpt: string;
    gemini: string;
  };
  selectedModel: string;
  isAIMode: boolean;
  selectedPrompt: {
    id: string;
    category: string;
    prompt: string;
  } | null;
  businessType: string;
  setApiKey: (provider: 'chatgpt' | 'gemini', key: string) => void;
  setSelectedModel: (model: string) => void;
  setIsAIMode: (isAIMode: boolean) => void;
  setSelectedPrompt: (prompt: { id: string; category: string; prompt: string; } | null) => void;
  setBusinessType: (type: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  apiKeys: {
    chatgpt: '',
    gemini: '',
  },
  selectedModel: 'chatgpt',
  isAIMode: false,
  selectedPrompt: null,
  businessType: '',
  setApiKey: (provider, key) =>
    set((state) => ({
      apiKeys: { ...state.apiKeys, [provider]: key },
    })),
  setSelectedModel: (model) => set({ selectedModel: model }),
  setIsAIMode: (isAIMode) => set({ isAIMode }),
  setSelectedPrompt: (prompt) => set({ selectedPrompt: prompt }),
  setBusinessType: (type) => set({ businessType: type }),
})); 