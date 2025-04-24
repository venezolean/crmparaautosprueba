import React, { useState } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import type { ClientInteraction, InteractionType, ReasonType, StageType } from '../../types';
import { interactionTypes, reasons, stages } from '../../constants/interactions';

interface Props {
  onSave: (interaction: Omit<ClientInteraction, 'id'>) => void;
  onClose: () => void;
}

export default function ClientInteractionForm({ onSave, onClose }: Props) {
  const [formData, setFormData] = useState({
    type: [] as InteractionType[],
    reason: '' as ReasonType,
    vehicle: '',
    stage: '' as StageType,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      date: new Date().toISOString(),
      ...formData,
    });
  };

  const handleTypeToggle = (value: InteractionType) => {
    setFormData(prev => {
      const types = [...prev.type];
      const index = types.indexOf(value);
      if (index === -1) {
        types.push(value);
      } else {
        types.splice(index, 1);
      }
      return { ...prev, type: types };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Nueva Interacción</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Interacción
              </label>
              <div className="flex flex-wrap gap-2">
                {interactionTypes.map(({ icon: Icon, label, value }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleTypeToggle(value)}
                    className={clsx(
                      "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      formData.type.includes(value)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo Principal
              </label>
              <select
                value={formData.reason}
                onChange={e => setFormData({ ...formData, reason: e.target.value as ReasonType })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Seleccionar motivo...</option>
                {reasons.map(({ emoji, label, value }) => (
                  <option key={value} value={value}>
                    {emoji} {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehículo Relacionado
              </label>
              <input
                type="text"
                value={formData.vehicle}
                onChange={e => setFormData({ ...formData, vehicle: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Modelo del vehículo..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Etapa del Embudo
              </label>
              <select
                value={formData.stage}
                onChange={e => setFormData({ ...formData, stage: e.target.value as StageType })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Seleccionar etapa...</option>
                {stages.map(({ id, name }) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notas
              </label>
              <textarea
                value={formData.notes}
                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Detalles adicionales..."
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
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
  );
}