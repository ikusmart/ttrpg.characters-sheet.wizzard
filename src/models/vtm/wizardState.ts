import type { AttributeCategory, AttributeName } from './attribute';
import type { SkillName } from './skill';
import type { DisciplineName } from './discipline';
import type { ClanId } from './clan';
import type { PredatorTypeId } from './predatorType';

export interface WizardState {
  step: number;
  clanId: ClanId | null;
  predatorTypeId: PredatorTypeId | null;
  attributePriority: [AttributeCategory, AttributeCategory, AttributeCategory] | null;
  attributes: Partial<Record<AttributeName, number>>;
  skills: Partial<Record<SkillName, number>>;
  disciplines: Partial<Record<DisciplineName, number>>;
  merits: Array<{ name: string; nameEn: string; dots: number; description: string }>;
  flaws: Array<{ name: string; nameEn: string; dots: number; description: string }>;
  backgrounds: Array<{ name: string; nameEn: string; dots: number; description: string }>;
  name: string;
  playerName: string;
  concept: string;
  chronicle: string;
  sire: string;
  ambition: string;
  desire: string;
  convictions: string[];
  touchstones: string[];
  appearance: string;
  personalityTraits: string;
  backstory: string;
}

export type WizardAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_CLAN'; clanId: ClanId }
  | { type: 'SET_PREDATOR_TYPE'; predatorTypeId: PredatorTypeId }
  | { type: 'SET_ATTRIBUTE_PRIORITY'; priority: [AttributeCategory, AttributeCategory, AttributeCategory] }
  | { type: 'SET_ATTRIBUTE'; attribute: AttributeName; value: number }
  | { type: 'SET_SKILL'; skill: SkillName; value: number }
  | { type: 'SET_DISCIPLINE'; discipline: DisciplineName; value: number }
  | { type: 'ADD_MERIT' }
  | { type: 'REMOVE_MERIT'; index: number }
  | { type: 'UPDATE_MERIT'; index: number; field: string; value: string | number }
  | { type: 'ADD_FLAW' }
  | { type: 'REMOVE_FLAW'; index: number }
  | { type: 'UPDATE_FLAW'; index: number; field: string; value: string | number }
  | { type: 'ADD_BACKGROUND' }
  | { type: 'REMOVE_BACKGROUND'; index: number }
  | { type: 'UPDATE_BACKGROUND'; index: number; field: string; value: string | number }
  | { type: 'SET_IDENTITY_FIELD'; field: keyof Pick<WizardState, 'name' | 'playerName' | 'concept' | 'chronicle' | 'sire' | 'ambition' | 'desire' | 'appearance' | 'personalityTraits' | 'backstory'>; value: string }
  | { type: 'ADD_CONVICTION' }
  | { type: 'REMOVE_CONVICTION'; index: number }
  | { type: 'UPDATE_CONVICTION'; index: number; value: string }
  | { type: 'ADD_TOUCHSTONE' }
  | { type: 'REMOVE_TOUCHSTONE'; index: number }
  | { type: 'UPDATE_TOUCHSTONE'; index: number; value: string };

export const INITIAL_WIZARD_STATE: WizardState = {
  step: 0,
  clanId: null,
  predatorTypeId: null,
  attributePriority: null,
  attributes: {},
  skills: {},
  disciplines: {},
  merits: [],
  flaws: [],
  backgrounds: [],
  name: '',
  playerName: '',
  concept: '',
  chronicle: '',
  sire: '',
  ambition: '',
  desire: '',
  convictions: [],
  touchstones: [],
  appearance: '',
  personalityTraits: '',
  backstory: '',
};
