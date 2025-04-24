import type { Client } from '../types';

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