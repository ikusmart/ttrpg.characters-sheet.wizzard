import type { QuizClanInfo, ClanScore } from '@/models/vtm/quiz';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AlternativeClanCardProps {
  clanInfo: QuizClanInfo;
  score: ClanScore;
}

function ComplexityStars({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={cn('text-xs', i < value ? 'text-yellow-500' : 'text-muted-foreground/30')}>
          ★
        </span>
      ))}
    </span>
  );
}

export function AlternativeClanCard({ clanInfo, score }: AlternativeClanCardProps) {
  const percentage = Math.round(score.percentage);

  return (
    <Card>
      <CardContent className="pt-6 space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label={clanInfo.nameEn}>
              {clanInfo.icon}
            </span>
            <div>
              <span className="font-semibold text-sm">
                {clanInfo.name} ({clanInfo.nameEn})
              </span>
              <p className="text-xs text-muted-foreground">
                {clanInfo.nickname}
              </p>
            </div>
          </div>
          <Badge variant="secondary">совпадение: {percentage}%</Badge>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {clanInfo.flavor ?? clanInfo.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Сложность:</span>
          <ComplexityStars value={clanInfo.complexity} />
        </div>
      </CardContent>
    </Card>
  );
}
