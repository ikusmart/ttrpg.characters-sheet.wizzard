import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo } from 'react';
import { buildVtmCharacterFromTemplate } from '@/lib/vtmCharacterBuilder';
import { saveVtmCharacter } from '@/lib/vtmCharacterStorage';
import { calculateVtmQuizResults } from '@/lib/vtmQuizScoring';
import { getQuestionsForLevel } from '@/data/vtm/quizQuestions';
import { QUIZ_CLANS } from '@/data/vtm/quizClans';
import { QUIZ_PREDATOR_TYPES } from '@/data/vtm/quizPredatorTypes';
import { PrimaryClanCard } from '@/components/vtm-quiz/PrimaryClanCard';
import { AlternativeClanCard } from '@/components/vtm-quiz/AlternativeClanCard';
import { PredatorTypeSuggestion } from '@/components/vtm-quiz/PredatorTypeSuggestion';
import { ResultsActions } from '@/components/quiz/ResultsActions';
import { Separator } from '@/components/ui/separator';
import type { QuizLevel } from '@/models/vtm/quiz';

export function VtmResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const answers: Record<string, string> | undefined = location.state?.answers;
  const level: QuizLevel = location.state?.level || 'quick';

  useEffect(() => {
    if (!answers) {
      navigate('/vtm/quiz', { replace: true });
    }
  }, [answers, navigate]);

  const results = useMemo(() => {
    if (!answers) return null;
    const questions = getQuestionsForLevel(level);
    return calculateVtmQuizResults(answers, questions, QUIZ_CLANS, QUIZ_PREDATOR_TYPES);
  }, [answers, level]);

  const handleCreateCharacter = useCallback(() => {
    if (!results) return;
    const clanId = results.primary.clanId;
    const predatorTypeId = results.suggestedPredator.id;
    const character = buildVtmCharacterFromTemplate(clanId, predatorTypeId);
    saveVtmCharacter(character);
    navigate(`/vtm/sheet/${character.id}`);
  }, [results, navigate]);

  if (!results || !answers) return null;

  const primaryClanInfo = QUIZ_CLANS.find((c) => c.id === results.primary.clanId);
  const alternativeClanInfos = results.alternatives.map((alt) => ({
    clanInfo: QUIZ_CLANS.find((c) => c.id === alt.clanId),
    score: alt,
  }));

  if (!primaryClanInfo) return null;

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-center">Результаты викторины</h1>

        <PrimaryClanCard clanInfo={primaryClanInfo} score={results.primary} />

        <Separator />

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Также подойдут:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {alternativeClanInfos.map(({ clanInfo, score }) =>
              clanInfo ? (
                <AlternativeClanCard key={score.clanId} clanInfo={clanInfo} score={score} />
              ) : null,
            )}
          </div>
        </div>

        <Separator />

        <PredatorTypeSuggestion
          predator={results.suggestedPredator}
          primaryClanName={primaryClanInfo.name}
        />

        <Separator />

        <ResultsActions
          onRetake={() => navigate(`/vtm/quiz?level=${level}`)}
          onViewSheet={() => navigate('/vtm/sheet')}
          onCreateCharacter={handleCreateCharacter}
        />
      </div>
    </div>
  );
}
