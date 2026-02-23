import { useRef, useState, useEffect } from 'react';

export function useValueAnimation(value: number): string {
  const prevRef = useRef(value);
  const [animClass, setAnimClass] = useState('');

  useEffect(() => {
    if (value !== prevRef.current) {
      const direction = value > prevRef.current ? 'animate-value-up' : 'animate-value-down';
      setAnimClass(direction);
      const timer = setTimeout(() => setAnimClass(''), 600);
      prevRef.current = value;
      return () => clearTimeout(timer);
    }
  }, [value]);

  return animClass;
}
