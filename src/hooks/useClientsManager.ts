import { useReducer, useCallback, useMemo } from 'react';
import { clientReducer } from '../config/clientReducer';
import { initialState } from '../config/mock-data';
import { getAISuggestions } from '../config/mock-data';
import type { Client, ClientInteraction } from '../types';

export function useClientsManager() {
  const [state, dispatch] = useReducer(clientReducer, initialState);

  const handleCall = useCallback((phone: string) => {
    window.location.href = `tel:${phone}`;
  }, []);

  const handleWhatsApp = useCallback((phone: string) => {
    const formattedPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${formattedPhone}`, '_blank');
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

  const handleEditPreferences = useCallback((preferences: Client['preferences']) => {
    dispatch({ type: 'START_EDITING_PREFERENCES', payload: preferences });
  }, []);

  const handleSavePreferences = useCallback(() => {
    dispatch({ type: 'SAVE_PREFERENCES' });
  }, []);

  const handleCancelEdit = useCallback(() => {
    dispatch({ type: 'CANCEL_EDITING_PREFERENCES' });
  }, []);

  const togglePreferences = useCallback(() => {
    dispatch({ type: 'TOGGLE_PREFERENCES' });
  }, []);

  const toggleInteractions = useCallback(() => {
    dispatch({ type: 'TOGGLE_INTERACTIONS' });
  }, []);

  const handleSaveInteraction = useCallback((interaction: ClientInteraction) => {
    console.log('New interaction:', interaction);
    dispatch({ type: 'TOGGLE_NEW_INTERACTION' });
  }, []);

  const togglePreference = useCallback((category: any, value: string) => {
    dispatch({
      type: 'TOGGLE_PREFERENCE',
      payload: { category, value }
    });
  }, []);

  const setClientDetails = useCallback((clientId: string | null) => {
    dispatch({ type: 'SET_CLIENT_DETAILS', payload: clientId });
  }, []);

  const aiSuggestions = useMemo(() => getAISuggestions(), []);

  return {
    state,
    handlers: {
      handleCall,
      handleWhatsApp,
      toggleForm,
      toggleNewInteraction,
      toggleAIModal,
      setSearchTerm,
      handleEditPreferences,
      handleSavePreferences,
      handleCancelEdit,
      togglePreferences,
      toggleInteractions,
      handleSaveInteraction,
      togglePreference,
      setClientDetails
    },
    aiSuggestions
  };
}