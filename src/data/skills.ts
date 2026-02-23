import type { SkillDefinition } from '@/models/skill';

export const SKILLS: SkillDefinition[] = [
  { id: 'acrobatics',     name: 'Акробатика',         nameEn: 'Acrobatics',       ability: 'dexterity' },
  { id: 'animalHandling', name: 'Уход за животными',  nameEn: 'Animal Handling',  ability: 'wisdom' },
  { id: 'arcana',         name: 'Магия',              nameEn: 'Arcana',           ability: 'intelligence' },
  { id: 'athletics',      name: 'Атлетика',           nameEn: 'Athletics',        ability: 'strength' },
  { id: 'deception',      name: 'Обман',              nameEn: 'Deception',        ability: 'charisma' },
  { id: 'history',        name: 'История',            nameEn: 'History',          ability: 'intelligence' },
  { id: 'insight',        name: 'Проницательность',   nameEn: 'Insight',          ability: 'wisdom' },
  { id: 'intimidation',   name: 'Запугивание',        nameEn: 'Intimidation',     ability: 'charisma' },
  { id: 'investigation',  name: 'Расследование',      nameEn: 'Investigation',    ability: 'intelligence' },
  { id: 'medicine',       name: 'Медицина',           nameEn: 'Medicine',         ability: 'wisdom' },
  { id: 'nature',         name: 'Природа',            nameEn: 'Nature',           ability: 'intelligence' },
  { id: 'perception',     name: 'Внимательность',     nameEn: 'Perception',       ability: 'wisdom' },
  { id: 'performance',    name: 'Выступление',        nameEn: 'Performance',      ability: 'charisma' },
  { id: 'persuasion',     name: 'Убеждение',          nameEn: 'Persuasion',       ability: 'charisma' },
  { id: 'religion',       name: 'Религия',            nameEn: 'Religion',         ability: 'intelligence' },
  { id: 'sleightOfHand',  name: 'Ловкость рук',      nameEn: 'Sleight of Hand',  ability: 'dexterity' },
  { id: 'stealth',        name: 'Скрытность',         nameEn: 'Stealth',          ability: 'dexterity' },
  { id: 'survival',       name: 'Выживание',          nameEn: 'Survival',         ability: 'wisdom' },
];
