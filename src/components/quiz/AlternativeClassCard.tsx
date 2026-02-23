import type { QuizClassInfo, ClassScore } from '@/models/quiz';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AlternativeClassCardProps {
  classInfo: QuizClassInfo;
  score: ClassScore;
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

export function AlternativeClassCard({ classInfo, score }: AlternativeClassCardProps) {
  const percentage = Math.round(score.percentage);

  return (
    <Card>
      <CardContent className="pt-6 space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label={classInfo.nameEn}>
              {classInfo.icon}
            </span>
            <span className="font-semibold text-sm">
              {classInfo.name} ({classInfo.nameEn})
            </span>
          </div>
          <Badge variant="secondary">совпадение: {percentage}%</Badge>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {classInfo.flavor ?? classInfo.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Сложность:</span>
          <ComplexityStars value={classInfo.complexity} />
        </div>
      </CardContent>
    </Card>
  );
}
