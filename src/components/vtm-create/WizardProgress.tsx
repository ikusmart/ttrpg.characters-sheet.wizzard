import { Progress } from '@/components/ui/progress';

const STEP_NAMES = [
  '1. Клан (Clan)',
  '2. Тип охотника (Predator Type)',
  '3. Атрибуты (Attributes)',
  '4. Навыки (Skills)',
  '5. Дисциплины (Disciplines)',
  '6. Достоинства и недостатки (Advantages)',
  '7. Личность (Identity)',
  '8. Обзор (Review)',
];

interface WizardProgressProps {
  step: number;
  totalSteps: number;
}

export function WizardProgress({ step, totalSteps }: WizardProgressProps) {
  const progressValue = totalSteps > 1 ? (step / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="mb-6 space-y-3">
      <Progress value={progressValue} className="h-2" />
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {STEP_NAMES.map((name, i) => (
          <span
            key={i}
            className={`text-xs ${
              i === step
                ? 'text-foreground font-semibold'
                : i < step
                ? 'text-muted-foreground line-through'
                : 'text-muted-foreground'
            }`}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
