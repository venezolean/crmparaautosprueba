import React from 'react';
import { useClients } from '../hooks/useClients';
import ClientsHeader from '../components/clients/ClientsHeader';
import ClientsList from '../components/clients/ClientsList';
import ClientMobileList from '../components/clients/ClientMobileList';
import ClientSearch from '../components/clients/ClientSearch';
import ClientDetailsModal from '../components/clients/ClientDetailsModal';
import NewClientForm from '../components/clients/NewClientForm';
import ClientInteractionForm from '../components/clients/ClientInteractionForm';
import ClientAIAssistantModal from '../components/clients/ClientAIAssistantModal';
import { getAISuggestions } from '../mocks/mockData';

export default function Clients() {
  const {
    state,
    filteredClients,
    selectedClient,
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
  } = useClients();

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ClientsHeader 
        onNewClient={toggleForm} 
        onOpenAI={toggleAIModal} 
      />

      <ClientSearch 
        value={state.searchTerm} 
        onChange={setSearchTerm} 
      />

      {/* Mobile View */}
      <div className="block sm:hidden">
        <ClientMobileList
          clients={filteredClients}
          onSelect={selectClient}
          onCall={handleCall}
          onWhatsApp={handleWhatsApp}
        />
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <ClientsList
          clients={filteredClients}
          onSelect={selectClient}
          onCall={handleCall}
          onWhatsApp={handleWhatsApp}
        />
      </div>

      {/* Modals */}
      {selectedClient && (
        <ClientDetailsModal
          client={selectedClient}
          showPreferences={state.showPreferences}
          showInteractions={state.showInteractions}
          editingPreferences={state.editingPreferences}
          tempPreferences={state.tempPreferences}
          onClose={() => selectClient(null)}
          onCall={handleCall}
          onWhatsApp={handleWhatsApp}
          onTogglePreferences={togglePreferences}
          onToggleInteractions={toggleInteractions}
          onEditPreferences={() => startEditingPreferences(selectedClient.preferences)}
          onSavePreferences={() => savePreferences(selectedClient.id, state.tempPreferences!)}
          onCancelEdit={cancelEditingPreferences}
          onTogglePreference={(category, value) => {
            // This will be handled by the reducer
          }}
          onNewInteraction={toggleNewInteraction}
        />
      )}

      {state.showForm && (
        <NewClientForm
          onClose={toggleForm}
          onSave={toggleForm}
        />
      )}

      {state.showNewInteraction && selectedClient && (
        <ClientInteractionForm
          onSave={(interaction) => {
            addInteraction(selectedClient.id, interaction);
            toggleNewInteraction();
          }}
          onClose={toggleNewInteraction}
        />
      )}

      <ClientAIAssistantModal
        isOpen={state.showAIModal}
        suggestions={getAISuggestions()}
        onClose={toggleAIModal}
      />
    </div>
  );
}