import type { Reason } from './index'   // ajusta la ruta si tu tipo está en otro lado

export type ReasonAction =
  | { type: 'ADD_REASON'; payload: Reason }
  | { type: 'DELETE_REASON'; payload: string }
  | { type: 'RESET_REASONS' };

export const reasonsReducer = (state: Reason[], action: ReasonAction): Reason[] => {
  switch (action.type) {
    case 'ADD_REASON':
      return [...state, action.payload];
    case 'DELETE_REASON':
      return state.filter(r => r.value !== action.payload);
    case 'RESET_REASONS':
      return [];
    default:
      return state;
  }
};
