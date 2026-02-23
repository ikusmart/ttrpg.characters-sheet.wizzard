import type { ReactNode } from 'react';
import { HelpIcon } from './HelpIcon';
import { useHelp } from './HelpProvider';
import type { GameSystem } from '@/models/help';

interface SectionWithHelpProps {
  sectionId: string;
  gameSystem: GameSystem;
  title: string;
  children: ReactNode;
}

export function SectionWithHelp({ sectionId, gameSystem, title, children }: SectionWithHelpProps) {
  const { helpModeEnabled } = useHelp();

  return (
    <div
      data-tour={sectionId}
      className={`space-y-2 transition-all duration-300 ${helpModeEnabled ? 'help-mode-highlight rounded-lg p-2 -m-2' : ''}`}
    >
      <div className="flex items-center justify-between gap-1">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          {title}
        </h3>
        <HelpIcon sectionId={sectionId} gameSystem={gameSystem} />
      </div>
      {children}
    </div>
  );
}
