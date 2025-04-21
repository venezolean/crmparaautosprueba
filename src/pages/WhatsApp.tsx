import React, { useState } from 'react';
import { Plus, MessageSquare, Users, History } from 'lucide-react';
import type { WhatsAppFlow } from '../types';
import { stages } from '../config';

export default function WhatsApp() {
  const [showForm, setShowForm] = useState(false);

  const mockFlows: WhatsAppFlow[] = [
    {
      id: '1',
      name: 'Bienvenida Nuevo Lead',
      template: '¡Hola {nombre}! Gracias por tu interés en {modelo}. ¿Te gustaría coordinar una visita para conocer el vehículo?',
      target_stage: ['lead'],
      created_by: '1',
      created_at: new Date('2024-03-10')
    },
    {
      id: '2',
      name: 'Seguimiento Test Drive',
      template: 'Hola {nombre}, ¿qué te pareció la prueba del {modelo}? Estamos a tu disposición para resolver cualquier consulta.',
      target_stage: ['test_drive'],
      created_by: '1',
      created_at: new Date('2024-03-12')
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Automatización WhatsApp</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Flujo
        </button>
      </div>

      {/* WhatsApp Flows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockFlows.map((flow) => (
          <div key={flow.id} className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {flow.name}
                </h3>
                <MessageSquare className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                {flow.template}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>
                    {flow.target_stage.join(', ')}
                  </span>
                </div>
                <div className="flex items-center">
                  <History className="w-4 h-4 mr-1" />
                  <span>{new Date(flow.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="border-t px-6 py-4">
              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Editar
                </button>
                <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700">
                  Activar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp Flow Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6">Nuevo Flujo de WhatsApp</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre del Flujo</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="ej: Bienvenida Nuevo Lead"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Plantilla de Mensaje</label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Usa {nombre} para personalizar el mensaje"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Variables disponibles: {'{nombre}'}, {'{modelo}'}, {'{concesionario}'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Etapas Objetivo</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {stages.map((stage) => (
                    <label key={stage.id} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                      <span className="ml-2">{stage.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Condiciones de Envío</label>
                <div className="mt-2 space-y-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                    <span className="ml-2">Enviar solo en horario comercial (9:00 - 18:00)</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                    <span className="ml-2">Esperar respuesta antes de siguiente mensaje</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Crear Flujo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}