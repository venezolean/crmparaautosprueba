import React from 'react';
import { useClientsManager } from '../hooks/useClientsManager';
import { mockClients } from '../config/mock-data';
import ClientsHeader from '../components/clients/ClientsHeader';
import ClientSearch from '../components/clients/ClientSearch';
import ClientsList from '../components/clients/ClientsList';
import ClientMobileList from '../components/clients/ClientMobileList';
import ClientDetailView from '../components/clients/ClientDetailView';
import ClientInteractionForm from '../components/ClientInteractionForm';
import NewClientForm from '../components/clients/NewClientForm';
import AIAssistantModal from '../components/AIAssistantModal';

export default function Clients() {
  const { state, handlers, aiSuggestions } = useClientsManager();

  const selectedClient = state.showClientDetails
    ? mockClients.find(c => c.id === state.showClientDetails)
    : null;

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ClientsHeader
        onNewClient={handlers.toggleForm}
        onOpenAI={handlers.toggleAIModal}
      />

      <ClientSearch
        value={state.searchTerm}
        onChange={handlers.setSearchTerm}
      />

      {/* Mobile View */}
      <div className="block sm:hidden">
        <ClientMobileList
          clients={mockClients}
          onSelect={handlers.setClientDetails}
          onCall={handlers.handleCall}
          onWhatsApp={handlers.handleWhatsApp}
        />
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <ClientsList
          clients={mockClients}
          onSelect={handlers.setClientDetails}
          onCall={handlers.handleCall}
          onWhatsApp={handlers.handleWhatsApp}
        />
      </div>

      {/* Client Details Modal */}
      {selectedClient && (
        <ClientDetailView
          client={selectedClient}
          state={state}
          handlers={handlers}
        />
      )}

      {/* New Interaction Modal */}
      {state.showNewInteraction && (
        <ClientInteractionForm
          onSave={handlers.handleSaveInteraction}
          onClose={handlers.toggleNewInteraction}
        />
      )}

      {/* Client Form Modal */}
      {state.showForm && (
        <NewClientForm
          onClose={handlers.toggleForm}
          onSave={() => {}}
        />
      )}

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={state.showAIModal}
        onClose={handlers.toggleAIModal}
        suggestions={aiSuggestions}
      />
    </div>
  );
}