import type { BilingualTerm } from '@/i18n/terms';
import type { AttributeName, AttributeCategory } from '@/models/vtm/attribute';
import type { SkillName } from '@/models/vtm/skill';
import type { DisciplineName } from '@/models/vtm/discipline';

export const vtmAttributeTerms: Record<AttributeName, BilingualTerm> = {
  strength:      { ru: 'Сила',          en: 'Strength' },
  dexterity:     { ru: 'Ловкость',      en: 'Dexterity' },
  stamina:       { ru: 'Выносливость',  en: 'Stamina' },
  charisma:      { ru: 'Харизма',       en: 'Charisma' },
  manipulation:  { ru: 'Манипуляция',   en: 'Manipulation' },
  composure:     { ru: 'Самообладание', en: 'Composure' },
  intelligence:  { ru: 'Интеллект',     en: 'Intelligence' },
  wits:          { ru: 'Смекалка',      en: 'Wits' },
  resolve:       { ru: 'Решительность', en: 'Resolve' },
};

export const vtmSkillTerms: Record<SkillName, BilingualTerm> = {
  // Physical
  athletics:    { ru: 'Атлетика',                en: 'Athletics' },
  brawl:        { ru: 'Драка',                   en: 'Brawl' },
  craft:        { ru: 'Ремесло',                 en: 'Craft' },
  drive:        { ru: 'Вождение',                en: 'Drive' },
  firearms:     { ru: 'Огнестрельное оружие',    en: 'Firearms' },
  larceny:      { ru: 'Воровство',               en: 'Larceny' },
  melee:        { ru: 'Ближний бой',             en: 'Melee' },
  performance:  { ru: 'Выступление',             en: 'Performance' },
  stealth:      { ru: 'Скрытность',              en: 'Stealth' },
  survival:     { ru: 'Выживание',               en: 'Survival' },
  // Social
  animalKen:    { ru: 'Контакт с животными',     en: 'Animal Ken' },
  etiquette:    { ru: 'Этикет',                  en: 'Etiquette' },
  insight:      { ru: 'Проницательность',        en: 'Insight' },
  intimidation: { ru: 'Запугивание',             en: 'Intimidation' },
  leadership:   { ru: 'Лидерство',               en: 'Leadership' },
  persuasion:   { ru: 'Убеждение',               en: 'Persuasion' },
  streetwise:   { ru: 'Знание улиц',             en: 'Streetwise' },
  subterfuge:   { ru: 'Хитрость',                en: 'Subterfuge' },
  // Mental
  academics:    { ru: 'Наука',                   en: 'Academics' },
  awareness:    { ru: 'Внимательность',          en: 'Awareness' },
  finance:      { ru: 'Финансы',                 en: 'Finance' },
  investigation:{ ru: 'Расследование',           en: 'Investigation' },
  medicine:     { ru: 'Медицина',                en: 'Medicine' },
  occult:       { ru: 'Оккультизм',              en: 'Occult' },
  politics:     { ru: 'Политика',                en: 'Politics' },
  science:      { ru: 'Естествознание',          en: 'Science' },
  technology:   { ru: 'Технологии',              en: 'Technology' },
};

export const vtmCategoryTerms: Record<AttributeCategory, BilingualTerm> = {
  physical: { ru: 'Физические', en: 'Physical' },
  social:   { ru: 'Социальные', en: 'Social' },
  mental:   { ru: 'Ментальные', en: 'Mental' },
};

export const vtmDisciplineTerms: Record<DisciplineName, BilingualTerm> = {
  animalism:        { ru: 'Анимализм',              en: 'Animalism' },
  auspex:           { ru: 'Прорицание',             en: 'Auspex' },
  bloodSorcery:     { ru: 'Кровавое колдовство',    en: 'Blood Sorcery' },
  celerity:         { ru: 'Стремительность',         en: 'Celerity' },
  dominate:         { ru: 'Доминирование',           en: 'Dominate' },
  fortitude:        { ru: 'Стойкость',              en: 'Fortitude' },
  obfuscate:        { ru: 'Затемнение',             en: 'Obfuscate' },
  oblivion:         { ru: 'Забвение',               en: 'Oblivion' },
  potence:          { ru: 'Могущество',             en: 'Potence' },
  presence:         { ru: 'Присутствие',            en: 'Presence' },
  protean:          { ru: 'Превращение',            en: 'Protean' },
  thinBloodAlchemy: { ru: 'Алхимия тонкой крови',   en: 'Thin-Blood Alchemy' },
};

export const vtmGameTerms: Record<string, BilingualTerm> = {
  // Core concepts
  clan:             { ru: 'Клан',                  en: 'Clan' },
  generation:       { ru: 'Поколение',             en: 'Generation' },
  sire:             { ru: 'Сир',                   en: 'Sire' },
  predatorType:     { ru: 'Тип охотника',          en: 'Predator Type' },
  chronicle:        { ru: 'Хроника',               en: 'Chronicle' },
  concept:          { ru: 'Концепция',             en: 'Concept' },
  ambition:         { ru: 'Амбиция',               en: 'Ambition' },
  desire:           { ru: 'Желание',               en: 'Desire' },
  // Vampire stats
  hunger:           { ru: 'Голод',                 en: 'Hunger' },
  humanity:         { ru: 'Гуманность',            en: 'Humanity' },
  bloodPotency:     { ru: 'Мощь крови',            en: 'Blood Potency' },
  health:           { ru: 'Здоровье',              en: 'Health' },
  willpower:        { ru: 'Сила воли',             en: 'Willpower' },
  // Damage types
  superficial:      { ru: 'Поверхностный',         en: 'Superficial' },
  aggravated:       { ru: 'Аггравированный',       en: 'Aggravated' },
  // Character concepts
  disciplines:      { ru: 'Дисциплины',            en: 'Disciplines' },
  bane:             { ru: 'Проклятие',             en: 'Bane' },
  compulsion:       { ru: 'Компульсия',            en: 'Compulsion' },
  conviction:       { ru: 'Убеждение',             en: 'Conviction' },
  touchstone:       { ru: 'Краеугольный камень',   en: 'Touchstone' },
  merits:           { ru: 'Достоинства',           en: 'Merits' },
  flaws:            { ru: 'Недостатки',            en: 'Flaws' },
  backgrounds:      { ru: 'Предпосылки',           en: 'Backgrounds' },
  // Dice mechanics
  rouseCheck:       { ru: 'Бросок Пробуждения',   en: 'Rouse Check' },
  bestialFailure:   { ru: 'Звериная Неудача',      en: 'Bestial Failure' },
  // Roleplaying
  appearance:       { ru: 'Внешность',             en: 'Appearance' },
  backstory:        { ru: 'Предыстория',           en: 'Backstory' },
  notes:            { ru: 'Заметки',               en: 'Notes' },
  experience:       { ru: 'Опыт',                  en: 'Experience' },
  totalExperience:  { ru: 'Всего опыта',           en: 'Total Experience' },
  spentExperience:  { ru: 'Потрачено опыта',       en: 'Spent Experience' },
};
