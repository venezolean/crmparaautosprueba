import React, { useReducer, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { COLORS } from '../config/colors';
import { stagesReducer } from '../config/stagesReducer';
import { reasonsReducer } from '../config/reasonsReducer';
import { vehiclesReducer } from '../config/vehiclesReducer';
import { stages as initialStages } from '../config/mock-stages';
import type { Stage } from '../config/mock-stages';
import type { Reason } from '../config';
import { initialReasons, vehicles as initialVehicles } from '../config';
import AddStageForm from '../components/AddStageForm';
import AddReasonForm from '../components/AddReasonForm';
import AddVehicleForm from '../components/AddVehicleForm';

export default function Settings() {
  const [stagesList, dispatchStage] = useReducer(stagesReducer, initialStages);
  const [newStage, setNewStage] = useState<Stage>({
    id: '',
    name: '',
    color: COLORS.gray.bg,
    chartColor: COLORS.gray.hex
  });
  const [stageFilter, setStageFilter] = useState('');

  const [reasonsList, dispatchReason] = useReducer(reasonsReducer, initialReasons);
  const [newReason, setNewReason] = useState<Reason>({ emoji: '', label: '', value: 'inquiry' });
  const [reasonFilter, setReasonFilter] = useState('');

  const [vehiclesList, dispatchVehicle] = useReducer(vehiclesReducer, initialVehicles);
  const [newVehicle, setNewVehicle] = useState('');
  const [vehicleFilter, setVehicleFilter] = useState('');

  const [activeTab, setActiveTab] = useState<'stages' | 'reasons' | 'vehicles'>('stages');

  // Handlers with validations
  const handleAddStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStage.id.trim() || !newStage.name.trim()) return;
    if (stagesList.some(s => s.id === newStage.id)) return;
    dispatchStage({ type: 'ADD_STAGE', payload: newStage });
    setNewStage({ id: '', name: '', color: COLORS.gray.bg, chartColor: COLORS.gray.hex });
  };
  const handleDeleteStage = (id: string) => dispatchStage({ type: 'DELETE_STAGE', payload: id });

  const handleAddReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReason.value.trim() || !newReason.label.trim()) return;
    if (reasonsList.some(r => r.value === newReason.value)) return;
    dispatchReason({ type: 'ADD_REASON', payload: newReason });
    setNewReason({ emoji: '', label: '', value: 'inquiry' });
  };
  const handleDeleteReason = (value: string) => dispatchReason({ type: 'DELETE_REASON', payload: value });

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.trim() || vehiclesList.some(v => v.model === newVehicle)) return;
    dispatchVehicle({
      type: 'ADD_VEHICLE',
      payload: {
        id: crypto.randomUUID(),
        brand: '',
        model: newVehicle,
        year: 0,
        price: 0,
        promoPrice: undefined,
        engine: '',
        transmission: '',
        fuelType: '',
        power: '',
        mileage: 0,
        condition: '0km',
        category: '',
        description: '',
        images: [],
        stock: 0,
        featured: false,
        availableForTestDrive: false
      }
    });
    setNewVehicle('');
  };
  const handleDeleteVehicle = (id: string) => dispatchVehicle({ type: 'REMOVE_VEHICLE', payload: id });

  // Filters
  const filteredStages = stagesList.filter(s => s.name.toLowerCase().includes(stageFilter.toLowerCase()));
  const filteredReasons = reasonsList.filter(r => r.label.toLowerCase().includes(reasonFilter.toLowerCase()));
  const filteredVehicles = vehiclesList.filter(v => v.model.toLowerCase().includes(vehicleFilter.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Configuración</h1>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {['stages', 'reasons', 'vehicles'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              {tab === 'stages' ? 'Etapas' : tab === 'reasons' ? 'Motivos' : 'Vehículos'}
            </button>
          ))}
        </nav>
      </div>

      {/* Stages Tab */}
      {activeTab === 'stages' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Etapas del Embudo</h2>
            <AddStageForm newStage={newStage} setNewStage={setNewStage} onAdd={handleAddStage} />
            <input
              type="text"
              placeholder="Filtrar etapas..."
              value={stageFilter}
              onChange={e => setStageFilter(e.target.value)}
              className="mb-4 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="space-y-2">
              {filteredStages.map(stage => (
                <div key={stage.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: stage.chartColor }} />
                    <span className="font-medium">{stage.name}</span>
                    <span className="text-sm text-gray-500">({stage.id})</span>
                  </div>
                  <button onClick={() => handleDeleteStage(stage.id)} className="text-red-600 hover:text-red-700">
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
            <AddReasonForm newReason={newReason} setNewReason={setNewReason} onAdd={handleAddReason} />
            <input
              type="text"
              placeholder="Filtrar motivos..."
              value={reasonFilter}
              onChange={e => setReasonFilter(e.target.value)}
              className="mb-4 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="space-y-2">
              {filteredReasons.map(reason => (
                <div key={reason.value} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{reason.emoji}</span>
                    <span className="font-medium">{reason.label}</span>
                    <span className="text-sm text-gray-500">({reason.value})</span>
                  </div>
                  <button onClick={() => handleDeleteReason(reason.value)} className="text-red-600 hover:text-red-700">
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
            <AddVehicleForm newVehicle={newVehicle} setNewVehicle={setNewVehicle} onAdd={handleAddVehicle} />
            <input
              type="text"
              placeholder="Filtrar vehículos..."
              value={vehicleFilter}
              onChange={e => setVehicleFilter(e.target.value)}
              className="mb-4 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">   
              {filteredVehicles.map(vehicle => (   
                <div key={vehicle.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">   
                  <span>{vehicle.brand} {vehicle.model}</span>   
                  <button onClick={() => handleDeleteVehicle(vehicle.id)} className="text-red-600 hover:text-red-700">   
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

