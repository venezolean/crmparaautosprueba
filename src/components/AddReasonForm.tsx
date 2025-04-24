import React from 'react';
import { Plus } from 'lucide-react';
import type { Reason } from '../config';

interface AddReasonFormProps {
  newReason: Reason;
  setNewReason: React.Dispatch<React.SetStateAction<Reason>>;
  onAdd: (e: React.FormEvent) => void;
}

export default function AddReasonForm({ newReason, setNewReason, onAdd }: AddReasonFormProps) {
  return (
    <form onSubmit={onAdd} className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
      <input
        type="text"
        placeholder="Emoji"
        value={newReason.emoji}
        onChange={e => setNewReason({ ...newReason, emoji: e.target.value })}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Etiqueta"
        value={newReason.label}
        onChange={e => setNewReason({ ...newReason, label: e.target.value })}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Valor"
        value={newReason.value}
        onChange={e => setNewReason({ ...newReason, value: e.target.value as Reason['value'] })}
        className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
        <Plus className="w-5 h-5" />
      </button>
    </form>
  );
}