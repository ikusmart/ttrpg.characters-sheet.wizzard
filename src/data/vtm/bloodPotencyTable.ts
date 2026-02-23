export interface BloodPotencyEntry {
  bloodSurge: number;
  powerBonus: number;
  mendAmount: number;
  baneSeverity: number;
  feedingPenalty: string;
}

export const BLOOD_POTENCY_TABLE: BloodPotencyEntry[] = [
  // BP 0
  { bloodSurge: 1, powerBonus: 0, mendAmount: 1, baneSeverity: 0, feedingPenalty: 'Нет эффекта' },
  // BP 1
  { bloodSurge: 1, powerBonus: 0, mendAmount: 1, baneSeverity: 2, feedingPenalty: 'Нет эффекта' },
  // BP 2
  { bloodSurge: 1, powerBonus: 1, mendAmount: 2, baneSeverity: 2, feedingPenalty: 'Кровь животных / пакеты: половина' },
  // BP 3
  { bloodSurge: 2, powerBonus: 1, mendAmount: 2, baneSeverity: 3, feedingPenalty: 'Кровь животных / пакеты: ничего' },
  // BP 4
  { bloodSurge: 2, powerBonus: 2, mendAmount: 3, baneSeverity: 3, feedingPenalty: 'Животные/пакеты: ничего, смертные: половина' },
  // BP 5
  { bloodSurge: 3, powerBonus: 2, mendAmount: 3, baneSeverity: 4, feedingPenalty: 'Смертные: половина' },
  // BP 6
  { bloodSurge: 3, powerBonus: 3, mendAmount: 3, baneSeverity: 4, feedingPenalty: 'Смертные: ничего' },
  // BP 7
  { bloodSurge: 4, powerBonus: 3, mendAmount: 3, baneSeverity: 5, feedingPenalty: 'Смертные: ничего, нужна кровь вампиров' },
  // BP 8
  { bloodSurge: 4, powerBonus: 4, mendAmount: 4, baneSeverity: 5, feedingPenalty: 'Нужна кровь вампиров или сверхъестественных' },
  // BP 9
  { bloodSurge: 5, powerBonus: 4, mendAmount: 4, baneSeverity: 6, feedingPenalty: 'Нужна кровь вампиров' },
  // BP 10
  { bloodSurge: 5, powerBonus: 5, mendAmount: 5, baneSeverity: 6, feedingPenalty: 'Только кровь метусел' },
];
