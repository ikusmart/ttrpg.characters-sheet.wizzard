import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function EmptyCharacterList() {
  const navigate = useNavigate();

  return (
    <div className="text-center py-12 space-y-4">
      <p className="text-lg text-muted-foreground">
        У вас пока нет сохранённых персонажей
      </p>
      <p className="text-sm text-muted-foreground">
        Пройдите викторину, чтобы создать вашего первого персонажа
      </p>
      <Button onClick={() => navigate('/dnd/quiz')}>
        Пройти викторину
      </Button>
    </div>
  );
}
