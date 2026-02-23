import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
import { calculateQuizResults } from '@/lib/quizScoring';
import { QUIZ_QUESTIONS } from '@/data/quizQuestions';
import { QUIZ_CLASSES } from '@/data/quizClasses';
import { QUIZ_SPECIES } from '@/data/quizSpecies';
import { PrimaryClassCard } from '@/components/quiz/PrimaryClassCard';
import { AlternativeClassCard } from '@/components/quiz/AlternativeClassCard';
import { SpeciesSuggestion } from '@/components/quiz/SpeciesSuggestion';
import { ResultsActions } from '@/components/quiz/ResultsActions';
import { Separator } from '@/components/ui/separator';
import { buildCharacterFromTemplate } from '@/lib/characterBuilder';
import { saveCharacter } from '@/lib/characterStorage';
import type { ClassId, SpeciesId } from '@/models/quiz';

export function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const answers: Record<string, string> | undefined = location.state?.answers;

  useEffect(() => {
    if (!answers) {
      navigate('/dnd/quiz', { replace: true });
    }
  }, [answers, navigate]);

  const results = useMemo(() => {
    if (!answers) return null;
    return calculateQuizResults(answers, QUIZ_QUESTIONS, QUIZ_CLASSES, QUIZ_SPECIES);
  }, [answers]);

  const handleCreateCharacter = useCallback(() => {
    if (!results) return;
    const classId = results.primary.classId;
    const speciesId = results.suggestedSpecies.id;
    const character = buildCharacterFromTemplate(classId as ClassId, speciesId as SpeciesId);
    saveCharacter(character);
    navigate(`/dnd/sheet/${character.id}`);
  }, [results, navigate]);

  if (!results || !answers) return null;

  const primaryClassInfo = QUIZ_CLASSES.find((c) => c.id === results.primary.classId);
  const alternativeClassInfos = results.alternatives.map((alt) => ({
    classInfo: QUIZ_CLASSES.find((c) => c.id === alt.classId),
    score: alt,
  }));

  if (!primaryClassInfo) return null;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-center">Результаты викторины</h1>

        <PrimaryClassCard classInfo={primaryClassInfo} score={results.primary} />

        <Separator />

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Также подойдут:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {alternativeClassInfos.map(({ classInfo, score }) =>
              classInfo ? (
                <AlternativeClassCard key={score.classId} classInfo={classInfo} score={score} />
              ) : null,
            )}
          </div>
        </div>

        <Separator />

        <SpeciesSuggestion
          species={results.suggestedSpecies}
          primaryClassName={primaryClassInfo.name}
        />

        <Separator />

        <ResultsActions
          onRetake={() => navigate('/dnd/quiz')}
          onViewSheet={() => navigate('/dnd/sheet')}
          onCreateCharacter={handleCreateCharacter}
        />
      </div>
    </div>
  );
}
