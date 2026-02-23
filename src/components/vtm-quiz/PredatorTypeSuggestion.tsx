import type { QuizPredatorInfo } from '@/models/vtm/quiz';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PredatorTypeSuggestionProps {
  predator: QuizPredatorInfo;
  primaryClanName: string;
}

export function PredatorTypeSuggestion({ predator, primaryClanName }: PredatorTypeSuggestionProps) {
  return (
    <Card className="bg-secondary/20">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-muted-foreground uppercase tracking-wide">
          Рекомендуемый тип охоты (Predator Type)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label={predator.nameEn}>
            {predator.icon}
          </span>
          <span className="font-semibold text-lg">
            {predator.name} ({predator.nameEn})
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Для вашего клана {primaryClanName} мы рекомендуем {predator.name} — {predator.description}
        </p>
      </CardContent>
    </Card>
  );
}
