import { HelpCircle } from 'lucide-react';
import { useHelp } from './HelpProvider';
import type { GameSystem } from '@/models/help';

interface HelpIconProps {
  sectionId: string;
  gameSystem: GameSystem;
  className?: string;
}

export function HelpIcon({ sectionId, gameSystem, className }: HelpIconProps) {
  const { openDrawer, helpModeEnabled } = useHelp();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        openDrawer(sectionId, gameSystem);
      }}
      className={`inline-flex items-center justify-center w-6 h-6 min-w-[44px] min-h-[44px] rounded-full text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/50 transition-colors ${helpModeEnabled ? 'help-icon-pulse text-primary/60' : ''} ${className ?? ''}`}
      aria-label="Справка по секции"
    >
      <HelpCircle className="w-4 h-4" />
    </button>
  );
}
