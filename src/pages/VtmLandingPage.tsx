import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const quizLevels = [
  {
    level: 'quick',
    icon: '⚡',
    title: 'Быстрая',
    subtitle: '6 вопросов',
    time: '~2 минуты',
    description: 'Быстрый тест — узнай свой клан за пару минут',
  },
  {
    level: 'medium',
    icon: '📋',
    title: 'Средняя',
    subtitle: '18 вопросов',
    time: '~5 минут',
    description: 'Подробнее раскроет твой характер и стиль',
  },
  {
    level: 'deep',
    icon: '🔬',
    title: 'Глубокая',
    subtitle: '30 вопросов',
    time: '~10 минут',
    description: 'Самый точный результат — максимум нюансов',
  },
];

export function VtmLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Vampire: The Masquerade</h1>
          <p className="text-lg text-muted-foreground">
            Узнай свой идеальный клан
          </p>
          <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            Ответь на несколько вопросов о своём характере, ценностях и стиле — и мы
            определим, к какому клану бессмертных ты принадлежишь. Никакого знания
            лора не требуется.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quizLevels.map((item) => (
            <Card
              key={item.level}
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => navigate(`/vtm/quiz?level=${item.level}`)}
            >
              <CardContent className="pt-6 text-center space-y-2">
                <div className="text-3xl">{item.icon}</div>
                <p className="font-bold text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.subtitle} · {item.time}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-3">
          <Button variant="default" onClick={() => navigate('/vtm/create')}>
            Создать персонажа (Create Character)
          </Button>
          <Button variant="outline" onClick={() => navigate('/vtm/sheet')}>
            Посмотреть демо-лист
          </Button>
          <Button variant="outline" onClick={() => navigate('/vtm/characters')}>
            Мои персонажи
          </Button>
        </div>
      </div>
    </div>
  );
}
