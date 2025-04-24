import { Client, EmailCampaign, WhatsAppFlow } from '../types';
import { stages } from '../config/mock-stages';
import { COLORS } from '../config/colors';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    dni: '12345678',
    phone: '+54 911 1234-5678',
    email: 'juan@email.com',
    address: 'Av. Libertador 1234',
    work_info: 'Empresario',
    preferences: {
      vehicleType: ['SUV'],
      transmission: ['Automática'],
      fuelType: ['Nafta'],
      yearRange: ['2024'],
      brand: ['Volkswagen'],
      budget: '8-12M',
      acceptsTrade: true,
      carCondition: 'Solo 0km',
      savingsPlan: 'Nunca tuvo',
      vehicleUse: ['Personal', 'Familia'],
      urgency: 'Próximo mes',
      location: 'Buenos Aires'
    },
    interactions: [
      {
        id: '1',
        date: '2024-03-15T10:30:00',
        type: ['call'],
        reason: 'inquiry',
        vehicle: 'VW Tiguan',
        stage: 'contact',
        notes: 'Cliente interesado en SUV automática'
      }
    ]
  },
  {
    id: '2',
    name: 'María García',
    dni: '87654321',
    phone: '+54 911 8765-4321',
    email: 'maria@email.com',
    address: 'Calle Florida 567',
    work_info: 'Abogada',
    preferences: {
      vehicleType: ['Sedan'],
      transmission: ['Manual'],
      fuelType: ['Nafta'],
      yearRange: ['2023'],
      brand: ['Chevrolet'],
      budget: '5-8M',
      acceptsTrade: false,
      carCondition: 'Ambos',
      savingsPlan: 'Nunca tuvo',
      vehicleUse: ['Personal'],
      urgency: 'Explorando',
      location: 'Córdoba'
    },
    interactions: []
  }
];

export const mockSellers = [
  { id: '1', name: 'Juan Pérez', email: 'juan@email.com', phone: '+54 911 1234-5678' },
  { id: '2', name: 'María García', email: 'maria@email.com', phone: '+54 911 8765-4321' },
  { id: '3', name: 'Carlos López', email: 'carlos@email.com', phone: '+54 911 2345-6789' },
  { id: '4', name: 'Ana Martínez', email: 'ana@email.com', phone: '+54 911 9876-5432' },
  { id: '5', name: 'Pedro Sánchez', email: 'pedro@email.com', phone: '+54 911 3456-7890' }
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

export const mockQualityData = [
  { subject: 'Tipificación', A: 85, B: 90 },
  { subject: 'Notas', A: 65, B: 80 },
  { subject: 'Seguimiento', A: 90, B: 85 },
  { subject: 'Uso CRM', A: 70, B: 95 },
  { subject: 'Precisión', A: 80, B: 90 }
];

export const getAISuggestions = () => [
  "Juan Pérez no ha sido contactado en los últimos 7 días. Considera hacer un seguimiento.",
  "María García mostró interés en un VW Golf. Hay una promoción activa que podría interesarle.",
  "3 clientes en etapa de test drive necesitan seguimiento esta semana.",
  "El horario más efectivo para contactar a los clientes ha sido entre 10:00 y 12:00.",
];