import type { AttributeCategory } from '@/models/vtm/attribute';
import { VTM_ATTRIBUTES_BY_CATEGORY } from '@/data/vtm/attributes';
import { vtmAttributeTerms, vtmCategoryTerms } from '@/i18n/vtmTerms';
import { vtmAttributeTooltips } from '@/i18n/vtmTooltips';
import { useVtmCharacter } from '@/context/VtmCharacterContext';
import { DotRating } from './DotRating';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const CATEGORIES: AttributeCategory[] = ['physical', 'social', 'mental'];

export function AttributesPanel() {
  const { character, dispatch, isReadOnly } = useVtmCharacter();

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        {CATEGORIES.map((category) => (
          <div key={category} className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              {vtmCategoryTerms[category].ru}
            </p>
            {VTM_ATTRIBUTES_BY_CATEGORY[category].map((attrName) => {
              const attr = character.attributes[attrName];
              const term = vtmAttributeTerms[attrName];
              return (
                <div key={attrName} className="space-y-0.5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-xs leading-tight cursor-help">
                        {term.ru}
                        <span className="text-muted-foreground"> ({term.en})</span>
                      </p>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs text-xs">
                      {vtmAttributeTooltips[attrName]}
                    </TooltipContent>
                  </Tooltip>
                  <DotRating
                    current={attr.value}
                    max={5}
                    size="md"
                    onChange={!isReadOnly ? (v) => dispatch({ type: 'SET_ATTRIBUTE', attribute: attrName, value: v }) : undefined}
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
