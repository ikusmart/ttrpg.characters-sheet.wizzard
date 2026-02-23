import { useVtmCharacter } from '@/context/VtmCharacterContext';
import { vtmGameTerms } from '@/i18n/vtmTerms';
import { DotRating } from './DotRating';
import { useValueAnimation } from '@/hooks/useValueAnimation';

export function HumanityTracker() {
  const { character, dispatch, isReadOnly } = useVtmCharacter();
  const animClass = useValueAnimation(character.humanity);

  return (
    <div className="space-y-3">
      <div className={animClass || undefined}>
        <DotRating
          current={character.humanity}
          max={10}
          size="md"
          onChange={!isReadOnly ? (v) => dispatch({ type: 'SET_HUMANITY', humanity: v }) : undefined}
        />
      </div>

      {character.convictions.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            {vtmGameTerms.conviction.ru} (Convictions)
          </p>
          <ul className="space-y-1">
            {character.convictions.map((conviction, i) => (
              <li key={i} className="text-sm bg-muted/50 rounded px-2 py-1">
                {conviction}
              </li>
            ))}
          </ul>
        </div>
      )}

      {character.touchstones.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
            {vtmGameTerms.touchstone.ru} (Touchstones)
          </p>
          <ul className="space-y-1">
            {character.touchstones.map((touchstone, i) => (
              <li key={i} className="text-sm bg-muted/50 rounded px-2 py-1">
                {touchstone}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
