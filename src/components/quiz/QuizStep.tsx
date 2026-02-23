import { useState, useCallback } from 'react';
import type { QuizQuestion } from '@/models/quiz';
import { QuizAnswerCard } from './QuizAnswerCard';

interface QuizStepProps {
  question: QuizQuestion;
  onAnswer: (answerId: string) => void;
  selectedAnswerId?: string;
}

export function QuizStep({ question, onAnswer, selectedAnswerId }: QuizStepProps) {
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
          <QuizAnswerCard
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
