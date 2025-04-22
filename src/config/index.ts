import { Phone, MessageSquare, Mail, Building2, Globe } from 'lucide-react';
import { stages } from './mock-stages';


export const interactionTypes = [
  { icon: Phone, label: 'Llamada', value: 'call' },
  { icon: MessageSquare, label: 'WhatsApp', value: 'whatsapp' },
  { icon: Mail, label: 'Email', value: 'email' },
  { icon: Building2, label: 'Visita', value: 'visit' },
  { icon: Globe, label: 'Web', value: 'web' },
];

export const reasons = [
  { emoji: '❓', label: 'Consulta', value: 'inquiry' },
  { emoji: '💳', label: 'Financiación', value: 'financing' },
  { emoji: '🚘', label: 'Vehículo', value: 'vehicle' },
  { emoji: '🔄', label: 'Parte de pago', value: 'trade' },
  { emoji: '✅', label: 'Cierre de venta', value: 'sale' },
  { emoji: '⏳', label: 'Seguimiento', value: 'follow_up' },
  { emoji: '📝', label: 'Presupuesto', value: 'quote' },
];

export const vehicles = [
  'Volkswagen Golf',
  'Volkswagen Vento',
  'Volkswagen Tiguan',
  'Chevrolet Cruze',
  'Chevrolet Onix',
  'Fiat Cronos',
  'Fiat Toro',
  'Peugeot 208',
  'Peugeot 2008',
];

export const preferenceOptions = {
  vehicleType: ['SUV', 'Sedan', 'Hatchback', 'Pick-up', 'Utilitario', 'Familiar', 'Deportivo'],
  transmission: ['Manual', 'Automática'],
  fuelType: ['Nafta', 'Diésel', 'Híbrido', 'Eléctrico'],
  yearRange: ['2020', '2021', '2022', '2023', '2024', '2025'],
  brand: ['Fiat', 'Peugeot', 'Chevrolet', 'Volkswagen', 'Otra'],
  budget: ['<5M', '5-8M', '8-12M', '>12M ARS'],
  carCondition: ['Solo 0km', 'Solo usados', 'Ambos'],
  savingsPlan: ['Tiene uno activo', 'Tuvo uno caído', 'Nunca tuvo'],
  vehicleUse: ['Personal', 'Trabajo', 'Familia', 'Viajes', 'Otro'],
  urgency: ['Inmediata', 'Próximo mes', 'Explorando'],
};

export const metricsConfig = {
  kpis: [
    { id: 'new_leads', title: 'Leads Nuevos', icon: 'Users' },
    { id: 'conversion_rate', title: 'Tasa de Conversión', icon: 'TrendingUp' },
    { id: 'vehicles_sold', title: 'Vehículos Vendidos', icon: 'BarChart3' },
    { id: 'revenue', title: 'Facturación', icon: 'Calendar' },
  ],
  timeframes: [
    { value: 'week', label: '7 días' },
    { value: 'month', label: '30 días' },
    { value: 'quarter', label: '90 días' },
  ],
  channels: [
    { name: 'Web', color: '#3B82F6' },
    { name: 'WhatsApp', color: '#10B981' },
    { name: 'Email', color: '#6366F1' },
    { name: 'Llamadas', color: '#F59E0B' },
  ],
  funnelStages: stages.map(stage => ({
    name: stage.name,
    color: stage.chartColor
  })),
  activityMetrics: [
    { id: 'interactions', label: 'Interacciones', color: '#8884d8' },
    { id: 'conversions', label: 'Conversiones', color: '#82ca9d' },
  ],
  teamMetrics: [
    { id: 'sales', label: 'Ventas' },
    { id: 'conversion', label: 'Conversión' },
    { id: 'response_time', label: 'Tiempo de Respuesta' },
  ],
  performanceMetrics: {
    activity: [
      { 
        id: 'response_time',
        label: 'Tiempo de Respuesta',
        description: 'Tiempo promedio para primer contacto',
        format: 'time',
        threshold: 3600,
        alert: 7200,
      },
      {
        id: 'daily_contacts',
        label: 'Contactos Diarios',
        description: 'Cantidad de interacciones por día',
        format: 'number',
        threshold: 15,
        alert: 10,
      },
      {
        id: 'follow_ups',
        label: 'Seguimientos',
        description: 'Número de seguimientos realizados',
        format: 'number',
        threshold: 10,
        alert: 5,
      },
      {
        id: 'follow_up_time',
        label: 'Tiempo entre Seguimientos',
        description: 'Tiempo promedio entre seguimientos',
        format: 'days',
        threshold: 3,
        alert: 5,
      },
      {
        id: 'inactive_clients',
        label: 'Clientes sin Seguimiento',
        description: 'Clientes sin contacto reciente',
        format: 'number',
        threshold: 5,
        alert: 10,
      }
    ],
    quality: [
      {
        id: 'lead_classification',
        label: 'Tipificación de Leads',
        description: 'Porcentaje de leads correctamente clasificados',
        format: 'percentage',
        threshold: 90,
        alert: 80,
      },
      {
        id: 'notes_per_client',
        label: 'Notas por Cliente',
        description: 'Promedio de notas y actualizaciones',
        format: 'number',
        threshold: 3,
        alert: 1,
      },
      {
        id: 'stage_deviations',
        label: 'Desvíos de Etapas',
        description: 'Cambios incorrectos de etapa',
        format: 'number',
        threshold: 2,
        alert: 5,
      },
      {
        id: 'reopened_leads',
        label: 'Leads Reabiertos',
        description: 'Porcentaje de leads reactivados',
        format: 'percentage',
        threshold: 5,
        alert: 10,
      },
      {
        id: 'crm_tool_usage',
        label: 'Uso de Herramientas',
        description: 'Porcentaje de uso de funcionalidades',
        format: 'percentage',
        threshold: 80,
        alert: 60,
      }
    ],
    results: [
      {
        id: 'proposals_sent',
        label: 'Propuestas Enviadas',
        description: 'Cantidad de propuestas comerciales',
        format: 'number',
        threshold: 10,
        alert: 5,
      },
      {
        id: 'proposal_response',
        label: 'Respuesta a Propuestas',
        description: 'Tasa de respuesta a propuestas',
        format: 'percentage',
        threshold: 70,
        alert: 50,
      },
      {
        id: 'effective_conversion',
        label: 'Conversión Efectiva',
        description: 'Tasa de conversión a conversación',
        format: 'percentage',
        threshold: 40,
        alert: 25,
      },
      {
        id: 'closing_accuracy',
        label: 'Precisión de Cierres',
        description: 'Estimados vs reales',
        format: 'percentage',
        threshold: 85,
        alert: 70,
      }
    ]
  }
};

// Export types for TypeScript support
export type MetricsTimeframe = typeof metricsConfig.timeframes[number]['value'];
export type MetricsKPI = typeof metricsConfig.kpis[number];
export type MetricsChannel = typeof metricsConfig.channels[number];
export type MetricsFunnelStage = typeof metricsConfig.funnelStages[number];
export type MetricsActivityMetric = typeof metricsConfig.activityMetrics[number];
export type MetricsTeamMetric = typeof metricsConfig.teamMetrics[number];
export type PerformanceMetric = {
  id: string;
  label: string;
  description: string;
  format: 'time' | 'number' | 'percentage' | 'days';
  threshold: number;
  alert: number;
  value?: number;
};