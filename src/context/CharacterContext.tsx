import { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import type { Character } from '@/models/character';
import { characterReducer, type CharacterAction } from './characterReducer';
import { saveCharacter } from '@/lib/characterStorage';

interface CharacterContextValue {
  character: Character;
  dispatch: (action: CharacterAction) => void;
  isReadOnly: boolean;
}

const CharacterContext = createContext<CharacterContextValue | null>(null);

interface CharacterProviderProps {
  character: Character;
  isReadOnly: boolean;
  children: React.ReactNode;
}

export function CharacterProvider({ character: initialCharacter, isReadOnly, children }: CharacterProviderProps) {
  const [character, rawDispatch] = useReducer(characterReducer, initialCharacter);

  // Wrap dispatch to no-op in read-only mode
  const dispatch = useCallback(
    (action: CharacterAction) => {
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
      saveCharacter(character);
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
          saveCharacter(latestCharacterRef.current);
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
    <CharacterContext.Provider value={{ character, dispatch, isReadOnly }}>
      {children}
    </CharacterContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCharacter(): CharacterContextValue {
  const ctx = useContext(CharacterContext);
  if (!ctx) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return ctx;
}
