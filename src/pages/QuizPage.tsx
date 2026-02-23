import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { QuizStep } from '@/components/quiz/QuizStep';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';

export function QuizPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = useCallback((answerId: string) => {
    const question = QUIZ_QUESTIONS[currentStep];
    const newAnswers = { ...answers, [question.id]: answerId };
    setAnswers(newAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/dnd/results', { state: { answers: newAnswers } });
    }
  }, [currentStep, answers, navigate]);

  const question = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8">
      <QuizProgress currentStep={currentStep} totalSteps={QUIZ_QUESTIONS.length} />
      <QuizStep
        key={question.id}
        question={question}
        onAnswer={handleAnswer}
        selectedAnswerId={answers[question.id]}
      />
    </div>
  );
}
