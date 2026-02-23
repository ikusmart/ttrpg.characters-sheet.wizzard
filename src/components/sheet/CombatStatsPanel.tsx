import type { Character } from '@/models/character';
import { useCharacter } from '@/context/CharacterContext';
import { InlineInput } from '@/components/sheet/InlineInput';
import { formatModifier } from '@/lib/characterCalculations';

interface Props { character: Character; }

export function CombatStatsPanel({ character }: Props) {
  const { dispatch, isReadOnly } = useCharacter();

  return (
    <div className="grid grid-cols-3 gap-2">
      {/* Armor Class — editable */}
      <div className="flex flex-col items-center p-3 rounded-lg border border-border bg-card">
        <InlineInput
          value={character.armorClass}
          onChange={(v) => dispatch({ type: 'SET_ARMOR_CLASS', armorClass: Number(v) })}
          type="number"
          min={0}
          disabled={isReadOnly}
          className="text-2xl font-bold text-center w-16"
        />
        <span className="text-[10px] text-center text-muted-foreground leading-tight">
          Класс Доспеха
          <br />
          (Armor Class)
        </span>
      </div>

      {/* Initiative — read-only, auto-calculated from DEX */}
      <div className="flex flex-col items-center p-3 rounded-lg border border-border bg-card">
        <span className="text-2xl font-bold">{formatModifier(character.initiative)}</span>
        <span className="text-[10px] text-center text-muted-foreground leading-tight">
          Инициатива
          <br />
          (Initiative)
        </span>
      </div>

      {/* Speed — editable */}
      <div className="flex flex-col items-center p-3 rounded-lg border border-border bg-card">
        <div className="flex items-baseline gap-1">
          <InlineInput
            value={character.speed}
            onChange={(v) => dispatch({ type: 'SET_SPEED', speed: Number(v) })}
            type="number"
            min={0}
            disabled={isReadOnly}
            className="text-2xl font-bold text-center w-16"
          />
          <span className="text-sm text-muted-foreground">фт</span>
        </div>
        <span className="text-[10px] text-center text-muted-foreground leading-tight">
          Скорость
          <br />
          (Speed)
        </span>
      </div>
    </div>
  );
}
