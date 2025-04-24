// src/config/clientReducer.ts

import { initialState } from './mock-data';
import type { Client } from '../types';
import { preferenceOptions } from '../config';

export type Action =
  | { type: 'TOGGLE_FORM' }
  | { type: 'SET_CLIENT_DETAILS'; payload: string | null }
  | { type: 'TOGGLE_NEW_INTERACTION' }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'START_EDITING_PREFERENCES'; payload: Client['preferences'] }
  | { type: 'CANCEL_EDITING_PREFERENCES' }
  | { type: 'SAVE_PREFERENCES' }
  | { type: 'TOGGLE_AI_MODAL' }
  | { type: 'TOGGLE_PREFERENCES' }
  | { type: 'TOGGLE_INTERACTIONS' }
  | {
      type: 'TOGGLE_PREFERENCE';
      payload: {
        category: keyof typeof preferenceOptions;
        value: string;
      };
    };

export function clientReducer(
  state: typeof initialState,
  action: Action
): typeof initialState {
  switch (action.type) {
    case 'TOGGLE_PREFERENCE': {
      if (!state.tempPreferences) return state;
      const { category, value } = action.payload;
      const current = [...(state.tempPreferences[category] as string[])];
      const idx = current.indexOf(value);
      if (idx === -1) current.push(value);
      else current.splice(idx, 1);
      return {
        ...state,
        tempPreferences: {
          ...state.tempPreferences,
          [category]: current,
        },
      };
    }

    case 'TOGGLE_FORM':
      return { ...state, showForm: !state.showForm };

    case 'SET_CLIENT_DETAILS':
      return { ...state, showClientDetails: action.payload };

    case 'TOGGLE_NEW_INTERACTION':
      return { ...state, showNewInteraction: !state.showNewInteraction };

    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };

    case 'START_EDITING_PREFERENCES':
      return {
        ...state,
        editingPreferences: true,
        tempPreferences: action.payload,
      };

    case 'CANCEL_EDITING_PREFERENCES':
    case 'SAVE_PREFERENCES':
      return { ...state, editingPreferences: false, tempPreferences: null };

    case 'TOGGLE_AI_MODAL':
      return { ...state, showAIModal: !state.showAIModal };

    case 'TOGGLE_PREFERENCES':
      return { ...state, showPreferences: !state.showPreferences };

    case 'TOGGLE_INTERACTIONS':
      return { ...state, showInteractions: !state.showInteractions };

    default:
      return state;
  }
}
