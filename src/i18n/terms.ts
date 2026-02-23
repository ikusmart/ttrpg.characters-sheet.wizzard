import type { AbilityName } from '@/models/ability';
import type { SkillName } from '@/models/skill';

export interface BilingualTerm {
  ru: string;
  en: string;
}

export function formatTerm(term: BilingualTerm): string {
  return `${term.ru} (${term.en})`;
}

export const abilityTerms: Record<AbilityName, BilingualTerm> = {
  strength:     { ru: 'Сила',        en: 'Strength' },
  dexterity:    { ru: 'Ловкость',    en: 'Dexterity' },
  constitution: { ru: 'Телосложение', en: 'Constitution' },
  intelligence: { ru: 'Интеллект',   en: 'Intelligence' },
  wisdom:       { ru: 'Мудрость',    en: 'Wisdom' },
  charisma:     { ru: 'Харизма',     en: 'Charisma' },
};

export const abilityTermsShort: Record<AbilityName, BilingualTerm> = {
  strength:     { ru: 'СИЛ', en: 'STR' },
  dexterity:    { ru: 'ЛОВ', en: 'DEX' },
  constitution: { ru: 'ТЕЛ', en: 'CON' },
  intelligence: { ru: 'ИНТ', en: 'INT' },
  wisdom:       { ru: 'МДР', en: 'WIS' },
  charisma:     { ru: 'ХАР', en: 'CHA' },
};

export const skillTerms: Record<SkillName, BilingualTerm> = {
  acrobatics:    { ru: 'Акробатика',         en: 'Acrobatics' },
  animalHandling:{ ru: 'Уход за животными',  en: 'Animal Handling' },
  arcana:        { ru: 'Магия',              en: 'Arcana' },
  athletics:     { ru: 'Атлетика',           en: 'Athletics' },
  deception:     { ru: 'Обман',              en: 'Deception' },
  history:       { ru: 'История',            en: 'History' },
  insight:       { ru: 'Проницательность',   en: 'Insight' },
  intimidation:  { ru: 'Запугивание',        en: 'Intimidation' },
  investigation: { ru: 'Расследование',      en: 'Investigation' },
  medicine:      { ru: 'Медицина',           en: 'Medicine' },
  nature:        { ru: 'Природа',            en: 'Nature' },
  perception:    { ru: 'Внимательность',     en: 'Perception' },
  performance:   { ru: 'Выступление',        en: 'Performance' },
  persuasion:    { ru: 'Убеждение',          en: 'Persuasion' },
  religion:      { ru: 'Религия',            en: 'Religion' },
  sleightOfHand: { ru: 'Ловкость рук',      en: 'Sleight of Hand' },
  stealth:       { ru: 'Скрытность',         en: 'Stealth' },
  survival:      { ru: 'Выживание',          en: 'Survival' },
};

export const gameTerms: Record<string, BilingualTerm> = {
  armorClass:      { ru: 'Класс Доспеха',     en: 'Armor Class' },
  initiative:      { ru: 'Инициатива',         en: 'Initiative' },
  speed:           { ru: 'Скорость',           en: 'Speed' },
  hitPoints:       { ru: 'Хиты',               en: 'Hit Points' },
  temporaryHP:     { ru: 'Временные хиты',     en: 'Temporary HP' },
  hitDice:         { ru: 'Кости хитов',        en: 'Hit Dice' },
  deathSaves:      { ru: 'Спасброски от смерти',en: 'Death Saves' },
  proficiencyBonus:{ ru: 'Бонус мастерства',   en: 'Proficiency Bonus' },
  savingThrows:    { ru: 'Спасброски',         en: 'Saving Throws' },
  skills:          { ru: 'Навыки',             en: 'Skills' },
  attacks:         { ru: 'Атаки',              en: 'Attacks' },
  equipment:       { ru: 'Снаряжение',         en: 'Equipment' },
  features:        { ru: 'Умения и черты',     en: 'Features & Traits' },
  proficiencies:   { ru: 'Владения',           en: 'Proficiencies' },
  personality:     { ru: 'Личность',           en: 'Personality' },
  traits:          { ru: 'Черты характера',    en: 'Personality Traits' },
  ideals:          { ru: 'Идеалы',             en: 'Ideals' },
  bonds:           { ru: 'Привязанности',      en: 'Bonds' },
  flaws:           { ru: 'Слабости',           en: 'Flaws' },
  backstory:       { ru: 'Предыстория',        en: 'Backstory' },
  notes:           { ru: 'Заметки',            en: 'Notes' },
  level:           { ru: 'Уровень',            en: 'Level' },
  experience:      { ru: 'Опыт',               en: 'Experience' },
  languages:       { ru: 'Языки',              en: 'Languages' },
  tools:           { ru: 'Инструменты',        en: 'Tools' },
  spellcasting:    { ru: 'Колдовство',         en: 'Spellcasting' },
  spellSaveDC:     { ru: 'Сл. спасброска закл.',en: 'Spell Save DC' },
  spellAttack:     { ru: 'Атака заклинанием',  en: 'Spell Attack' },
  cantrips:        { ru: 'Заговоры',           en: 'Cantrips' },
  currency:        { ru: 'Валюта',             en: 'Currency' },
};
