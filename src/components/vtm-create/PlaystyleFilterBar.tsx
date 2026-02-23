import { Sword, Crown, EyeOff, Sparkles, PawPrint } from 'lucide-react';
import type { PlaystyleId } from '@/models/vtm/playstyle';
import { PLAYSTYLE_DEFINITIONS, PLAYSTYLE_COLORS } from '@/data/vtm/playstyles';

interface PlaystyleFilterBarProps {
  activeFilters: Set<PlaystyleId>;
  onToggle: (id: PlaystyleId) => void;
  matchCount?: number;
  totalCount?: number;
}

const ICONS: Record<PlaystyleId, React.ComponentType<{ className?: string }>> = {
  warrior: Sword,
  manipulator: Crown,
  shadow: EyeOff,
  mystic: Sparkles,
  predator: PawPrint,
};

export function PlaystyleFilterBar({ activeFilters, onToggle, matchCount, totalCount }: PlaystyleFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-xs text-muted-foreground mr-1">Стиль игры:</span>
      {PLAYSTYLE_DEFINITIONS.map((ps) => {
        const isActive = activeFilters.has(ps.id);
        const Icon = ICONS[ps.id];
        const colors = PLAYSTYLE_COLORS[ps.id];
        return (
          <button
            key={ps.id}
            type="button"
            onClick={() => onToggle(ps.id)}
            title={ps.description}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              isActive ? colors.active : colors.inactive
            } hover:opacity-80`}
          >
            <Icon className="size-3" />
            {ps.label}
          </button>
        );
      })}
      {activeFilters.size > 0 && matchCount !== undefined && totalCount !== undefined && (
        <span className="text-xs text-muted-foreground ml-1">
          {matchCount} из {totalCount}
        </span>
      )}
    </div>
  );
}
