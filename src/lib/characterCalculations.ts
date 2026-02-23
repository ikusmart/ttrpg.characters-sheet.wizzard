import type { AbilityScore } from '@/models/ability';
import type { Character } from '@/models/character';

/** Ability modifier: floor((baseValue + bonusFromBackground - 10) / 2) */
export function getAbilityModifier(score: AbilityScore): number {
  return Math.floor((score.baseValue + score.bonusFromBackground - 10) / 2);
}

/** Format modifier as "+2" or "-1" */
export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

/** Proficiency bonus by level: ceil(level/4) + 1 */
export function getProficiencyBonus(level: number): number {
  return Math.ceil(level / 4) + 1;
}

/**
 * Recalculate derived values after any character change.
 * Returns a new Character object with updated: proficiencyBonus, initiative, spellSaveDC, spellAttackBonus.
 * Does NOT recalculate AC (manual override allowed) or maxHP (manual override allowed).
 */
export function recalculate(character: Character): Character {
  const proficiencyBonus = getProficiencyBonus(character.level);
  const dexMod = getAbilityModifier(character.abilityScores['dexterity']);
  const initiative = dexMod;

  let spellSaveDC = character.spellSaveDC;
  let spellAttackBonus = character.spellAttackBonus;

  if (character.spellcastingAbility) {
    const spellMod = getAbilityModifier(character.abilityScores[character.spellcastingAbility]);
    spellSaveDC = 8 + proficiencyBonus + spellMod;
    spellAttackBonus = proficiencyBonus + spellMod;
  }

  return {
    ...character,
    proficiencyBonus,
    initiative,
    ...(spellSaveDC !== undefined && { spellSaveDC }),
    ...(spellAttackBonus !== undefined && { spellAttackBonus }),
  };
}
