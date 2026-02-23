import type React from 'react';
import type { WizardState, WizardAction } from '@/models/vtm/wizardState';
import type { DisciplineName } from '@/models/vtm/discipline';
import { CLAN_DEFINITIONS } from '@/data/vtm/clanDefinitions';
import { PREDATOR_TYPES } from '@/data/vtm/predatorTypes';
import { DISCIPLINE_POWERS } from '@/data/vtm/disciplinePowers';
import { vtmDisciplineTerms } from '@/i18n/vtmTerms';
import { vtmDisciplineTooltips } from '@/i18n/vtmTooltips';
import { DotRating } from '@/components/vtm-sheet/DotRating';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface DisciplinesStepProps {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
}

const DISCIPLINE_BUDGET = 2;

export function DisciplinesStep({ state, dispatch }: DisciplinesStepProps) {
  const { clanId, predatorTypeId, disciplines } = state;

  const clan = clanId ? CLAN_DEFINITIONS.find((c) => c.id === clanId) : null;
  const predator = predatorTypeId ? PREDATOR_TYPES.find((p) => p.id === predatorTypeId) : null;

  const clanDisciplines: DisciplineName[] = clan?.disciplines ?? [];
  const predatorOptions: DisciplineName[] = predator?.disciplineOptions ?? [];
  const extraDisciplines = predatorOptions.filter((d) => !clanDisciplines.includes(d));
  const allAvailable = [...clanDisciplines, ...extraDisciplines];

  // Predator bonus discipline: first matching clan disc, else first predator option
  const bonusDiscipline: DisciplineName | null = predator
    ? predator.disciplineOptions.find((d) => clanDisciplines.includes(d)) ??
      predator.disciplineOptions[0] ??
      null
    : null;

  const totalSpent = Object.values(disciplines).reduce((sum, v) => sum + (v ?? 0), 0);
  const remaining = DISCIPLINE_BUDGET - totalSpent;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-1">Дисциплины (Disciplines)</h2>
        <p className="text-sm text-muted-foreground">
          Распределите 2 точки дисциплин. Дополнительно тип охотника добавляет +1 к одной дисциплине.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Осталось (Remaining):</span>
        <Badge variant={remaining < 0 ? 'destructive' : remaining === 0 ? 'default' : 'outline'}>
          {remaining} / {DISCIPLINE_BUDGET}
        </Badge>
      </div>

      {bonusDiscipline && (
        <div className="bg-muted/40 rounded-lg px-3 py-2 text-xs text-muted-foreground">
          Тип охотника ({predator?.name}) автоматически добавит +1 к{' '}
          <span className="font-semibold text-foreground">
            {vtmDisciplineTerms[bonusDiscipline].ru}
          </span>{' '}
          при создании персонажа.
        </div>
      )}

      <div className="space-y-3">
        {clanDisciplines.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Клановые дисциплины (Clan Disciplines)
            </p>
            <div className="space-y-3">
              {clanDisciplines.map((disc) => {
                const term = vtmDisciplineTerms[disc];
                const value = disciplines[disc] ?? 0;
                const level1Power = DISCIPLINE_POWERS.find(
                  (p) => p.discipline === disc && p.level === 1
                );
                return (
                  <div key={disc} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-sm font-medium cursor-help border-b border-dashed border-muted-foreground/30">
                            {term.ru}
                            <span className="text-muted-foreground font-normal"> ({term.en})</span>
                          </p>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs text-xs">
                          {vtmDisciplineTooltips[disc]}
                        </TooltipContent>
                      </Tooltip>
                      <DotRating
                        current={value}
                        max={2}
                        size="sm"
                        onChange={(v) =>
                          dispatch({ type: 'SET_DISCIPLINE', discipline: disc, value: v })
                        }
                      />
                    </div>
                    {value > 0 && level1Power && (
                      <div className="ml-2 bg-muted/30 rounded p-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{level1Power.name}</span>
                        {' — '}
                        {level1Power.description.slice(0, 100)}
                        {level1Power.description.length > 100 ? '...' : ''}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {extraDisciplines.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Дисциплины типа охотника (Predator Type Disciplines)
            </p>
            <div className="space-y-3">
              {extraDisciplines.map((disc) => {
                const term = vtmDisciplineTerms[disc];
                const value = disciplines[disc] ?? 0;
                const level1Power = DISCIPLINE_POWERS.find(
                  (p) => p.discipline === disc && p.level === 1
                );
                return (
                  <div key={disc} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-sm font-medium cursor-help border-b border-dashed border-muted-foreground/30">
                            {term.ru}
                            <span className="text-muted-foreground font-normal"> ({term.en})</span>
                          </p>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs text-xs">
                          {vtmDisciplineTooltips[disc]}
                        </TooltipContent>
                      </Tooltip>
                      <DotRating
                        current={value}
                        max={2}
                        size="sm"
                        onChange={(v) =>
                          dispatch({ type: 'SET_DISCIPLINE', discipline: disc, value: v })
                        }
                      />
                    </div>
                    {value > 0 && level1Power && (
                      <div className="ml-2 bg-muted/30 rounded p-2 text-xs text-muted-foreground">
                        <span className="font-medium text-foreground">{level1Power.name}</span>
                        {' — '}
                        {level1Power.description.slice(0, 100)}
                        {level1Power.description.length > 100 ? '...' : ''}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {allAvailable.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Для данного клана дисциплины недоступны. Вернитесь к выбору клана.
          </p>
        )}
      </div>
    </div>
  );
}
