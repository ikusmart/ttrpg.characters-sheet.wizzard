import { useVtmCharacter } from '@/context/VtmCharacterContext';
import { vtmGameTerms } from '@/i18n/vtmTerms';
import { vtmTrackerTooltips } from '@/i18n/vtmTooltips';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

export function ClanPanel() {
  const { character } = useVtmCharacter();
  return (
    <div className="space-y-3">
      <div>
        <p className="text-base font-bold">
          {character.clanName}
          <span className="text-muted-foreground font-normal text-sm"> ({character.clanNameEn})</span>
        </p>
      </div>

      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 cursor-help">
              Проклятие клана (Clan Bane)
            </p>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs text-xs">
            {vtmTrackerTooltips.clanBane}
          </TooltipContent>
        </Tooltip>
        <p className="text-sm">{character.bane || '—'}</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
          {vtmGameTerms.compulsion.ru} (Compulsion)
        </p>
        <p className="text-sm">{character.compulsion || '—'}</p>
      </div>
    </div>
  );
}
