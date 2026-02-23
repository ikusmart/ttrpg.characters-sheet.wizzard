import { Link } from 'react-router-dom';
import { BookOpen, Lightbulb, ArrowRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getHelpSection } from '@/data/help/helpRegistry';
import type { GameSystem } from '@/models/help';

interface HelpDrawerContentProps {
  sectionId: string;
  gameSystem: GameSystem;
}

export function HelpDrawerContent({ sectionId, gameSystem }: HelpDrawerContentProps) {
  const section = getHelpSection(gameSystem, sectionId);

  if (!section) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p>Справка для этой секции пока не доступна.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-4">
        <p className="text-sm text-muted-foreground">{section.summary}</p>

        {/* Items */}
        <div className="space-y-3">
          {section.items.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-border bg-card p-3 space-y-1"
            >
              <h4 className="text-sm font-semibold">{item.name}</h4>
              <p className="text-xs text-muted-foreground">{item.description}</p>
              {item.gameplayEffect && (
                <p className="text-xs text-primary/80">
                  <span className="font-medium">Влияет на: </span>
                  {item.gameplayEffect}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Tips */}
        {section.tips && section.tips.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-amber-600 dark:text-amber-400">
              <Lightbulb className="w-4 h-4" />
              <span>Советы</span>
            </div>
            {section.tips.map((tip, i) => (
              <div
                key={i}
                className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 p-3"
              >
                <p className="text-xs text-amber-900 dark:text-amber-200">{tip.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Connections */}
        {section.connections && section.connections.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
              <ArrowRight className="w-4 h-4" />
              <span>Связи</span>
            </div>
            <div className="space-y-1">
              {section.connections.map((conn, i) => (
                <p key={i} className="text-xs text-muted-foreground">
                  <span className="font-medium">{conn.from}</span>
                  {' → '}
                  <span className="font-medium">{conn.to}</span>
                  {' — '}
                  {conn.relation}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Link to rules */}
        <Link
          to={`/${gameSystem}/rules`}
          className="flex items-center gap-1.5 text-xs text-primary hover:underline mt-4"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Подробнее в Правилах</span>
        </Link>
      </div>
    </ScrollArea>
  );
}
