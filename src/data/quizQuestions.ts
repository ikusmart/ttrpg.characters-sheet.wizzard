import type { QuizQuestion } from '@/models/quiz';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    title: 'Стиль боя',
    text: 'В бою ты бы предпочёл...',
    answers: [
      {
        id: 'q1a',
        text: 'Встретить врага лицом к лицу с мечом в руке',
        icon: '⚔️',
        weights: [
          { classId: 'fighter', weight: 3 },
          { classId: 'paladin', weight: 2 },
          { classId: 'barbarian', weight: 2 },
        ],
      },
      {
        id: 'q1b',
        text: 'Держаться на расстоянии и наносить точные удары',
        icon: '🏹',
        weights: [
          { classId: 'ranger', weight: 3 },
          { classId: 'rogue', weight: 2 },
          { classId: 'monk', weight: 1 },
        ],
      },
      {
        id: 'q1c',
        text: 'Обрушить на врагов мощное заклинание',
        icon: '✨',
        weights: [
          { classId: 'wizard', weight: 3 },
          { classId: 'sorcerer', weight: 2 },
          { classId: 'warlock', weight: 2 },
        ],
      },
      {
        id: 'q1d',
        text: 'Скрыться в тени и ударить в спину',
        icon: '🗡️',
        weights: [
          { classId: 'rogue', weight: 3 },
          { classId: 'ranger', weight: 1 },
          { classId: 'monk', weight: 2 },
        ],
      },
    ],
  },
  {
    id: 'q2',
    title: 'Отношение к магии',
    text: 'Магия для тебя — это...',
    answers: [
      {
        id: 'q2a',
        text: 'Ничего особенного. Я полагаюсь на свою силу и мастерство',
        icon: '💪',
        weights: [
          { classId: 'fighter', weight: 3 },
          { classId: 'barbarian', weight: 3 },
          { classId: 'monk', weight: 1 },
        ],
      },
      {
        id: 'q2b',
        text: 'Дар свыше — сила для защиты и исцеления',
        icon: '🙏',
        weights: [
          { classId: 'cleric', weight: 3 },
          { classId: 'paladin', weight: 2 },
          { classId: 'druid', weight: 1 },
        ],
      },
      {
        id: 'q2c',
        text: 'Наука и тайное знание, которое нужно изучать',
        icon: '📖',
        weights: [
          { classId: 'wizard', weight: 3 },
          { classId: 'warlock', weight: 2 },
          { classId: 'sorcerer', weight: 1 },
        ],
      },
      {
        id: 'q2d',
        text: 'Часть природы — стихии, звери, леса',
        icon: '🌿',
        weights: [
          { classId: 'druid', weight: 3 },
          { classId: 'ranger', weight: 2 },
          { classId: 'barbarian', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'q3',
    title: 'Роль в команде',
    text: 'В группе приключенцев ты...',
    answers: [
      {
        id: 'q3a',
        text: 'Впереди всех — принимаешь удар на себя',
        icon: '🛡️',
        weights: [
          { classId: 'fighter', weight: 2 },
          { classId: 'barbarian', weight: 3 },
          { classId: 'paladin', weight: 2 },
        ],
      },
      {
        id: 'q3b',
        text: 'Поддерживаешь союзников — лечишь и усиливаешь',
        icon: '💚',
        weights: [
          { classId: 'cleric', weight: 3 },
          { classId: 'bard', weight: 2 },
          { classId: 'druid', weight: 2 },
        ],
      },
      {
        id: 'q3c',
        text: 'Наносишь максимальный урон — враги должны падать быстро',
        icon: '💥',
        weights: [
          { classId: 'rogue', weight: 2 },
          { classId: 'warlock', weight: 2 },
          { classId: 'sorcerer', weight: 2 },
          { classId: 'ranger', weight: 1 },
        ],
      },
      {
        id: 'q3d',
        text: 'Планируешь и вдохновляешь — команда побеждает вместе',
        icon: '🎵',
        weights: [
          { classId: 'bard', weight: 3 },
          { classId: 'wizard', weight: 2 },
          { classId: 'paladin', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'q4',
    title: 'Решение проблем',
    text: 'Столкнувшись с запертой дверью, ты...',
    answers: [
      {
        id: 'q4a',
        text: 'Выбьешь её ногой — зачем тратить время?',
        icon: '🦶',
        weights: [
          { classId: 'barbarian', weight: 3 },
          { classId: 'fighter', weight: 2 },
        ],
      },
      {
        id: 'q4b',
        text: 'Попробуешь договориться со стражником или обмануть его',
        icon: '🗣️',
        weights: [
          { classId: 'bard', weight: 3 },
          { classId: 'rogue', weight: 1 },
          { classId: 'warlock', weight: 1 },
          { classId: 'paladin', weight: 1 },
        ],
      },
      {
        id: 'q4c',
        text: 'Изучишь замок и найдёшь способ открыть без шума',
        icon: '🔓',
        weights: [
          { classId: 'rogue', weight: 3 },
          { classId: 'wizard', weight: 1 },
          { classId: 'ranger', weight: 1 },
          { classId: 'monk', weight: 1 },
        ],
      },
      {
        id: 'q4d',
        text: 'Используешь магию или попросишь духов помочь',
        icon: '🔮',
        weights: [
          { classId: 'wizard', weight: 2 },
          { classId: 'sorcerer', weight: 2 },
          { classId: 'druid', weight: 2 },
          { classId: 'cleric', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'q5',
    title: 'Философия боя',
    text: 'Идеальный бой для тебя — это...',
    answers: [
      {
        id: 'q5a',
        text: 'Честный поединок один на один с достойным противником',
        icon: '⚖️',
        weights: [
          { classId: 'fighter', weight: 3 },
          { classId: 'paladin', weight: 2 },
          { classId: 'monk', weight: 2 },
        ],
      },
      {
        id: 'q5b',
        text: 'Продуманная засада с идеальной позицией',
        icon: '🎯',
        weights: [
          { classId: 'ranger', weight: 3 },
          { classId: 'rogue', weight: 2 },
          { classId: 'wizard', weight: 1 },
        ],
      },
      {
        id: 'q5c',
        text: 'Волна огня, сметающая десятки врагов',
        icon: '🔥',
        weights: [
          { classId: 'sorcerer', weight: 3 },
          { classId: 'wizard', weight: 2 },
          { classId: 'warlock', weight: 1 },
        ],
      },
      {
        id: 'q5d',
        text: 'Яростная схватка где ты сильнее всех',
        icon: '💢',
        weights: [
          { classId: 'barbarian', weight: 3 },
          { classId: 'fighter', weight: 1 },
          { classId: 'monk', weight: 1 },
          { classId: 'druid', weight: 1 },
        ],
      },
    ],
  },
  {
    id: 'q6',
    title: 'Фантазия героя',
    text: 'Тебя больше всего привлекает образ...',
    answers: [
      {
        id: 'q6a',
        text: 'Благородного воина в сверкающих доспехах, защитника слабых',
        icon: '✝️',
        weights: [
          { classId: 'paladin', weight: 3 },
          { classId: 'fighter', weight: 2 },
          { classId: 'cleric', weight: 1 },
        ],
      },
      {
        id: 'q6b',
        text: 'Таинственного мага, повелевающего силами, которые другие не понимают',
        icon: '🌑',
        weights: [
          { classId: 'warlock', weight: 3 },
          { classId: 'wizard', weight: 2 },
          { classId: 'sorcerer', weight: 2 },
        ],
      },
      {
        id: 'q6c',
        text: 'Хранителя дикой природы, друга зверей и повелителя стихий',
        icon: '🐺',
        weights: [
          { classId: 'druid', weight: 3 },
          { classId: 'ranger', weight: 2 },
          { classId: 'barbarian', weight: 1 },
        ],
      },
      {
        id: 'q6d',
        text: 'Ловкого искателя приключений, всегда на шаг впереди',
        icon: '🃏',
        weights: [
          { classId: 'rogue', weight: 2 },
          { classId: 'bard', weight: 2 },
          { classId: 'monk', weight: 2 },
          { classId: 'ranger', weight: 1 },
        ],
      },
    ],
  },
];
