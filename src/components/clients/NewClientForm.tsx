import React, { useState } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import type { Client } from '../../types';
import { preferenceOptions } from '../../constants/preferenceOptions';

interface Props {
  onClose: () => void;
  onSave: (client: Omit<Client, 'id' | 'interactions'>) => void;
}

export default function NewClientForm({ onClose, onSave }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    dni: '',
    phone: '',
    email: '',
    address: '',
    work_info: '',
    preferences: {
      vehicleType: [] as string[],
      transmission: [] as string[],
      fuelType: [] as string[],
      yearRange: [] as string[],
      brand: [] as string[],
      budget: '<5M',
      acceptsTrade: false,
      carCondition: 'Ambos',
      savingsPlan: 'Nunca tuvo',
      vehicleUse: [] as string[],
      urgency: 'Explorando',
      location: ''
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handlePreferenceToggle = (category: keyof typeof preferenceOptions, value: string) => {
    setFormData(prev => {
      const current = [...(prev.preferences[category] as string[])];
      const index = current.indexOf(value);
      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }
      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          [category]: current
        }
      };
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Nuevo Cliente</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">DNI</label>
                <input
                  type="text"
                  value={formData.dni}
                  onChange={e => setFormData({ ...formData, dni: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Dirección</label>
              <input
                type="text"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Ocupación</label>
              <input
                type="text"
                value={formData.work_info}
                onChange={e => setFormData({ ...formData, work_info: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Preferencias</h3>
              
              <div className="space-y-4">
                {Object.entries(preferenceOptions).map(([key, options]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {key === 'vehicleType' ? 'Tipo de Vehículo' :
                       key === 'transmission' ? 'Transmisión' :
                       key === 'fuelType' ? 'Combustible' :
                       key === 'yearRange' ? 'Año' :
                       key === 'brand' ? 'Marca' :
                       key === 'vehicleUse' ? 'Uso' : key}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handlePreferenceToggle(key as keyof typeof preferenceOptions, option)}
                          className={clsx(
                            "px-3 py-1 rounded-full text-sm font-medium transition-colors",
                            (formData.preferences[key as keyof typeof preferenceOptions] as string[]).includes(option)
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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