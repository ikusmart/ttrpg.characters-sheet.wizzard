import type { VtmCharacter } from '@/models/vtm/character';
import { DISCIPLINE_POWERS } from './disciplinePowers';

const catsGrace = DISCIPLINE_POWERS.find(p => p.id === 'celerity_catsGrace')!;
const lethalBody = DISCIPLINE_POWERS.find(p => p.id === 'potence_lethalBody')!;

export const VTM_DEMO_CHARACTER: VtmCharacter = {
  id: 'vtm-demo-viktor',
  name: 'Виктор Кровавый',
  playerName: '',
  concept: 'Революционер поневоле',
  chronicle: 'Хроника Ночного Города',
  sire: 'Марина Стальная',
  ambition: 'Свергнуть Князя и установить справедливость',
  desire: 'Найти того, кто убил его смертную семью',
  generation: 13,

  clanId: 'brujah',
  clanName: 'Бруха',
  clanNameEn: 'Brujah',

  predatorTypeId: 'alleycat',
  predatorTypeName: 'Уличный охотник',
  predatorTypeNameEn: 'Alleycat',

  attributes: {
    strength:      { name: 'strength',     category: 'physical', value: 3 },
    dexterity:     { name: 'dexterity',    category: 'physical', value: 2 },
    stamina:       { name: 'stamina',      category: 'physical', value: 3 },
    charisma:      { name: 'charisma',     category: 'social',   value: 2 },
    manipulation:  { name: 'manipulation', category: 'social',   value: 2 },
    composure:     { name: 'composure',    category: 'social',   value: 2 },
    intelligence:  { name: 'intelligence', category: 'mental',   value: 2 },
    wits:          { name: 'wits',         category: 'mental',   value: 3 },
    resolve:       { name: 'resolve',      category: 'mental',   value: 2 },
  },

  skills: {
    athletics:    2,
    brawl:        3,
    craft:        0,
    drive:        0,
    firearms:     0,
    larceny:      0,
    melee:        1,
    performance:  0,
    stealth:      1,
    survival:     1,
    animalKen:    0,
    etiquette:    0,
    insight:      0,
    intimidation: 2,
    leadership:   0,
    persuasion:   0,
    streetwise:   2,
    subterfuge:   0,
    academics:    0,
    awareness:    1,
    finance:      0,
    investigation:0,
    medicine:     0,
    occult:       0,
    politics:     0,
    science:      0,
    technology:   0,
  },

  skillSpecialties: {
    brawl:      ['Kindred'],
    streetwise: ['Ночная жизнь'],
  },

  disciplines: {
    celerity: 1,
    potence:  1,
  },

  knownPowers: [catsGrace, lethalBody],

  health: {
    max:         6,
    superficial: 0,
    aggravated:  0,
  },

  willpower: {
    max:         4,
    superficial: 0,
    aggravated:  0,
  },

  hunger:    1,
  humanity:  7,

  convictions: ['Никогда не причиняй вред невинным без причины'],
  touchstones: ['Елена — бывшая подруга, всё ещё живёт в старом районе'],

  bloodPotency: 1,

  merits: [
    {
      name:        'Криминальные связи',
      nameEn:      'Criminal Contacts',
      dots:        2,
      description: 'Контакты в криминальном мире города',
    },
  ],

  flaws: [
    {
      name:        'Тёмная тайна',
      nameEn:      'Dark Secret',
      dots:        1,
      description: 'Его Обращение было неавторизованным',
    },
  ],

  backgrounds: [
    {
      name:        'Контакты',
      nameEn:      'Contacts',
      dots:        2,
      description: 'Знакомые в криминальных кругах',
    },
    {
      name:        'Убежище',
      nameEn:      'Haven',
      dots:        1,
      description: 'Заброшенный склад на окраине',
    },
  ],

  bane:       'При Звериной Неудаче впадает в буйную ярость и должен нанести физический урон кому-либо или чему-либо.',
  compulsion: 'Бунт — при срабатывании Компульсии должен бросить вызов лидеру или правилу в сцене.',

  totalExperience: 0,
  spentExperience: 0,

  appearance:        'Крепкий, коротко стриженный мужчина лет 25-30 с татуировками на руках. Носит кожаную куртку и тяжёлые ботинки.',
  personalityTraits: 'Прямолинейный, вспыльчивый, но верный тем, кого считает друзьями. Ненавидит несправедливость.',
  backstory:         'Бывший активист, Обращён Бруха после того как оказался в неправильном месте в неправильное время. Сир бросил его без объяснений.',
  notes:             '',
};
