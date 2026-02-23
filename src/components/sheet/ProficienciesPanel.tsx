import type { Character } from '@/models/character';
import { useCharacter } from '@/context/CharacterContext';
import { InlineInput } from '@/components/sheet/InlineInput';
import type { CharacterAction } from '@/context/characterReducer';

interface Props { character: Character; }

const sectionConfig = [
  { label: 'Языки (Languages)', field: 'languages' as const, actionType: 'SET_PROFICIENCY_LANGUAGES', actionPayloadKey: 'languages' },
  { label: 'Инструменты (Tools)', field: 'tools' as const, actionType: 'SET_PROFICIENCY_TOOLS', actionPayloadKey: 'tools' },
  { label: 'Доспехи (Armor)', field: 'armor' as const, actionType: 'SET_PROFICIENCY_ARMOR', actionPayloadKey: 'armor' },
  { label: 'Оружие (Weapons)', field: 'weapons' as const, actionType: 'SET_PROFICIENCY_WEAPONS', actionPayloadKey: 'weapons' },
] as const;

export function ProficienciesPanel({ character }: Props) {
  const { dispatch, isReadOnly } = useCharacter();

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        {sectionConfig.map((section) => (
          <div key={section.label}>
            <span className="text-xs font-medium text-muted-foreground">{section.label}</span>
            <InlineInput
              value={character.proficiencies[section.field].join(', ')}
              onChange={(value) => {
                const items = value
                  .split(',')
                  .map((s) => s.trim())
                  .filter((s) => s.length > 0);
                dispatch({ type: section.actionType, [section.actionPayloadKey]: items } as CharacterAction);
              }}
              disabled={isReadOnly}
              className="text-sm w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
