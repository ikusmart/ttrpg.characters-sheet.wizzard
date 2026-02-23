import { useVtmCharacter } from '@/context/VtmCharacterContext';
import { DamageTrackDisplay } from './DamageTrackDisplay';

export function HealthWillpowerPanel() {
  const { character, dispatch, isReadOnly } = useVtmCharacter();

  return (
    <div className="space-y-3">
      <DamageTrackDisplay
        track={character.health}
        label="Здоровье"
        labelEn="Health"
        onCycle={!isReadOnly ? (i) => dispatch({ type: 'CYCLE_HEALTH_DAMAGE', index: i }) : undefined}
      />
      <DamageTrackDisplay
        track={character.willpower}
        label="Сила воли"
        labelEn="Willpower"
        onCycle={!isReadOnly ? (i) => dispatch({ type: 'CYCLE_WILLPOWER_DAMAGE', index: i }) : undefined}
      />
    </div>
  );
}
