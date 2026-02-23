import type { SkillCategory } from '@/models/vtm/skill';
import { VTM_SKILLS_BY_CATEGORY } from '@/data/vtm/skills';
import { vtmSkillTerms, vtmCategoryTerms } from '@/i18n/vtmTerms';
import { vtmSkillTooltips } from '@/i18n/vtmTooltips';
import { useVtmCharacter } from '@/context/VtmCharacterContext';
import { DotRating } from './DotRating';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const CATEGORIES: SkillCategory[] = ['physical', 'social', 'mental'];

export function SkillsPanel() {
  const { character, dispatch, isReadOnly } = useVtmCharacter();

  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        {CATEGORIES.map((category) => (
          <div key={category} className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
              {vtmCategoryTerms[category].ru}
            </p>
            {VTM_SKILLS_BY_CATEGORY[category].map((skillName) => {
              const value = character.skills[skillName] ?? 0;
              const term = vtmSkillTerms[skillName];
              const specialties = character.skillSpecialties[skillName];
              return (
                <div key={skillName}>
                  <div className="space-y-0.5">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <p className="text-xs leading-tight cursor-help">
                          {term.ru}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="max-w-xs text-xs">
                        {vtmSkillTooltips[skillName]}
                      </TooltipContent>
                    </Tooltip>
                    <DotRating
                      current={value}
                      max={5}
                      size="sm"
                      onChange={!isReadOnly ? (v) => dispatch({ type: 'SET_SKILL', skill: skillName, value: v }) : undefined}
                    />
                  </div>
                  {specialties && specialties.length > 0 && (
                    <p className="text-xs text-muted-foreground italic ml-1">
                      {specialties.join(', ')}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
