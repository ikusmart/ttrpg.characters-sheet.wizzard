import type { Character } from '@/models/character';
import { useCharacter } from '@/context/CharacterContext';
import { InlineInput } from '@/components/sheet/InlineInput';

interface Props { character: Character; }

export function HitPointsTracker({ character }: Props) {
  const { dispatch, isReadOnly } = useCharacter();

  const hpPercentage = character.maxHitPoints > 0
    ? (character.currentHitPoints / character.maxHitPoints) * 100
    : 0;

  return (
    <div className="space-y-3">
      <div className="p-3 rounded-lg border border-border bg-card space-y-2">
        {/* Current HP display with +/- buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => dispatch({ type: 'ADJUST_HP', delta: -5 })}
              disabled={isReadOnly}
              className="w-7 h-7 rounded text-xs font-medium border border-border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-default"
            >
              -5
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: 'ADJUST_HP', delta: -1 })}
              disabled={isReadOnly}
              className="w-7 h-7 rounded text-sm font-medium border border-border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-default"
            >
              -
            </button>
            <span className="text-3xl font-bold mx-2">{character.currentHitPoints}</span>
            <button
              type="button"
              onClick={() => dispatch({ type: 'ADJUST_HP', delta: 1 })}
              disabled={isReadOnly}
              className="w-7 h-7 rounded text-sm font-medium border border-border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-default"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: 'ADJUST_HP', delta: 5 })}
              disabled={isReadOnly}
              className="w-7 h-7 rounded text-xs font-medium border border-border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-default"
            >
              +5
            </button>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg text-muted-foreground">/</span>
            <InlineInput
              value={character.maxHitPoints}
              onChange={(v) => dispatch({ type: 'SET_MAX_HP', maxHitPoints: Number(v) })}
              type="number"
              min={1}
              disabled={isReadOnly}
              className="text-lg font-bold w-14 text-right"
            />
          </div>
        </div>

        {/* HP progress bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all"
            style={{ width: `${hpPercentage}%` }}
          />
        </div>

        {/* Temporary HP */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>Временные хиты:</span>
            <InlineInput
              value={character.temporaryHitPoints}
              onChange={(v) => dispatch({ type: 'SET_TEMP_HP', temporaryHitPoints: Number(v) })}
              type="number"
              min={0}
              disabled={isReadOnly}
              className="w-12 text-xs"
            />
          </div>
        </div>

        {/* Hit Dice */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Кости хитов: {character.hitDice.remaining}/{character.hitDice.total}d{character.hitDice.sides}
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => dispatch({ type: 'USE_HIT_DIE' })}
              disabled={isReadOnly || character.hitDice.remaining <= 0}
              className="px-2 py-0.5 rounded text-xs border border-border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-default"
            >
              Использовать
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: 'RESTORE_HIT_DIE' })}
              disabled={isReadOnly || character.hitDice.remaining >= character.hitDice.total}
              className="px-2 py-0.5 rounded text-xs border border-border hover:bg-muted/50 disabled:opacity-50 disabled:cursor-default"
            >
              Восстановить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
