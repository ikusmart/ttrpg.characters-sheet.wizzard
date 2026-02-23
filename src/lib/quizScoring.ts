import type { QuizQuestion, ClassId, ClassScore, QuizResult, QuizClassInfo, QuizSpeciesInfo } from '@/models/quiz';

const ALL_CLASS_IDS: ClassId[] = [
  'barbarian', 'bard', 'cleric', 'druid', 'fighter', 'monk',
  'paladin', 'ranger', 'rogue', 'sorcerer', 'warlock', 'wizard',
];

export function calculateClassScores(
  answers: Record<string, string>,
  questions: QuizQuestion[],
): Map<ClassId, number> {
  const scores = new Map<ClassId, number>(ALL_CLASS_IDS.map(id => [id, 0]));

  for (const question of questions) {
    const selectedAnswerId = answers[question.id];
    if (!selectedAnswerId) continue;

    const selectedAnswer = question.answers.find(a => a.id === selectedAnswerId);
    if (!selectedAnswer) continue;

    for (const { classId, weight } of selectedAnswer.weights) {
      scores.set(classId, (scores.get(classId) ?? 0) + weight);
    }
  }

  return scores;
}

export function calculateMaxPossible(
  questions: QuizQuestion[],
): Map<ClassId, number> {
  const maxScores = new Map<ClassId, number>(ALL_CLASS_IDS.map(id => [id, 0]));

  for (const question of questions) {
    const bestWeightPerClass = new Map<ClassId, number>();

    for (const answer of question.answers) {
      for (const { classId, weight } of answer.weights) {
        const current = bestWeightPerClass.get(classId) ?? 0;
        if (weight > current) {
          bestWeightPerClass.set(classId, weight);
        }
      }
    }

    for (const [classId, weight] of bestWeightPerClass) {
      maxScores.set(classId, (maxScores.get(classId) ?? 0) + weight);
    }
  }

  return maxScores;
}

export function suggestSpecies(
  primaryClassId: ClassId,
  species: QuizSpeciesInfo[],
): QuizSpeciesInfo {
  const match = species.find(s => s.alignedClasses.includes(primaryClassId));
  return match ?? species.find(s => s.id === 'human') ?? species[0];
}

export function calculateQuizResults(
  answers: Record<string, string>,
  questions: QuizQuestion[],
  classes: QuizClassInfo[],
  species: QuizSpeciesInfo[],
): QuizResult {
  const scores = calculateClassScores(answers, questions);
  const maxPossible = calculateMaxPossible(questions);

  const classScores: ClassScore[] = ALL_CLASS_IDS.map(classId => {
    const score = scores.get(classId) ?? 0;
    const max = maxPossible.get(classId) ?? 1;
    return {
      classId,
      score,
      maxPossible: max,
      percentage: max > 0 ? Math.round((score / max) * 100) : 0,
    };
  });

  classScores.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const classA = classes.find(c => c.id === a.classId);
    const classB = classes.find(c => c.id === b.classId);
    return (classA?.complexity ?? 5) - (classB?.complexity ?? 5);
  });

  const [primary, second, third] = classScores;
  const suggestedSpeciesResult = suggestSpecies(primary.classId, species);

  return {
    primary,
    alternatives: [second, third],
    suggestedSpecies: suggestedSpeciesResult,
    answers,
  };
}
