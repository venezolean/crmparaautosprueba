import React from 'react';
import { Plus } from 'lucide-react';
import { colorOptions } from '../config/colors';
import type { Stage } from '../config/mock-stages';

interface AddStageFormProps {
  newStage: Stage;
  setNewStage: React.Dispatch<React.SetStateAction<Stage>>;
  onAdd: (e: React.FormEvent) => void;
}

export default function AddStageForm({ newStage, setNewStage, onAdd }: AddStageFormProps) {
  return (
    <form onSubmit={onAdd} className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <input
        type="text"
        placeholder="ID (ej: lead)"
        value={newStage.id}
        onChange={e => setNewStage({ ...newStage, id: e.target.value })}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Nombre"
        value={newStage.name}
        onChange={e => setNewStage({ ...newStage, name: e.target.value })}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <div className="flex space-x-2">
        <select
          value={newStage.color}
          onChange={e => {
            const sel = colorOptions.find(c => c.value === e.target.value)!;
            setNewStage({ ...newStage, color: sel.value, chartColor: sel.chartColor });
          }}
          className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {colorOptions.map(c => (
            <option key={c.value} value={c.value}>{c.name}</option>
          ))}
        </select>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}