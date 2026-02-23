import type { QuizSpeciesInfo } from '@/models/quiz';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface SpeciesSuggestionProps {
  species: QuizSpeciesInfo;
  primaryClassName: string;
}

export function SpeciesSuggestion({ species, primaryClassName }: SpeciesSuggestionProps) {
  return (
    <Card className="bg-secondary/20">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-muted-foreground uppercase tracking-wide">
          Рекомендуемый вид (Species)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label={species.nameEn}>
            {species.icon}
          </span>
          <span className="font-semibold text-lg">
            {species.name} ({species.nameEn})
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Для вашего {primaryClassName} мы рекомендуем {species.name} — {species.description}
        </p>
      </CardContent>
    </Card>
  );
}
