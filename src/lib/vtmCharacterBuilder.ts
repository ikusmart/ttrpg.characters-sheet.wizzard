import type { VtmCharacter } from '@/models/vtm/character';
import type { ClanId } from '@/models/vtm/clan';
import type { PredatorTypeId } from '@/models/vtm/predatorType';
import type { AttributeName, Attribute, AttributeCategory } from '@/models/vtm/attribute';
import type { SkillName } from '@/models/vtm/skill';
import type { DisciplineName, DisciplinePower } from '@/models/vtm/discipline';
import type { WizardState } from '@/models/vtm/wizardState';
import { CLAN_DEFINITIONS } from '@/data/vtm/clanDefinitions';
import { PREDATOR_TYPES } from '@/data/vtm/predatorTypes';
import { DISCIPLINE_POWERS } from '@/data/vtm/disciplinePowers';
import { VTM_CHARACTER_PROFILES } from '@/data/vtm/characterProfiles';
import { CLAN_TEMPLATES } from '@/data/vtm/clanTemplates';

const PRIMARY_VALUES = [4, 3, 2] as const;
const SECONDARY_VALUES = [3, 2, 2] as const;
const TERTIARY_VALUES = [2, 2, 1] as const;
const DISTRIBUTION = [PRIMARY_VALUES, SECONDARY_VALUES, TERTIARY_VALUES];

const ALL_SKILLS: SkillName[] = [
  'athletics', 'brawl', 'craft', 'drive', 'firearms', 'larceny', 'melee', 'performance', 'stealth', 'survival',
  'animalKen', 'etiquette', 'insight', 'intimidation', 'leadership', 'persuasion', 'streetwise', 'subterfuge',
  'academics', 'awareness', 'finance', 'investigation', 'medicine', 'occult', 'politics', 'science', 'technology',
];

const CATEGORY_ATTRS: Record<AttributeCategory, [AttributeName, AttributeName, AttributeName]> = {
  physical: ['strength', 'dexterity', 'stamina'],
  social: ['charisma', 'manipulation', 'composure'],
  mental: ['intelligence', 'wits', 'resolve'],
};

export function buildVtmCharacterFromTemplate(
  clanId: ClanId,
  predatorTypeId: PredatorTypeId,
): VtmCharacter {
  const clan = CLAN_DEFINITIONS.find(c => c.id === clanId)!;
  const predatorType = PREDATOR_TYPES.find(p => p.id === predatorTypeId)!;
  const profile = VTM_CHARACTER_PROFILES[clanId]!;
  const template = CLAN_TEMPLATES[clanId]!;

  // --- Attributes ---
  const attributes = {} as Record<AttributeName, Attribute>;
  for (let i = 0; i < 3; i++) {
    const category = template.attributePriority[i];
    const values = DISTRIBUTION[i];
    const spread = template.attributeSpread[category];
    for (let j = 0; j < 3; j++) {
      attributes[spread[j]] = { name: spread[j], category, value: values[j] };
    }
  }

  // Fill any missing attributes (safety net)
  for (const [cat, names] of Object.entries(CATEGORY_ATTRS) as [AttributeCategory, [AttributeName, AttributeName, AttributeName]][]) {
    for (const n of names) {
      if (!attributes[n]) {
        attributes[n] = { name: n, category: cat, value: 1 };
      }
    }
  }

  // --- Skills ---
  const skills = {} as Record<SkillName, number>;
  for (const s of ALL_SKILLS) {
    skills[s] = template.skills[s] ?? 0;
  }

  // --- Disciplines ---
  const disciplines: Partial<Record<DisciplineName, number>> = {};
  if (clan.disciplines.length >= 1) disciplines[clan.disciplines[0]] = 1;
  if (clan.disciplines.length >= 2) disciplines[clan.disciplines[1]] = 1;

  // Predator type bonus: +1 to first disciplineOption that is a clan discipline, else first option
  const ptDiscipline = predatorType.disciplineOptions.find(d => clan.disciplines.includes(d))
    ?? predatorType.disciplineOptions[0];
  if (ptDiscipline) {
    disciplines[ptDiscipline] = (disciplines[ptDiscipline] ?? 0) + 1;
  }

  // --- Known powers (level 1 for each discipline with dots) ---
  const knownPowers = Object.entries(disciplines)
    .filter(([, dots]) => dots != null && dots > 0)
    .map(([disc]) => DISCIPLINE_POWERS.find(p => p.discipline === disc && p.level === 1))
    .filter((p): p is DisciplinePower => p != null);

  // --- Derived stats ---
  const stamina = attributes.stamina.value;
  const composure = attributes.composure.value;
  const resolve = attributes.resolve.value;

  const health = { max: stamina + 3, superficial: 0, aggravated: 0 };
  const willpower = { max: composure + resolve, superficial: 0, aggravated: 0 };

  // --- Merits / Flaws from predator type ---
  const merits = [{ name: predatorType.merit, nameEn: predatorType.merit, dots: 2, description: '' }];
  const flaws = [{ name: predatorType.flaw, nameEn: predatorType.flaw, dots: 1, description: '' }];

  // --- Assemble character ---
  const character: VtmCharacter = {
    id: `vtm-${clanId}-${Date.now()}`,
    name: profile.name,
    playerName: '',
    concept: profile.concept,
    chronicle: '',
    sire: profile.sire,
    ambition: profile.ambition,
    desire: profile.desire,
    generation: 13,

    clanId: clan.id,
    clanName: clan.name,
    clanNameEn: clan.nameEn,

    predatorTypeId: predatorType.id,
    predatorTypeName: predatorType.name,
    predatorTypeNameEn: predatorType.nameEn,

    attributes,
    skills,
    skillSpecialties: template.skillSpecialties,

    disciplines,
    knownPowers,

    health,
    willpower,
    hunger: 1,
    humanity: 7,

    convictions: profile.convictions,
    touchstones: profile.touchstones,

    bloodPotency: 1,

    merits,
    flaws,
    backgrounds: [],

    bane: clan.bane,
    compulsion: clan.compulsion,

    totalExperience: 0,
    spentExperience: 0,

    appearance: profile.appearance,
    personalityTraits: profile.personalityTraits,
    backstory: profile.backstory,
    notes: '',
  };

  return character;
}

export function buildVtmCharacterFromWizard(state: WizardState): VtmCharacter {
  const clan = CLAN_DEFINITIONS.find((c) => c.id === state.clanId)!;
  const predatorType = PREDATOR_TYPES.find((p) => p.id === state.predatorTypeId)!;

  // --- Attributes ---
  const attributes = {} as Record<AttributeName, Attribute>;
  for (const [cat, names] of Object.entries(CATEGORY_ATTRS) as [AttributeCategory, [AttributeName, AttributeName, AttributeName]][]) {
    for (const n of names) {
      attributes[n] = { name: n, category: cat, value: state.attributes[n] ?? 1 };
    }
  }

  // --- Skills ---
  const skills = {} as Record<SkillName, number>;
  for (const s of ALL_SKILLS) {
    skills[s] = state.skills[s] ?? 0;
  }

  // --- Disciplines ---
  const disciplines: Partial<Record<DisciplineName, number>> = { ...state.disciplines };

  // Predator type bonus: +1 to first disciplineOption that is a clan discipline, else first option
  const ptDiscipline = predatorType.disciplineOptions.find((d) => clan.disciplines.includes(d))
    ?? predatorType.disciplineOptions[0];
  if (ptDiscipline) {
    disciplines[ptDiscipline] = (disciplines[ptDiscipline] ?? 0) + 1;
  }

  // --- Known powers (level 1 for each discipline with dots) ---
  const knownPowers = Object.entries(disciplines)
    .filter(([, dots]) => dots != null && dots > 0)
    .map(([disc]) => DISCIPLINE_POWERS.find((p) => p.discipline === disc && p.level === 1))
    .filter((p): p is DisciplinePower => p != null);

  // --- Derived stats ---
  const stamina = attributes.stamina.value;
  const composure = attributes.composure.value;
  const resolve = attributes.resolve.value;

  const health = { max: stamina + 3, superficial: 0, aggravated: 0 };
  const willpower = { max: composure + resolve, superficial: 0, aggravated: 0 };

  // --- Assemble character ---
  const character: VtmCharacter = {
    id: crypto.randomUUID(),
    name: state.name || 'Безымянный',
    playerName: state.playerName,
    concept: state.concept,
    chronicle: state.chronicle,
    sire: state.sire,
    ambition: state.ambition,
    desire: state.desire,
    generation: 13,

    clanId: clan.id,
    clanName: clan.name,
    clanNameEn: clan.nameEn,

    predatorTypeId: predatorType.id,
    predatorTypeName: predatorType.name,
    predatorTypeNameEn: predatorType.nameEn,

    attributes,
    skills,
    skillSpecialties: {},

    disciplines,
    knownPowers,

    health,
    willpower,
    hunger: 1,
    humanity: 7,

    convictions: state.convictions.filter(Boolean),
    touchstones: state.touchstones.filter(Boolean),

    bloodPotency: 1,

    merits: state.merits,
    flaws: state.flaws,
    backgrounds: state.backgrounds,

    bane: clan.bane,
    compulsion: clan.compulsion,

    totalExperience: 0,
    spentExperience: 0,

    appearance: state.appearance,
    personalityTraits: state.personalityTraits,
    backstory: state.backstory,
    notes: '',
  };

  return character;
}
