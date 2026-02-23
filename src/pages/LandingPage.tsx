import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: '⚡',
    title: 'Быстрый квиз',
    description: '6 вопросов — и вы узнаете свой идеальный класс',
  },
  {
    icon: '📖',
    title: 'Понятные объяснения',
    description: 'Все термины на русском с английскими оригиналами',
  },
  {
    icon: '🎲',
    title: 'Для новичков',
    description: 'Никакого опыта в D&D не требуется',
  },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">D&amp;D Лист Персонажа</h1>
          <p className="text-lg text-muted-foreground">
            Помощник для начинающих игроков в Dungeons &amp; Dragons 5e
          </p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Не знаете, какой класс выбрать? Пройдите короткую викторину, и мы подберём
            идеальный класс под ваш стиль игры. Никаких сложных правил — просто отвечайте
            честно.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" onClick={() => navigate('/dnd/quiz')}>
            Пройти викторину
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/dnd/sheet')}>
            Посмотреть пример листа
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardContent className="pt-6 text-center space-y-2">
                <div className="text-3xl">{feature.icon}</div>
                <p className="font-semibold text-sm">{feature.title}</p>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
