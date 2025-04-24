import type { ClientsState } from '../types';

export const initialClientsState: ClientsState = {
  clients: [],
  selectedClientId: null,
  showForm: false,
  showNewInteraction: false,
  showAIModal: false,
  searchTerm: '',
  editingPreferences: false,
  tempPreferences: null,
  showPreferences: true,
  showInteractions: true,
  loading: false,
  error: null,
};