import type { DisciplineName } from '@/models/vtm/discipline';
import { vtmDisciplineTerms, vtmGameTerms } from '@/i18n/vtmTerms';
import { vtmDisciplineTooltips } from '@/i18n/vtmTooltips';
import { useVtmCharacter } from '@/context/VtmCharacterContext';
import { DotRating } from './DotRating';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

export function DisciplinesPanel() {
  const { character, dispatch, isReadOnly } = useVtmCharacter();
  const disciplineEntries = Object.entries(character.disciplines) as [DisciplineName, number][];

  if (disciplineEntries.length === 0) {
    return (
      <div>
        <p className="text-sm text-muted-foreground">—</p>
      </div>
    );
  }

  return (
    <div>
      <div className="space-y-4">
        {disciplineEntries.map(([disciplineName, level]) => {
          const term = vtmDisciplineTerms[disciplineName];
          const powers = character.knownPowers.filter((p) => p.discipline === disciplineName);

          return (
            <div key={disciplineName}>
              <div className="flex items-center justify-between mb-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-sm font-semibold cursor-help">
                      {term.ru}
                      <span className="text-muted-foreground font-normal"> ({term.en})</span>
                    </p>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-xs text-xs">
                    {vtmDisciplineTooltips[disciplineName]}
                  </TooltipContent>
                </Tooltip>
                <DotRating
                  current={level}
                  max={5}
                  size="sm"
                  onChange={!isReadOnly ? (v) => dispatch({ type: 'SET_DISCIPLINE', discipline: disciplineName, value: v }) : undefined}
                />
              </div>

              {powers.length > 0 && (
                <div className="space-y-2 ml-2">
                  {powers.map((power) => (
                    <div key={power.id} className="bg-muted/30 rounded p-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-xs font-medium">
                          {power.name}
                          <span className="text-muted-foreground font-normal"> ({power.nameEn})</span>
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          Ур. {power.level}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 space-x-2">
                        <span>{vtmGameTerms.rouseCheck.ru}: {power.rouseCost}</span>
                        {power.dicePool && <span>| {power.dicePool}</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {power.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
