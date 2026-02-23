export const ABILITY_NAMES = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'] as const;
export type AbilityName = typeof ABILITY_NAMES[number];

export interface AbilityScore {
  name: AbilityName;
  baseValue: number;
  bonusFromBackground: number;
}
