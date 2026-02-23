import type { Character } from '@/models/character';
import type { AbilityName, AbilityScore } from '@/models/ability';
import type { SkillName } from '@/models/skill';
import type { ClassId, SpeciesId } from '@/models/quiz';
import { ABILITY_NAMES } from '@/models/ability';
import { CLASS_DEFINITIONS } from '@/data/classDefinitions';
import { SPECIES_DEFINITIONS } from '@/data/speciesDefinitions';
import { BACKGROUND_DEFINITIONS } from '@/data/backgroundDefinitions';
import { CLASS_EQUIPMENT } from '@/data/classEquipment';
import { CLASS_SPELLS } from '@/data/classSpells';
import { CHARACTER_NAMES } from '@/data/characterNames';

// Standard Array values (descending)
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8] as const;

// Ability assignment priority per class
const ABILITY_PRIORITY: Record<ClassId, AbilityName[]> = {
  fighter:   ['strength', 'constitution', 'dexterity', 'wisdom', 'charisma', 'intelligence'],
  barbarian: ['strength', 'constitution', 'dexterity', 'wisdom', 'charisma', 'intelligence'],
  rogue:     ['dexterity', 'intelligence', 'constitution', 'wisdom', 'charisma', 'strength'],
  wizard:    ['intelligence', 'constitution', 'dexterity', 'wisdom', 'charisma', 'strength'],
  cleric:    ['wisdom', 'constitution', 'strength', 'charisma', 'dexterity', 'intelligence'],
  paladin:   ['strength', 'charisma', 'constitution', 'wisdom', 'dexterity', 'intelligence'],
  ranger:    ['dexterity', 'wisdom', 'constitution', 'strength', 'intelligence', 'charisma'],
  bard:      ['charisma', 'dexterity', 'constitution', 'wisdom', 'intelligence', 'strength'],
  sorcerer:  ['charisma', 'constitution', 'dexterity', 'wisdom', 'intelligence', 'strength'],
  warlock:   ['charisma', 'constitution', 'dexterity', 'wisdom', 'intelligence', 'strength'],
  druid:     ['wisdom', 'constitution', 'dexterity', 'intelligence', 'charisma', 'strength'],
  monk:      ['dexterity', 'wisdom', 'constitution', 'strength', 'charisma', 'intelligence'],
};

// Spellcasting ability per class (for classes that cast spells)
const SPELLCASTING_ABILITY: Partial<Record<ClassId, AbilityName>> = {
  bard:     'charisma',
  cleric:   'wisdom',
  druid:    'wisdom',
  sorcerer: 'charisma',
  warlock:  'charisma',
  wizard:   'intelligence',
};

function modifier(score: AbilityScore): number {
  return Math.floor((score.baseValue + score.bonusFromBackground - 10) / 2);
}

function buildAbilityScores(
  classId: ClassId,
  backgroundAbilityOptions: AbilityName[],
): Record<AbilityName, AbilityScore> {
  const priority = ABILITY_PRIORITY[classId];

  // Map Standard Array values to abilities by priority order
  const baseValues: Record<AbilityName, number> = {} as Record<AbilityName, number>;
  for (let i = 0; i < priority.length; i++) {
    baseValues[priority[i]] = STANDARD_ARRAY[i];
  }

  // Background bonuses: +2 to first option, +1 to second option
  const bonuses: Partial<Record<AbilityName, number>> = {};
  if (backgroundAbilityOptions.length >= 1) {
    bonuses[backgroundAbilityOptions[0]] = 2;
  }
  if (backgroundAbilityOptions.length >= 2) {
    bonuses[backgroundAbilityOptions[1]] = 1;
  }

  const result = {} as Record<AbilityName, AbilityScore>;
  for (const ability of ABILITY_NAMES) {
    result[ability] = {
      name: ability,
      baseValue: baseValues[ability] ?? 8,
      bonusFromBackground: bonuses[ability] ?? 0,
    };
  }
  return result;
}

function calculateArmorClass(
  classId: ClassId,
  abilityScores: Record<AbilityName, AbilityScore>,
): number {
  const dexMod = modifier(abilityScores['dexterity']);
  const conMod = modifier(abilityScores['constitution']);
  const wisMod = modifier(abilityScores['wisdom']);

  switch (classId) {
    // No armor — custom formulas
    case 'barbarian':
      return 10 + dexMod + conMod;
    case 'monk':
      return 10 + dexMod + wisMod;
    case 'sorcerer':
    case 'wizard':
      return 10 + dexMod;

    // Light armor: leather (AC 11) + DEX
    case 'bard':
    case 'rogue':
    case 'warlock':
      return 11 + dexMod;

    // Light armor + shield: leather (AC 11) + DEX + shield (+2)
    case 'druid':
      return 11 + dexMod + 2; // leather armor + wooden shield

    // Medium armor: scale mail (AC 14) + min(DEX, 2)
    case 'ranger':
      return 14 + Math.min(dexMod, 2);

    // Medium armor + shield: scale mail (AC 14) + min(DEX, 2) + shield (+2)
    case 'cleric':
      return 14 + Math.min(dexMod, 2) + 2; // scale mail + shield

    // Heavy armor: chain mail (AC 16) + shield (+2)
    case 'fighter':
    case 'paladin':
      return 16 + 2; // chain mail + shield

    default:
      return 10 + dexMod;
  }
}

function buildAttacks(
  classId: ClassId,
  abilityScores: Record<AbilityName, AbilityScore>,
  proficiencyBonus: number,
) {
  const classDef = CLASS_DEFINITIONS[classId];
  const equipmentSet = CLASS_EQUIPMENT[classId];
  const primaryIsDeX = classDef.primaryAbility[0] === 'dexterity';

  const strMod = modifier(abilityScores['strength']);
  const dexMod = modifier(abilityScores['dexterity']);

  const isRangedWeapon = (nameEn: string): boolean =>
    /(bow|crossbow|dart|sling)/i.test(nameEn);

  return equipmentSet.attacks.map(attack => {
    let abilityMod: number;
    if (primaryIsDeX) {
      abilityMod = dexMod;
    } else if (isRangedWeapon(attack.nameEn)) {
      abilityMod = dexMod;
    } else {
      abilityMod = strMod;
    }
    return {
      ...attack,
      attackBonus: proficiencyBonus + abilityMod,
    };
  });
}

function buildSkillProficiencies(
  classId: ClassId,
  backgroundSkills: SkillName[],
): SkillName[] {
  const classDef = CLASS_DEFINITIONS[classId];
  const classSkills = classDef.skillChoices.slice(0, classDef.skillChoiceCount);
  const combined = [...classSkills, ...backgroundSkills];
  // Deduplicate preserving order
  return combined.filter((skill, index) => combined.indexOf(skill) === index);
}

function buildFeatures(classId: ClassId, speciesId: SpeciesId) {
  const classDef = CLASS_DEFINITIONS[classId];
  const species = SPECIES_DEFINITIONS[speciesId];
  const background = BACKGROUND_DEFINITIONS[classId];

  const classFeatures = classDef.features.map(f => ({
    name: f.name,
    nameEn: f.nameEn,
    source: `${classDef.name} 1`,
    description: f.description,
  }));

  const speciesFeatures = species.traits.map(t => ({
    name: t.name,
    nameEn: t.nameEn,
    source: species.name,
    description: t.description,
  }));

  const originFeat = {
    name: background.originFeat,
    nameEn: background.originFeatEn,
    source: background.name,
    description: '',
  };

  return [...classFeatures, ...speciesFeatures, originFeat];
}

function buildLanguages(speciesId: SpeciesId): string[] {
  const base = ['Общий (Common)'];
  const extras: Partial<Record<SpeciesId, string>> = {
    elf:      'Эльфийский (Elvish)',
    dwarf:    'Дварфский (Dwarvish)',
    gnome:    'Гномский (Gnomish)',
    halfling: 'Полурослика (Halfling)',
    orc:      'Орочий (Orc)',
    tiefling: 'Инфернальный (Infernal)',
    dragonborn: 'Драконий (Draconic)',
  };
  const extra = extras[speciesId];
  return extra ? [...base, extra] : base;
}

export function buildCharacterFromTemplate(classId: ClassId, speciesId: SpeciesId): Character {
  const classDef = CLASS_DEFINITIONS[classId];
  const species = SPECIES_DEFINITIONS[speciesId];
  const background = BACKGROUND_DEFINITIONS[classId];
  const equipmentSet = CLASS_EQUIPMENT[classId];
  const spellSet = CLASS_SPELLS[classId];
  const profile = CHARACTER_NAMES[classId];

  const proficiencyBonus = 2;

  // Build ability scores
  const abilityScores = buildAbilityScores(classId, background.abilityOptions);

  const conMod = modifier(abilityScores['constitution']);
  const dexMod = modifier(abilityScores['dexterity']);

  const maxHitPoints = classDef.hitDiceSides + conMod;

  const armorClass = calculateArmorClass(classId, abilityScores);
  const initiative = dexMod;

  const attacks = buildAttacks(classId, abilityScores, proficiencyBonus);

  const skillProficiencies = buildSkillProficiencies(classId, background.skillProficiencies);

  // Rogue gets expertise on first 2 skill proficiencies
  const skillExpertise: SkillName[] =
    classId === 'rogue' ? skillProficiencies.slice(0, 2) : [];

  const features = buildFeatures(classId, speciesId);

  const languages = buildLanguages(speciesId);

  // Spellcasting — only if spellSet is non-null and has slots
  let spellcastingAbility: AbilityName | undefined;
  let spellSaveDC: number | undefined;
  let spellAttackBonus: number | undefined;
  let spellSlots: number[] | undefined;
  let spellSlotsUsed: number[] | undefined;
  let knownSpells: string[] | undefined;

  if (spellSet !== null && spellSet !== undefined) {
    const hasSlots = spellSet.spellSlots.some(s => s > 0);
    if (hasSlots) {
      const castingAbility = SPELLCASTING_ABILITY[classId];
      if (castingAbility !== undefined) {
        spellcastingAbility = castingAbility;
        const spellMod = modifier(abilityScores[castingAbility]);
        spellSaveDC = 8 + proficiencyBonus + spellMod;
        spellAttackBonus = proficiencyBonus + spellMod;
        spellSlots = spellSet.spellSlots;
        spellSlotsUsed = spellSet.spellSlots.map(() => 0);
        knownSpells = [
          ...spellSet.cantrips.map(s => s.name),
          ...spellSet.level1Spells.map(s => s.name),
        ];
      }
    }
  }

  return {
    id: crypto.randomUUID(),
    name: profile.name,
    playerName: '',

    speciesId: species.id,
    speciesName: species.name,
    speciesNameEn: species.nameEn,

    classId: classDef.id,
    className: classDef.name,
    classNameEn: classDef.nameEn,

    backgroundId: background.id,
    backgroundName: background.name,
    backgroundNameEn: background.nameEn,

    level: 1,
    experiencePoints: 0,
    proficiencyBonus,

    abilityScores,

    skillProficiencies,
    skillExpertise,

    savingThrowProficiencies: classDef.savingThrows,

    armorClass,
    initiative,
    speed: species.speed,

    maxHitPoints,
    currentHitPoints: maxHitPoints,
    temporaryHitPoints: 0,

    hitDice: {
      total: 1,
      remaining: 1,
      sides: classDef.hitDiceSides,
    },

    deathSaves: {
      successes: 0,
      failures: 0,
    },

    attacks,
    equipment: equipmentSet.equipment,

    currency: {
      copper: 0,
      silver: 0,
      electrum: 0,
      gold: 10,
      platinum: 0,
    },

    features,

    proficiencies: {
      languages,
      tools: [background.toolProficiency],
      armor: classDef.armorProficiencies,
      weapons: classDef.weaponProficiencies,
    },

    personalityTraits: profile.personalityTraits,
    ideals: profile.ideals,
    bonds: profile.bonds,
    flaws: profile.flaws,
    backstory: profile.backstory,
    notes: '',

    ...(spellcastingAbility !== undefined && {
      spellcastingAbility,
      spellSaveDC,
      spellAttackBonus,
      spellSlots,
      spellSlotsUsed,
      knownSpells,
    }),

    helpModeEnabled: true,
  };
}
