import React from 'react';
import { Plus, Bot } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  onNewClient: () => void;
  onOpenAI: () => void;
}

export default function ClientsHeader({ onNewClient, onOpenAI }: Props) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-2xl font-bold text-gray-800">Clientes</h1>
      <div className="flex gap-2 w-full sm:w-auto">
        <button
          onClick={onOpenAI}
          className={clsx(
            "bg-blue-100 text-blue-600 px-4 py-2 rounded-lg",
            "flex items-center justify-center hover:bg-blue-200"
          )}
        >
          <Bot className="w-5 h-5 mr-2" />
          Asistente IA
        </button>
        <button 
          onClick={onNewClient}
          className={clsx(
            "w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg",
            "flex items-center justify-center hover:bg-blue-700"
          )}
        >
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Cliente
        </button>
      </div>
    </div>
  );
}