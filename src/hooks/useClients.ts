import { useReducer, useCallback, useMemo } from 'react';
import type { Client, ClientInteraction, ClientPreferences } from '../types';
import { clientsReducer } from '../reducers/clientsReducer';
import { initialClientsState } from '../state/initialClientsState';

export function useClients() {
  const [state, dispatch] = useReducer(clientsReducer, initialClientsState);

  const selectedClient = useMemo(() => {
    return state.clients.find(client => client.id === state.selectedClientId);
  }, [state.clients, state.selectedClientId]);

  const filteredClients = useMemo(() => {
    return state.clients.filter(client =>
      client.name.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }, [state.clients, state.searchTerm]);

  const handleCall = useCallback((phone: string) => {
    window.location.href = `tel:${phone}`;
  }, []);

  const handleWhatsApp = useCallback((phone: string) => {
    const formattedPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${formattedPhone}`, '_blank');
  }, []);

  const selectClient = useCallback((clientId: string | null) => {
    dispatch({ type: 'SELECT_CLIENT', payload: clientId });
  }, []);

  const toggleForm = useCallback(() => {
    dispatch({ type: 'TOGGLE_FORM' });
  }, []);

  const toggleNewInteraction = useCallback(() => {
    dispatch({ type: 'TOGGLE_NEW_INTERACTION' });
  }, []);

  const toggleAIModal = useCallback(() => {
    dispatch({ type: 'TOGGLE_AI_MODAL' });
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  }, []);

  const startEditingPreferences = useCallback((preferences: ClientPreferences) => {
    dispatch({ type: 'START_EDITING_PREFERENCES', payload: preferences });
  }, []);

  const savePreferences = useCallback((clientId: string, preferences: ClientPreferences) => {
    dispatch({ type: 'SAVE_PREFERENCES', payload: { clientId, preferences } });
  }, []);

  const cancelEditingPreferences = useCallback(() => {
    dispatch({ type: 'CANCEL_EDITING_PREFERENCES' });
  }, []);

  const togglePreferences = useCallback(() => {
    dispatch({ type: 'TOGGLE_PREFERENCES' });
  }, []);

  const toggleInteractions = useCallback(() => {
    dispatch({ type: 'TOGGLE_INTERACTIONS' });
  }, []);

  const addInteraction = useCallback((clientId: string, interaction: ClientInteraction) => {
    dispatch({ type: 'ADD_INTERACTION', payload: { clientId, interaction } });
  }, []);

  return {
    state,
    selectedClient,
    filteredClients,
    handleCall,
    handleWhatsApp,
    selectClient,
    toggleForm,
    toggleNewInteraction,
    toggleAIModal,
    setSearchTerm,
    startEditingPreferences,
    savePreferences,
    cancelEditingPreferences,
    togglePreferences,
    toggleInteractions,
    addInteraction,
  };
}