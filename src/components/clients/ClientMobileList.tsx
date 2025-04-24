import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import clsx from 'clsx';
import type { Client } from '../../types';

interface Props {
  clients: Client[];
  onSelect: (clientId: string) => void;
  onCall: (phone: string) => void;
  onWhatsApp: (phone: string) => void;
}

export default function ClientMobileList({ clients, onSelect, onCall, onWhatsApp }: Props) {
  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <div key={client.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-medium text-gray-900">{client.name}</h3>
              <p className="text-sm text-gray-500">{client.dni}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onCall(client.phone)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-full"
              >
                <Phone className="w-5 h-5" />
              </button>
              <button
                onClick={() => onWhatsApp(client.phone)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-full"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">{client.email}</p>
            <div className="flex flex-wrap gap-2">
              {client.preferences.vehicleType.map((pref, index) => (
                <span
                  key={index}
                  className={clsx(
                    "px-2 py-1 text-xs font-medium",
                    "bg-blue-100 text-blue-800 rounded-full"
                  )}
                >
                  {pref}
                </span>
              ))}
            </div>
            <button
              onClick={() => onSelect(client.id)}
              className="w-full mt-3 text-sm text-blue-600 hover:bg-blue-50 py-2 rounded-md"
            >
              Ver Detalles
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}