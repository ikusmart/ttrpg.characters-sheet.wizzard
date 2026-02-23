import { useVtmCharacter } from '@/context/VtmCharacterContext';
import { vtmGameTerms } from '@/i18n/vtmTerms';
import { useValueAnimation } from '@/hooks/useValueAnimation';

const MAX_HUNGER = 5;

export function HungerTracker() {
  const { character, dispatch, isReadOnly } = useVtmCharacter();
  const animClass = useValueAnimation(character.hunger);

  return (
    <div>
      <div className={`flex gap-2 mb-2${animClass ? ` ${animClass}` : ''}`}>
        {Array.from({ length: MAX_HUNGER }, (_, i) => (
          i < character.hunger ? (
            <div
              key={i}
              className={`w-8 h-8 rounded bg-red-600 dark:bg-red-500 flex items-center justify-center text-white font-bold text-sm${!isReadOnly ? ' cursor-pointer' : ''}`}
              onClick={!isReadOnly ? () => dispatch({ type: 'SET_HUNGER', hunger: i }) : undefined}
            >
              {i + 1}
            </div>
          ) : (
            <div
              key={i}
              className={`w-8 h-8 rounded border-2 border-red-600/40 dark:border-red-500/40${!isReadOnly ? ' cursor-pointer' : ''}`}
              onClick={!isReadOnly ? () => dispatch({ type: 'SET_HUNGER', hunger: i + 1 }) : undefined}
            />
          )
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {vtmGameTerms.bloodPotency.ru} ({vtmGameTerms.bloodPotency.en}): {character.bloodPotency}
      </p>
    </div>
  );
}
