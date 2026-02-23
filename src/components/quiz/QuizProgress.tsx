import { Progress } from '@/components/ui/progress';

interface QuizProgressProps {
  currentStep: number;  // 0-based
  totalSteps: number;   // 6
}

export function QuizProgress({ currentStep, totalSteps }: QuizProgressProps) {
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Вопрос {currentStep + 1} из {totalSteps}</span>
        <span>{Math.round(progressPercent)}%</span>
      </div>
      <Progress value={progressPercent} className="h-2" />
    </div>
  );
}
