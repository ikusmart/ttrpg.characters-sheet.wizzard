import type { QuizClanInfo, ClanScore } from '@/models/vtm/quiz';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PrimaryClanCardProps {
  clanInfo: QuizClanInfo;
  score: ClanScore;
}

function ComplexityStars({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={cn('text-base', i < value ? 'text-yellow-500' : 'text-muted-foreground/30')}>
          ★
        </span>
      ))}
    </span>
  );
}

export function PrimaryClanCard({ clanInfo, score }: PrimaryClanCardProps) {
  const percentage = Math.round(score.percentage);

  return (
    <Card className="border-primary bg-primary/5">
      <CardHeader>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Ваш идеальный клан
          </span>
          <Badge variant="default">совпадение: {percentage}%</Badge>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-5xl" role="img" aria-label={clanInfo.nameEn}>
            {clanInfo.icon}
          </span>
          <div>
            <CardTitle className="text-2xl font-bold">
              {clanInfo.name} ({clanInfo.nameEn})
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {clanInfo.nickname} ({clanInfo.nicknameEn})
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {clanInfo.description}
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Сложность:</span>
            <ComplexityStars value={clanInfo.complexity} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Дисциплины:</span>
            <span className="font-medium">{clanInfo.disciplines}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Проклятие:</span>
            <span className="font-medium">{clanInfo.baneShort}</span>
          </div>
        </div>
        {clanInfo.flavor && (
          <p className="text-sm italic text-muted-foreground border-l-2 border-primary/40 pl-3">
            {clanInfo.flavor}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
