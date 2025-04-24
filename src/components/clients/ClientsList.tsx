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

export default function ClientsList({ clients, onSelect, onCall, onWhatsApp }: Props) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contacto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Preferencias
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map((client) => (
            <tr 
              key={client.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelect(client.id)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{client.name}</div>
                <div className="text-sm text-gray-500">DNI: {client.dni}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{client.email}</div>
                <div className="text-sm text-gray-500">{client.phone}</div>
              </td>
              <td className="px-6 py-4">
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
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCall(client.phone);
                    }}
                    className="text-green-600 hover:text-green-900"
                  >
                    <Phone className="w-5 h-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onWhatsApp(client.phone);
                    }}
                    className="text-green-600 hover:text-green-900"
                  >
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}