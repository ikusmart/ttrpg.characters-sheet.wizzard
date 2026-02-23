import type { Character } from '@/models/character';
import { useCharacter } from '@/context/CharacterContext';
import { InlineInput } from '@/components/sheet/InlineInput';
import { gameTerms } from '@/i18n/terms';
import type { CharacterAction } from '@/context/characterReducer';

interface Props { character: Character; }

const sectionConfig = [
  { key: 'traits', label: gameTerms.traits, field: 'personalityTraits', actionType: 'SET_PERSONALITY_TRAITS', actionPayloadKey: 'personalityTraits' },
  { key: 'ideals', label: gameTerms.ideals, field: 'ideals', actionType: 'SET_IDEALS', actionPayloadKey: 'ideals' },
  { key: 'bonds', label: gameTerms.bonds, field: 'bonds', actionType: 'SET_BONDS', actionPayloadKey: 'bonds' },
  { key: 'flaws', label: gameTerms.flaws, field: 'flaws', actionType: 'SET_FLAWS', actionPayloadKey: 'flaws' },
] as const;

export function PersonalityPanel({ character }: Props) {
  const { dispatch, isReadOnly } = useCharacter();

  return (
    <div className="space-y-2">
      <div className="space-y-3">
        {sectionConfig.map((section) => (
          <div key={section.key}>
            <span className="text-xs font-medium text-muted-foreground">
              {section.label.ru} ({section.label.en})
            </span>
            <InlineInput
              type="textarea"
              value={character[section.field]}
              onChange={(value) =>
                dispatch({ type: section.actionType, [section.actionPayloadKey]: value } as CharacterAction)
              }
              disabled={isReadOnly}
              className="text-sm mt-0.5 w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
