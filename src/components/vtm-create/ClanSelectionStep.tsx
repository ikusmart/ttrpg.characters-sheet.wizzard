import type { ClanId } from '@/models/vtm/clan';
import type { PlaystyleId } from '@/models/vtm/playstyle';
import { CLAN_DEFINITIONS } from '@/data/vtm/clanDefinitions';
import { CLAN_PLAYSTYLES } from '@/data/vtm/playstyles';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DisciplineTooltipBadge } from '@/components/vtm-create/DisciplineTooltipBadge';

interface ClanSelectionStepProps {
  clanId: ClanId | null;
  onSelect: (clanId: ClanId) => void;
  activePlaystyles: Set<PlaystyleId>;
}

const COMPLEXITY_LABELS: Record<string, string> = {
  simple: 'Простой',
  moderate: 'Средний',
  complex: 'Сложный',
};

const COMPLEXITY_VARIANTS: Record<string, 'default' | 'secondary' | 'outline' | 'destructive'> = {
  simple: 'secondary',
  moderate: 'outline',
  complex: 'destructive',
};

function clanMatchesPlaystyles(clanId: ClanId, active: Set<PlaystyleId>): boolean {
  if (active.size === 0) return true;
  const playstyles = CLAN_PLAYSTYLES[clanId];
  if (playstyles.length === 0) return true; // Caitiff/Thin-Blood always match
  return playstyles.some((ps) => active.has(ps));
}

export function ClanSelectionStep({ clanId, onSelect, activePlaystyles }: ClanSelectionStepProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold mb-1">Выберите клан (Choose Clan)</h2>
        <p className="text-sm text-muted-foreground">
          Клан определяет базовые дисциплины, проклятие и компульсию вашего вампира.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CLAN_DEFINITIONS.map((clan) => {
          const isSelected = clanId === clan.id;
          const isDimmed = !clanMatchesPlaystyles(clan.id, activePlaystyles);
          return (
            <Card
              key={clan.id}
              className={`cursor-pointer transition-all hover:border-primary/60 ${
                isSelected ? 'border-primary ring-1 ring-primary bg-primary/5' : ''
              } ${isDimmed ? 'opacity-40' : ''}`}
              onClick={() => onSelect(clan.id)}
            >
              <CardContent className="pt-4 pb-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-sm leading-tight">{clan.name}</p>
                    <p className="text-xs text-muted-foreground">{clan.nameEn}</p>
                  </div>
                  <Badge variant={COMPLEXITY_VARIANTS[clan.complexity]} className="text-xs shrink-0">
                    {COMPLEXITY_LABELS[clan.complexity]}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  {clan.nickname} ({clan.nicknameEn})
                </p>
                {clan.disciplines.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {clan.disciplines.map((d) => (
                      <DisciplineTooltipBadge key={d} discipline={d} />
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {clan.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
