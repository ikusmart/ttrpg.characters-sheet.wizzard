import type { DisciplineName } from '@/models/vtm/discipline';
import { vtmDisciplineTerms } from '@/i18n/vtmTerms';
import { vtmDisciplineTooltips } from '@/i18n/vtmTooltips';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

interface DisciplineTooltipBadgeProps {
  discipline: DisciplineName;
  variant?: 'outline' | 'default' | 'secondary' | 'destructive';
}

export function DisciplineTooltipBadge({
  discipline,
  variant = 'outline',
}: DisciplineTooltipBadgeProps) {
  const term = vtmDisciplineTerms[discipline];
  const tooltip = vtmDisciplineTooltips[discipline];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant={variant} className="text-xs py-0 cursor-help">
          {term.ru}
        </Badge>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );
}
