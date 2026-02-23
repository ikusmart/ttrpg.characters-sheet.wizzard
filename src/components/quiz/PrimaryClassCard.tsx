import type { QuizClassInfo, ClassScore } from '@/models/quiz';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface PrimaryClassCardProps {
  classInfo: QuizClassInfo;
  score: ClassScore;
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

export function PrimaryClassCard({ classInfo, score }: PrimaryClassCardProps) {
  const percentage = Math.round(score.percentage);

  return (
    <Card className="border-primary bg-primary/5">
      <CardHeader>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Ваш идеальный класс
          </span>
          <Badge variant="default">совпадение: {percentage}%</Badge>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-5xl" role="img" aria-label={classInfo.nameEn}>
            {classInfo.icon}
          </span>
          <CardTitle className="text-2xl font-bold">
            {classInfo.name} ({classInfo.nameEn})
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {classInfo.description}
        </p>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Сложность:</span>
            <ComplexityStars value={classInfo.complexity} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Кость хитов:</span>
            <span className="font-medium">{classInfo.hitDice}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Основная характеристика:</span>
            <span className="font-medium">{classInfo.primaryAbility}</span>
          </div>
        </div>
        {classInfo.flavor && (
          <p className="text-sm italic text-muted-foreground border-l-2 border-primary/40 pl-3">
            {classInfo.flavor}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
