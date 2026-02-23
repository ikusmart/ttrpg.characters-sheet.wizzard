import { useVtmCharacter } from '@/context/VtmCharacterContext';
import { InlineInput } from '@/components/sheet/InlineInput';

export function PersonalityPanel() {
  const { character, dispatch, isReadOnly } = useVtmCharacter();

  return (
    <div className="space-y-3">
      <div>
        <InlineInput
          value={character.appearance}
          onChange={(v) => dispatch({ type: 'SET_APPEARANCE', appearance: v })}
          type="textarea"
          disabled={isReadOnly}
          placeholder="—"
        />
      </div>

      <div>
        <span className="text-xs font-medium text-muted-foreground">
          Черты характера (Personality Traits)
        </span>
        <InlineInput
          value={character.personalityTraits}
          onChange={(v) => dispatch({ type: 'SET_PERSONALITY_TRAITS', personalityTraits: v })}
          type="textarea"
          disabled={isReadOnly}
          placeholder="—"
        />
      </div>
    </div>
  );
}
