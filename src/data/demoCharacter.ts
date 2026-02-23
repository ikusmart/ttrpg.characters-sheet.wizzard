import type { Character } from '@/models/character';

export const DEMO_CHARACTER: Character = {
  id: 'demo-fighter-001',
  name: 'Торин Крепкощит',
  playerName: 'Игрок',

  speciesId: 'human',
  speciesName: 'Человек',
  speciesNameEn: 'Human',

  classId: 'fighter',
  className: 'Воин',
  classNameEn: 'Fighter',
  subclassName: 'Чемпион',
  subclassNameEn: 'Champion',

  backgroundId: 'soldier',
  backgroundName: 'Солдат',
  backgroundNameEn: 'Soldier',

  level: 1,
  experiencePoints: 0,
  proficiencyBonus: 2,

  abilityScores: {
    strength:     { name: 'strength',     baseValue: 16, bonusFromBackground: 0 },
    dexterity:    { name: 'dexterity',    baseValue: 14, bonusFromBackground: 0 },
    constitution: { name: 'constitution', baseValue: 15, bonusFromBackground: 0 },
    intelligence: { name: 'intelligence', baseValue: 10, bonusFromBackground: 0 },
    wisdom:       { name: 'wisdom',       baseValue: 12, bonusFromBackground: 0 },
    charisma:     { name: 'charisma',     baseValue: 8,  bonusFromBackground: 0 },
  },

  skillProficiencies: ['athletics', 'intimidation'],
  skillExpertise: [],

  savingThrowProficiencies: ['strength', 'constitution'],

  armorClass: 16,
  initiative: 2,
  speed: 30,

  maxHitPoints: 12,
  currentHitPoints: 12,
  temporaryHitPoints: 0,
  hitDice: { total: 1, remaining: 1, sides: 10 },
  deathSaves: { successes: 0, failures: 0 },

  attacks: [
    { name: 'Длинный меч', nameEn: 'Longsword', attackBonus: 5, damage: '1d8+3', damageType: 'рубящий' },
    { name: 'Ручной топор', nameEn: 'Handaxe', attackBonus: 5, damage: '1d6+3', damageType: 'рубящий' },
  ],

  equipment: [
    { id: 'chain-mail', name: 'Кольчуга', nameEn: 'Chain Mail', quantity: 1, weight: 55, equipped: true, category: 'armor' },
    { id: 'longsword', name: 'Длинный меч', nameEn: 'Longsword', quantity: 1, weight: 3, equipped: true, category: 'weapon' },
    { id: 'handaxe', name: 'Ручной топор', nameEn: 'Handaxe', quantity: 2, weight: 2, equipped: false, category: 'weapon' },
    { id: 'explorers-pack', name: 'Набор путешественника', nameEn: "Explorer's Pack", quantity: 1, weight: 59, equipped: false, category: 'adventuring-gear' },
  ],

  currency: { copper: 0, silver: 0, electrum: 0, gold: 10, platinum: 0 },

  features: [
    {
      name: 'Второе дыхание',
      nameEn: 'Second Wind',
      source: 'Воин 1',
      description: 'Бонусным действием вы восстанавливаете хиты в размере 1d10 + ваш уровень воина. Можно использовать один раз, восстанавливается после короткого или продолжительного отдыха.',
    },
    {
      name: 'Боевой стиль: Защита',
      nameEn: 'Fighting Style: Defense',
      source: 'Воин 1',
      description: 'Пока вы носите доспехи, вы получаете бонус +1 к КД.',
    },
  ],

  proficiencies: {
    languages: ['Общий (Common)'],
    tools: ['Игровой набор (кости)'],
    armor: ['Лёгкие доспехи', 'Средние доспехи', 'Тяжёлые доспехи', 'Щиты'],
    weapons: ['Простое оружие', 'Воинское оружие'],
  },

  personalityTraits: 'Я всегда вежлив и уважителен. Годы службы научили меня дисциплине.',
  ideals: 'Долг. Я выполняю свои обязательства, чего бы это ни стоило. (Законный)',
  bonds: 'Мои товарищи по оружию — моя семья. Я сражаюсь за тех, кто не может сражаться за себя.',
  flaws: 'Я слишком упрям и никогда не отступаю, даже когда это разумно.',
  backstory: 'Торин служил в городской страже Невервинтера десять лет. После нападения орков на караван, который он охранял, Торин решил стать странствующим искателем приключений, чтобы защищать людей не только в пределах городских стен.',
  notes: '',

  helpModeEnabled: true,
};
