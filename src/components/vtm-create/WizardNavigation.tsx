import { Button } from '@/components/ui/button';

interface WizardNavigationProps {
  step: number;
  canNext: boolean;
  onBack: () => void;
  onNext: () => void;
  onCreate: () => void;
}

export function WizardNavigation({ step, canNext, onBack, onNext, onCreate }: WizardNavigationProps) {
  const isFirst = step === 0;
  const isLast = step === 7;

  return (
    <div className="flex justify-between mt-8 pt-4 border-t border-border">
      <div>
        {!isFirst && (
          <Button variant="outline" onClick={onBack}>
            Назад (Back)
          </Button>
        )}
      </div>
      <div>
        {isLast ? (
          <Button variant="default" onClick={onCreate} disabled={!canNext}>
            Создать персонажа (Create Character)
          </Button>
        ) : (
          <Button variant="default" onClick={onNext} disabled={!canNext}>
            Далее (Next)
          </Button>
        )}
      </div>
    </div>
  );
}
