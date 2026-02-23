import { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { QuizProgress } from '@/components/quiz/QuizProgress';
import { VtmQuizStep } from '@/components/vtm-quiz/VtmQuizStep';
import { getQuestionsForLevel } from '@/data/vtm/quizQuestions';
import type { QuizLevel } from '@/models/vtm/quiz';

export function VtmQuizPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const level = (searchParams.get('level') || 'quick') as QuizLevel;
  const questions = getQuestionsForLevel(level);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = useCallback((answerId: string) => {
    const question = questions[currentStep];
    const newAnswers = { ...answers, [question.id]: answerId };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigate('/vtm/results', { state: { answers: newAnswers, level } });
    }
  }, [currentStep, answers, navigate, questions, level]);

  const question = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8">
      <QuizProgress currentStep={currentStep} totalSteps={questions.length} />
      <VtmQuizStep
        key={question.id}
        question={question}
        onAnswer={handleAnswer}
        selectedAnswerId={answers[question.id]}
      />
    </div>
  );
}
