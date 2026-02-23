import type { ClanId } from './clan';
import type { PredatorTypeId } from './predatorType';

export type QuizLevel = 'quick' | 'medium' | 'deep';

export interface VtmQuizAnswerWeight {
  clanId: ClanId;
  weight: number; // 1-3
}

export interface VtmQuizAnswer {
  id: string;
  text: string;
  icon: string;
  weights: VtmQuizAnswerWeight[];
}

export interface VtmQuizQuestion {
  id: string;
  title: string;
  text: string;
  tier: 1 | 2 | 3;
  answers: VtmQuizAnswer[];
}

export interface QuizClanInfo {
  id: ClanId;
  name: string;
  nameEn: string;
  nickname: string;
  nicknameEn: string;
  description: string;
  icon: string;
  complexity: 1 | 2 | 3 | 4 | 5;
  disciplines: string;
  disciplinesEn: string;
  baneShort: string;
  flavor: string;
}

export interface QuizPredatorInfo {
  id: PredatorTypeId;
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  alignedClans: ClanId[];
}

export interface ClanScore {
  clanId: ClanId;
  score: number;
  maxPossible: number;
  percentage: number;
}

export interface VtmQuizResult {
  primary: ClanScore;
  alternatives: [ClanScore, ClanScore];
  suggestedPredator: QuizPredatorInfo;
  answers: Record<string, string>;
}
