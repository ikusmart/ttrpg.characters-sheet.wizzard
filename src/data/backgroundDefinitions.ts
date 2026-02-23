import type { Background } from '@/models/background';
import type { ClassId } from '@/models/quiz';

export const BACKGROUND_DEFINITIONS: Record<ClassId, Background> = {
  fighter: {
    id: 'soldier',
    name: 'Солдат',
    nameEn: 'Soldier',
    abilityOptions: ['strength', 'constitution'],
    skillProficiencies: ['athletics', 'intimidation'],
    toolProficiency: 'Транспорт (суша)',
    originFeat: 'Дикий боец',
    originFeatEn: 'Savage Attacker',
  },

  barbarian: {
    id: 'outlander',
    name: 'Чужеземец',
    nameEn: 'Outlander',
    abilityOptions: ['strength', 'constitution'],
    skillProficiencies: ['athletics', 'survival'],
    toolProficiency: 'Музыкальный инструмент',
    originFeat: 'Крепкий',
    originFeatEn: 'Tough',
  },

  bard: {
    id: 'entertainer',
    name: 'Артист',
    nameEn: 'Entertainer',
    abilityOptions: ['charisma', 'dexterity'],
    skillProficiencies: ['acrobatics', 'performance'],
    toolProficiency: 'Музыкальный инструмент',
    originFeat: 'Музыкант',
    originFeatEn: 'Musician',
  },

  cleric: {
    id: 'acolyte',
    name: 'Служитель',
    nameEn: 'Acolyte',
    abilityOptions: ['wisdom', 'intelligence'],
    skillProficiencies: ['insight', 'religion'],
    toolProficiency: 'Каллиграфия',
    originFeat: 'Посвящённый в магию',
    originFeatEn: 'Magic Initiate',
  },

  druid: {
    id: 'hermit',
    name: 'Отшельник',
    nameEn: 'Hermit',
    abilityOptions: ['wisdom', 'constitution'],
    skillProficiencies: ['medicine', 'nature'],
    toolProficiency: 'Набор травника',
    originFeat: 'Целитель',
    originFeatEn: 'Healer',
  },

  paladin: {
    id: 'noble',
    name: 'Аристократ',
    nameEn: 'Noble',
    abilityOptions: ['strength', 'charisma'],
    skillProficiencies: ['persuasion', 'history'],
    toolProficiency: 'Игровой набор',
    originFeat: 'Вдохновляющий лидер',
    originFeatEn: 'Inspiring Leader',
  },

  ranger: {
    id: 'wayfarer',
    name: 'Странник',
    nameEn: 'Wayfarer',
    abilityOptions: ['dexterity', 'wisdom'],
    skillProficiencies: ['survival', 'stealth'],
    toolProficiency: 'Картография',
    originFeat: 'Бдительный',
    originFeatEn: 'Alert',
  },

  rogue: {
    id: 'criminal',
    name: 'Преступник',
    nameEn: 'Criminal',
    abilityOptions: ['dexterity', 'intelligence'],
    skillProficiencies: ['deception', 'stealth'],
    toolProficiency: 'Воровские инструменты',
    originFeat: 'Бдительный',
    originFeatEn: 'Alert',
  },

  wizard: {
    id: 'sage',
    name: 'Мудрец',
    nameEn: 'Sage',
    abilityOptions: ['intelligence', 'wisdom'],
    skillProficiencies: ['arcana', 'history'],
    toolProficiency: 'Каллиграфия',
    originFeat: 'Посвящённый в магию',
    originFeatEn: 'Magic Initiate',
  },

  sorcerer: {
    id: 'charlatan',
    name: 'Шарлатан',
    nameEn: 'Charlatan',
    abilityOptions: ['charisma', 'constitution'],
    skillProficiencies: ['deception', 'persuasion'],
    toolProficiency: 'Набор для подделок',
    originFeat: 'Везунчик',
    originFeatEn: 'Lucky',
  },

  warlock: {
    id: 'haunted',
    name: 'Одержимый',
    nameEn: 'Haunted One',
    abilityOptions: ['charisma', 'wisdom'],
    skillProficiencies: ['arcana', 'intimidation'],
    toolProficiency: 'Набор травника',
    originFeat: 'Посвящённый в магию',
    originFeatEn: 'Magic Initiate',
  },

  monk: {
    id: 'sailor',
    name: 'Моряк',
    nameEn: 'Sailor',
    abilityOptions: ['dexterity', 'wisdom'],
    skillProficiencies: ['athletics', 'perception'],
    toolProficiency: 'Навигация',
    originFeat: 'Боец таверны',
    originFeatEn: 'Tavern Brawler',
  },
};
