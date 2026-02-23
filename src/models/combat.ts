export interface DeathSaves {
  successes: number;
  failures: number;
}

export interface HitDice {
  total: number;
  remaining: number;
  sides: 6 | 8 | 10 | 12;
}
