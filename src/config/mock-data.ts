import { format, subDays } from 'date-fns';
import { stages } from './index';

export const mockSellers = [
  { id: '1', name: 'Juan Pérez', email: 'juan@email.com', phone: '+54 911 1234-5678' },
  { id: '2', name: 'María García', email: 'maria@email.com', phone: '+54 911 8765-4321' },
  { id: '3', name: 'Carlos López', email: 'carlos@email.com', phone: '+54 911 2345-6789' },
  { id: '4', name: 'Ana Martínez', email: 'ana@email.com', phone: '+54 911 9876-5432' },
  { id: '5', name: 'Pedro Sánchez', email: 'pedro@email.com', phone: '+54 911 3456-7890' }
];

export const mockQualityData = [
  { subject: 'Tipificación', A: 85, B: 90 },
  { subject: 'Notas', A: 65, B: 80 },
  { subject: 'Seguimiento', A: 90, B: 85 },
  { subject: 'Uso CRM', A: 70, B: 95 },
  { subject: 'Precisión', A: 80, B: 90 }
];

export const mockActivityData = Array.from({ length: 30 }, (_, i) => ({
  date: format(subDays(new Date(), i), 'dd/MM'),
  contacts: Math.floor(Math.random() * 50) + 10,
  followUps: Math.floor(Math.random() * 30) + 5
})).reverse();

export const mockClients = [
  {
    id: '1',
    name: 'Juan Pérez',
    dni: '12345678',
    phone: '+54 911 1234-5678',
    email: 'juan@email.com',
    address: 'Av. Libertador 1234',
    work_info: 'Empresario',
    seller_id: '1',
    stage: 'contact',
    last_contact: new Date('2024-03-15'),
    created_at: new Date('2024-03-10')
  },
  {
    id: '2',
    name: 'María García',
    dni: '87654321',
    phone: '+54 911 8765-4321',
    email: 'maria@email.com',
    address: 'Calle Florida 567',
    work_info: 'Abogada',
    seller_id: '2',
    stage: 'test_drive',
    last_contact: new Date('2024-03-16'),
    created_at: new Date('2024-03-12')
  }
];

export const mockMetrics = {
  sellers: mockSellers.map(seller => ({
    id: seller.id,
    name: seller.name,
    metrics: {
      sales: Math.floor(Math.random() * 30) + 10,
      conversion: Math.floor(Math.random() * 40) + 20,
      response_time: Math.floor(Math.random() * 24) + 1,
      trend: Math.random() > 0.5 ? 'up' : 'down',
      trend_value: Math.floor(Math.random() * 15) + 1
    }
  })),
  channels: [
    { name: 'Web', value: 35 },
    { name: 'WhatsApp', value: 30 },
    { name: 'Email', value: 20 },
    { name: 'Llamadas', value: 15 }
  ],
  funnel: stages.map(stage => ({
    name: stage.name,
    value: Math.floor(Math.random() * 100) + 20
  }))
};