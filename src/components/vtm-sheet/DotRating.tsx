interface DotRatingProps {
  current: number;
  max: number;
  size?: 'sm' | 'md';
  className?: string;
  onChange?: (value: number) => void;
}

export function DotRating({ current, max, size = 'md', className, onChange }: DotRatingProps) {
  const dotSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  const interactive = onChange !== undefined;

  function handleClick(i: number) {
    if (!onChange) return;
    if (i + 1 === current) {
      onChange(i);
    } else {
      onChange(i + 1);
    }
  }

  return (
    <div className={`flex items-center gap-1 ${className ?? ''}`}>
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className={`${dotSize} rounded-full ${
            i < current
              ? 'bg-foreground'
              : 'border border-foreground/40'
          }${interactive ? ' cursor-pointer hover:opacity-70' : ''}`}
          onClick={() => handleClick(i)}
        />
      ))}
    </div>
  );
}
