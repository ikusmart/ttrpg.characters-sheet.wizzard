import { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import type { VtmCharacter } from '@/models/vtm/character';
import { vtmCharacterReducer, type VtmCharacterAction } from './vtmCharacterReducer';
import { saveVtmCharacter } from '@/lib/vtmCharacterStorage';

interface VtmCharacterContextValue {
  character: VtmCharacter;
  dispatch: (action: VtmCharacterAction) => void;
  isReadOnly: boolean;
}

const VtmCharacterContext = createContext<VtmCharacterContextValue | null>(null);

interface VtmCharacterProviderProps {
  character: VtmCharacter;
  isReadOnly: boolean;
  children: React.ReactNode;
}

export function VtmCharacterProvider({ character: initialCharacter, isReadOnly, children }: VtmCharacterProviderProps) {
  const [character, rawDispatch] = useReducer(vtmCharacterReducer, initialCharacter);

  // Wrap dispatch to no-op in read-only mode
  const dispatch = useCallback(
    (action: VtmCharacterAction) => {
      if (!isReadOnly) {
        rawDispatch(action);
      }
    },
    [isReadOnly],
  );

  // Auto-save with 500ms debounce (skip for read-only / demo)
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isFirstRender = useRef(true);
  const latestCharacterRef = useRef(character);
  latestCharacterRef.current = character;

  useEffect(() => {
    // Skip saving on initial render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isReadOnly) return;

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = setTimeout(() => {
      saveVtmCharacter(character);
    }, 500);

    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }
    };
  }, [character, isReadOnly]);

  // Flush pending save on unmount
  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        if (!isReadOnly) {
          saveVtmCharacter(latestCharacterRef.current);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional unmount-only effect
  }, []);

  // Sync if external character changes (e.g., navigating to different character)
  useEffect(() => {
    rawDispatch({ type: 'REPLACE_CHARACTER', character: initialCharacter });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-sync when navigating to a different character
  }, [initialCharacter.id]);

  return (
    <VtmCharacterContext.Provider value={{ character, dispatch, isReadOnly }}>
      {children}
    </VtmCharacterContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useVtmCharacter(): VtmCharacterContextValue {
  const ctx = useContext(VtmCharacterContext);
  if (!ctx) {
    throw new Error('useVtmCharacter must be used within a VtmCharacterProvider');
  }
  return ctx;
}
