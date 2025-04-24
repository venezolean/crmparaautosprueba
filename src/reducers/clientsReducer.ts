import type { ClientsState, ClientsAction } from '../types';

export function clientsReducer(state: ClientsState, action: ClientsAction): ClientsState {
  switch (action.type) {
    case 'SET_CLIENTS':
      return { ...state, clients: action.payload };

    case 'SELECT_CLIENT':
      return { ...state, selectedClientId: action.payload };

    case 'TOGGLE_FORM':
      return { ...state, showForm: !state.showForm };

    case 'TOGGLE_NEW_INTERACTION':
      return { ...state, showNewInteraction: !state.showNewInteraction };

    case 'TOGGLE_AI_MODAL':
      return { ...state, showAIModal: !state.showAIModal };

    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };

    case 'START_EDITING_PREFERENCES':
      return {
        ...state,
        editingPreferences: true,
        tempPreferences: action.payload,
      };

    case 'SAVE_PREFERENCES':
      return {
        ...state,
        editingPreferences: false,
        tempPreferences: null,
        clients: state.clients.map(client =>
          client.id === action.payload.clientId
            ? { ...client, preferences: action.payload.preferences }
            : client
        ),
      };

    case 'CANCEL_EDITING_PREFERENCES':
      return {
        ...state,
        editingPreferences: false,
        tempPreferences: null,
      };

    case 'TOGGLE_PREFERENCES':
      return { ...state, showPreferences: !state.showPreferences };

    case 'TOGGLE_INTERACTIONS':
      return { ...state, showInteractions: !state.showInteractions };

    case 'ADD_INTERACTION':
      return {
        ...state,
        clients: state.clients.map(client =>
          client.id === action.payload.clientId
            ? {
                ...client,
                interactions: [...client.interactions, action.payload.interaction],
              }
            : client
        ),
      };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
}