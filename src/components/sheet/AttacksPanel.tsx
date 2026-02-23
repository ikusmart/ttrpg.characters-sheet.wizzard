import type { Character } from '@/models/character';
import { useCharacter } from '@/context/CharacterContext';
import { InlineInput } from '@/components/sheet/InlineInput';

interface Props { character: Character; }

export function AttacksPanel({ character }: Props) {
  const { dispatch, isReadOnly } = useCharacter();

  const handleAddAttack = () => {
    dispatch({
      type: 'ADD_ATTACK',
      attack: {
        name: 'Новая атака',
        nameEn: 'New Attack',
        attackBonus: 0,
        damage: '1d6',
        damageType: 'колющий',
      },
    });
  };

  return (
    <div className="space-y-2">
      {!isReadOnly && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAddAttack}
            className="w-6 h-6 rounded text-sm font-medium border border-border hover:bg-muted/50 flex items-center justify-center"
          >
            +
          </button>
        </div>
      )}
      <div className="rounded-lg border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-2 font-medium">Оружие</th>
              <th className="text-center p-2 font-medium">Бонус</th>
              <th className="text-center p-2 font-medium">Урон</th>
              {!isReadOnly && <th className="w-8 p-2" />}
            </tr>
          </thead>
          <tbody>
            {character.attacks.map((attack, i) => (
              <tr key={i} className="border-t border-border">
                <td className="p-2">
                  <InlineInput
                    value={attack.name}
                    onChange={(v) =>
                      dispatch({
                        type: 'UPDATE_ATTACK',
                        index: i,
                        attack: { ...attack, name: v },
                      })
                    }
                    disabled={isReadOnly}
                    className="w-full"
                  />
                </td>
                <td className="text-center p-2">
                  <InlineInput
                    value={attack.attackBonus}
                    onChange={(v) =>
                      dispatch({
                        type: 'UPDATE_ATTACK',
                        index: i,
                        attack: { ...attack, attackBonus: Number(v) },
                      })
                    }
                    type="number"
                    disabled={isReadOnly}
                    className="w-14 text-center font-mono"
                  />
                </td>
                <td className="text-center p-2">
                  <InlineInput
                    value={attack.damage}
                    onChange={(v) =>
                      dispatch({
                        type: 'UPDATE_ATTACK',
                        index: i,
                        attack: { ...attack, damage: v },
                      })
                    }
                    disabled={isReadOnly}
                    className="w-16 text-center font-mono"
                  />
                </td>
                {!isReadOnly && (
                  <td className="p-2 text-center">
                    <button
                      type="button"
                      onClick={() => dispatch({ type: 'REMOVE_ATTACK', index: i })}
                      className="text-muted-foreground hover:text-destructive transition-colors text-xs"
                    >
                      X
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {character.attacks.length === 0 && (
              <tr>
                <td colSpan={isReadOnly ? 3 : 4} className="p-3 text-center text-xs text-muted-foreground">
                  Нет атак
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
