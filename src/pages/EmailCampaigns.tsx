import React, { useState } from 'react';
import { Plus, Mail, Users } from 'lucide-react';
import type { EmailCampaign } from '../types';
import { stages } from '../config/mock-stages';


export default function EmailCampaigns() {
  const [showForm, setShowForm] = useState(false);

  const mockCampaigns: EmailCampaign[] = [
    {
      id: '1',
      title: 'Promoción VW Vento',
      content: 'Descubre las nuevas ofertas...',
      target_stage: ['lead', 'contact'],
      send_to_all: false,
      created_by: '1',
      created_at: new Date('2024-03-10')
    },
    {
      id: '2',
      title: 'Seguimiento Test Drive',
      content: '¿Qué te pareció tu experiencia?...',
      target_stage: ['test_drive'],
      send_to_all: false,
      created_by: '1',
      created_at: new Date('2024-03-12')
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Campañas de Email</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nueva Campaña
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-lg shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {campaign.title}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(campaign.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {campaign.content}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>
                    {campaign.target_stage.map((stage) => stage).join(', ')}
                  </span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  <span>{campaign.send_to_all ? 'Todos' : 'Segmentado'}</span>
                </div>
              </div>
            </div>
            <div className="border-t px-6 py-4">
              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                  Ver Detalles
                </button>
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <h2 className="text-2xl font-bold mb-6">Nueva Campaña de Email</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contenido</label>
                <textarea
                  rows={6}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Etapas Objetivo</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {stages.map((stage) => (
                    <label key={stage.id} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <span className="ml-2">{stage.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <span className="ml-2">Enviar a todos los clientes</span>
                </label>
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Crear Campaña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}