import { useMemo } from 'react';
import type React from 'react';
import type { WizardState, WizardAction } from '@/models/vtm/wizardState';
import type { SkillCategory, SkillName } from '@/models/vtm/skill';
import type { PlaystyleId } from '@/models/vtm/playstyle';
import { VTM_SKILLS_BY_CATEGORY } from '@/data/vtm/skills';
import { PLAYSTYLE_DEFINITIONS } from '@/data/vtm/playstyles';
import { vtmSkillTerms, vtmCategoryTerms } from '@/i18n/vtmTerms';
import { vtmSkillTooltips } from '@/i18n/vtmTooltips';
import { DotRating } from '@/components/vtm-sheet/DotRating';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface SkillsStepProps {
  state: WizardState;
  dispatch: React.Dispatch<WizardAction>;
  activePlaystyles: Set<PlaystyleId>;
}

const SKILL_BUDGET = 20;
const CATEGORIES: SkillCategory[] = ['physical', 'social', 'mental'];

export function SkillsStep({ state, dispatch, activePlaystyles }: SkillsStepProps) {
  const { skills } = state;

  const totalSpent = Object.values(skills).reduce((sum, v) => sum + (v ?? 0), 0);
  const remaining = SKILL_BUDGET - totalSpent;

  const recommendedSkills = useMemo(() => {
    if (activePlaystyles.size === 0) return new Set<SkillName>();
    const result = new Set<SkillName>();
    for (const ps of PLAYSTYLE_DEFINITIONS) {
      if (activePlaystyles.has(ps.id)) {
        for (const skill of ps.recommendedSkills) result.add(skill);
      }
    }
    return result;
  }, [activePlaystyles]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-1">Навыки (Skills)</h2>
        <p className="text-sm text-muted-foreground">
          Распределите 20 точек между навыками. Максимум 5 точек в одном навыке.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Осталось (Remaining):</span>
        <Badge variant={remaining < 0 ? 'destructive' : remaining === 0 ? 'default' : 'outline'}>
          {remaining} / {SKILL_BUDGET}
        </Badge>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {CATEGORIES.map((category) => (
          <div key={category} className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              {vtmCategoryTerms[category].ru}
            </p>
            {VTM_SKILLS_BY_CATEGORY[category].map((skillName) => {
              const value = skills[skillName] ?? 0;
              const term = vtmSkillTerms[skillName as SkillName];
              const isRecommended = recommendedSkills.has(skillName as SkillName);
              return (
                <div key={skillName} className="space-y-0.5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-xs leading-tight flex items-center gap-1 cursor-help border-b border-dashed border-transparent hover:border-muted-foreground/30 w-fit">
                        {isRecommended && <span className="size-1.5 rounded-full bg-primary shrink-0" />}
                        {term.ru}
                        <span className="text-muted-foreground"> ({term.en})</span>
                      </p>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs text-xs">
                      {vtmSkillTooltips[skillName as SkillName]}
                    </TooltipContent>
                  </Tooltip>
                  <DotRating
                    current={value}
                    max={5}
                    size="sm"
                    onChange={(v) =>
                      dispatch({ type: 'SET_SKILL', skill: skillName as SkillName, value: v })
                    }
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
