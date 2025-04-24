import { Phone, MessageSquare, Mail, Building2, Globe } from 'lucide-react';
import type { InteractionType } from '../types';

export const interactionTypes = [
  { icon: Phone, label: 'Llamada', value: 'call' as InteractionType },
  { icon: MessageSquare, label: 'WhatsApp', value: 'whatsapp' as InteractionType },
  { icon: Mail, label: 'Email', value: 'email' as InteractionType },
  { icon: Building2, label: 'Visita', value: 'visit' as InteractionType },
  { icon: Globe, label: 'Web', value: 'web' as InteractionType },
];

export const interactionIcons = {
  call: Phone,
  whatsapp: MessageSquare,
  email: Mail,
  visit: Building2,
  web: Globe,
};

export const reasons = [
  { emoji: '❓', label: 'Consulta', value: 'inquiry' },
  { emoji: '💳', label: 'Financiación', value: 'financing' },
  { emoji: '🚘', label: 'Vehículo', value: 'vehicle' },
  { emoji: '🔄', label: 'Parte de pago', value: 'trade' },
  { emoji: '✅', label: 'Cierre de venta', value: 'sale' },
  { emoji: '⏳', label: 'Seguimiento', value: 'follow_up' },
  { emoji: '📝', label: 'Presupuesto', value: 'quote' },
];

export const stages = [
  { id: 'lead', name: 'Lead' },
  { id: 'contact', name: 'Contacto' },
  { id: 'test_drive', name: 'Test Drive' },
  { id: 'negotiation', name: 'Negociación' },
  { id: 'closed', name: 'Cerrado' },
];