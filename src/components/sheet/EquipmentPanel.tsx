import type { Character } from '@/models/character';
import { useCharacter } from '@/context/CharacterContext';
import { InlineInput } from '@/components/sheet/InlineInput';

interface Props { character: Character; }

export function EquipmentPanel({ character }: Props) {
  const { dispatch, isReadOnly } = useCharacter();

  const totalWeight = character.equipment.reduce((sum, item) => sum + item.weight * item.quantity, 0);

  const handleAddEquipment = () => {
    dispatch({
      type: 'ADD_EQUIPMENT',
      item: {
        id: crypto.randomUUID(),
        name: 'Предмет',
        nameEn: 'Item',
        quantity: 1,
        weight: 0,
        equipped: false,
        category: 'other',
      },
    });
  };

  const currencyFields: Array<{ key: keyof Character['currency']; label: string }> = [
    { key: 'copper', label: 'мм' },
    { key: 'silver', label: 'см' },
    { key: 'electrum', label: 'эм' },
    { key: 'gold', label: 'зм' },
    { key: 'platinum', label: 'пм' },
  ];

  return (
    <div className="space-y-2">
      {!isReadOnly && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleAddEquipment}
            className="w-6 h-6 rounded text-sm font-medium border border-border hover:bg-muted/50 flex items-center justify-center"
          >
            +
          </button>
        </div>
      )}

      {/* Equipment list */}
      <div className="space-y-1">
        {character.equipment.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm p-1.5 rounded hover:bg-muted/50">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {/* Equipped toggle dot */}
              <span
                role={isReadOnly ? undefined : 'button'}
                tabIndex={isReadOnly ? undefined : 0}
                onClick={isReadOnly ? undefined : () => dispatch({ type: 'TOGGLE_EQUIPPED', itemId: item.id })}
                onKeyDown={isReadOnly ? undefined : (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    dispatch({ type: 'TOGGLE_EQUIPPED', itemId: item.id });
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 ${
                  item.equipped ? 'bg-primary border-primary' : 'border-muted-foreground'
                } ${!isReadOnly ? 'cursor-pointer' : ''}`}
              />

              {/* Name — editable */}
              <InlineInput
                value={item.name}
                onChange={(v) =>
                  dispatch({
                    type: 'UPDATE_EQUIPMENT',
                    item: { ...item, name: v },
                  })
                }
                disabled={isReadOnly}
                className="flex-1 min-w-0"
              />

              {/* Quantity — editable */}
              <span className="text-muted-foreground flex-shrink-0">x</span>
              <InlineInput
                value={item.quantity}
                onChange={(v) =>
                  dispatch({
                    type: 'UPDATE_EQUIPMENT',
                    item: { ...item, quantity: Number(v) },
                  })
                }
                type="number"
                min={1}
                disabled={isReadOnly}
                className="w-10 text-muted-foreground flex-shrink-0"
              />
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-muted-foreground">{item.weight * item.quantity} фнт</span>
              {!isReadOnly && (
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'REMOVE_EQUIPMENT', itemId: item.id })}
                  className="text-muted-foreground hover:text-destructive transition-colors text-xs"
                >
                  X
                </button>
              )}
            </div>
          </div>
        ))}
        {character.equipment.length === 0 && (
          <div className="p-3 text-center text-xs text-muted-foreground">
            Нет снаряжения
          </div>
        )}
      </div>

      {/* Weight total */}
      <div className="text-xs text-muted-foreground pt-2 border-t border-border">
        Общий вес: {totalWeight} фнт
      </div>

      {/* Currency — 5 editable fields */}
      <div className="pt-2 border-t border-border">
        <span className="text-xs text-muted-foreground">Валюта (Currency)</span>
        <div className="flex gap-2 mt-1">
          {currencyFields.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-center gap-0.5">
              <InlineInput
                value={character.currency[key]}
                onChange={(v) =>
                  dispatch({
                    type: 'SET_CURRENCY',
                    currency: { ...character.currency, [key]: Number(v) },
                  })
                }
                type="number"
                min={0}
                disabled={isReadOnly}
                className="w-12 text-center text-xs"
              />
              <span className="text-[10px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
