import React, { useReducer } from 'react';
import { Plus, Search, Phone, MessageSquare, MapPin, Briefcase, Edit2, Check, X, ChevronDown, ChevronUp, Bot} from 'lucide-react';
import type { Client } from '../types';
import ClientInteractionForm from '../components/ClientInteractionForm';
import ClientInteractionList from '../components/ClientInteractionList';
import { preferenceOptions } from '../config';
import AIAssistantModal from '../components/AIAssistantModal';
import { mockClients, getAISuggestions, initialState } from '../config/mock-data';
import { clientReducer } from '../config/clientReducer';
import PreferenceSection from '../components/PreferenceSection';

export default function Clients() {
  // <-- Mueve useReducer dentro del componente
  const [state, dispatch] = useReducer(clientReducer, initialState);

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone: string) => {
    const formattedPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${formattedPhone}`, '_blank');
  };

  const selectedClient = state.showClientDetails
    ? mockClients.find(c => c.id === state.showClientDetails) || null
    : null;

  const handleEditPreferences = () => {
    if (selectedClient) {
      dispatch({
        type: 'START_EDITING_PREFERENCES',
        payload: selectedClient.preferences
      });
    }
  };

  const handleSavePreferences = () => dispatch({ type: 'SAVE_PREFERENCES' });

  const handleCancelEdit = () => dispatch({ type: 'CANCEL_EDITING_PREFERENCES' });

  const handleSaveInteraction = (interaction: any) => {
    console.log('New interaction:', interaction);
    dispatch({ type: 'TOGGLE_NEW_INTERACTION' });
  };

  const togglePreference = (category: keyof typeof preferenceOptions, value: string) => {
    dispatch({
      type: 'TOGGLE_PREFERENCE',
      payload: { category, value }
    });
  }; // <-- Cerrá la función aquí



  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_AI_MODAL' })}
            className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-200"
          >
            <Bot className="w-5 h-5 mr-2" />
            Asistente IA
          </button>
          <button 
            onClick={() =>dispatch({ type: 'TOGGLE_FORM' })
          }
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Nuevo Cliente
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar clientes..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={state.searchTerm}
          onChange={(e) => dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })}
        />
      </div>

      {/* Clients List - Mobile View */}
      <div className="block sm:hidden space-y-4">
        {mockClients.map((client) => (
          <div key={client.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{client.name}</h3>
                <p className="text-sm text-gray-500">{client.dni}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleCall(client.phone)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                >
                  <Phone className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleWhatsApp(client.phone)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">{client.email}</p>
              <div className="flex flex-wrap gap-2">
                {client.preferences.vehicleType.map((pref, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                  >
                    {pref}
                  </span>
                ))}
              </div>
              <button
                onClick={() => dispatch({ type: 'SET_CLIENT_DETAILS', payload: client.id })}
                className="w-full mt-3 text-sm text-blue-600 hover:bg-blue-50 py-2 rounded-md"
              >
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Clients Table - Desktop View */}
      <div className="hidden sm:block bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Preferencias
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockClients.map((client) => (
              <tr 
                key={client.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => dispatch({ type: 'SET_CLIENT_DETAILS', payload: client.id })}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{client.name}</div>
                  <div className="text-sm text-gray-500">DNI: {client.dni}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{client.email}</div>
                  <div className="text-sm text-gray-500">{client.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {client.preferences.vehicleType.map((pref, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                      >
                        {pref}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCall(client.phone);
                      }}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Phone className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsApp(client.phone);
                      }}
                      className="text-green-600 hover:text-green-900"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Client Details Modal */}
      {state.showClientDetails && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800">{selectedClient.name}</h2>
                <button
                  onClick={() => dispatch({ type: 'SET_CLIENT_DETAILS', payload: null })}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Información de Contacto</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-2" />
                      <span>{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                      <span>{selectedClient.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-5 h-5 text-gray-400 mr-2" />
                      <span>{selectedClient.work_info}</span>
                    </div>
                  </div>
                </div>

                {/* Preferences Section */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <button
                      onClick={() => dispatch({ type: 'TOGGLE_PREFERENCES' })}

                      className="flex items-center text-lg font-semibold"
                    >
                      Preferencias
                      {state.showPreferences ? (
                        <ChevronUp className="w-5 h-5 ml-2" />
                      ) : (
                        <ChevronDown className="w-5 h-5 ml-2" />
                      )}
                    </button>
                    {state.showPreferences && !state.editingPreferences && (
                      <button
                        onClick={handleEditPreferences}
                        className="text-blue-600 hover:text-blue-700 flex items-center"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Editar
                      </button>
                    )}
                    {state.showPreferences && state.editingPreferences && (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSavePreferences}
                          className="text-green-600 hover:text-green-700 flex items-center"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Guardar
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-red-600 hover:text-red-700 flex items-center"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                  
                  {state.showPreferences && (
                    state.editingPreferences && state.tempPreferences ? (
                      <div className="space-y-4">
                        <PreferenceSection
                          title="Tipo de vehículo"
                          category="vehicleType"
                          options={preferenceOptions.vehicleType}
                          selected={state.tempPreferences.vehicleType}
                          onToggle={togglePreference}
                        />
                        <PreferenceSection
                          title="Transmisión"
                          category="transmission"
                          options={preferenceOptions.transmission}
                          selected={state.tempPreferences.transmission}
                          onToggle={togglePreference}
                        />
                        <PreferenceSection
                          title="Combustible"
                          category="fuelType"
                          options={preferenceOptions.fuelType}
                          selected={state.tempPreferences.fuelType}
                          onToggle={togglePreference}
                        />
                        <PreferenceSection
                          title="Año de interés"
                          category="yearRange"
                          options={preferenceOptions.yearRange}
                          selected={state.tempPreferences.yearRange}
                          onToggle={togglePreference}
                        />
                        <PreferenceSection
                          title="Marca preferida"
                          category="brand"
                          options={preferenceOptions.brand}
                          selected={state.tempPreferences.brand}
                          onToggle={togglePreference}
                        />
                        <PreferenceSection
                          title="Uso del vehículo"
                          category="vehicleUse"
                          options={preferenceOptions.vehicleUse}
                          selected={state.tempPreferences.vehicleUse}
                          onToggle={togglePreference}
                        />
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Tipo de vehículo</p>
                            <p>{selectedClient.preferences.vehicleType.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Transmisión</p>
                            <p>{selectedClient.preferences.transmission.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Combustible</p>
                            <p>{selectedClient.preferences.fuelType.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Marca</p>
                            <p>{selectedClient.preferences.brand.join(', ')}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Presupuesto</p>
                            <p>{selectedClient.preferences.budget}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Urgencia</p>
                            <p>{selectedClient.preferences.urgency}</p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Interactions Section */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <button
                      onClick={() => dispatch({ type: 'TOGGLE_INTERACTIONS' })}
                      className="flex items-center text-lg font-semibold"
                    >
                      Historial de Interacciones
                      {state.showInteractions ? (
                        <ChevronUp className="w-5 h-5 ml-2" />
                      ) : (
                        <ChevronDown className="w-5 h-5 ml-2" />
                      )}
                    </button>
                    {state.showInteractions && (
                      <button
                        onClick={() => dispatch({ type: 'TOGGLE_NEW_INTERACTION' })}
                        className="text-blue-600 hover:text-blue-700 flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Nueva Interacción
                      </button>
                    )}
                  </div>
                  
                  {state.showInteractions && (
                    <ClientInteractionList interactions={selectedClient.interactions} />
                  )}
                </div>

                {/* Quick Actions */}
                <div className="flex space-x-3 pt-4 border-t">
                  <button
                    onClick={() => handleCall(selectedClient.phone)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Llamar
                  </button>
                  <button
                    onClick={() => handleWhatsApp(selectedClient.phone)}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Interaction Modal */}
      {state.showNewInteraction && (
        <ClientInteractionForm
          onSave={handleSaveInteraction}
          onClose={() => dispatch({ type: 'TOGGLE_NEW_INTERACTION' })}
        />
      )}

      {/* Client Form Modal */}
      {state.showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Nuevo Cliente</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">DNI</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dirección</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ocupación</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preferencias</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {preferenceOptions.vehicleType.map((pref) => (
                      <label key={pref} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        <span className="ml-2">{pref}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'TOGGLE_FORM' })}
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
        isOpen={state.showAIModal}
        onClose={() => dispatch({ type: 'TOGGLE_AI_MODAL' })}
        suggestions={getAISuggestions()}
      />
    </div>
  );
}