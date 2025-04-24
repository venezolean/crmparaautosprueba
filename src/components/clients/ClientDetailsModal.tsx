import React from 'react';
import { X, Phone, MessageSquare, MapPin, Briefcase, ChevronUp, ChevronDown, Edit2, Check } from 'lucide-react';
import clsx from 'clsx';
import type { Client } from '../../types';
import { preferenceOptions } from '../../constants/preferenceOptions';
import ClientInteractionList from './ClientInteractionList';
import PreferenceSection from './PreferenceSection';

interface Props {
  client: Client;
  showPreferences: boolean;
  showInteractions: boolean;
  editingPreferences: boolean;
  tempPreferences: Client['preferences'] | null;
  onClose: () => void;
  onCall: (phone: string) => void;
  onWhatsApp: (phone: string) => void;
  onTogglePreferences: () => void;
  onToggleInteractions: () => void;
  onEditPreferences: () => void;
  onSavePreferences: () => void;
  onCancelEdit: () => void;
  onTogglePreference: (category: keyof typeof preferenceOptions, value: string) => void;
  onNewInteraction: () => void;
}

export default function ClientDetailsModal({
  client,
  showPreferences,
  showInteractions,
  editingPreferences,
  tempPreferences,
  onClose,
  onCall,
  onWhatsApp,
  onTogglePreferences,
  onToggleInteractions,
  onEditPreferences,
  onSavePreferences,
  onCancelEdit,
  onTogglePreference,
  onNewInteraction,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{client.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
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
                  onClick={onTogglePreferences}
                  className="flex items-center text-lg font-semibold"
                >
                  Preferencias
                  {showPreferences ? (
                    <ChevronUp className="w-5 h-5 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 ml-2" />
                  )}
                </button>
                {showPreferences && !editingPreferences && (
                  <button
                    onClick={onEditPreferences}
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Editar
                  </button>
                )}
                {showPreferences && editingPreferences && (
                  <div className="flex space-x-2">
                    <button
                      onClick={onSavePreferences}
                      className="text-green-600 hover:text-green-700 flex items-center"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Guardar
                    </button>
                    <button
                      onClick={onCancelEdit}
                      className="text-red-600 hover:text-red-700 flex items-center"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
              
              {showPreferences && (
                editingPreferences && tempPreferences ? (
                  <div className="space-y-4">
                    <PreferenceSection
                      title="Tipo de vehículo"
                      category="vehicleType"
                      options={preferenceOptions.vehicleType}
                      selected={tempPreferences.vehicleType}
                      onToggle={onTogglePreference}
                    />
                    <PreferenceSection
                      title="Transmisión"
                      category="transmission"
                      options={preferenceOptions.transmission}
                      selected={tempPreferences.transmission}
                      onToggle={onTogglePreference}
                    />
                    <PreferenceSection
                      title="Combustible"
                      category="fuelType"
                      options={preferenceOptions.fuelType}
                      selected={tempPreferences.fuelType}
                      onToggle={onTogglePreference}
                    />
                    <PreferenceSection
                      title="Año de interés"
                      category="yearRange"
                      options={preferenceOptions.yearRange}
                      selected={tempPreferences.yearRange}
                      onToggle={onTogglePreference}
                    />
                    <PreferenceSection
                      title="Marca preferida"
                      category="brand"
                      options={preferenceOptions.brand}
                      selected={tempPreferences.brand}
                      onToggle={onTogglePreference}
                    />
                    <PreferenceSection
                      title="Uso del vehículo"
                      category="vehicleUse"
                      options={preferenceOptions.vehicleUse}
                      selected={tempPreferences.vehicleUse}
                      onToggle={onTogglePreference}
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Tipo de vehículo</p>
                        <p>{client.preferences.vehicleType.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Transmisión</p>
                        <p>{client.preferences.transmission.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Combustible</p>
                        <p>{client.preferences.fuelType.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Marca</p>
                        <p>{client.preferences.brand.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Presupuesto</p>
                        <p>{client.preferences.budget}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Urgencia</p>
                        <p>{client.preferences.urgency}</p>
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
                  onClick={onToggleInteractions}
                  className="flex items-center text-lg font-semibold"
                >
                  Historial de Interacciones
                  {showInteractions ? (
                    <ChevronUp className="w-5 h-5 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 ml-2" />
                  )}
                </button>
                {showInteractions && (
                  <button
                    onClick={onNewInteraction}
                    className="text-blue-600 hover:text-blue-700 flex items-center"
                  >
                    <Edit2 className="w-4 h-4 mr-1" />
                    Nueva Interacción
                  </button>
                )}
              </div>
              
              {showInteractions && (
                <ClientInteractionList interactions={client.interactions} />
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex space-x-3 pt-4 border-t">
              <button
                onClick={() => onCall(client.phone)}
                className={clsx(
                  "flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700",
                  "flex items-center justify-center"
                )}
              >
                <Phone className="w-5 h-5 mr-2" />
                Llamar
              </button>
              <button
                onClick={() => onWhatsApp(client.phone)}
                className={clsx(
                  "flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700",
                  "flex items-center justify-center"
                )}
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