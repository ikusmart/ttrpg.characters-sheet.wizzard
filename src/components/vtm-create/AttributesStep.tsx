import { useMemo } from 'react';
import type React from 'react';
import type { WizardState, WizardAction } from '@/models/vtm/wizardState';
import type { AttributeCategory, AttributeName } from '@/models/vtm/attribute';
import type { PlaystyleId } from '@/models/vtm/playstyle';
import { VTM_ATTRIBUTES_BY_CATEGORY } from '@/data/vtm/attributes';
import { PLAYSTYLE_DEFINITIONS } from '@/data/vtm/playstyles';
import { vtmAttributeTerms, vtmCategoryTerms } from '@/i18n/vtmTerms';
import { vtmAttributeTooltips } from '@/i18n/vtmTooltips';
import { DotRating } from '@/components/vtm-sheet/DotRating';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface AttributesStepProps {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
  activePlaystyles: Set<PlaystyleId>;
}

const CATEGORIES: AttributeCategory[] = ['physical', 'social', 'mental'];
const PRIORITY_BUDGETS: [number, number, number] = [9, 7, 5];
const PRIORITY_LABELS = ['Первичные (Primary)', 'Вторичные (Secondary)', 'Третичные (Tertiary)'];

const CATEGORY_LABELS: Record<AttributeCategory, string> = {
  physical: 'Физические',
  social: 'Социальные',
  mental: 'Ментальные',
};

export function AttributesStep({ state, dispatch, activePlaystyles }: AttributesStepProps) {
  const { attributePriority, attributes } = state;

  const suggestions = useMemo(() => {
    if (activePlaystyles.size === 0) return [];
    return PLAYSTYLE_DEFINITIONS.filter((ps) => activePlaystyles.has(ps.id)).map((ps) => ({
      label: ps.label,
      priority: ps.attributePriority.map((cat) => CATEGORY_LABELS[cat]).join(' → '),
    }));
  }, [activePlaystyles]);

  function assignToSlot(slotIndex: number, category: AttributeCategory) {
    const current: [AttributeCategory, AttributeCategory, AttributeCategory] = attributePriority
      ? [...attributePriority]
      : ['physical', 'social', 'mental'];
    current[slotIndex] = category;
    dispatch({ type: 'SET_ATTRIBUTE_PRIORITY', priority: current });
  }

  function getCategoryBudget(category: AttributeCategory): number {
    if (!attributePriority) return 0;
    const idx = attributePriority.indexOf(category);
    if (idx === -1) return 0;
    return PRIORITY_BUDGETS[idx];
  }

  function getCategorySpent(category: AttributeCategory): number {
    return VTM_ATTRIBUTES_BY_CATEGORY[category].reduce((sum, attr) => {
      return sum + (attributes[attr] ?? 1);
    }, 0);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Атрибуты (Attributes)</h2>
        <p className="text-sm text-muted-foreground">
          Назначьте приоритет категорий, затем распределите точки. Первичные: 9, Вторичные: 7, Третичные: 5.
        </p>
      </div>

      {suggestions.length > 0 && (
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-1">
          <p className="text-xs font-medium text-primary">Рекомендация по стилю игры:</p>
          {suggestions.map((s) => (
            <p key={s.label} className="text-xs text-muted-foreground">
              <span className="font-medium">{s.label}:</span> {s.priority}
            </p>
          ))}
        </div>
      )}

      {/* Priority Assignment */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Приоритет категорий (Category Priority)
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {PRIORITY_LABELS.map((label, slotIndex) => {
            const assigned = attributePriority?.[slotIndex];
            const budget = PRIORITY_BUDGETS[slotIndex];
            return (
              <div key={slotIndex} className="border border-border rounded-lg p-3 space-y-2">
                <div className="text-xs font-semibold text-muted-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">{budget} точек</div>
                <div className="flex flex-col gap-1">
                  {CATEGORIES.map((cat) => {
                    const isSelected = assigned === cat;
                    const isUsedElsewhere =
                      attributePriority !== null &&
                      attributePriority.indexOf(cat) !== -1 &&
                      attributePriority.indexOf(cat) !== slotIndex;
                    return (
                      <button
                        key={cat}
                        onClick={() => assignToSlot(slotIndex, cat)}
                        disabled={isUsedElsewhere}
                        className={`text-xs rounded px-2 py-1 text-left transition-colors ${
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : isUsedElsewhere
                            ? 'opacity-30 cursor-not-allowed bg-muted'
                            : 'bg-muted hover:bg-muted/80 cursor-pointer'
                        }`}
                      >
                        {vtmCategoryTerms[cat].ru}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Attribute Distribution */}
      {attributePriority && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Распределение точек (Dot Distribution)
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {CATEGORIES.map((category) => {
              const budget = getCategoryBudget(category);
              const spent = getCategorySpent(category);
              const remaining = budget - spent;
              const isOver = remaining < 0;
              const isExact = remaining === 0;

              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {vtmCategoryTerms[category].ru}
                    </p>
                    <Badge
                      variant={isOver ? 'destructive' : isExact ? 'default' : 'outline'}
                      className="text-xs"
                    >
                      {remaining >= 0 ? `Ост. ${remaining}` : `Перебор ${Math.abs(remaining)}`}
                    </Badge>
                  </div>
                  {VTM_ATTRIBUTES_BY_CATEGORY[category].map((attrName) => {
                    const term = vtmAttributeTerms[attrName as AttributeName];
                    const value = attributes[attrName] ?? 1;
                    return (
                      <div key={attrName} className="space-y-0.5">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-xs leading-tight cursor-help border-b border-dashed border-transparent hover:border-muted-foreground/30 w-fit">
                              {term.ru}
                              <span className="text-muted-foreground"> ({term.en})</span>
                            </p>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs text-xs">
                            {vtmAttributeTooltips[attrName as AttributeName]}
                          </TooltipContent>
                        </Tooltip>
                        <DotRating
                          current={value}
                          max={5}
                          size="md"
                          onChange={(v) =>
                            dispatch({
                              type: 'SET_ATTRIBUTE',
                              attribute: attrName as AttributeName,
                              value: Math.max(1, v),
                            })
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
