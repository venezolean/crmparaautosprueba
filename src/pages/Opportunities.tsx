import React, { useState } from 'react';
import { Plus, ChevronRight, ChevronDown, Users, X, MoveRight, Bot } from 'lucide-react';
import type { Opportunity, Client } from '../types';
import { stages } from '../config/mock-stages';
import AIAssistantModal from '../components/AIAssistantModal';

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    dni: '12345678',
    phone: '+54 911 1234-5678',
    email: 'juan@email.com',
    address: 'Av. Libertador 1234',
    work_info: 'Empresario',
    preferences: {
      vehicleType: ['SUV'],
      transmission: ['Automática'],
      fuelType: ['Nafta'],
      yearRange: ['2024'],
      brand: ['Volkswagen'],
      budget: '8-12M',
      acceptsTrade: true,
      carCondition: 'Solo 0km',
      savingsPlan: 'Nunca tuvo',
      vehicleUse: ['Personal', 'Familia'],
      urgency: 'Próximo mes',
      location: 'Buenos Aires'
    },
    interactions: []
  },
  {
    id: '2',
    name: 'María García',
    dni: '87654321',
    phone: '+54 911 8765-4321',
    email: 'maria@email.com',
    address: 'Calle Florida 567',
    work_info: 'Abogada',
    preferences: {
      vehicleType: ['Sedan'],
      transmission: ['Manual'],
      fuelType: ['Nafta'],
      yearRange: ['2023'],
      brand: ['Chevrolet'],
      budget: '5-8M',
      acceptsTrade: false,
      carCondition: 'Ambos',
      savingsPlan: 'Nunca tuvo',
      vehicleUse: ['Personal'],
      urgency: 'Explorando',
      location: 'Córdoba'
    },
    interactions: []
  }
];

export default function Opportunities() {
  const [showForm, setShowForm] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [expandedClient, setExpandedClient] = useState<string | null>(null);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: '1',
      client_id: '1',
      seller_id: '1',
      stage: 'contact',
      estimated_value: 25000,
      next_action: 'Llamar para coordinar test drive',
      notes: 'Interesado en VW Golf',
      created_at: new Date('2024-03-10')
    },
    {
      id: '2',
      client_id: '2',
      seller_id: '1',
      stage: 'test_drive',
      estimated_value: 32000,
      next_action: 'Enviar cotización final',
      notes: 'Test drive realizado, muy interesada',
      created_at: new Date('2024-03-12')
    }
  ]);
  const [showStageChange, setShowStageChange] = useState<string | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
    setShowClientModal(false);
  };

  const handleStageChange = (opportunityId: string, newStage: string) => {
    setOpportunities(opportunities.map(opp => 
      opp.id === opportunityId ? { ...opp, stage: newStage } : opp
    ));
    setShowStageChange(null);
  };

  const getAISuggestions = () => {
    return [
      "2 oportunidades en etapa de negociación necesitan seguimiento urgente.",
      "La tasa de conversión de test drive a venta ha aumentado un 15% este mes.",
      "Considera mover la oportunidad de Juan Pérez a etapa de cierre.",
      "3 clientes han mostrado interés en financiación esta semana.",
    ];
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Oportunidades</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowAIModal(true)}
            className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-200"
          >
            <Bot className="w-5 h-5 mr-2" />
            Asistente IA
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nueva Oportunidad
          </button>
        </div>
      </div>

      {/* Pipeline View */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stages.map((stage) => (
          <div key={stage.id} className="bg-white rounded-lg shadow">
            <div className={`${stage.color} h-2 rounded-t-lg`} />
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                {stage.name}
                <span className="ml-2 text-sm text-gray-500">
                  ({opportunities.filter(opp => opp.stage === stage.id).length})
                </span>
              </h3>
              <div className="space-y-3">
                {opportunities
                  .filter((opp) => opp.stage === stage.id)
                  .map((opportunity) => {
                    const client = mockClients.find(c => c.id === opportunity.client_id);
                    return (
                      <div
                        key={opportunity.id}
                        className="bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors relative group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-800">
                            {client?.name}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-green-600">
                              ${opportunity.estimated_value.toLocaleString()}
                            </span>
                            <button
                              onClick={() => setShowStageChange(opportunity.id)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                            >
                              <MoveRight className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {opportunity.notes}
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>Próxima acción:</span>
                          <ChevronRight className="w-4 h-4 mx-1" />
                          <span>{opportunity.next_action}</span>
                        </div>

                        {/* Stage Change Dropdown */}
                        {showStageChange === opportunity.id && (
                          <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border z-20 w-48">
                            {stages.map((s) => (
                              <button
                                key={s.id}
                                onClick={() => handleStageChange(opportunity.id, s.id)}
                                className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                                  s.id === opportunity.stage ? 'bg-gray-50 font-medium' : ''
                                }`}
                              >
                                {s.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Client Selection Modal */}
      {showClientModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Seleccionar Cliente</h3>
                <button 
                  onClick={() => setShowClientModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2">
                {mockClients.map((client) => (
                  <div key={client.id} className="border rounded-lg">
                    <button
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                      onClick={() => expandedClient === client.id ? setExpandedClient(null) : setExpandedClient(client.id)}
                    >
                      <span className="font-medium">{client.name}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${expandedClient === client.id ? 'transform rotate-180' : ''}`} />
                    </button>
                    {expandedClient === client.id && (
                      <div className="px-4 py-3 border-t bg-gray-50">
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>DNI: {client.dni}</p>
                          <p>Email: {client.email}</p>
                          <p>Teléfono: {client.phone}</p>
                          <button
                            onClick={() => handleClientSelect(client)}
                            className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                          >
                            Seleccionar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Opportunity Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Nueva Oportunidad</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cliente</label>
                  {selectedClient ? (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{selectedClient.name}</p>
                        <p className="text-sm text-gray-500">{selectedClient.email}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowClientModal(true)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Cambiar
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowClientModal(true)}
                      className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700"
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Seleccionar Cliente
                    </button>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Etapa</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {stages.map((stage) => (
                      <option key={stage.id} value={stage.id}>
                        {stage.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valor Estimado</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Próxima Acción</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Llamar para coordinar visita"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notas</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Detalles adicionales..."
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        suggestions={getAISuggestions()}
      />
    </div>
  );
}