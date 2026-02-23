import type { ClanId } from '@/models/vtm/clan';
import type { VtmQuizQuestion, ClanScore, VtmQuizResult, QuizClanInfo, QuizPredatorInfo } from '@/models/vtm/quiz';

const ALL_QUIZ_CLAN_IDS: ClanId[] = [
  'brujah', 'gangrel', 'malkavian', 'nosferatu', 'toreador',
  'tremere', 'ventrue', 'lasombra', 'tzimisce', 'hecata',
  'ravnos', 'salubri', 'ministry',
];

export function calculateClanScores(
  answers: Record<string, string>,
  questions: VtmQuizQuestion[],
): Map<ClanId, number> {
  const scores = new Map<ClanId, number>(ALL_QUIZ_CLAN_IDS.map(id => [id, 0]));

  for (const question of questions) {
    const selectedAnswerId = answers[question.id];
    if (!selectedAnswerId) continue;

    const selectedAnswer = question.answers.find(a => a.id === selectedAnswerId);
    if (!selectedAnswer) continue;

    for (const { clanId, weight } of selectedAnswer.weights) {
      scores.set(clanId, (scores.get(clanId) ?? 0) + weight);
    }
  }

  return scores;
}

export function calculateMaxPossible(
  questions: VtmQuizQuestion[],
): Map<ClanId, number> {
  const maxScores = new Map<ClanId, number>(ALL_QUIZ_CLAN_IDS.map(id => [id, 0]));

  for (const question of questions) {
    const bestWeightPerClan = new Map<ClanId, number>();

    for (const answer of question.answers) {
      for (const { clanId, weight } of answer.weights) {
        const current = bestWeightPerClan.get(clanId) ?? 0;
        if (weight > current) {
          bestWeightPerClan.set(clanId, weight);
        }
      }
    }

    for (const [clanId, weight] of bestWeightPerClan) {
      maxScores.set(clanId, (maxScores.get(clanId) ?? 0) + weight);
    }
  }

  return maxScores;
}

export function suggestPredatorType(
  primaryClanId: ClanId,
  predators: QuizPredatorInfo[],
): QuizPredatorInfo {
  const match = predators.find(p => p.alignedClans.includes(primaryClanId));
  return match ?? predators.find(p => p.id === 'siren') ?? predators[0];
}

export function calculateVtmQuizResults(
  answers: Record<string, string>,
  questions: VtmQuizQuestion[],
  clans: QuizClanInfo[],
  predators: QuizPredatorInfo[],
): VtmQuizResult {
  const scores = calculateClanScores(answers, questions);
  const maxPossible = calculateMaxPossible(questions);

  const clanScores: ClanScore[] = ALL_QUIZ_CLAN_IDS.map(clanId => {
    const score = scores.get(clanId) ?? 0;
    const max = maxPossible.get(clanId) ?? 1;
    return {
      clanId,
      score,
      maxPossible: max,
      percentage: max > 0 ? Math.round((score / max) * 100) : 0,
    };
  });

  clanScores.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const clanA = clans.find(c => c.id === a.clanId);
    const clanB = clans.find(c => c.id === b.clanId);
    return (clanA?.complexity ?? 5) - (clanB?.complexity ?? 5);
  });

  const [primary, second, third] = clanScores;
  const suggestedPredator = suggestPredatorType(primary.clanId, predators);

  return {
    primary,
    alternatives: [second, third],
    suggestedPredator,
    answers,
  };
}
