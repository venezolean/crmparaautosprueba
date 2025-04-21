import React from 'react';
import { Clock, Users, Car, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const mockMetrics = {
    totalClients: 145,
    activeOpportunities: 23,
    monthlyRevenue: 450000,
    conversionRate: 35,
  };

  const mockTasks = [
    { id: 1, title: 'Llamar a Juan Pérez', time: '10:00', type: 'call' },
    { id: 2, title: 'Test drive con María García', time: '14:30', type: 'test-drive' },
    { id: 3, title: 'Seguimiento cotización VW Golf', time: '16:00', type: 'follow-up' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        ¡Buen día, Carlos!
      </h1>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Clientes</p>
              <p className="text-2xl font-bold text-gray-800">{mockMetrics.totalClients}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Oportunidades Activas</p>
              <p className="text-2xl font-bold text-gray-800">{mockMetrics.activeOpportunities}</p>
            </div>
            <Car className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ingresos del Mes</p>
              <p className="text-2xl font-bold text-gray-800">
                ${mockMetrics.monthlyRevenue.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tasa de Conversión</p>
              <p className="text-2xl font-bold text-gray-800">{mockMetrics.conversionRate}%</p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Tasks for Today */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Tareas para Hoy</h2>
        <div className="divide-y">
          {mockTasks.map((task) => (
            <div key={task.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-4"></div>
                <div>
                  <p className="font-medium text-gray-800">{task.title}</p>
                  <p className="text-sm text-gray-500">{task.time}</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-md">
                Completar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}