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

