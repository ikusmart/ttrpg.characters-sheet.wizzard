import type { QuizAnswer } from '@/models/quiz';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface QuizAnswerCardProps {
  answer: QuizAnswer;
  isSelected: boolean;
  disabled: boolean; // true during auto-advance delay
  onClick: () => void;
}

export function QuizAnswerCard({ answer, isSelected, disabled, onClick }: QuizAnswerCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200',
        'hover:border-primary/50 hover:shadow-md',
        isSelected && 'border-primary bg-primary/5 ring-2 ring-primary/20',
        disabled && 'pointer-events-none opacity-70'
      )}
      onClick={onClick}
    >
      <CardContent className="flex items-start gap-3 p-4">
        <span className="text-2xl shrink-0" role="img">{answer.icon}</span>
        <p className="text-sm leading-relaxed">{answer.text}</p>
      </CardContent>
    </Card>
  );
}
