import type { WizardState, WizardAction } from '@/models/vtm/wizardState';
import { PREDATOR_TYPES } from '@/data/vtm/predatorTypes';

const TOTAL_STEPS = 8;

export function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, TOTAL_STEPS - 1) };

    case 'PREV_STEP':
      return { ...state, step: Math.max(state.step - 1, 0) };

    case 'SET_CLAN':
      return { ...state, clanId: action.clanId };

    case 'SET_PREDATOR_TYPE': {
      const pt = PREDATOR_TYPES.find((p) => p.id === action.predatorTypeId);
      const merits = pt
        ? [{ name: pt.merit, nameEn: pt.merit, dots: 2, description: '' }]
        : [];
      const flaws = pt
        ? [{ name: pt.flaw, nameEn: pt.flaw, dots: 1, description: '' }]
        : [];
      return { ...state, predatorTypeId: action.predatorTypeId, merits, flaws };
    }

    case 'SET_ATTRIBUTE_PRIORITY':
      return { ...state, attributePriority: action.priority };

    case 'SET_ATTRIBUTE':
      return {
        ...state,
        attributes: { ...state.attributes, [action.attribute]: action.value },
      };

    case 'SET_SKILL':
      return {
        ...state,
        skills: { ...state.skills, [action.skill]: action.value },
      };

    case 'SET_DISCIPLINE':
      return {
        ...state,
        disciplines: { ...state.disciplines, [action.discipline]: action.value },
      };

    case 'ADD_MERIT':
      return {
        ...state,
        merits: [...state.merits, { name: '', nameEn: '', dots: 1, description: '' }],
      };

    case 'REMOVE_MERIT':
      return {
        ...state,
        merits: state.merits.filter((_, i) => i !== action.index),
      };

    case 'UPDATE_MERIT': {
      const updated = state.merits.map((m, i) =>
        i === action.index ? { ...m, [action.field]: action.value } : m
      );
      return { ...state, merits: updated };
    }

    case 'ADD_FLAW':
      return {
        ...state,
        flaws: [...state.flaws, { name: '', nameEn: '', dots: 1, description: '' }],
      };

    case 'REMOVE_FLAW':
      return {
        ...state,
        flaws: state.flaws.filter((_, i) => i !== action.index),
      };

    case 'UPDATE_FLAW': {
      const updated = state.flaws.map((f, i) =>
        i === action.index ? { ...f, [action.field]: action.value } : f
      );
      return { ...state, flaws: updated };
    }

    case 'ADD_BACKGROUND':
      return {
        ...state,
        backgrounds: [...state.backgrounds, { name: '', nameEn: '', dots: 1, description: '' }],
      };

    case 'REMOVE_BACKGROUND':
      return {
        ...state,
        backgrounds: state.backgrounds.filter((_, i) => i !== action.index),
      };

    case 'UPDATE_BACKGROUND': {
      const updated = state.backgrounds.map((b, i) =>
        i === action.index ? { ...b, [action.field]: action.value } : b
      );
      return { ...state, backgrounds: updated };
    }

    case 'SET_IDENTITY_FIELD':
      return { ...state, [action.field]: action.value };

    case 'ADD_CONVICTION':
      return { ...state, convictions: [...state.convictions, ''] };

    case 'REMOVE_CONVICTION':
      return {
        ...state,
        convictions: state.convictions.filter((_, i) => i !== action.index),
      };

    case 'UPDATE_CONVICTION': {
      const updated = state.convictions.map((c, i) => (i === action.index ? action.value : c));
      return { ...state, convictions: updated };
    }

    case 'ADD_TOUCHSTONE':
      return { ...state, touchstones: [...state.touchstones, ''] };

    case 'REMOVE_TOUCHSTONE':
      return {
        ...state,
        touchstones: state.touchstones.filter((_, i) => i !== action.index),
      };

    case 'UPDATE_TOUCHSTONE': {
      const updated = state.touchstones.map((t, i) => (i === action.index ? action.value : t));
      return { ...state, touchstones: updated };
    }

    default:
      return state;
  }
}
