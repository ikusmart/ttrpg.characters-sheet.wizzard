import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const games = [
  {
    id: 'dnd',
    title: 'Dungeons & Dragons',
    subtitle: '5th Edition (2024)',
    description: 'Классическое фэнтези: выбери класс, расу и отправляйся в приключение.',
    route: '/dnd',
    icon: '🐉',
  },
  {
    id: 'vtm',
    title: 'Vampire: The Masquerade',
    subtitle: '5th Edition',
    description: 'Мир тьмы: выбери клан, познай Голод и сохрани Человечность.',
    route: '/vtm',
    icon: '🧛',
  },
];

export function GameSelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Лист Персонажа</h1>
          <p className="text-lg text-muted-foreground">
            Помощник для начинающих игроков в настольные ролевые игры
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {games.map((game) => (
            <Card
              key={game.id}
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => navigate(game.route)}
            >
              <CardContent className="pt-6 text-center space-y-3">
                <div className="text-5xl">{game.icon}</div>
                <div>
                  <p className="font-bold text-lg">{game.title}</p>
                  <p className="text-xs text-muted-foreground">{game.subtitle}</p>
                </div>
                <p className="text-sm text-muted-foreground">{game.description}</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Открыть
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
