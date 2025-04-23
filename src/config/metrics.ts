import { stages } from './mock-stages';
import { COLORS } from './colors';


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
      { name: 'Web', color: COLORS.blue.hex },
      { name: 'WhatsApp', color: COLORS.green.hex },
      { name: 'Email', color: COLORS.purple.hex },
      { name: 'Llamadas', color: COLORS.yellow.hex },
    ],
    funnelStages: stages.map(stage => ({
      name: stage.name,
      color: stage.chartColor
    })),
    activityMetrics: [
      { id: 'interactions', label: 'Interacciones', color: COLORS.purple.hex },
      { id: 'conversions', label: 'Conversiones', color: COLORS.green.hex },
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