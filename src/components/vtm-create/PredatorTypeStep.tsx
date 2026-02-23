import type { PredatorTypeId } from '@/models/vtm/predatorType';
import type { PlaystyleId } from '@/models/vtm/playstyle';
import { PREDATOR_TYPES } from '@/data/vtm/predatorTypes';
import { PREDATOR_PLAYSTYLES } from '@/data/vtm/playstyles';
import { vtmMeritFlawTooltips } from '@/i18n/vtmTooltips';
import { Card, CardContent } from '@/components/ui/card';
import { DisciplineTooltipBadge } from '@/components/vtm-create/DisciplineTooltipBadge';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface PredatorTypeStepProps {
  predatorTypeId: PredatorTypeId | null;
  onSelect: (id: PredatorTypeId) => void;
  activePlaystyles: Set<PlaystyleId>;
}

export function PredatorTypeStep({ predatorTypeId, onSelect, activePlaystyles }: PredatorTypeStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-1">Тип охотника (Predator Type)</h2>
        <p className="text-sm text-muted-foreground">
          Способ охоты определяет, как ваш вампир добывает кровь, и влияет на начальные навыки.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PREDATOR_TYPES.map((pt) => {
          const isSelected = predatorTypeId === pt.id;
          const isDimmed = activePlaystyles.size > 0 && !PREDATOR_PLAYSTYLES[pt.id].some((ps) => activePlaystyles.has(ps));
          return (
            <Card
              key={pt.id}
              className={`cursor-pointer transition-all hover:border-primary/60 ${
                isSelected ? 'border-primary ring-1 ring-primary bg-primary/5' : ''
              } ${isDimmed ? 'opacity-40' : ''}`}
              onClick={() => onSelect(pt.id)}
            >
              <CardContent className="pt-4 pb-3 space-y-2">
                <div>
                  <p className="font-semibold text-sm leading-tight">{pt.name}</p>
                  <p className="text-xs text-muted-foreground">{pt.nameEn}</p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {pt.description}
                </p>
                <div className="space-y-1">
                  <p className="text-xs font-medium">Дисциплины (Disciplines):</p>
                  <div className="flex flex-wrap gap-1">
                    {pt.disciplineOptions.map((d) => (
                      <DisciplineTooltipBadge key={d} discipline={d} />
                    ))}
                  </div>
                </div>
                <div className="space-y-0.5 text-xs">
                  <p>
                    <span className="text-muted-foreground">Достоинство:</span>{' '}
                    {vtmMeritFlawTooltips[pt.merit] ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-green-600 dark:text-green-400 border-b border-dashed border-green-600/40 dark:border-green-400/40 cursor-help">
                            {pt.merit}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs text-xs">
                          {vtmMeritFlawTooltips[pt.merit]}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <span className="text-green-600 dark:text-green-400">{pt.merit}</span>
                    )}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Недостаток:</span>{' '}
                    {vtmMeritFlawTooltips[pt.flaw] ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="text-red-600 dark:text-red-400 border-b border-dashed border-red-600/40 dark:border-red-400/40 cursor-help">
                            {pt.flaw}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs text-xs">
                          {vtmMeritFlawTooltips[pt.flaw]}
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      <span className="text-red-600 dark:text-red-400">{pt.flaw}</span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
