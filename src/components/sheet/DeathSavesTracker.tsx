import type { Character } from '@/models/character';
import { useCharacter } from '@/context/CharacterContext';

interface Props { character: Character; }

export function DeathSavesTracker({ character }: Props) {
  const { dispatch, isReadOnly } = useCharacter();
  const { successes, failures } = character.deathSaves;

  return (
    <div className="space-y-2">
      <div className="p-3 rounded-lg border border-border bg-card space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-16">Успехи</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={`s-${i}`}
                role={isReadOnly ? undefined : 'button'}
                tabIndex={isReadOnly ? undefined : 0}
                onClick={isReadOnly ? undefined : () => dispatch({ type: 'TOGGLE_DEATH_SUCCESS', index: i })}
                onKeyDown={isReadOnly ? undefined : (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dispatch({ type: 'TOGGLE_DEATH_SUCCESS', index: i });
                  }
                }}
                className={`w-4 h-4 rounded-full border-2 ${
                  i < successes ? 'bg-green-500 border-green-500' : 'border-muted-foreground'
                } ${!isReadOnly ? 'cursor-pointer hover:border-green-400' : ''}`}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-16">Провалы</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={`f-${i}`}
                role={isReadOnly ? undefined : 'button'}
                tabIndex={isReadOnly ? undefined : 0}
                onClick={isReadOnly ? undefined : () => dispatch({ type: 'TOGGLE_DEATH_FAILURE', index: i })}
                onKeyDown={isReadOnly ? undefined : (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dispatch({ type: 'TOGGLE_DEATH_FAILURE', index: i });
                  }
                }}
                className={`w-4 h-4 rounded-full border-2 ${
                  i < failures ? 'bg-red-500 border-red-500' : 'border-muted-foreground'
                } ${!isReadOnly ? 'cursor-pointer hover:border-red-400' : ''}`}
              />
            ))}
          </div>
        </div>
        {!isReadOnly && (
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={() => dispatch({ type: 'RESET_DEATH_SAVES' })}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Сброс
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
