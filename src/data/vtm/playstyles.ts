import type { PlaystyleId, PlaystyleDefinition } from '@/models/vtm/playstyle';
import type { ClanId } from '@/models/vtm/clan';
import type { PredatorTypeId } from '@/models/vtm/predatorType';

export const PLAYSTYLE_DEFINITIONS: PlaystyleDefinition[] = [
  {
    id: 'warrior',
    label: 'Воин',
    description: 'Физический бой, стойкость, прямое насилие',
    attributePriority: ['physical', 'social', 'mental'],
    recommendedSkills: ['brawl', 'melee', 'athletics', 'intimidation', 'firearms', 'survival'],
  },
  {
    id: 'manipulator',
    label: 'Манипулятор',
    description: 'Социальный контроль, интриги, влияние',
    attributePriority: ['social', 'mental', 'physical'],
    recommendedSkills: ['persuasion', 'subterfuge', 'leadership', 'etiquette', 'insight', 'politics'],
  },
  {
    id: 'shadow',
    label: 'Тень',
    description: 'Скрытность, разведка, инфильтрация',
    attributePriority: ['mental', 'physical', 'social'],
    recommendedSkills: ['stealth', 'larceny', 'awareness', 'subterfuge', 'streetwise', 'investigation'],
  },
  {
    id: 'mystic',
    label: 'Мистик',
    description: 'Магия крови, ритуалы, оккультизм',
    attributePriority: ['mental', 'social', 'physical'],
    recommendedSkills: ['occult', 'academics', 'awareness', 'investigation', 'medicine', 'insight'],
  },
  {
    id: 'predator',
    label: 'Хищник',
    description: 'Звериная сила, оборотничество, выживание',
    attributePriority: ['physical', 'mental', 'social'],
    recommendedSkills: ['survival', 'animalKen', 'brawl', 'athletics', 'stealth', 'awareness'],
  },
];

export const CLAN_PLAYSTYLES: Record<ClanId, PlaystyleId[]> = {
  brujah: ['warrior', 'manipulator'],
  gangrel: ['predator', 'warrior'],
  malkavian: ['shadow', 'mystic'],
  nosferatu: ['shadow', 'warrior'],
  toreador: ['manipulator', 'shadow'],
  tremere: ['mystic', 'manipulator'],
  ventrue: ['manipulator', 'warrior'],
  lasombra: ['manipulator', 'mystic'],
  tzimisce: ['predator', 'manipulator'],
  hecata: ['mystic', 'shadow'],
  ravnos: ['shadow', 'manipulator'],
  salubri: ['mystic', 'warrior'],
  ministry: ['manipulator', 'shadow'],
  caitiff: [],
  thinBlood: [],
};

export const PREDATOR_PLAYSTYLES: Record<PredatorTypeId, PlaystyleId[]> = {
  alleycat: ['warrior'],
  bagger: ['shadow', 'mystic'],
  cleaver: ['manipulator', 'shadow'],
  consensualist: ['mystic', 'shadow'],
  farmer: ['predator'],
  osiris: ['manipulator', 'mystic'],
  sandman: ['shadow'],
  sceneQueen: ['manipulator'],
  siren: ['manipulator', 'warrior'],
};

export const PLAYSTYLE_COLORS: Record<PlaystyleId, { active: string; inactive: string }> = {
  warrior: {
    active: 'bg-red-500 text-white border-red-500',
    inactive: 'bg-red-500/10 text-red-700 border-red-300 dark:text-red-300 dark:border-red-700',
  },
  manipulator: {
    active: 'bg-purple-500 text-white border-purple-500',
    inactive: 'bg-purple-500/10 text-purple-700 border-purple-300 dark:text-purple-300 dark:border-purple-700',
  },
  shadow: {
    active: 'bg-slate-500 text-white border-slate-500',
    inactive: 'bg-slate-500/10 text-slate-700 border-slate-300 dark:text-slate-300 dark:border-slate-700',
  },
  mystic: {
    active: 'bg-indigo-500 text-white border-indigo-500',
    inactive: 'bg-indigo-500/10 text-indigo-700 border-indigo-300 dark:text-indigo-300 dark:border-indigo-700',
  },
  predator: {
    active: 'bg-amber-500 text-white border-amber-500',
    inactive: 'bg-amber-500/10 text-amber-700 border-amber-300 dark:text-amber-300 dark:border-amber-700',
  },
};
