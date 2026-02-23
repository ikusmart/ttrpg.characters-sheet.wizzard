import type { VtmSkillDefinition, SkillCategory, SkillName } from '@/models/vtm/skill';

export const VTM_SKILLS: VtmSkillDefinition[] = [
  // Physical
  { id: 'athletics',   name: 'Атлетика',                 nameEn: 'Athletics',   category: 'physical' },
  { id: 'brawl',       name: 'Драка',                    nameEn: 'Brawl',       category: 'physical' },
  { id: 'craft',       name: 'Ремесло',                  nameEn: 'Craft',       category: 'physical' },
  { id: 'drive',       name: 'Вождение',                 nameEn: 'Drive',       category: 'physical' },
  { id: 'firearms',    name: 'Огнестрельное оружие',     nameEn: 'Firearms',    category: 'physical' },
  { id: 'larceny',     name: 'Воровство',                nameEn: 'Larceny',     category: 'physical' },
  { id: 'melee',       name: 'Ближний бой',              nameEn: 'Melee',       category: 'physical' },
  { id: 'performance', name: 'Выступление',              nameEn: 'Performance', category: 'physical' },
  { id: 'stealth',     name: 'Скрытность',               nameEn: 'Stealth',     category: 'physical' },
  { id: 'survival',    name: 'Выживание',                nameEn: 'Survival',    category: 'physical' },
  // Social
  { id: 'animalKen',   name: 'Контакт с животными',      nameEn: 'Animal Ken',  category: 'social' },
  { id: 'etiquette',   name: 'Этикет',                   nameEn: 'Etiquette',   category: 'social' },
  { id: 'insight',     name: 'Проницательность',         nameEn: 'Insight',     category: 'social' },
  { id: 'intimidation',name: 'Запугивание',              nameEn: 'Intimidation',category: 'social' },
  { id: 'leadership',  name: 'Лидерство',                nameEn: 'Leadership',  category: 'social' },
  { id: 'persuasion',  name: 'Убеждение',                nameEn: 'Persuasion',  category: 'social' },
  { id: 'streetwise',  name: 'Знание улиц',              nameEn: 'Streetwise',  category: 'social' },
  { id: 'subterfuge',  name: 'Хитрость',                 nameEn: 'Subterfuge',  category: 'social' },
  // Mental
  { id: 'academics',   name: 'Наука',                    nameEn: 'Academics',   category: 'mental' },
  { id: 'awareness',   name: 'Внимательность',           nameEn: 'Awareness',   category: 'mental' },
  { id: 'finance',     name: 'Финансы',                  nameEn: 'Finance',     category: 'mental' },
  { id: 'investigation',name: 'Расследование',           nameEn: 'Investigation',category: 'mental' },
  { id: 'medicine',    name: 'Медицина',                 nameEn: 'Medicine',    category: 'mental' },
  { id: 'occult',      name: 'Оккультизм',               nameEn: 'Occult',      category: 'mental' },
  { id: 'politics',    name: 'Политика',                 nameEn: 'Politics',    category: 'mental' },
  { id: 'science',     name: 'Естествознание',           nameEn: 'Science',     category: 'mental' },
  { id: 'technology',  name: 'Технологии',               nameEn: 'Technology',  category: 'mental' },
];

export const VTM_SKILLS_BY_CATEGORY: Record<SkillCategory, SkillName[]> = {
  physical: ['athletics', 'brawl', 'craft', 'drive', 'firearms', 'larceny', 'melee', 'performance', 'stealth', 'survival'],
  social:   ['animalKen', 'etiquette', 'insight', 'intimidation', 'leadership', 'persuasion', 'streetwise', 'subterfuge'],
  mental:   ['academics', 'awareness', 'finance', 'investigation', 'medicine', 'occult', 'politics', 'science', 'technology'],
};
