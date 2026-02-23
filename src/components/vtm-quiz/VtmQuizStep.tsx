import { useState, useCallback } from 'react';
import type { VtmQuizQuestion } from '@/models/vtm/quiz';
import { VtmQuizAnswerCard } from './VtmQuizAnswerCard';

interface VtmQuizStepProps {
  question: VtmQuizQuestion;
  onAnswer: (answerId: string) => void;
  selectedAnswerId?: string;
}

export function VtmQuizStep({ question, onAnswer, selectedAnswerId }: VtmQuizStepProps) {
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [localSelected, setLocalSelected] = useState<string | undefined>(undefined);

  const handleSelect = useCallback((answerId: string) => {
    if (isAdvancing) return;
    setIsAdvancing(true);
    setLocalSelected(answerId);
    setTimeout(() => {
      onAnswer(answerId);
      setIsAdvancing(false);
      setLocalSelected(undefined);
    }, 400);
  }, [isAdvancing, onAnswer]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center">
        {question.text}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {question.answers.map((answer) => (
          <VtmQuizAnswerCard
            key={answer.id}
            answer={answer}
            isSelected={localSelected === answer.id || (!localSelected && selectedAnswerId === answer.id)}
            disabled={isAdvancing}
            onClick={() => handleSelect(answer.id)}
          />
        ))}
      </div>
    </div>
  );
}
