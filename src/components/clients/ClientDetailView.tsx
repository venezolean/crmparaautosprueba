import React from 'react';
import { X, Phone, MessageSquare, MapPin, Briefcase, ChevronUp, ChevronDown, Edit2, Check } from 'lucide-react';
import type { Client } from '../../types';
import ClientPreferencesDisplay from './ClientPreferencesDisplay';
import ClientPreferencesEditor from './ClientPreferencesEditor';
import ClientInteractionList from './ClientInteractionList';

interface Props {
  client: Client;
  state: any;
  handlers: any;
}

export default function ClientDetailView({ client, state, handlers }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{client.name}</h2>
            <button
              onClick={() => handlers.setClientDetails(null)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Información de Contacto</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{client.address}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{client.work_info}</span>
                </div>
              </div>
            </div>

            {/* Preferences Section */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <button
                  onClick={handlers.togglePreferences}
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
                    onClick={() => handlers.handleEditPreferences(client.preferences)}
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Editar
                  </button>
                )}
                {state.showPreferences && state.editingPreferences && (
                  <div className="flex space-x-2">
                    <button
                      onClick={handlers.handleSavePreferences}
                      className="text-green-600 hover:text-green-700 flex items-center"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Guardar
                    </button>
                    <button
                      onClick={handlers.handleCancelEdit}
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
                  <ClientPreferencesEditor
                    preferences={state.tempPreferences}
                    onTogglePreference={handlers.togglePreference}
                  />
                ) : (
                  <ClientPreferencesDisplay preferences={client.preferences} />
                )
              )}
            </div>

            {/* Interactions Section */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <button
                  onClick={handlers.toggleInteractions}
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
                    onClick={handlers.toggleNewInteraction}
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Nueva Interacción
                  </button>
                )}
              </div>
              
              {state.showInteractions && (
                <ClientInteractionList interactions={client.interactions} />
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-3 pt-4 border-t">
              <button
                onClick={() => handlers.handleCall(client.phone)}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
              >
                <Phone className="w-5 h-5 mr-2" />
                Llamar
              </button>
              <button
                onClick={() => handlers.handleWhatsApp(client.phone)}
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
  );
}