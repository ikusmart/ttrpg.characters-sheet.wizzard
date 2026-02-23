import type { VtmCharacter } from '@/models/vtm/character';
import type { AttributeName } from '@/models/vtm/attribute';
import type { SkillName } from '@/models/vtm/skill';
import type { DisciplineName } from '@/models/vtm/discipline';

export type VtmCharacterAction =
  | { type: 'SET_ATTRIBUTE'; attribute: AttributeName; value: number }
  | { type: 'SET_SKILL'; skill: SkillName; value: number }
  | { type: 'SET_DISCIPLINE'; discipline: DisciplineName; value: number }
  | { type: 'CYCLE_HEALTH_DAMAGE'; index: number }
  | { type: 'CYCLE_WILLPOWER_DAMAGE'; index: number }
  | { type: 'SET_HUNGER'; hunger: number }
  | { type: 'SET_HUMANITY'; humanity: number }
  | { type: 'SET_BLOOD_POTENCY'; bloodPotency: number }
  | { type: 'SET_GENERATION'; generation: number }
  | { type: 'SET_TOTAL_EXPERIENCE'; totalExperience: number }
  | { type: 'SET_SPENT_EXPERIENCE'; spentExperience: number }
  | { type: 'SET_NAME'; name: string }
  | { type: 'SET_PLAYER_NAME'; playerName: string }
  | { type: 'SET_CONCEPT'; concept: string }
  | { type: 'SET_CHRONICLE'; chronicle: string }
  | { type: 'SET_SIRE'; sire: string }
  | { type: 'SET_AMBITION'; ambition: string }
  | { type: 'SET_DESIRE'; desire: string }
  | { type: 'SET_APPEARANCE'; appearance: string }
  | { type: 'SET_PERSONALITY_TRAITS'; personalityTraits: string }
  | { type: 'SET_BACKSTORY'; backstory: string }
  | { type: 'SET_NOTES'; notes: string }
  | { type: 'REPLACE_CHARACTER'; character: VtmCharacter };

function vtmRecalculate(character: VtmCharacter): VtmCharacter {
  const staminaValue = character.attributes.stamina.value;
  const composureValue = character.attributes.composure.value;
  const resolveValue = character.attributes.resolve.value;

  const healthMax = staminaValue + 3;
  const willpowerMax = composureValue + resolveValue;

  return {
    ...character,
    health: {
      ...character.health,
      max: healthMax,
      superficial: Math.min(character.health.superficial, healthMax - character.health.aggravated),
      aggravated: Math.min(character.health.aggravated, healthMax),
    },
    willpower: {
      ...character.willpower,
      max: willpowerMax,
      superficial: Math.min(character.willpower.superficial, willpowerMax - character.willpower.aggravated),
      aggravated: Math.min(character.willpower.aggravated, willpowerMax),
    },
  };
}

export function vtmCharacterReducer(state: VtmCharacter, action: VtmCharacterAction): VtmCharacter {
  let next: VtmCharacter;

  switch (action.type) {
    case 'SET_ATTRIBUTE':
      next = {
        ...state,
        attributes: {
          ...state.attributes,
          [action.attribute]: {
            ...state.attributes[action.attribute],
            value: Math.max(1, Math.min(5, action.value)),
          },
        },
      };
      break;

    case 'SET_SKILL':
      next = {
        ...state,
        skills: {
          ...state.skills,
          [action.skill]: Math.max(0, Math.min(5, action.value)),
        },
      };
      break;

    case 'SET_DISCIPLINE':
      next = {
        ...state,
        disciplines: {
          ...state.disciplines,
          [action.discipline]: Math.max(0, Math.min(5, action.value)),
        },
      };
      break;

    case 'CYCLE_HEALTH_DAMAGE': {
      const { aggravated, superficial, max } = state.health;
      const i = action.index;
      let newAggravated = aggravated;
      let newSuperficial = superficial;

      if (i < aggravated) {
        // Clicking an aggravated box: remove one aggravated
        newAggravated = aggravated - 1;
      } else if (i >= aggravated && i < aggravated + superficial) {
        // Clicking a superficial box: convert to aggravated
        newSuperficial = superficial - 1;
        newAggravated = aggravated + 1;
      } else {
        // Clicking an empty box: add superficial
        if (superficial + aggravated < max) {
          newSuperficial = superficial + 1;
        }
      }

      next = {
        ...state,
        health: {
          ...state.health,
          aggravated: newAggravated,
          superficial: newSuperficial,
        },
      };
      break;
    }

    case 'CYCLE_WILLPOWER_DAMAGE': {
      const { aggravated, superficial, max } = state.willpower;
      const i = action.index;
      let newAggravated = aggravated;
      let newSuperficial = superficial;

      if (i < aggravated) {
        // Clicking an aggravated box: remove one aggravated
        newAggravated = aggravated - 1;
      } else if (i >= aggravated && i < aggravated + superficial) {
        // Clicking a superficial box: convert to aggravated
        newSuperficial = superficial - 1;
        newAggravated = aggravated + 1;
      } else {
        // Clicking an empty box: add superficial
        if (superficial + aggravated < max) {
          newSuperficial = superficial + 1;
        }
      }

      next = {
        ...state,
        willpower: {
          ...state.willpower,
          aggravated: newAggravated,
          superficial: newSuperficial,
        },
      };
      break;
    }

    case 'SET_HUNGER':
      next = { ...state, hunger: Math.max(0, Math.min(5, action.hunger)) };
      break;

    case 'SET_HUMANITY':
      next = { ...state, humanity: Math.max(0, Math.min(10, action.humanity)) };
      break;

    case 'SET_BLOOD_POTENCY':
      next = { ...state, bloodPotency: Math.max(0, Math.min(10, action.bloodPotency)) };
      break;

    case 'SET_GENERATION':
      next = { ...state, generation: Math.max(1, Math.min(16, action.generation)) };
      break;

    case 'SET_TOTAL_EXPERIENCE':
      next = { ...state, totalExperience: Math.max(0, action.totalExperience) };
      break;

    case 'SET_SPENT_EXPERIENCE':
      next = { ...state, spentExperience: Math.max(0, action.spentExperience) };
      break;

    case 'SET_NAME':
      next = { ...state, name: action.name };
      break;

    case 'SET_PLAYER_NAME':
      next = { ...state, playerName: action.playerName };
      break;

    case 'SET_CONCEPT':
      next = { ...state, concept: action.concept };
      break;

    case 'SET_CHRONICLE':
      next = { ...state, chronicle: action.chronicle };
      break;

    case 'SET_SIRE':
      next = { ...state, sire: action.sire };
      break;

    case 'SET_AMBITION':
      next = { ...state, ambition: action.ambition };
      break;

    case 'SET_DESIRE':
      next = { ...state, desire: action.desire };
      break;

    case 'SET_APPEARANCE':
      next = { ...state, appearance: action.appearance };
      break;

    case 'SET_PERSONALITY_TRAITS':
      next = { ...state, personalityTraits: action.personalityTraits };
      break;

    case 'SET_BACKSTORY':
      next = { ...state, backstory: action.backstory };
      break;

    case 'SET_NOTES':
      next = { ...state, notes: action.notes };
      break;

    case 'REPLACE_CHARACTER':
      return action.character;

    default:
      next = state;
  }

  return vtmRecalculate(next);
}
