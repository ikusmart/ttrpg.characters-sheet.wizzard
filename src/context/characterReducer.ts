import type { Character } from '@/models/character';
import type { AbilityName } from '@/models/ability';
import type { SkillName } from '@/models/skill';
import type { Attack, EquipmentItem } from '@/models/equipment';
import { recalculate } from '@/lib/characterCalculations';

export type CharacterAction =
  // Header
  | { type: 'SET_NAME'; name: string }
  | { type: 'SET_PLAYER_NAME'; playerName: string }
  | { type: 'SET_LEVEL'; level: number }
  | { type: 'SET_EXPERIENCE'; experiencePoints: number }
  // Ability scores
  | { type: 'SET_ABILITY_BASE_VALUE'; ability: AbilityName; value: number }
  // Saving throws
  | { type: 'TOGGLE_SAVING_THROW_PROF'; ability: AbilityName }
  // Skills
  | { type: 'CYCLE_SKILL_PROFICIENCY'; skill: SkillName }
  // Combat
  | { type: 'SET_ARMOR_CLASS'; armorClass: number }
  | { type: 'SET_SPEED'; speed: number }
  // Hit Points
  | { type: 'ADJUST_HP'; delta: number }
  | { type: 'SET_MAX_HP'; maxHitPoints: number }
  | { type: 'SET_TEMP_HP'; temporaryHitPoints: number }
  | { type: 'USE_HIT_DIE' }
  | { type: 'RESTORE_HIT_DIE' }
  // Death Saves
  | { type: 'TOGGLE_DEATH_SUCCESS'; index: number }
  | { type: 'TOGGLE_DEATH_FAILURE'; index: number }
  | { type: 'RESET_DEATH_SAVES' }
  // Attacks
  | { type: 'ADD_ATTACK'; attack: Attack }
  | { type: 'REMOVE_ATTACK'; index: number }
  | { type: 'UPDATE_ATTACK'; index: number; attack: Attack }
  // Equipment
  | { type: 'ADD_EQUIPMENT'; item: EquipmentItem }
  | { type: 'REMOVE_EQUIPMENT'; itemId: string }
  | { type: 'UPDATE_EQUIPMENT'; item: EquipmentItem }
  | { type: 'TOGGLE_EQUIPPED'; itemId: string }
  // Currency
  | { type: 'SET_CURRENCY'; currency: Character['currency'] }
  // Features
  | { type: 'ADD_FEATURE'; feature: Character['features'][number] }
  | { type: 'REMOVE_FEATURE'; index: number }
  | { type: 'UPDATE_FEATURE'; index: number; feature: Character['features'][number] }
  // Proficiencies
  | { type: 'SET_PROFICIENCY_LANGUAGES'; languages: string[] }
  | { type: 'SET_PROFICIENCY_TOOLS'; tools: string[] }
  | { type: 'SET_PROFICIENCY_ARMOR'; armor: string[] }
  | { type: 'SET_PROFICIENCY_WEAPONS'; weapons: string[] }
  // Personality & Notes
  | { type: 'SET_PERSONALITY_TRAITS'; personalityTraits: string }
  | { type: 'SET_IDEALS'; ideals: string }
  | { type: 'SET_BONDS'; bonds: string }
  | { type: 'SET_FLAWS'; flaws: string }
  | { type: 'SET_BACKSTORY'; backstory: string }
  | { type: 'SET_NOTES'; notes: string }
  // Spellcasting
  | { type: 'USE_SPELL_SLOT'; slotLevel: number }
  | { type: 'RESTORE_SPELL_SLOT'; slotLevel: number }
  // Full replace (for loading)
  | { type: 'REPLACE_CHARACTER'; character: Character };

export function characterReducer(state: Character, action: CharacterAction): Character {
  let next: Character;

  switch (action.type) {
    // Header
    case 'SET_NAME':
      next = { ...state, name: action.name };
      break;
    case 'SET_PLAYER_NAME':
      next = { ...state, playerName: action.playerName };
      break;
    case 'SET_LEVEL':
      next = { ...state, level: Math.max(1, Math.min(20, action.level)) };
      break;
    case 'SET_EXPERIENCE':
      next = { ...state, experiencePoints: Math.max(0, action.experiencePoints) };
      break;

    // Ability scores
    case 'SET_ABILITY_BASE_VALUE':
      next = {
        ...state,
        abilityScores: {
          ...state.abilityScores,
          [action.ability]: {
            ...state.abilityScores[action.ability],
            baseValue: Math.max(1, Math.min(30, action.value)),
          },
        },
      };
      break;

    // Saving throws
    case 'TOGGLE_SAVING_THROW_PROF': {
      const has = state.savingThrowProficiencies.includes(action.ability);
      next = {
        ...state,
        savingThrowProficiencies: has
          ? state.savingThrowProficiencies.filter(a => a !== action.ability)
          : [...state.savingThrowProficiencies, action.ability],
      };
      break;
    }

    // Skills — cycle: none → proficient → expertise → none
    case 'CYCLE_SKILL_PROFICIENCY': {
      const skill = action.skill;
      const isProf = state.skillProficiencies.includes(skill);
      const isExpert = state.skillExpertise.includes(skill);

      if (!isProf && !isExpert) {
        // none → proficient
        next = { ...state, skillProficiencies: [...state.skillProficiencies, skill] };
      } else if (isProf && !isExpert) {
        // proficient → expertise
        next = { ...state, skillExpertise: [...state.skillExpertise, skill] };
      } else {
        // expertise → none
        next = {
          ...state,
          skillProficiencies: state.skillProficiencies.filter(s => s !== skill),
          skillExpertise: state.skillExpertise.filter(s => s !== skill),
        };
      }
      break;
    }

    // Combat
    case 'SET_ARMOR_CLASS':
      next = { ...state, armorClass: Math.max(0, action.armorClass) };
      break;
    case 'SET_SPEED':
      next = { ...state, speed: Math.max(0, action.speed) };
      break;

    // Hit Points
    case 'ADJUST_HP': {
      const newHP = Math.max(0, Math.min(state.maxHitPoints, state.currentHitPoints + action.delta));
      next = { ...state, currentHitPoints: newHP };
      break;
    }
    case 'SET_MAX_HP':
      next = {
        ...state,
        maxHitPoints: Math.max(1, action.maxHitPoints),
        currentHitPoints: Math.min(state.currentHitPoints, Math.max(1, action.maxHitPoints)),
      };
      break;
    case 'SET_TEMP_HP':
      next = { ...state, temporaryHitPoints: Math.max(0, action.temporaryHitPoints) };
      break;
    case 'USE_HIT_DIE':
      next = {
        ...state,
        hitDice: {
          ...state.hitDice,
          remaining: Math.max(0, state.hitDice.remaining - 1),
        },
      };
      break;
    case 'RESTORE_HIT_DIE':
      next = {
        ...state,
        hitDice: {
          ...state.hitDice,
          remaining: Math.min(state.hitDice.total, state.hitDice.remaining + 1),
        },
      };
      break;

    // Death Saves
    case 'TOGGLE_DEATH_SUCCESS': {
      const current = state.deathSaves.successes;
      // If clicking on an already-filled circle, reduce to that index; otherwise fill up to index+1
      const newSuccesses = action.index < current ? action.index : action.index + 1;
      next = { ...state, deathSaves: { ...state.deathSaves, successes: Math.min(3, Math.max(0, newSuccesses)) } };
      break;
    }
    case 'TOGGLE_DEATH_FAILURE': {
      const current = state.deathSaves.failures;
      const newFailures = action.index < current ? action.index : action.index + 1;
      next = { ...state, deathSaves: { ...state.deathSaves, failures: Math.min(3, Math.max(0, newFailures)) } };
      break;
    }
    case 'RESET_DEATH_SAVES':
      next = { ...state, deathSaves: { successes: 0, failures: 0 } };
      break;

    // Attacks
    case 'ADD_ATTACK':
      next = { ...state, attacks: [...state.attacks, action.attack] };
      break;
    case 'REMOVE_ATTACK':
      next = { ...state, attacks: state.attacks.filter((_, i) => i !== action.index) };
      break;
    case 'UPDATE_ATTACK':
      next = {
        ...state,
        attacks: state.attacks.map((a, i) => (i === action.index ? action.attack : a)),
      };
      break;

    // Equipment
    case 'ADD_EQUIPMENT':
      next = { ...state, equipment: [...state.equipment, action.item] };
      break;
    case 'REMOVE_EQUIPMENT':
      next = { ...state, equipment: state.equipment.filter(e => e.id !== action.itemId) };
      break;
    case 'UPDATE_EQUIPMENT':
      next = {
        ...state,
        equipment: state.equipment.map(e => (e.id === action.item.id ? action.item : e)),
      };
      break;
    case 'TOGGLE_EQUIPPED':
      next = {
        ...state,
        equipment: state.equipment.map(e =>
          e.id === action.itemId ? { ...e, equipped: !e.equipped } : e,
        ),
      };
      break;

    // Currency
    case 'SET_CURRENCY':
      next = { ...state, currency: action.currency };
      break;

    // Features
    case 'ADD_FEATURE':
      next = { ...state, features: [...state.features, action.feature] };
      break;
    case 'REMOVE_FEATURE':
      next = { ...state, features: state.features.filter((_, i) => i !== action.index) };
      break;
    case 'UPDATE_FEATURE':
      next = {
        ...state,
        features: state.features.map((f, i) => (i === action.index ? action.feature : f)),
      };
      break;

    // Proficiencies
    case 'SET_PROFICIENCY_LANGUAGES':
      next = { ...state, proficiencies: { ...state.proficiencies, languages: action.languages } };
      break;
    case 'SET_PROFICIENCY_TOOLS':
      next = { ...state, proficiencies: { ...state.proficiencies, tools: action.tools } };
      break;
    case 'SET_PROFICIENCY_ARMOR':
      next = { ...state, proficiencies: { ...state.proficiencies, armor: action.armor } };
      break;
    case 'SET_PROFICIENCY_WEAPONS':
      next = { ...state, proficiencies: { ...state.proficiencies, weapons: action.weapons } };
      break;

    // Personality & Notes
    case 'SET_PERSONALITY_TRAITS':
      next = { ...state, personalityTraits: action.personalityTraits };
      break;
    case 'SET_IDEALS':
      next = { ...state, ideals: action.ideals };
      break;
    case 'SET_BONDS':
      next = { ...state, bonds: action.bonds };
      break;
    case 'SET_FLAWS':
      next = { ...state, flaws: action.flaws };
      break;
    case 'SET_BACKSTORY':
      next = { ...state, backstory: action.backstory };
      break;
    case 'SET_NOTES':
      next = { ...state, notes: action.notes };
      break;

    // Spellcasting
    case 'USE_SPELL_SLOT': {
      if (!state.spellSlots || !state.spellSlotsUsed) { next = state; break; }
      const idx = action.slotLevel;
      if (idx < 0 || idx >= state.spellSlots.length) { next = state; break; }
      if (state.spellSlotsUsed[idx] >= state.spellSlots[idx]) { next = state; break; }
      const newUsed = [...state.spellSlotsUsed];
      newUsed[idx] = newUsed[idx] + 1;
      next = { ...state, spellSlotsUsed: newUsed };
      break;
    }
    case 'RESTORE_SPELL_SLOT': {
      if (!state.spellSlotsUsed) { next = state; break; }
      const idx = action.slotLevel;
      if (idx < 0 || idx >= state.spellSlotsUsed.length) { next = state; break; }
      if (state.spellSlotsUsed[idx] <= 0) { next = state; break; }
      const newUsed = [...state.spellSlotsUsed];
      newUsed[idx] = newUsed[idx] - 1;
      next = { ...state, spellSlotsUsed: newUsed };
      break;
    }

    // Full replace
    case 'REPLACE_CHARACTER':
      return action.character;

    default:
      next = state;
  }

  return recalculate(next);
}
