import type React from 'react';
import type { WizardState, WizardAction } from '@/models/vtm/wizardState';
import { DotRating } from '@/components/vtm-sheet/DotRating';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AdvantagesStepProps {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
}

const MERIT_BUDGET = 7;
const FLAW_BUDGET = 2;
const BACKGROUND_BUDGET = 5;

type AdvantageItem = { name: string; nameEn: string; dots: number; description: string };

interface SectionProps {
  title: string;
  titleEn: string;
  items: AdvantageItem[];
  budget: number;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: string, value: string | number) => void;
  budgetVariant?: 'default' | 'destructive';
}

function AdvantageSection({
  title,
  titleEn,
  items,
  budget,
  onAdd,
  onRemove,
  onUpdate,
}: SectionProps) {
  const spent = items.reduce((sum, item) => sum + item.dots, 0);
  const remaining = budget - spent;
  const isOver = remaining < 0;
  const isExact = remaining === 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {title} ({titleEn})
        </h3>
        <Badge variant={isOver ? 'destructive' : isExact ? 'default' : 'outline'} className="text-xs">
          Ост. {remaining} / {budget}
        </Badge>
      </div>

      {items.length === 0 && (
        <p className="text-xs text-muted-foreground italic">Ничего не добавлено.</p>
      )}

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="border border-border rounded-lg p-3 space-y-2">
            <div className="flex items-start gap-2">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Название (RU)"
                  value={item.name}
                  onChange={(e) => onUpdate(index, 'name', e.target.value)}
                  className="text-sm bg-transparent border border-border rounded px-2 py-1 focus:outline-none focus:border-primary w-full"
                />
                <input
                  type="text"
                  placeholder="Name (EN)"
                  value={item.nameEn}
                  onChange={(e) => onUpdate(index, 'nameEn', e.target.value)}
                  className="text-sm bg-transparent border border-border rounded px-2 py-1 focus:outline-none focus:border-primary w-full"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => onRemove(index)}
              >
                ×
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Точки (Dots):</span>
              <DotRating
                current={item.dots}
                max={5}
                size="sm"
                onChange={(v) => onUpdate(index, 'dots', Math.max(1, v))}
              />
            </div>
            <input
              type="text"
              placeholder="Описание (Description)"
              value={item.description}
              onChange={(e) => onUpdate(index, 'description', e.target.value)}
              className="text-xs bg-transparent border border-border rounded px-2 py-1 focus:outline-none focus:border-primary w-full"
            />
          </div>
        ))}
      </div>

      <Button variant="outline" size="sm" onClick={onAdd}>
        + Добавить (Add)
      </Button>
    </div>
  );
}

export function AdvantagesStep({ state, dispatch }: AdvantagesStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Достоинства и недостатки (Advantages)</h2>
        <p className="text-sm text-muted-foreground">
          Достоинства: 7 точек, Недостатки: 2 точки, Предпосылки: 5 точек.
        </p>
      </div>

      <AdvantageSection
        title="Достоинства"
        titleEn="Merits"
        items={state.merits}
        budget={MERIT_BUDGET}
        onAdd={() => dispatch({ type: 'ADD_MERIT' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_MERIT', index: i })}
        onUpdate={(i, f, v) => dispatch({ type: 'UPDATE_MERIT', index: i, field: f, value: v })}
      />

      <AdvantageSection
        title="Недостатки"
        titleEn="Flaws"
        items={state.flaws}
        budget={FLAW_BUDGET}
        onAdd={() => dispatch({ type: 'ADD_FLAW' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_FLAW', index: i })}
        onUpdate={(i, f, v) => dispatch({ type: 'UPDATE_FLAW', index: i, field: f, value: v })}
      />

      <AdvantageSection
        title="Предпосылки"
        titleEn="Backgrounds"
        items={state.backgrounds}
        budget={BACKGROUND_BUDGET}
        onAdd={() => dispatch({ type: 'ADD_BACKGROUND' })}
        onRemove={(i) => dispatch({ type: 'REMOVE_BACKGROUND', index: i })}
        onUpdate={(i, f, v) =>
          dispatch({ type: 'UPDATE_BACKGROUND', index: i, field: f, value: v })
        }
      />
    </div>
  );
}
