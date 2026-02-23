export interface RollResult {
  normalDice: number[];      // Results of non-hunger dice
  hungerDice: number[];      // Results of hunger dice
  successes: number;         // Count of dice >= 6
  critPairs: number;         // Number of pairs of 10s (each pair = +2 extra successes)
  messyCrit: boolean;        // At least one hunger die shows 10 in a critical pair
  bestialFailure: boolean;   // Roll failed AND at least one hunger die shows 1
  totalSuccesses: number;    // successes + critPairs*2
}

export function rollDice(poolSize: number, hungerDice: number): RollResult {
  // Clamp hunger dice to pool size
  const actualHunger = Math.min(hungerDice, poolSize);
  const normalCount = poolSize - actualHunger;

  // Roll dice
  const normalDice = Array.from({ length: normalCount }, () => Math.ceil(Math.random() * 10));
  const hungerDiceResults = Array.from({ length: actualHunger }, () => Math.ceil(Math.random() * 10));

  const allDice = [...normalDice, ...hungerDiceResults];

  // Count successes (>= 6)
  const successes = allDice.filter(d => d >= 6).length;

  // Count 10s
  const normalTens = normalDice.filter(d => d === 10).length;
  const hungerTens = hungerDiceResults.filter(d => d === 10).length;
  const totalTens = normalTens + hungerTens;

  // Critical pairs: each pair of 10s adds +2 bonus successes
  const critPairs = Math.floor(totalTens / 2);

  // Messy critical: at least one hunger die is 10 AND there's at least one crit pair
  const messyCrit = critPairs > 0 && hungerTens > 0;

  // Total successes
  const totalSuccesses = successes + (critPairs * 2);

  // Bestial failure: roll has 0 total successes AND at least one hunger die shows 1
  const hungerOnes = hungerDiceResults.filter(d => d === 1).length;
  const bestialFailure = totalSuccesses === 0 && hungerOnes > 0;

  return {
    normalDice,
    hungerDice: hungerDiceResults,
    successes,
    critPairs,
    messyCrit,
    bestialFailure,
    totalSuccesses,
  };
}
