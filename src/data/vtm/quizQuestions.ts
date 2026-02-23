import type { VtmQuizQuestion, QuizLevel } from '@/models/vtm/quiz';

export const VTM_QUIZ_QUESTIONS: VtmQuizQuestion[] = [
  // TIER 1 — 6 questions (Core Identity)
  {
    id: 'vtm-q1',
    title: 'Общение',
    text: 'На большой вечеринке ты скорее всего...',
    tier: 1,
    answers: [
      {
        id: 'q1a',
        text: 'Стану душой компании — шучу, флиртую, притягиваю взгляды',
        icon: '🎭',
        weights: [
          { clanId: 'toreador', weight: 3 },
          { clanId: 'ventrue', weight: 2 },
          { clanId: 'ministry', weight: 1 },
        ],
      },
      {
        id: 'q1b',
        text: 'Найду тихий угол и буду наблюдать за людьми',
        icon: '👁️',
        weights: [
          { clanId: 'nosferatu', weight: 3 },
          { clanId: 'malkavian', weight: 2 },
          { clanId: 'gangrel', weight: 1 },
        ],
      },
      {
        id: 'q1c',
        text: 'Окажусь в центре спора о чём-то важном',
        icon: '✊',
        weights: [
          { clanId: 'brujah', weight: 3 },
          { clanId: 'ventrue', weight: 2 },
          { clanId: 'lasombra', weight: 1 },
        ],
      },
      {
        id: 'q1d',
        text: 'Уйду пораньше — мне комфортнее наедине с собой',
        icon: '🌙',
        weights: [
          { clanId: 'gangrel', weight: 3 },
          { clanId: 'tzimisce', weight: 2 },
          { clanId: 'salubri', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q2',
    title: 'Конфликт',
    text: 'Столкнувшись с серьёзным конфликтом, ты...',
    tier: 1,
    answers: [
      {
        id: 'q2a',
        text: 'Решаю его прямо и решительно, даже если это означает бой',
        icon: '⚔️',
        weights: [
          { clanId: 'brujah', weight: 3 },
          { clanId: 'gangrel', weight: 2 },
          { clanId: 'lasombra', weight: 1 },
        ],
      },
      {
        id: 'q2b',
        text: 'Ищу компромисс и стараюсь понять обе стороны',
        icon: '🤝',
        weights: [
          { clanId: 'salubri', weight: 3 },
          { clanId: 'ventrue', weight: 2 },
          { clanId: 'toreador', weight: 1 },
        ],
      },
      {
        id: 'q2c',
        text: 'Нахожу способ обратить конфликт себе на пользу',
        icon: '🎯',
        weights: [
          { clanId: 'lasombra', weight: 3 },
          { clanId: 'tremere', weight: 2 },
          { clanId: 'ravnos', weight: 1 },
        ],
      },
      {
        id: 'q2d',
        text: 'Наблюдаю и жду — время раскроет правду',
        icon: '🔮',
        weights: [
          { clanId: 'malkavian', weight: 3 },
          { clanId: 'nosferatu', weight: 2 },
          { clanId: 'hecata', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q3',
    title: 'Сила',
    text: 'Настоящая сила — это...',
    tier: 1,
    answers: [
      {
        id: 'q3a',
        text: 'Физическая мощь и способность защитить себя и своих',
        icon: '💪',
        weights: [
          { clanId: 'gangrel', weight: 3 },
          { clanId: 'brujah', weight: 2 },
          { clanId: 'nosferatu', weight: 1 },
        ],
      },
      {
        id: 'q3b',
        text: 'Власть над людьми и обстоятельствами',
        icon: '👑',
        weights: [
          { clanId: 'ventrue', weight: 3 },
          { clanId: 'lasombra', weight: 2 },
          { clanId: 'ministry', weight: 1 },
        ],
      },
      {
        id: 'q3c',
        text: 'Знания и тайны, недоступные другим',
        icon: '📚',
        weights: [
          { clanId: 'tremere', weight: 3 },
          { clanId: 'hecata', weight: 2 },
          { clanId: 'malkavian', weight: 1 },
        ],
      },
      {
        id: 'q3d',
        text: 'Красота, харизма и умение вдохновлять',
        icon: '🌹',
        weights: [
          { clanId: 'toreador', weight: 3 },
          { clanId: 'ministry', weight: 2 },
          { clanId: 'ravnos', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q4',
    title: 'Страхи',
    text: 'Больше всего тебя пугает...',
    tier: 1,
    answers: [
      {
        id: 'q4a',
        text: 'Потеря контроля над собой и своими эмоциями',
        icon: '😤',
        weights: [
          { clanId: 'brujah', weight: 2 },
          { clanId: 'gangrel', weight: 2 },
          { clanId: 'malkavian', weight: 2 },
        ],
      },
      {
        id: 'q4b',
        text: 'Быть забытым и не оставить следа',
        icon: '🪦',
        weights: [
          { clanId: 'toreador', weight: 2 },
          { clanId: 'ventrue', weight: 2 },
          { clanId: 'salubri', weight: 2 },
        ],
      },
      {
        id: 'q4c',
        text: 'Что люди увидят, кто ты на самом деле',
        icon: '🎭',
        weights: [
          { clanId: 'nosferatu', weight: 2 },
          { clanId: 'ministry', weight: 2 },
          { clanId: 'ravnos', weight: 2 },
        ],
      },
      {
        id: 'q4d',
        text: 'Потерять связь с тем, что делает тебя человеком',
        icon: '💔',
        weights: [
          { clanId: 'tzimisce', weight: 2 },
          { clanId: 'hecata', weight: 2 },
          { clanId: 'tremere', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q5',
    title: 'Добыча',
    text: 'Если бы ты мог брать что-то ценное от людей, ты бы выбрал...',
    tier: 1,
    answers: [
      {
        id: 'q5a',
        text: 'Их страхи и секреты — знание есть власть',
        icon: '🕵️',
        weights: [
          { clanId: 'nosferatu', weight: 3 },
          { clanId: 'malkavian', weight: 2 },
          { clanId: 'tremere', weight: 1 },
        ],
      },
      {
        id: 'q5b',
        text: 'Их восхищение и обожание',
        icon: '✨',
        weights: [
          { clanId: 'toreador', weight: 3 },
          { clanId: 'ministry', weight: 2 },
          { clanId: 'ventrue', weight: 1 },
        ],
      },
      {
        id: 'q5c',
        text: 'Их жизненную энергию и силу',
        icon: '🩸',
        weights: [
          { clanId: 'brujah', weight: 3 },
          { clanId: 'gangrel', weight: 2 },
          { clanId: 'lasombra', weight: 1 },
        ],
      },
      {
        id: 'q5d',
        text: 'Их доверие и привязанность',
        icon: '💝',
        weights: [
          { clanId: 'salubri', weight: 3 },
          { clanId: 'ravnos', weight: 2 },
          { clanId: 'hecata', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q6',
    title: 'Бессмертие',
    text: 'Став бессмертным, ты бы первым делом...',
    tier: 1,
    answers: [
      {
        id: 'q6a',
        text: 'Начал менять мир к лучшему — или к тому, что считаю лучшим',
        icon: '🔥',
        weights: [
          { clanId: 'brujah', weight: 3 },
          { clanId: 'salubri', weight: 2 },
          { clanId: 'ministry', weight: 1 },
        ],
      },
      {
        id: 'q6b',
        text: 'Посвятил вечность искусству, красоте и познанию',
        icon: '🎨',
        weights: [
          { clanId: 'toreador', weight: 3 },
          { clanId: 'malkavian', weight: 2 },
          { clanId: 'tremere', weight: 1 },
        ],
      },
      {
        id: 'q6c',
        text: 'Построил империю и обеспечил своё влияние на века',
        icon: '🏛️',
        weights: [
          { clanId: 'ventrue', weight: 3 },
          { clanId: 'lasombra', weight: 2 },
          { clanId: 'tzimisce', weight: 1 },
        ],
      },
      {
        id: 'q6d',
        text: 'Исследовал тайны жизни, смерти и того, что между ними',
        icon: '💀',
        weights: [
          { clanId: 'hecata', weight: 3 },
          { clanId: 'tremere', weight: 2 },
          { clanId: 'gangrel', weight: 1 },
        ],
      },
    ],
  },

  // TIER 2 — 12 questions (Deeper Traits)
  {
    id: 'vtm-q7',
    title: 'Лидерство',
    text: 'Идеальный лидер — тот, кто...',
    tier: 2,
    answers: [
      {
        id: 'q7a',
        text: 'Вдохновляет людей личным примером и харизмой',
        icon: '🌟',
        weights: [
          { clanId: 'brujah', weight: 2 },
          { clanId: 'toreador', weight: 2 },
          { clanId: 'ministry', weight: 1 },
        ],
      },
      {
        id: 'q7b',
        text: 'Принимает жёсткие решения, когда другие колеблются',
        icon: '🗡️',
        weights: [
          { clanId: 'lasombra', weight: 3 },
          { clanId: 'ventrue', weight: 2 },
        ],
      },
      {
        id: 'q7c',
        text: 'Объединяет людей через общую цель и веру',
        icon: '🕊️',
        weights: [
          { clanId: 'ministry', weight: 3 },
          { clanId: 'salubri', weight: 2 },
        ],
      },
      {
        id: 'q7d',
        text: 'Контролирует информацию и ресурсы за кулисами',
        icon: '🎪',
        weights: [
          { clanId: 'nosferatu', weight: 2 },
          { clanId: 'tremere', weight: 2 },
          { clanId: 'ventrue', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q8',
    title: 'Доверие',
    text: 'Доверие для тебя — это...',
    tier: 2,
    answers: [
      {
        id: 'q8a',
        text: 'Роскошь, которую мало кто заслуживает',
        icon: '🔒',
        weights: [
          { clanId: 'nosferatu', weight: 3 },
          { clanId: 'tremere', weight: 2 },
          { clanId: 'lasombra', weight: 1 },
        ],
      },
      {
        id: 'q8b',
        text: 'Основа любых отношений — без него нет смысла',
        icon: '❤️',
        weights: [
          { clanId: 'salubri', weight: 3 },
          { clanId: 'toreador', weight: 2 },
        ],
      },
      {
        id: 'q8c',
        text: 'Инструмент — доверие нужно заслужить и использовать',
        icon: '🎲',
        weights: [
          { clanId: 'ravnos', weight: 3 },
          { clanId: 'ministry', weight: 2 },
        ],
      },
      {
        id: 'q8d',
        text: 'Слабость, которую можно эксплуатировать',
        icon: '🖤',
        weights: [
          { clanId: 'lasombra', weight: 2 },
          { clanId: 'tzimisce', weight: 2 },
          { clanId: 'ventrue', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q9',
    title: 'Правила',
    text: 'Правила существуют, чтобы...',
    tier: 2,
    answers: [
      {
        id: 'q9a',
        text: 'Их нарушать — если правило несправедливо, оно не заслуживает подчинения',
        icon: '🔥',
        weights: [
          { clanId: 'brujah', weight: 3 },
          { clanId: 'ravnos', weight: 2 },
        ],
      },
      {
        id: 'q9b',
        text: 'Защищать слабых от сильных',
        icon: '⚖️',
        weights: [
          { clanId: 'salubri', weight: 2 },
          { clanId: 'ventrue', weight: 2 },
          { clanId: 'toreador', weight: 1 },
        ],
      },
      {
        id: 'q9c',
        text: 'Поддерживать порядок — хаос опаснее тирании',
        icon: '📜',
        weights: [
          { clanId: 'ventrue', weight: 3 },
          { clanId: 'tremere', weight: 2 },
        ],
      },
      {
        id: 'q9d',
        text: 'Сильные устанавливали, а слабые подчинялись — это природа',
        icon: '🐺',
        weights: [
          { clanId: 'gangrel', weight: 3 },
          { clanId: 'lasombra', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q10',
    title: 'Обида',
    text: 'Когда тебя серьёзно обижают, ты...',
    tier: 2,
    answers: [
      {
        id: 'q10a',
        text: 'Вспыхиваю — могу сказать или сделать то, о чём потом жалею',
        icon: '🔥',
        weights: [
          { clanId: 'brujah', weight: 3 },
          { clanId: 'gangrel', weight: 2 },
        ],
      },
      {
        id: 'q10b',
        text: 'Запоминаю и жду подходящего момента для ответа',
        icon: '🗡️',
        weights: [
          { clanId: 'lasombra', weight: 3 },
          { clanId: 'nosferatu', weight: 2 },
        ],
      },
      {
        id: 'q10c',
        text: 'Стараюсь понять мотивы обидчика — может, он не нарочно',
        icon: '💫',
        weights: [
          { clanId: 'malkavian', weight: 2 },
          { clanId: 'salubri', weight: 2 },
          { clanId: 'toreador', weight: 1 },
        ],
      },
      {
        id: 'q10d',
        text: 'Перенаправляю эмоции в творчество или работу',
        icon: '🎭',
        weights: [
          { clanId: 'toreador', weight: 3 },
          { clanId: 'tremere', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q11',
    title: 'Неизвестное',
    text: 'Столкнувшись с чем-то непонятным и пугающим, ты...',
    tier: 2,
    answers: [
      {
        id: 'q11a',
        text: 'Исследую это — страх перед неизвестным глупее самого неизвестного',
        icon: '🔬',
        weights: [
          { clanId: 'tremere', weight: 3 },
          { clanId: 'hecata', weight: 2 },
        ],
      },
      {
        id: 'q11b',
        text: 'Доверяю инстинктам — они не подводили раньше',
        icon: '🐾',
        weights: [
          { clanId: 'gangrel', weight: 3 },
          { clanId: 'ravnos', weight: 2 },
        ],
      },
      {
        id: 'q11c',
        text: 'Пытаюсь почувствовать скрытый смысл или послание',
        icon: '🌀',
        weights: [
          { clanId: 'malkavian', weight: 3 },
          { clanId: 'salubri', weight: 2 },
        ],
      },
      {
        id: 'q11d',
        text: 'Собираю информацию прежде чем действовать',
        icon: '📡',
        weights: [
          { clanId: 'nosferatu', weight: 2 },
          { clanId: 'tremere', weight: 2 },
          { clanId: 'ventrue', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q12',
    title: 'Дом',
    text: 'Идеальное место для жизни — это...',
    tier: 2,
    answers: [
      {
        id: 'q12a',
        text: 'Старинное поместье с историей и характером',
        icon: '🏰',
        weights: [
          { clanId: 'tzimisce', weight: 3 },
          { clanId: 'ventrue', weight: 2 },
        ],
      },
      {
        id: 'q12b',
        text: 'Подземный бункер или секретное убежище, которое никто не найдёт',
        icon: '🕳️',
        weights: [
          { clanId: 'nosferatu', weight: 3 },
          { clanId: 'tremere', weight: 2 },
        ],
      },
      {
        id: 'q12c',
        text: 'Пентхаус в центре города с видом на ночные огни',
        icon: '🌃',
        weights: [
          { clanId: 'toreador', weight: 3 },
          { clanId: 'lasombra', weight: 2 },
        ],
      },
      {
        id: 'q12d',
        text: 'Мне не нужен постоянный дом — весь мир мой',
        icon: '🌍',
        weights: [
          { clanId: 'gangrel', weight: 3 },
          { clanId: 'ravnos', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q13',
    title: 'Враги',
    text: 'Лучший способ победить врага — это...',
    tier: 2,
    answers: [
      {
        id: 'q13a',
        text: 'Уничтожить его раз и навсегда, не оставив шанса на реванш',
        icon: '💥',
        weights: [
          { clanId: 'brujah', weight: 2 },
          { clanId: 'gangrel', weight: 2 },
          { clanId: 'lasombra', weight: 1 },
        ],
      },
      {
        id: 'q13b',
        text: 'Сделать его своим другом или хотя бы нейтрализовать дипломатией',
        icon: '🤝',
        weights: [
          { clanId: 'ventrue', weight: 2 },
          { clanId: 'toreador', weight: 2 },
          { clanId: 'salubri', weight: 1 },
        ],
      },
      {
        id: 'q13c',
        text: 'Узнать о нём всё и использовать его слабости против него',
        icon: '🕸️',
        weights: [
          { clanId: 'nosferatu', weight: 3 },
          { clanId: 'tremere', weight: 2 },
        ],
      },
      {
        id: 'q13d',
        text: 'Подставить его чужими руками, оставаясь в тени',
        icon: '🌑',
        weights: [
          { clanId: 'lasombra', weight: 3 },
          { clanId: 'ministry', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q14',
    title: 'Команда',
    text: 'В команде ты обычно...',
    tier: 2,
    answers: [
      {
        id: 'q14a',
        text: 'Лидер — мне проще вести за собой, чем следовать',
        icon: '👑',
        weights: [
          { clanId: 'ventrue', weight: 3 },
          { clanId: 'brujah', weight: 2 },
        ],
      },
      {
        id: 'q14b',
        text: 'Поддержка — помогаю другим раскрыть их потенциал',
        icon: '🌱',
        weights: [
          { clanId: 'salubri', weight: 3 },
          { clanId: 'toreador', weight: 2 },
        ],
      },
      {
        id: 'q14c',
        text: 'Свободный агент — прихожу и ухожу когда хочу',
        icon: '🃏',
        weights: [
          { clanId: 'ravnos', weight: 3 },
          { clanId: 'gangrel', weight: 2 },
        ],
      },
      {
        id: 'q14d',
        text: 'Стратег — планирую и координирую из-за кулис',
        icon: '🧩',
        weights: [
          { clanId: 'tremere', weight: 2 },
          { clanId: 'lasombra', weight: 2 },
          { clanId: 'nosferatu', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q15',
    title: 'Тайна',
    text: 'Если бы у тебя появился опасный секрет...',
    tier: 2,
    answers: [
      {
        id: 'q15a',
        text: 'Использую его как рычаг — информация есть валюта',
        icon: '🔑',
        weights: [
          { clanId: 'nosferatu', weight: 3 },
          { clanId: 'lasombra', weight: 2 },
        ],
      },
      {
        id: 'q15b',
        text: 'Поделюсь с кем-то, кому доверяю — нести такое одному тяжело',
        icon: '💬',
        weights: [
          { clanId: 'salubri', weight: 2 },
          { clanId: 'toreador', weight: 2 },
          { clanId: 'brujah', weight: 1 },
        ],
      },
      {
        id: 'q15c',
        text: 'Спрячу так глубоко, что никто не найдёт',
        icon: '🗝️',
        weights: [
          { clanId: 'tremere', weight: 3 },
          { clanId: 'tzimisce', weight: 2 },
        ],
      },
      {
        id: 'q15d',
        text: 'Намекну нужным людям — пусть думают, что знаю больше, чем на самом деле',
        icon: '🎭',
        weights: [
          { clanId: 'ministry', weight: 3 },
          { clanId: 'malkavian', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q16',
    title: 'Искусство',
    text: 'Искусство — это прежде всего...',
    tier: 2,
    answers: [
      {
        id: 'q16a',
        text: 'Способ выразить красоту и глубину чувств',
        icon: '🌹',
        weights: [
          { clanId: 'toreador', weight: 3 },
          { clanId: 'salubri', weight: 2 },
        ],
      },
      {
        id: 'q16b',
        text: 'Инструмент воздействия на умы и сердца',
        icon: '🎪',
        weights: [
          { clanId: 'ministry', weight: 2 },
          { clanId: 'ventrue', weight: 2 },
          { clanId: 'lasombra', weight: 1 },
        ],
      },
      {
        id: 'q16c',
        text: 'Отражение безумия и хаоса мира',
        icon: '💀',
        weights: [
          { clanId: 'malkavian', weight: 3 },
          { clanId: 'hecata', weight: 2 },
        ],
      },
      {
        id: 'q16d',
        text: 'Форма трансформации — превращение одного в другое',
        icon: '🔄',
        weights: [
          { clanId: 'tzimisce', weight: 3 },
          { clanId: 'tremere', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q17',
    title: 'Смерть',
    text: 'Смерть для тебя — это...',
    tier: 2,
    answers: [
      {
        id: 'q17a',
        text: 'Часть естественного цикла, которую нужно уважать и понимать',
        icon: '🌿',
        weights: [
          { clanId: 'hecata', weight: 3 },
          { clanId: 'gangrel', weight: 2 },
        ],
      },
      {
        id: 'q17b',
        text: 'Конец, которого нужно избежать любой ценой',
        icon: '💎',
        weights: [
          { clanId: 'ventrue', weight: 2 },
          { clanId: 'tremere', weight: 2 },
          { clanId: 'toreador', weight: 1 },
        ],
      },
      {
        id: 'q17c',
        text: 'Переход — за порогом ждёт что-то иное',
        icon: '☽',
        weights: [
          { clanId: 'salubri', weight: 3 },
          { clanId: 'ministry', weight: 2 },
        ],
      },
      {
        id: 'q17d',
        text: 'Мотивация — именно конечность делает жизнь ценной',
        icon: '🔥',
        weights: [
          { clanId: 'brujah', weight: 2 },
          { clanId: 'ravnos', weight: 2 },
          { clanId: 'malkavian', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q18',
    title: 'Перемены',
    text: 'Перемены — это...',
    tier: 2,
    answers: [
      {
        id: 'q18a',
        text: 'Необходимость — застой есть смерть',
        icon: '🌊',
        weights: [
          { clanId: 'tzimisce', weight: 3 },
          { clanId: 'brujah', weight: 2 },
        ],
      },
      {
        id: 'q18b',
        text: 'Возможность для авантюры и новых впечатлений',
        icon: '🎲',
        weights: [
          { clanId: 'ravnos', weight: 3 },
          { clanId: 'gangrel', weight: 2 },
        ],
      },
      {
        id: 'q18c',
        text: 'Угроза стабильности — лучше совершенствовать то, что есть',
        icon: '🏛️',
        weights: [
          { clanId: 'ventrue', weight: 2 },
          { clanId: 'tremere', weight: 2 },
          { clanId: 'lasombra', weight: 1 },
        ],
      },
      {
        id: 'q18d',
        text: 'Источник страдания и одновременно роста',
        icon: '🌓',
        weights: [
          { clanId: 'malkavian', weight: 2 },
          { clanId: 'salubri', weight: 2 },
          { clanId: 'hecata', weight: 1 },
        ],
      },
    ],
  },

  // TIER 3 — 12 questions (Nuanced Personality)
  {
    id: 'vtm-q19',
    title: 'Технологии',
    text: 'Технологии и прогресс — это...',
    tier: 3,
    answers: [
      {
        id: 'q19a',
        text: 'Мощный инструмент для тех, кто умеет им пользоваться',
        icon: '💻',
        weights: [
          { clanId: 'tremere', weight: 3 },
          { clanId: 'nosferatu', weight: 2 },
        ],
      },
      {
        id: 'q19b',
        text: 'Угроза — за ними слишком легко потерять себя',
        icon: '🌲',
        weights: [
          { clanId: 'gangrel', weight: 3 },
          { clanId: 'tzimisce', weight: 2 },
        ],
      },
      {
        id: 'q19c',
        text: 'Средство контроля — кто владеет данными, тот владеет миром',
        icon: '📊',
        weights: [
          { clanId: 'lasombra', weight: 2 },
          { clanId: 'ventrue', weight: 2 },
          { clanId: 'nosferatu', weight: 1 },
        ],
      },
      {
        id: 'q19d',
        text: 'Не более чем модная игрушка — настоящая сила в другом',
        icon: '🕯️',
        weights: [
          { clanId: 'ministry', weight: 2 },
          { clanId: 'hecata', weight: 2 },
          { clanId: 'brujah', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q20',
    title: 'Род',
    text: 'Семья и род — это...',
    tier: 3,
    answers: [
      {
        id: 'q20a',
        text: 'Священная связь — кровь сильнее любых договоров',
        icon: '🩸',
        weights: [
          { clanId: 'tzimisce', weight: 3 },
          { clanId: 'hecata', weight: 2 },
        ],
      },
      {
        id: 'q20b',
        text: 'То, что ты создаёшь сам — не обязательно по крови',
        icon: '🤝',
        weights: [
          { clanId: 'brujah', weight: 2 },
          { clanId: 'gangrel', weight: 2 },
          { clanId: 'toreador', weight: 1 },
        ],
      },
      {
        id: 'q20c',
        text: 'Источник силы и ресурсов, который нужно поддерживать',
        icon: '🏦',
        weights: [
          { clanId: 'ventrue', weight: 3 },
          { clanId: 'lasombra', weight: 2 },
        ],
      },
      {
        id: 'q20d',
        text: 'Слабость — привязанности делают тебя уязвимым',
        icon: '⛓️',
        weights: [
          { clanId: 'ravnos', weight: 2 },
          { clanId: 'ministry', weight: 2 },
          { clanId: 'tremere', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q21',
    title: 'Ночь',
    text: 'Идеальная ночь — это...',
    tier: 3,
    answers: [
      {
        id: 'q21a',
        text: 'Галерея, концерт или вечер в изысканном обществе',
        icon: '🎶',
        weights: [
          { clanId: 'toreador', weight: 3 },
          { clanId: 'ventrue', weight: 2 },
        ],
      },
      {
        id: 'q21b',
        text: 'Охота в тишине — городские крыши или дикий лес',
        icon: '🌑',
        weights: [
          { clanId: 'gangrel', weight: 3 },
          { clanId: 'nosferatu', weight: 2 },
        ],
      },
      {
        id: 'q21c',
        text: 'Азартная игра, импровизация, погоня за адреналином',
        icon: '🎰',
        weights: [
          { clanId: 'ravnos', weight: 3 },
          { clanId: 'brujah', weight: 2 },
        ],
      },
      {
        id: 'q21d',
        text: 'Ритуал, медитация или погружение в древние тексты',
        icon: '📖',
        weights: [
          { clanId: 'tremere', weight: 2 },
          { clanId: 'hecata', weight: 2 },
          { clanId: 'salubri', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q22',
    title: 'Ресурсы',
    text: 'Богатство и ресурсы — это...',
    tier: 3,
    answers: [
      {
        id: 'q22a',
        text: 'Инструмент влияния — деньги открывают все двери',
        icon: '💰',
        weights: [
          { clanId: 'ventrue', weight: 3 },
          { clanId: 'lasombra', weight: 2 },
        ],
      },
      {
        id: 'q22b',
        text: 'Средство для создания прекрасного и вечного',
        icon: '🎨',
        weights: [
          { clanId: 'toreador', weight: 2 },
          { clanId: 'tremere', weight: 2 },
          { clanId: 'tzimisce', weight: 1 },
        ],
      },
      {
        id: 'q22c',
        text: 'То, что легко приходит и легко уходит — главное процесс',
        icon: '🎲',
        weights: [
          { clanId: 'ravnos', weight: 3 },
          { clanId: 'ministry', weight: 2 },
        ],
      },
      {
        id: 'q22d',
        text: 'Не главное — настоящие ценности нельзя купить',
        icon: '🌿',
        weights: [
          { clanId: 'salubri', weight: 2 },
          { clanId: 'gangrel', weight: 2 },
          { clanId: 'brujah', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q23',
    title: 'Чужие секреты',
    text: 'Чужие секреты и информация — это...',
    tier: 3,
    answers: [
      {
        id: 'q23a',
        text: 'Самая ценная валюта — я собираю всё, что могу',
        icon: '📁',
        weights: [
          { clanId: 'nosferatu', weight: 3 },
          { clanId: 'tremere', weight: 2 },
        ],
      },
      {
        id: 'q23b',
        text: 'Бремя — иногда лучше не знать',
        icon: '😔',
        weights: [
          { clanId: 'salubri', weight: 2 },
          { clanId: 'toreador', weight: 2 },
          { clanId: 'gangrel', weight: 1 },
        ],
      },
      {
        id: 'q23c',
        text: 'Оружие — знание чужих слабостей даёт преимущество',
        icon: '🗡️',
        weights: [
          { clanId: 'lasombra', weight: 2 },
          { clanId: 'ministry', weight: 2 },
          { clanId: 'ventrue', weight: 1 },
        ],
      },
      {
        id: 'q23d',
        text: 'Источник вдохновения — чужие истории завораживают',
        icon: '🌀',
        weights: [
          { clanId: 'malkavian', weight: 3 },
          { clanId: 'hecata', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q24',
    title: 'Природа',
    text: 'Природа и животные для тебя — это...',
    tier: 3,
    answers: [
      {
        id: 'q24a',
        text: 'Родная стихия — среди зверей я чувствую себя свободнее, чем среди людей',
        icon: '🐺',
        weights: [
          { clanId: 'gangrel', weight: 3 },
          { clanId: 'nosferatu', weight: 2 },
        ],
      },
      {
        id: 'q24b',
        text: 'Объект изучения — в природе скрыты тайны жизни и смерти',
        icon: '🔬',
        weights: [
          { clanId: 'tremere', weight: 2 },
          { clanId: 'hecata', weight: 2 },
          { clanId: 'salubri', weight: 1 },
        ],
      },
      {
        id: 'q24c',
        text: 'Ресурс — земля, территория, владения нужно защищать',
        icon: '🏰',
        weights: [
          { clanId: 'tzimisce', weight: 3 },
          { clanId: 'ventrue', weight: 2 },
        ],
      },
      {
        id: 'q24d',
        text: 'Фон — город интереснее любого леса',
        icon: '🌃',
        weights: [
          { clanId: 'toreador', weight: 2 },
          { clanId: 'lasombra', weight: 2 },
          { clanId: 'ravnos', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q25',
    title: 'Справедливость',
    text: 'Справедливость — это...',
    tier: 3,
    answers: [
      {
        id: 'q25a',
        text: 'Защита невинных — сильные должны помогать слабым',
        icon: '⚖️',
        weights: [
          { clanId: 'salubri', weight: 3 },
          { clanId: 'brujah', weight: 2 },
        ],
      },
      {
        id: 'q25b',
        text: 'Иллюзия — есть только сила и слабость',
        icon: '🐍',
        weights: [
          { clanId: 'lasombra', weight: 3 },
          { clanId: 'ministry', weight: 2 },
        ],
      },
      {
        id: 'q25c',
        text: 'То, за что стоит бороться, даже если шансы невелики',
        icon: '🔥',
        weights: [
          { clanId: 'brujah', weight: 3 },
          { clanId: 'gangrel', weight: 2 },
        ],
      },
      {
        id: 'q25d',
        text: 'Вопрос перспективы — у каждого своя правда',
        icon: '🌀',
        weights: [
          { clanId: 'malkavian', weight: 2 },
          { clanId: 'ravnos', weight: 2 },
          { clanId: 'ventrue', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q26',
    title: 'Риск',
    text: 'Риск для тебя — это...',
    tier: 3,
    answers: [
      {
        id: 'q26a',
        text: 'Топливо жизни — без риска нет награды',
        icon: '🎲',
        weights: [
          { clanId: 'ravnos', weight: 3 },
          { clanId: 'brujah', weight: 2 },
        ],
      },
      {
        id: 'q26b',
        text: 'Необходимое зло — рискую только когда есть план',
        icon: '📋',
        weights: [
          { clanId: 'tremere', weight: 2 },
          { clanId: 'ventrue', weight: 2 },
          { clanId: 'lasombra', weight: 1 },
        ],
      },
      {
        id: 'q26c',
        text: 'То, что другие берут на себя, пока я наблюдаю',
        icon: '👁️',
        weights: [
          { clanId: 'nosferatu', weight: 2 },
          { clanId: 'ministry', weight: 2 },
          { clanId: 'hecata', weight: 1 },
        ],
      },
      {
        id: 'q26d',
        text: 'Вызов природе — выживает сильнейший',
        icon: '🐾',
        weights: [
          { clanId: 'gangrel', weight: 3 },
          { clanId: 'lasombra', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q27',
    title: 'Внешность',
    text: 'Внешность — это...',
    tier: 3,
    answers: [
      {
        id: 'q27a',
        text: 'Моё главное оружие — я знаю силу красоты',
        icon: '💋',
        weights: [
          { clanId: 'toreador', weight: 3 },
          { clanId: 'ministry', weight: 2 },
        ],
      },
      {
        id: 'q27b',
        text: 'Холст для самовыражения — я меняюсь как хочу',
        icon: '🎨',
        weights: [
          { clanId: 'tzimisce', weight: 3 },
          { clanId: 'ravnos', weight: 2 },
        ],
      },
      {
        id: 'q27c',
        text: 'Не главное — важно то, что внутри',
        icon: '🧠',
        weights: [
          { clanId: 'salubri', weight: 2 },
          { clanId: 'malkavian', weight: 2 },
          { clanId: 'tremere', weight: 1 },
        ],
      },
      {
        id: 'q27d',
        text: 'Проклятие — внешность может быть тюрьмой',
        icon: '😶',
        weights: [
          { clanId: 'nosferatu', weight: 3 },
          { clanId: 'hecata', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q28',
    title: 'Одиночество',
    text: 'Одиночество для тебя — это...',
    tier: 3,
    answers: [
      {
        id: 'q28a',
        text: 'Свобода — наедине с собой я наиболее продуктивен',
        icon: '🌙',
        weights: [
          { clanId: 'gangrel', weight: 3 },
          { clanId: 'nosferatu', weight: 2 },
        ],
      },
      {
        id: 'q28b',
        text: 'Источник видений и озарений',
        icon: '🔮',
        weights: [
          { clanId: 'malkavian', weight: 3 },
          { clanId: 'salubri', weight: 2 },
        ],
      },
      {
        id: 'q28c',
        text: 'Неизбежная цена за то, кто ты есть',
        icon: '🏰',
        weights: [
          { clanId: 'tzimisce', weight: 2 },
          { clanId: 'hecata', weight: 2 },
          { clanId: 'tremere', weight: 1 },
        ],
      },
      {
        id: 'q28d',
        text: 'Страдание — мне нужны люди вокруг',
        icon: '💃',
        weights: [
          { clanId: 'toreador', weight: 2 },
          { clanId: 'brujah', weight: 2 },
          { clanId: 'ministry', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q29',
    title: 'Вера',
    text: 'Вера и духовность — это...',
    tier: 3,
    answers: [
      {
        id: 'q29a',
        text: 'Путь к высшей истине и просветлению',
        icon: '☽',
        weights: [
          { clanId: 'ministry', weight: 3 },
          { clanId: 'salubri', weight: 2 },
        ],
      },
      {
        id: 'q29b',
        text: 'Инструмент управления массами',
        icon: '📿',
        weights: [
          { clanId: 'ventrue', weight: 2 },
          { clanId: 'lasombra', weight: 2 },
          { clanId: 'tremere', weight: 1 },
        ],
      },
      {
        id: 'q29c',
        text: 'Связь с миром мёртвых и потусторонним',
        icon: '💀',
        weights: [
          { clanId: 'hecata', weight: 3 },
          { clanId: 'malkavian', weight: 2 },
        ],
      },
      {
        id: 'q29d',
        text: 'Личное дело каждого — я верю в себя',
        icon: '💪',
        weights: [
          { clanId: 'brujah', weight: 2 },
          { clanId: 'gangrel', weight: 2 },
          { clanId: 'ravnos', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'vtm-q30',
    title: 'Наследие',
    text: 'То, что ты оставишь после себя — это...',
    tier: 3,
    answers: [
      {
        id: 'q30a',
        text: 'Империя — организация, структура, порядок',
        icon: '🏛️',
        weights: [
          { clanId: 'ventrue', weight: 3 },
          { clanId: 'lasombra', weight: 2 },
        ],
      },
      {
        id: 'q30b',
        text: 'Произведения — красота, что переживёт века',
        icon: '🎭',
        weights: [
          { clanId: 'toreador', weight: 3 },
          { clanId: 'tzimisce', weight: 2 },
        ],
      },
      {
        id: 'q30c',
        text: 'Ученики — те, кого ты обучил и вдохновил',
        icon: '📖',
        weights: [
          { clanId: 'salubri', weight: 2 },
          { clanId: 'tremere', weight: 2 },
          { clanId: 'ministry', weight: 1 },
        ],
      },
      {
        id: 'q30d',
        text: 'Легенды — истории, которые будут рассказывать о тебе',
        icon: '🌟',
        weights: [
          { clanId: 'ravnos', weight: 2 },
          { clanId: 'brujah', weight: 2 },
          { clanId: 'hecata', weight: 1 },
        ],
      },
    ],
  },
];

export function getQuestionsForLevel(level: QuizLevel): VtmQuizQuestion[] {
  const maxTier = level === 'quick' ? 1 : level === 'medium' ? 2 : 3;
  return VTM_QUIZ_QUESTIONS.filter(q => q.tier <= maxTier);
}
