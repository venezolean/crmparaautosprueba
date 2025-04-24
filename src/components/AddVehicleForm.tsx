import React from 'react';
import { Plus } from 'lucide-react';

interface AddVehicleFormProps {
  newVehicle: string;
  setNewVehicle: React.Dispatch<React.SetStateAction<string>>;
  onAdd: (e: React.FormEvent) => void;
}

export default function AddVehicleForm({ newVehicle, setNewVehicle, onAdd }: AddVehicleFormProps) {
  return (
    <form onSubmit={onAdd} className="mb-6 flex space-x-2">
      <input
        type="text"
        placeholder="Modelo del vehículo"
        value={newVehicle}
        onChange={e => setNewVehicle(e.target.value)}
        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
        <Plus className="w-5 h-5" />
      </button>
    </form>
  );
}