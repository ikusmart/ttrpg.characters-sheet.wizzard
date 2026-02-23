import { Button } from '@/components/ui/button';

interface ResultsActionsProps {
  onRetake: () => void;
  onViewSheet: () => void;
  onCreateCharacter?: () => void;
}

export function ResultsActions({ onRetake, onViewSheet, onCreateCharacter }: ResultsActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button variant="outline" onClick={onRetake}>
        Пройти ещё раз
      </Button>
      {onCreateCharacter && (
        <Button variant="default" onClick={onCreateCharacter}>
          Создать этого персонажа
        </Button>
      )}
      <Button variant="outline" onClick={onViewSheet}>
        Посмотреть демо-лист
      </Button>
    </div>
  );
}
