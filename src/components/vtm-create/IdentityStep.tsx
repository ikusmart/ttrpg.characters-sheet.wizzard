import type React from 'react';
import type { WizardState, WizardAction } from '@/models/vtm/wizardState';
import { InlineInput } from '@/components/sheet/InlineInput';
import { Button } from '@/components/ui/button';

interface IdentityStepProps {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
}

type IdentityField = 'name' | 'playerName' | 'concept' | 'chronicle' | 'sire' | 'ambition' | 'desire' | 'appearance' | 'personalityTraits' | 'backstory';

const TEXT_FIELDS: Array<{ field: IdentityField; label: string; labelEn: string; required?: boolean }> = [
  { field: 'name', label: 'Имя', labelEn: 'Name', required: true },
  { field: 'playerName', label: 'Игрок', labelEn: 'Player' },
  { field: 'concept', label: 'Концепция', labelEn: 'Concept', required: true },
  { field: 'ambition', label: 'Амбиция', labelEn: 'Ambition' },
  { field: 'desire', label: 'Желание', labelEn: 'Desire' },
  { field: 'sire', label: 'Сир', labelEn: 'Sire' },
  { field: 'chronicle', label: 'Хроника', labelEn: 'Chronicle' },
];

const TEXTAREA_FIELDS: Array<{ field: IdentityField; label: string; labelEn: string }> = [
  { field: 'appearance', label: 'Внешность', labelEn: 'Appearance' },
  { field: 'personalityTraits', label: 'Черты характера', labelEn: 'Personality' },
  { field: 'backstory', label: 'Предыстория', labelEn: 'Backstory' },
];

export function IdentityStep({ state, dispatch }: IdentityStepProps) {
  function setField(field: IdentityField, value: string) {
    dispatch({ type: 'SET_IDENTITY_FIELD', field, value });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Личность (Identity)</h2>
        <p className="text-sm text-muted-foreground">
          Заполните информацию о персонаже. Имя и концепция обязательны.
        </p>
      </div>

      {/* Text fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TEXT_FIELDS.map(({ field, label, labelEn, required }) => (
          <div key={field} className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              {label} ({labelEn}){required && <span className="text-destructive ml-1">*</span>}
            </label>
            <InlineInput
              value={state[field]}
              onChange={(v) => setField(field, v)}
              placeholder={`${label}...`}
              className="w-full text-sm"
            />
          </div>
        ))}
      </div>

      {/* Convictions */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted-foreground">
            Убеждения (Convictions)
          </label>
          <Button variant="outline" size="sm" onClick={() => dispatch({ type: 'ADD_CONVICTION' })}>
            + Добавить
          </Button>
        </div>
        {state.convictions.length === 0 && (
          <p className="text-xs text-muted-foreground italic">Нет убеждений.</p>
        )}
        {state.convictions.map((conviction, i) => (
          <div key={i} className="flex items-center gap-2">
            <InlineInput
              value={conviction}
              onChange={(v) => dispatch({ type: 'UPDATE_CONVICTION', index: i, value: v })}
              placeholder="Убеждение..."
              className="flex-1 text-sm"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
              onClick={() => dispatch({ type: 'REMOVE_CONVICTION', index: i })}
            >
              ×
            </Button>
          </div>
        ))}
      </div>

      {/* Touchstones */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted-foreground">
            Якоря (Touchstones)
          </label>
          <Button variant="outline" size="sm" onClick={() => dispatch({ type: 'ADD_TOUCHSTONE' })}>
            + Добавить
          </Button>
        </div>
        {state.touchstones.length === 0 && (
          <p className="text-xs text-muted-foreground italic">Нет якорей.</p>
        )}
        {state.touchstones.map((touchstone, i) => (
          <div key={i} className="flex items-center gap-2">
            <InlineInput
              value={touchstone}
              onChange={(v) => dispatch({ type: 'UPDATE_TOUCHSTONE', index: i, value: v })}
              placeholder="Якорь..."
              className="flex-1 text-sm"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
              onClick={() => dispatch({ type: 'REMOVE_TOUCHSTONE', index: i })}
            >
              ×
            </Button>
          </div>
        ))}
      </div>

      {/* Textarea fields */}
      <div className="space-y-4">
        {TEXTAREA_FIELDS.map(({ field, label, labelEn }) => (
          <div key={field} className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              {label} ({labelEn})
            </label>
            <InlineInput
              value={state[field]}
              onChange={(v) => setField(field, v)}
              type="textarea"
              placeholder={`${label}...`}
              className="w-full text-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
