// reducers/stagesReducer.ts
import { Stage } from "./mock-stages"; // Asegurate que tenés este tipo definido

type Action =
  | { type: 'ADD_STAGE'; payload: Stage }
  | { type: 'DELETE_STAGE'; payload: string }
  | { type: 'RESET_STAGE' };

export const stagesReducer = (state: Stage[], action: Action): Stage[] => {
  switch (action.type) {
    case 'ADD_STAGE':
      return [...state, action.payload];
    case 'DELETE_STAGE':
      return state.filter(stage => stage.id !== action.payload);
    case 'RESET_STAGE':
      return [];
    default:
      return state;
  }
};
