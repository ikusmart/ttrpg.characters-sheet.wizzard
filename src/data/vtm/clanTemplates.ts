import type { AttributeCategory, AttributeName } from '@/models/vtm/attribute';
import type { SkillName } from '@/models/vtm/skill';
import type { ClanId } from '@/models/vtm/clan';

export interface ClanTemplate {
  attributePriority: [AttributeCategory, AttributeCategory, AttributeCategory];
  attributeSpread: Record<AttributeCategory, [AttributeName, AttributeName, AttributeName]>;
  skills: Partial<Record<SkillName, number>>;
  skillSpecialties: Partial<Record<SkillName, string[]>>;
}

export const CLAN_TEMPLATES: Partial<Record<ClanId, ClanTemplate>> = {
  brujah: {
    attributePriority: ['physical', 'mental', 'social'],
    attributeSpread: {
      physical: ['stamina', 'strength', 'dexterity'],
      social: ['charisma', 'composure', 'manipulation'],
      mental: ['wits', 'resolve', 'intelligence'],
    },
    skills: {
      brawl: 3,
      athletics: 2,
      intimidation: 2,
      streetwise: 2,
      melee: 1,
      stealth: 1,
      survival: 1,
      awareness: 1,
    },
    skillSpecialties: {
      brawl: ['Kindred'],
      streetwise: ['Ночная жизнь'],
    },
  },
  gangrel: {
    attributePriority: ['physical', 'mental', 'social'],
    attributeSpread: {
      physical: ['stamina', 'strength', 'dexterity'],
      social: ['composure', 'charisma', 'manipulation'],
      mental: ['wits', 'resolve', 'intelligence'],
    },
    skills: {
      survival: 3,
      athletics: 2,
      animalKen: 2,
      awareness: 2,
      stealth: 1,
      brawl: 1,
      craft: 1,
      intimidation: 1,
    },
    skillSpecialties: {
      survival: ['Дикая природа'],
      animalKen: ['Волки'],
    },
  },
  malkavian: {
    attributePriority: ['mental', 'social', 'physical'],
    attributeSpread: {
      physical: ['dexterity', 'stamina', 'strength'],
      social: ['manipulation', 'charisma', 'composure'],
      mental: ['wits', 'intelligence', 'resolve'],
    },
    skills: {
      awareness: 3,
      insight: 2,
      occult: 2,
      subterfuge: 2,
      stealth: 1,
      academics: 1,
      investigation: 1,
      medicine: 1,
    },
    skillSpecialties: {
      awareness: ['Скрытые мотивы'],
      occult: ['Вещие сны'],
    },
  },
  nosferatu: {
    attributePriority: ['physical', 'mental', 'social'],
    attributeSpread: {
      physical: ['stamina', 'strength', 'dexterity'],
      social: ['composure', 'manipulation', 'charisma'],
      mental: ['wits', 'intelligence', 'resolve'],
    },
    skills: {
      stealth: 3,
      awareness: 2,
      intimidation: 2,
      streetwise: 2,
      larceny: 1,
      investigation: 1,
      athletics: 1,
      animalKen: 1,
    },
    skillSpecialties: {
      stealth: ['Городские тени'],
      streetwise: ['Чёрный рынок'],
    },
  },
  toreador: {
    attributePriority: ['social', 'mental', 'physical'],
    attributeSpread: {
      physical: ['dexterity', 'stamina', 'strength'],
      social: ['charisma', 'manipulation', 'composure'],
      mental: ['wits', 'intelligence', 'resolve'],
    },
    skills: {
      persuasion: 3,
      performance: 2,
      insight: 2,
      etiquette: 2,
      awareness: 1,
      subterfuge: 1,
      academics: 1,
      craft: 1,
    },
    skillSpecialties: {
      performance: ['Пение'],
      persuasion: ['Обольщение'],
    },
  },
  tremere: {
    attributePriority: ['mental', 'social', 'physical'],
    attributeSpread: {
      physical: ['stamina', 'dexterity', 'strength'],
      social: ['manipulation', 'composure', 'charisma'],
      mental: ['intelligence', 'wits', 'resolve'],
    },
    skills: {
      occult: 3,
      academics: 2,
      awareness: 2,
      investigation: 2,
      science: 1,
      medicine: 1,
      politics: 1,
      subterfuge: 1,
    },
    skillSpecialties: {
      occult: ['Кровавое Колдовство'],
      academics: ['Оккультная история'],
    },
  },
  ventrue: {
    attributePriority: ['social', 'mental', 'physical'],
    attributeSpread: {
      physical: ['stamina', 'strength', 'dexterity'],
      social: ['charisma', 'composure', 'manipulation'],
      mental: ['resolve', 'wits', 'intelligence'],
    },
    skills: {
      leadership: 3,
      persuasion: 2,
      politics: 2,
      etiquette: 2,
      finance: 1,
      insight: 1,
      intimidation: 1,
      academics: 1,
    },
    skillSpecialties: {
      leadership: ['Корпоративное управление'],
      politics: ['Камарилья'],
    },
  },
  lasombra: {
    attributePriority: ['social', 'mental', 'physical'],
    attributeSpread: {
      physical: ['strength', 'stamina', 'dexterity'],
      social: ['manipulation', 'composure', 'charisma'],
      mental: ['resolve', 'wits', 'intelligence'],
    },
    skills: {
      intimidation: 3,
      politics: 2,
      subterfuge: 2,
      leadership: 2,
      awareness: 1,
      insight: 1,
      stealth: 1,
      athletics: 1,
    },
    skillSpecialties: {
      intimidation: ['Психологическое давление'],
      politics: ['Интриги'],
    },
  },
  tzimisce: {
    attributePriority: ['mental', 'physical', 'social'],
    attributeSpread: {
      physical: ['stamina', 'strength', 'dexterity'],
      social: ['composure', 'manipulation', 'charisma'],
      mental: ['intelligence', 'resolve', 'wits'],
    },
    skills: {
      craft: 3,
      intimidation: 2,
      occult: 2,
      academics: 2,
      science: 1,
      animalKen: 1,
      awareness: 1,
      medicine: 1,
    },
    skillSpecialties: {
      craft: ['Вицисситуд'],
      occult: ['Древние ритуалы'],
    },
  },
  hecata: {
    attributePriority: ['mental', 'social', 'physical'],
    attributeSpread: {
      physical: ['stamina', 'dexterity', 'strength'],
      social: ['composure', 'manipulation', 'charisma'],
      mental: ['intelligence', 'wits', 'resolve'],
    },
    skills: {
      occult: 3,
      medicine: 2,
      awareness: 2,
      academics: 2,
      investigation: 1,
      insight: 1,
      craft: 1,
      science: 1,
    },
    skillSpecialties: {
      occult: ['Некромантия'],
      medicine: ['Патологоанатомия'],
    },
  },
  ravnos: {
    attributePriority: ['social', 'physical', 'mental'],
    attributeSpread: {
      physical: ['dexterity', 'stamina', 'strength'],
      social: ['manipulation', 'charisma', 'composure'],
      mental: ['wits', 'intelligence', 'resolve'],
    },
    skills: {
      subterfuge: 3,
      larceny: 2,
      performance: 2,
      streetwise: 2,
      awareness: 1,
      stealth: 1,
      persuasion: 1,
      athletics: 1,
    },
    skillSpecialties: {
      subterfuge: ['Мошенничество'],
      larceny: ['Карманные кражи'],
    },
  },
  salubri: {
    attributePriority: ['mental', 'social', 'physical'],
    attributeSpread: {
      physical: ['stamina', 'dexterity', 'strength'],
      social: ['charisma', 'composure', 'manipulation'],
      mental: ['wits', 'resolve', 'intelligence'],
    },
    skills: {
      medicine: 3,
      insight: 2,
      awareness: 2,
      academics: 2,
      persuasion: 1,
      occult: 1,
      craft: 1,
      survival: 1,
    },
    skillSpecialties: {
      medicine: ['Первая помощь'],
      insight: ['Эмпатия'],
    },
  },
  ministry: {
    attributePriority: ['social', 'mental', 'physical'],
    attributeSpread: {
      physical: ['dexterity', 'stamina', 'strength'],
      social: ['charisma', 'manipulation', 'composure'],
      mental: ['intelligence', 'wits', 'resolve'],
    },
    skills: {
      persuasion: 3,
      subterfuge: 2,
      occult: 2,
      performance: 2,
      insight: 1,
      streetwise: 1,
      awareness: 1,
      etiquette: 1,
    },
    skillSpecialties: {
      persuasion: ['Соблазнение'],
      occult: ['Египетские ритуалы'],
    },
  },
};
