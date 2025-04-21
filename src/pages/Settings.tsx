import React, { useState } from 'react';
import { Plus, Save, X, Trash2 } from 'lucide-react';
import { stages, interactionTypes, reasons, vehicles, preferenceOptions } from '../config';

export default function Settings() {
  const [stagesList, setStagesList] = useState(stages);
  const [newStage, setNewStage] = useState({ id: '', name: '', color: 'bg-gray-500' });
  const [reasonsList, setReasonsList] = useState(reasons);
  const [newReason, setNewReason] = useState({ emoji: '', label: '', value: '' });
  const [vehiclesList, setVehiclesList] = useState(vehicles);
  const [newVehicle, setNewVehicle] = useState('');
  const [activeTab, setActiveTab] = useState('stages');

  const colorOptions = [
    { name: 'Amarillo', value: 'bg-yellow-500' },
    { name: 'Azul', value: 'bg-blue-500' },
    { name: 'Morado', value: 'bg-purple-500' },
    { name: 'Naranja', value: 'bg-orange-500' },
    { name: 'Verde', value: 'bg-green-500' },
    { name: 'Rojo', value: 'bg-red-500' },
  ];

  const handleAddStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStage.id && newStage.name) {
      setStagesList([...stagesList, newStage]);
      setNewStage({ id: '', name: '', color: 'bg-gray-500' });
    }
  };

  const handleDeleteStage = (id: string) => {
    setStagesList(stagesList.filter(stage => stage.id !== id));
  };

  const handleAddReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReason.value && newReason.label) {
      setReasonsList([...reasonsList, newReason]);
      setNewReason({ emoji: '', label: '', value: '' });
    }
  };

  const handleDeleteReason = (value: string) => {
    setReasonsList(reasonsList.filter(reason => reason.value !== value));
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (newVehicle) {
      setVehiclesList([...vehiclesList, newVehicle]);
      setNewVehicle('');
    }
  };

  const handleDeleteVehicle = (vehicle: string) => {
    setVehiclesList(vehiclesList.filter(v => v !== vehicle));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Configuración</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {['stages', 'reasons', 'vehicles'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab === 'stages' && 'Etapas'}
              {tab === 'reasons' && 'Motivos'}
              {tab === 'vehicles' && 'Vehículos'}
            </button>
          ))}
        </nav>
      </div>

      {/* Stages Tab */}
      {activeTab === 'stages' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Etapas del Embudo</h2>
            
            {/* Add Stage Form */}
            <form onSubmit={handleAddStage} className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="ID (ej: lead)"
                value={newStage.id}
                onChange={(e) => setNewStage({ ...newStage, id: e.target.value })}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Nombre"
                value={newStage.name}
                onChange={(e) => setNewStage({ ...newStage, name: e.target.value })}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="flex space-x-2">
                <select
                  value={newStage.color}
                  onChange={(e) => setNewStage({ ...newStage, color: e.target.value })}
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {colorOptions.map(color => (
                    <option key={color.value} value={color.value}>{color.name}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Stages List */}
            <div className="space-y-2">
              {stagesList.map((stage) => (
                <div
                  key={stage.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${stage.color}`} />
                    <span className="font-medium">{stage.name}</span>
                    <span className="text-sm text-gray-500">({stage.id})</span>
                  </div>
                  <button
                    onClick={() => handleDeleteStage(stage.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reasons Tab */}
      {activeTab === 'reasons' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Motivos de Contacto</h2>
            
            {/* Add Reason Form */}
            <form onSubmit={handleAddReason} className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Emoji"
                value={newReason.emoji}
                onChange={(e) => setNewReason({ ...newReason, emoji: e.target.value })}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Etiqueta"
                value={newReason.label}
                onChange={(e) => setNewReason({ ...newReason, label: e.target.value })}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Valor (ej: inquiry)"
                value={newReason.value}
                onChange={(e) => setNewReason({ ...newReason, value: e.target.value })}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
              </button>
            </form>

            {/* Reasons List */}
            <div className="space-y-2">
              {reasonsList.map((reason) => (
                <div
                  key={reason.value}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{reason.emoji}</span>
                    <span className="font-medium">{reason.label}</span>
                    <span className="text-sm text-gray-500">({reason.value})</span>
                  </div>
                  <button
                    onClick={() => handleDeleteReason(reason.value)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Vehicles Tab */}
      {activeTab === 'vehicles' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Catálogo de Vehículos</h2>
            
            {/* Add Vehicle Form */}
            <form onSubmit={handleAddVehicle} className="mb-6 flex space-x-2">
              <input
                type="text"
                placeholder="Nombre del vehículo"
                value={newVehicle}
                onChange={(e) => setNewVehicle(e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
              </button>
            </form>

            {/* Vehicles List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {vehiclesList.map((vehicle) => (
                <div
                  key={vehicle}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span>{vehicle}</span>
                  <button
                    onClick={() => handleDeleteVehicle(vehicle)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}