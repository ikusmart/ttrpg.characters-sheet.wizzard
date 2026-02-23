import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { GameSystem } from '@/models/help';

interface HelpContextValue {
  helpModeEnabled: boolean;
  toggleHelpMode: () => void;
  isDrawerOpen: boolean;
  activeSectionId: string | null;
  activeGameSystem: GameSystem | null;
  openDrawer: (sectionId: string, gameSystem: GameSystem) => void;
  closeDrawer: () => void;
  isTourRunning: boolean;
  startTour: (gameSystem: GameSystem) => void;
  stopTour: () => void;
  tourGameSystem: GameSystem | null;
}

const HelpContext = createContext<HelpContextValue | null>(null);

export function useHelp(): HelpContextValue {
  const ctx = useContext(HelpContext);
  if (!ctx) throw new Error('useHelp must be used within HelpProvider');
  return ctx;
}

interface HelpProviderProps {
  children: ReactNode;
}

export function HelpProvider({ children }: HelpProviderProps) {
  const [helpModeEnabled, setHelpModeEnabled] = useState(() => {
    try {
      return localStorage.getItem('helpModeEnabled') === 'true';
    } catch {
      return false;
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [activeGameSystem, setActiveGameSystem] = useState<GameSystem | null>(null);
  const [isTourRunning, setIsTourRunning] = useState(false);
  const [tourGameSystem, setTourGameSystem] = useState<GameSystem | null>(null);

  const toggleHelpMode = useCallback(() => {
    setHelpModeEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('helpModeEnabled', String(next));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  const openDrawer = useCallback((sectionId: string, gameSystem: GameSystem) => {
    setActiveSectionId(sectionId);
    setActiveGameSystem(gameSystem);
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setActiveSectionId(null);
    setActiveGameSystem(null);
  }, []);

  const startTour = useCallback((gameSystem: GameSystem) => {
    setTourGameSystem(gameSystem);
    setIsTourRunning(true);
  }, []);

  const stopTour = useCallback(() => {
    setIsTourRunning(false);
    setTourGameSystem(null);
  }, []);

  return (
    <HelpContext.Provider
      value={{
        helpModeEnabled,
        toggleHelpMode,
        isDrawerOpen,
        activeSectionId,
        activeGameSystem,
        openDrawer,
        closeDrawer,
        isTourRunning,
        startTour,
        stopTour,
        tourGameSystem,
      }}
    >
      {children}
    </HelpContext.Provider>
  );
}
