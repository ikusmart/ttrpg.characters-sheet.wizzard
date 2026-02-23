import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HelpCircle, GraduationCap, BookOpen } from 'lucide-react';
import { useHelp } from '@/components/help/HelpProvider';

function useGameSystem() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/dnd')) return 'dnd' as const;
  if (pathname.startsWith('/vtm')) return 'vtm' as const;
  return null;
}

function useIsSheetPage() {
  const { pathname } = useLocation();
  return pathname.includes('/sheet');
}

export function AppHeader() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const gameSystem = useGameSystem();
  const isSheetPage = useIsSheetPage();
  const { helpModeEnabled, toggleHelpMode, startTour } = useHelp();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const title =
    gameSystem === 'dnd'
      ? 'D&D Лист Персонажа'
      : gameSystem === 'vtm'
        ? 'VtM Лист Персонажа'
        : 'Лист Персонажа';

  const subtitle =
    gameSystem === 'dnd' ? '5e (2024)' : gameSystem === 'vtm' ? 'V5' : null;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-lg font-bold no-underline hover:opacity-80 transition-opacity">{title}</Link>
          {subtitle && <span className="text-xs text-muted-foreground hidden sm:inline">{subtitle}</span>}
          {gameSystem && (
            <>
              <span className="text-muted-foreground hidden sm:inline">·</span>
              <Link to={`/${gameSystem}/characters`} className="text-sm text-muted-foreground no-underline hover:text-foreground transition-colors hidden sm:inline">
                Персонажи
              </Link>
              <span className="text-muted-foreground hidden sm:inline">·</span>
              <Link to={`/${gameSystem}/rules`} className="text-sm text-muted-foreground no-underline hover:text-foreground transition-colors hidden sm:inline">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  Правила
                </span>
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-1">
          {/* Guided Tour button — only on sheet pages */}
          {isSheetPage && gameSystem && (
            <button
              onClick={() => startTour(gameSystem)}
              className="p-2 rounded-md hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground"
              aria-label="Начать обучение"
              title="Обучение"
            >
              <GraduationCap className="w-5 h-5" />
            </button>
          )}

          {/* Help Mode toggle — only on sheet pages */}
          {isSheetPage && (
            <button
              onClick={toggleHelpMode}
              className={`p-2 rounded-md transition-colors text-sm ${
                helpModeEnabled
                  ? 'bg-primary/10 text-primary hover:bg-primary/20'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              aria-label={helpModeEnabled ? 'Выключить режим справки' : 'Включить режим справки'}
              title={helpModeEnabled ? 'Справка: ВКЛ' : 'Справка: ВЫКЛ'}
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          )}

          {/* Theme toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-md hover:bg-muted transition-colors text-sm"
            aria-label="Переключить тему"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}
