import { useState, useEffect, useRef, useCallback } from 'react';

interface InlineInputProps {
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'textarea';
  disabled?: boolean;
  className?: string;
  min?: number;
  max?: number;
  placeholder?: string;
}

export function InlineInput({
  value,
  onChange,
  type = 'text',
  disabled = false,
  className = '',
  min,
  max,
  placeholder,
}: InlineInputProps) {
  const [localValue, setLocalValue] = useState(String(value));
  const isComposing = useRef(false);

  // Sync external value changes
  useEffect(() => {
    setLocalValue(String(value));
  }, [value]);

  const commit = useCallback(() => {
    if (type === 'number') {
      let num = parseInt(localValue, 10);
      if (isNaN(num)) num = typeof value === 'number' ? value : 0;
      if (min !== undefined) num = Math.max(min, num);
      if (max !== undefined) num = Math.min(max, num);
      setLocalValue(String(num));
      onChange(String(num));
    } else {
      onChange(localValue);
    }
  }, [localValue, type, value, min, max, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && type !== 'textarea') {
      e.preventDefault();
      (e.target as HTMLElement).blur();
    }
  };

  const baseClasses = `bg-transparent border border-transparent rounded px-1 transition-colors focus:border-border focus:bg-muted/30 focus:outline-none disabled:opacity-100 disabled:cursor-default ${className}`;

  if (type === 'textarea') {
    return (
      <textarea
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={commit}
        onCompositionStart={() => { isComposing.current = true; }}
        onCompositionEnd={() => { isComposing.current = false; }}
        disabled={disabled}
        placeholder={placeholder}
        className={`${baseClasses} resize-none min-h-[60px]`}
        rows={3}
      />
    );
  }

  return (
    <input
      type={type === 'number' ? 'text' : 'text'}
      inputMode={type === 'number' ? 'numeric' : undefined}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={commit}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      placeholder={placeholder}
      className={baseClasses}
      min={min}
      max={max}
    />
  );
}
