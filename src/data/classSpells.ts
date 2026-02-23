import type { Spell } from '@/models/spell';
import type { ClassId } from '@/models/quiz';

export interface ClassSpellSet {
  cantrips: Spell[];
  level1Spells: Spell[];
  spellSlots: number[];
  spellcastingAbility: 'intelligence' | 'wisdom' | 'charisma';
}

export const CLASS_SPELLS: Partial<Record<ClassId, ClassSpellSet>> = {
  bard: {
    spellcastingAbility: 'charisma',
    spellSlots: [2],
    cantrips: [
      {
        id: 'vicious-mockery',
        name: 'Злая насмешка',
        nameEn: 'Vicious Mockery',
        level: 0,
        school: 'enchantment',
        castingTime: '1 действие',
        range: '60 футов',
        duration: 'Мгновенно',
        concentration: false,
        description:
          'Вы обрушиваете поток оскорблений на существо, которое можете видеть в пределах дальности, наполняя его разум сомнениями. Цель должна пройти спасбросок Мудрости или получить 1d4 психического урона и совершить следующий бросок атаки с помехой до конца следующего хода.',
      },
      {
        id: 'bard-light',
        name: 'Свет',
        nameEn: 'Light',
        level: 0,
        school: 'evocation',
        castingTime: '1 действие',
        range: 'Касание',
        duration: '1 час',
        concentration: false,
        description:
          'Вы касаетесь одного предмета размером не больше 10 футов в поперечнике, и он начинает испускать яркий свет в радиусе 20 футов и тусклый свет в радиусе ещё 20 футов. Заклинание заканчивается досрочно, если вы его отберёте или наложите заново.',
      },
    ],
    level1Spells: [
      {
        id: 'healing-word',
        name: 'Лечащее слово',
        nameEn: 'Healing Word',
        level: 1,
        school: 'evocation',
        castingTime: '1 бонусное действие',
        range: '60 футов',
        duration: 'Мгновенно',
        concentration: false,
        description:
          'Существо по вашему выбору, которое вы можете видеть в пределах дальности, восстанавливает количество хитов, равное 1d4 + ваш модификатор заклинательной характеристики. Это заклинание не влияет на нежить и конструктов.',
      },
      {
        id: 'unseen-servant',
        name: 'Волшебная рука',
        nameEn: 'Unseen Servant',
        level: 1,
        school: 'conjuration',
        castingTime: '1 действие',
        range: '60 футов',
        duration: '1 час',
        concentration: false,
        description:
          'Это заклинание создаёт невидимую бесформенную силу, которая выполняет простые задачи по вашей команде до окончания действия заклинания. Слуга может переносить предметы, открывать двери и выполнять другие простые задачи, но не может атаковать или применять магические предметы.',
      },
      {
        id: 'charm-person',
        name: 'Очарование личности',
        nameEn: 'Charm Person',
        level: 1,
        school: 'enchantment',
        castingTime: '1 действие',
        range: '30 футов',
        duration: '1 час',
        concentration: false,
        description:
          'Вы пытаетесь очаровать гуманоида, которого видите в пределах дальности. Цель должна пройти спасбросок Мудрости или станет очарованной вами на время действия заклинания. Очарованная цель воспринимает вас как дружественного знакомого.',
      },
    ],
  },

  cleric: {
    spellcastingAbility: 'wisdom',
    spellSlots: [2],
    cantrips: [
      {
        id: 'sacred-flame',
        name: 'Божественное пламя',
        nameEn: 'Sacred Flame',
        level: 0,
        school: 'evocation',
        castingTime: '1 действие',
        range: '60 футов',
        duration: 'Мгновенно',
        concentration: false,
        description:
          'Сверкающий свет нисходит на существо, которое вы можете видеть в пределах дальности. Цель должна пройти спасбросок Ловкости или получить 1d8 урона излучением. Этот заговор игнорирует укрытие любого вида.',
      },
      {
        id: 'mending',
        name: 'Починка',
        nameEn: 'Mending',
        level: 0,
        school: 'transmutation',
        castingTime: '1 минута',
        range: 'Касание',
        duration: 'Мгновенно',
        concentration: false,
        description:
          'Это заклинание восстанавливает один сломанный предмет, который вы держите руками. Заклинание может починить магический предмет или конструкта, восстановив до 1d4+4 хитов. Однако оно не восстанавливает магические свойства зачарованных предметов.',
      },
      {
        id: 'guidance',
        name: 'Указание',
        nameEn: 'Guidance',
        level: 0,
        school: 'divination',
        castingTime: '1 действие',
        range: 'Касание',
        duration: 'Концентрация, до 1 минуты',
        concentration: true,
        description:
          'Вы касаетесь одного согласного существа, наполняя его божественной мудростью. Один раз до окончания заклинания цель может бросить 1d4 и добавить результат к одной проверке характеристики на её выбор.',
      },
    ],
    level1Spells: [
      {
        id: 'cleric-healing-word',
        name: 'Лечащее слово',
        nameEn: 'Healing Word',
        level: 1,
        school: 'evocation',
        castingTime: '1 бонусное действие',
        range: '60 футов',
        duration: 'Мгновенно',
        concentration: false,
        description:
          'Существо по вашему выбору, которое вы можете видеть в пределах дальности, восстанавливает количество хитов, равное 1d4 + ваш модификатор заклинательной характеристики. Это заклинание не влияет на нежить и конструктов.',
      },
      {
        id: 'shield-of-faith',
        name: 'Щит веры',
        nameEn: 'Shield of Faith',
        level: 1,
        school: 'abjuration',
        castingTime: '1 бонусное действие',
        range: '60 футов',
        duration: 'Концентрация, до 10 минут',
        concentration: true,
        description:
          'Мерцающее поле защитной магии окружает существо по вашему выбору в пределах дальности, давая ему бонус +2 к КД на всё время действия заклинания. Вера жреца материализуется в незримый щит, отражающий удары врагов.',
      },
      {
        id: 'bless',
        name: 'Благословение',
        nameEn: 'Bless',
        level: 1,
        school: 'enchantment',
        castingTime: '1 действие',
        range: '30 футов',
        duration: 'Концентрация, до 1 минуты',
        concentration: true,
        description:
          'Вы благословляете до трёх существ по вашему выбору в пределах дальности. Каждая цель при совершении броска атаки или спасброска может бросить 1d4 и прибавить результат к своему броску.',
      },
    ],
  },

  druid: {
    spellcastingAbility: 'wisdom',
    spellSlots: [2],
    cantrips: [
      {
        id: 'produce-flame',
        name: 'Создание пламени',
        nameEn: 'Produce Flame',
        level: 0,
        school: 'conjuration',
        castingTime: '1 действие',
        range: 'Собственная',
        duration: '10 минут',
        concentration: false,
        description:
          'На вашей ладони появляется мерцающее пламя, которое остаётся там всё время действия заклинания. Пламя не причиняет вам вреда, но освещает территорию вокруг. Действием вы можете метнуть огонь в существо в пределах 30 футов, нанося 1d8 урона огнём.',
      },
      {
        id: 'druidcraft',
        name: 'Друидское ремесло',
        nameEn: 'Druidcraft',
        level: 0,
        school: 'transmutation',
        castingTime: '1 действие',
        range: '30 футов',
        duration: 'Мгновенно',
        concentration: false,
        description:
          'Вы шепчете силам природы, создавая незначительный магический эффект: предсказываете погоду, заставляете цветок расцвести, создаёте безвредные сенсорные эффекты или мгновенно зажигаете свечу. Этот заговор отражает глубокую связь друида с окружающим миром.',
      },
    ],
    level1Spells: [
      {
        id: 'druid-healing-word',
        name: 'Лечащее слово',
        nameEn: 'Healing Word',
        level: 1,
        school: 'evocation',
        castingTime: '1 бонусное действие',
        range: '60 футов',
        duration: 'Мгновенно',
        concentration: false,
        description:
          'Существо по вашему выбору, которое вы можете видеть в пределах дальности, восстанавливает количество хитов, равное 1d4 + ваш модификатор заклинательной характеристики. Это заклинание не влияет на нежить и конструктов.',
      },
      {
        id: 'entangle',
        name: 'Опутывание',
        nameEn: 'Entangle',
        level: 1,
        school: 'conjuration',
        castingTime: '1 действие',
        range: '90 футов',
        duration: 'Концентрация, до 1 минуты',
        concentration: true,
        description:
          'Цепкие травы и лозы вырастают из земли в квадрате со стороной 20 футов в пределах дальности. На время действия заклинания местность становится труднопроходимой. Существо в этой зоне должно пройти спасбросок Силы или стать опутанным.',
      },
      {
        id: 'speak-with-animals',
        name: 'Разговор с животными',
        nameEn: 'Speak with Animals',
        level: 1,
        school: 'divination',
        castingTime: '1 действие',
        range: 'Собственная',
        duration: '10 минут',
        concentration: false,
        description:
          'Вы получаете способность понимать речь зверей и общаться с ними вербально. Знания и осознание зверей ограничены их интеллектом, но как минимум они могут рассказать о ближайших местах и монстрах.',
      },
    ],
  },

  paladin: {
    spellcastingAbility: 'charisma',
    spellSlots: [0],
    cantrips: [],
    level1Spells: [],
  },

  ranger: {
    spellcastingAbility: 'wisdom',
    spellSlots: [0],
    cantrips: [],
    level1Spells: [],
  },

  sorcerer: {
    spellcastingAbility: 'charisma',
    spellSlots: [2],
    cantrips: [
      {
        id: 'fire-bolt',
        name: 'Огненный снаряд',
        nameEn: 'Fire Bolt',
        level: 0,
        school: 'evocation',
        castingTime: '1 действие',
        range: '120 футов',
        duration: 'Мгновенно',
        concentration: false,
        description:
          'Вы запускаете искру огня в существо или предмет в пределах дальности. Совершите дальнобойную атаку заклинанием против цели. При попадании цель получает 1d10 урона огнём. Горючие предметы, попавшие под действие заклинания, воспламеняются.',
      },
      {
        id: 'sorcerer-light',
        name: 'Свет',
        nameEn: 'Light',
        level: 0,
        school: 'evocation',
        castingTime: '1 действие',
        range: 'Касание',
        duration: '1 час',
        concentration: false,
        description:
          'Вы касаетесь одного предмета размером не больше 10 футов в поперечнике, и он начинает испускать яркий свет в радиусе 20 футов и тусклый свет в радиусе ещё 20 футов. Заклинание заканчивается досрочно, если вы его отберёте или наложите заново.',
      },
      {
        id: 'shocking-grasp',
        name: 'Пощёчина',
        nameEn: 'Shocking Grasp',
        level: 0,
        school: 'evocation',
        castingTime: '1 действие',
        range: 'Касание',
        duration: 'Мгновенно',
        concentration: false,
        description:
          'Молния вырывается из вашей руки, поражая существо, которого вы пытаетесь коснуться. Совершите рукопашную атаку заклинанием против цели; вы получаете преимущество, если цель в металлическом доспехе. При попадании цель получает 1d8 урона молнией и не может совершать реакции до начала следующего хода.',
      },
    ],
    level1Spells: [
      {
        id: 'magic-missile',
        name: 'Магическая стрела',
        nameEn: 'Magic Missile',
        level: 1,
        school: 'evocation',
        castingTime: '1 действие',
        range: '120 футов',
        duration: 'Мгновенно',
        concentration: false,
        description:
          'Вы создаёте три светящихся дротика магической силы. Каждый дротик поражает существо по вашему выбору в пределах дальности. Каждый дротик наносит 1d4+1 урона силовым полем. Все дротики летят одновременно, и вы можете направить их в одно или несколько существ.',
      },
      {
        id: 'shield',
        name: 'Щит',
        nameEn: 'Shield',
        level: 1,
        school: 'abjuration',
        castingTime: '1 реакция',
        range: 'Собственная',
        duration: '1 раунд',
        concentration: false,
        description:
          'Невидимый барьер магической силы появляется и защищает вас. До начала следующего хода вы получаете бонус +5 к КД, в том числе против атаки, вызвавшей это заклинание, и вы не получаете урон от Магической стрелы.',
      },
    ],
  },

  warlock: {
    spellcastingAbility: 'charisma',
    spellSlots: [1],
    cantrips: [
      {
        id: 'eldritch-blast',
        name: 'Мистический заряд',
        nameEn: 'Eldritch Blast',
        level: 0,
        school: 'evocation',
        castingTime: '1 действие',
        range: '120 футов',
        duration: 'Мгновенно',
        concentration: false,
        description:
          'Луч трескучей энергии устремляется к существу в пределах дальности. Совершите дальнобойную атаку заклинанием против цели. При попадании цель получает 1d10 урона силовым полем. Это фирменное заклинание варлоков, питаемое силой их покровителя.',
      },
      {
        id: 'minor-illusion',
        name: 'Малая иллюзия',
        nameEn: 'Minor Illusion',
        level: 0,
        school: 'illusion',
        castingTime: '1 действие',
        range: '30 футов',
        duration: '1 минута',
        concentration: false,
        description:
          'Вы создаёте звук или образ предмета в пределах дальности, который существует до окончания действия заклинания. Звук может иметь громкость от шёпота до крика. Образ не может быть больше куба 5 футов и не производит звука, света, запаха или других сенсорных эффектов.',
      },
    ],
    level1Spells: [
      {
        id: 'hex',
        name: 'Ведьмин заряд',
        nameEn: 'Hex',
        level: 1,
        school: 'enchantment',
        castingTime: '1 бонусное действие',
        range: '90 футов',
        duration: 'Концентрация, до 1 часа',
        concentration: true,
        description:
          'Вы накладываете проклятие на существо в пределах дальности. Пока заклинание активно, вы наносите цели дополнительно 1d6 некротического урона каждый раз, когда попадаете по ней атакой. Также цель получает помеху на проверки выбранной вами характеристики.',
      },
      {
        id: 'hellish-rebuke',
        name: 'Оружие Преисподней',
        nameEn: 'Hellish Rebuke',
        level: 1,
        school: 'evocation',
        castingTime: '1 реакция',
        range: '60 футов',
        duration: 'Мгновенно',
        concentration: false,
        description:
          'Вы указываете пальцем, и существо, причинившее вам вред, на мгновение охватывается инфернальным пламенем. Цель должна пройти спасбросок Ловкости, получая 2d10 урона огнём при провале или половину этого при успехе.',
      },
    ],
  },

  wizard: {
    spellcastingAbility: 'intelligence',
    spellSlots: [2],
    cantrips: [
      {
        id: 'wizard-fire-bolt',
        name: 'Огненный снаряд',
        nameEn: 'Fire Bolt',
        level: 0,
        school: 'evocation',
        castingTime: '1 действие',
        range: '120 футов',
        duration: 'Мгновенно',
        concentration: false,
        description:
          'Вы запускаете искру огня в существо или предмет в пределах дальности. Совершите дальнобойную атаку заклинанием против цели. При попадании цель получает 1d10 урона огнём. Горючие предметы, попавшие под действие заклинания, воспламеняются.',
      },
      {
        id: 'wizard-light',
        name: 'Свет',
        nameEn: 'Light',
        level: 0,
        school: 'evocation',
        castingTime: '1 действие',
        range: 'Касание',
        duration: '1 час',
        concentration: false,
        description:
          'Вы касаетесь одного предмета размером не больше 10 футов в поперечнике, и он начинает испускать яркий свет в радиусе 20 футов и тусклый свет в радиусе ещё 20 футов. Заклинание заканчивается досрочно, если вы его отберёте или наложите заново.',
      },
      {
        id: 'mage-hand',
        name: 'Волшебная рука',
        nameEn: 'Mage Hand',
        level: 0,
        school: 'conjuration',
        castingTime: '1 действие',
        range: '30 футов',
        duration: '1 минута',
        concentration: false,
        description:
          'Призрачная рука появляется в указанной вами точке в пределах дальности. Рука существует всё время действия заклинания. С её помощью вы можете манипулировать предметами, открывать двери и переносить вещи весом не более 10 фунтов.',
      },
    ],
    level1Spells: [
      {
        id: 'wizard-magic-missile',
        name: 'Магическая стрела',
        nameEn: 'Magic Missile',
        level: 1,
        school: 'evocation',
        castingTime: '1 действие',
        range: '120 футов',
        duration: 'Мгновенно',
        concentration: false,
        description:
          'Вы создаёте три светящихся дротика магической силы. Каждый дротик поражает существо по вашему выбору в пределах дальности. Каждый дротик наносит 1d4+1 урона силовым полем. Все дротики летят одновременно, и вы можете направить их в одно или несколько существ.',
      },
      {
        id: 'wizard-shield',
        name: 'Щит',
        nameEn: 'Shield',
        level: 1,
        school: 'abjuration',
        castingTime: '1 реакция',
        range: 'Собственная',
        duration: '1 раунд',
        concentration: false,
        description:
          'Невидимый барьер магической силы появляется и защищает вас. До начала следующего хода вы получаете бонус +5 к КД, в том числе против атаки, вызвавшей это заклинание, и вы не получаете урон от Магической стрелы.',
      },
      {
        id: 'detect-magic',
        name: 'Обнаружение магии',
        nameEn: 'Detect Magic',
        level: 1,
        school: 'divination',
        castingTime: '1 действие',
        range: 'Собственная',
        duration: 'Концентрация, до 10 минут',
        concentration: true,
        description:
          'На время действия заклинания вы чувствуете наличие магии в пределах 30 футов. Если вы чувствуете магию, вы можете действием рассмотреть ауру вокруг видимого магического существа или предмета, чтобы узнать школу магии, если таковая имеется.',
      },
    ],
  },
};
