interface DamageTrackDisplayProps {
  track: { max: number; superficial: number; aggravated: number };
  label: string;
  labelEn: string;
  onCycle?: (index: number) => void;
}

export function DamageTrackDisplay({ track, label, labelEn, onCycle }: DamageTrackDisplayProps) {
  const { max, superficial, aggravated } = track;
  const interactive = onCycle !== undefined;

  function getBoxContent(index: number): { type: 'empty' | 'superficial' | 'aggravated' } {
    if (index < aggravated) return { type: 'aggravated' };
    if (index < aggravated + superficial) return { type: 'superficial' };
    return { type: 'empty' };
  }

  return (
    <div>
      <p className="text-sm font-medium mb-1">
        {label} ({labelEn}): {max}
      </p>
      <div className="flex flex-wrap gap-1">
        {Array.from({ length: max }, (_, i) => {
          const { type } = getBoxContent(i);
          return (
            <div
              key={i}
              className={`w-7 h-7 border border-foreground/40 rounded flex items-center justify-center text-xs font-bold${interactive ? ' cursor-pointer hover:bg-muted/50' : ''}`}
              onClick={() => onCycle?.(i)}
            >
              {type === 'aggravated' && (
                <span className="text-destructive">X</span>
              )}
              {type === 'superficial' && (
                <span>/</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
