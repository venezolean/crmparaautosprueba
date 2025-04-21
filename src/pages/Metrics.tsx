import React, { useState } from 'react';
import {
  BarChart3, TrendingUp, Users, Calendar, Download, Filter,
  Mail, MessageSquare, Globe, ChevronDown, ArrowUpRight, ArrowDownRight,
  AlertTriangle, CheckCircle, Clock, Activity, User, Bot
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { format, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { metricsConfig } from '../config/metrics';
import { mockSellers, mockQualityData, mockActivityData, mockMetrics } from '../config/mock-data';
import type { PerformanceMetric } from '../config/metrics';
import AIAssistantModal from '../components/AIAssistantModal';

export default function Metrics() {
  const [timeframe, setTimeframe] = useState<string>(metricsConfig.timeframes[0].value);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedSeller, setSelectedSeller] = useState<string>('all');
  const [showAIModal, setShowAIModal] = useState(false);

  const mockPerformanceData = {
    activity: metricsConfig.performanceMetrics.activity.map(metric => ({
      ...metric,
      value: Math.random() * (metric.threshold * 1.5)
    })),
    quality: metricsConfig.performanceMetrics.quality.map(metric => ({
      ...metric,
      value: Math.random() * 100
    })),
    results: metricsConfig.performanceMetrics.results.map(metric => ({
      ...metric,
      value: Math.random() * 100
    }))
  };

  const getMetricStatus = (metric: PerformanceMetric) => {
    const value = metric.value || 0;
    if (value >= metric.threshold) return 'success';
    if (value >= metric.alert) return 'warning';
    return 'danger';
  };

  const formatMetricValue = (metric: PerformanceMetric) => {
    const value = metric.value || 0;
    switch (metric.format) {
      case 'time':
        return `${Math.round(value / 60)} min`;
      case 'percentage':
        return `${Math.round(value)}%`;
      case 'days':
        return `${Math.round(value)} días`;
      default:
        return Math.round(value);
    }
  };

  const getAISuggestions = () => {
    return [
      "La tasa de conversión ha mejorado un 20% respecto al mes anterior.",
      "El canal más efectivo esta semana ha sido WhatsApp Business.",
      "Se recomienda aumentar seguimiento en la etapa de test drive.",
      "Los leads web han aumentado un 25% - considera reforzar este canal.",
    ];
  };

  const PerformanceCard = ({ metric }: { metric: PerformanceMetric }) => {
    const status = getMetricStatus(metric);
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-medium text-gray-900">{metric.label}</h3>
            <p className="text-sm text-gray-500">{metric.description}</p>
          </div>
          {status === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
          {status === 'warning' && <AlertTriangle className="w-5 h-5 text-yellow-500" />}
          {status === 'danger' && <AlertTriangle className="w-5 h-5 text-red-500" />}
        </div>
        <div className="mt-4">
          <div className="text-2xl font-bold text-gray-900">
            {formatMetricValue(metric)}
          </div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full">
            <div 
              className={`h-2 rounded-full ${
                status === 'success' ? 'bg-green-500' :
                status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.min((metric.value || 0) / metric.threshold * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  const currentSeller = selectedSeller === 'all' 
    ? 'Todos los vendedores'
    : mockSellers.find(s => s.id === selectedSeller)?.name || 'Vendedor no encontrado';

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Métricas de Ventas</h1>
          <div className="flex items-center mt-2 text-gray-600">
            <User className="w-4 h-4 mr-2" />
            <span>{currentSeller}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowAIModal(true)}
            className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-200"
          >
            <Bot className="w-5 h-5 mr-2" />
            Asistente IA
          </button>
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-white text-gray-700 rounded-lg flex items-center hover:bg-gray-50"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtros
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>
            {showFilters && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                <div className="p-2">
                  <select
                    value={selectedSeller}
                    onChange={(e) => setSelectedSeller(e.target.value)}
                    className="w-full p-2 mb-2 rounded border"
                  >
                    <option value="all">Todos los vendedores</option>
                    {mockSellers.map(seller => (
                      <option key={seller.id} value={seller.id}>
                        {seller.name}
                      </option>
                    ))}
                  </select>
                  <select className="w-full p-2 mb-2 rounded border">
                    <option>Todos los canales</option>
                    {metricsConfig.channels.map(channel => (
                      <option key={channel.name}>{channel.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
          <button className="px-4 py-2 bg-white text-gray-700 rounded-lg flex items-center hover:bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </button>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg border-gray-200"
          >
            {metricsConfig.timeframes.map(tf => (
              <option key={tf.value} value={tf.value}>{tf.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Vista General', icon: BarChart3 },
            { id: 'activity', label: 'Actividad', icon: Activity },
            { id: 'quality', label: 'Calidad', icon: CheckCircle },
            { id: 'results', label: 'Resultados', icon: TrendingUp }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedTab(id)}
              className={`
                group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                ${selectedTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <Icon className="w-5 h-5 mr-2" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metricsConfig.kpis.map((kpi, index) => {
              const Icon = getIconComponent(kpi.icon);
              return (
                <div key={kpi.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex items-center text-green-600">
                      <ArrowUpRight className="w-4 h-4" />
                      <span className="ml-1 text-sm font-medium">+12.5%</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-700">{kpi.title}</h3>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {index === 0 ? "145" : index === 1 ? "35%" : index === 2 ? "28" : "$450K"}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Embudo de Ventas</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockMetrics.funnel}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8">
                      {mockMetrics.funnel.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={metricsConfig.funnelStages[index].color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Distribución por Canal</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockMetrics.channels}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {mockMetrics.channels.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={metricsConfig.channels[index].color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Metrics Tab */}
      {selectedTab === 'activity' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPerformanceData.activity.map((metric) => (
              <PerformanceCard key={metric.id} metric={metric} />
            ))}
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Tendencia de Actividad</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="contacts"
                    name="Contactos"
                    stackId="1"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                  <Area
                    type="monotone"
                    dataKey="followUps"
                    name="Seguimientos"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Quality Metrics Tab */}
      {selectedTab === 'quality' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPerformanceData.quality.map((metric) => (
              <PerformanceCard key={metric.id} metric={metric} />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Calidad de Gestión</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockQualityData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Actual"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Objetivo"
                    dataKey="B"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Results Metrics Tab */}
      {selectedTab === 'results' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockPerformanceData.results.map((metric) => (
              <PerformanceCard key={metric.id} metric={metric} />
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Evolución de Resultados</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={generateResultsData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="propuestas" name="Propuestas" fill="#8884d8" />
                  <Bar dataKey="conversiones" name="Conversiones" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
        suggestions={getAISuggestions()}
      />
    </div>
  );
}

// Helper functions
function getIconComponent(iconName: string) {
  const icons = { Users, TrendingUp, BarChart3, Calendar };
  return icons[iconName] || Users;
}

function generateResultsData() {
  return Array.from({ length: 6 }, (_, i) => ({
    name: format(subMonths(new Date(), i), 'MMM', { locale: es }),
    propuestas: Math.floor(Math.random() * 100) + 20,
    conversiones: Math.floor(Math.random() * 50) + 10
  })).reverse();
}