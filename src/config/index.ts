import { Phone, MessageSquare, Mail, Building2, Globe } from 'lucide-react';
import { stages } from './mock-stages';

import type { LucideIcon } from 'lucide-react';

export type InteractionType = {
  icon: LucideIcon;
  label: string;
  value: 'call' | 'whatsapp' | 'email' | 'visit' | 'web';
};


export const interactionTypes = [
  { icon: Phone, label: 'Llamada', value: 'call' },
  { icon: MessageSquare, label: 'WhatsApp', value: 'whatsapp' },
  { icon: Mail, label: 'Email', value: 'email' },
  { icon: Building2, label: 'Visita', value: 'visit' },
  { icon: Globe, label: 'Web', value: 'web' },
];

export type Reason = {
  emoji: string;
  label: string;
  value:
    | 'inquiry'
    | 'financing'
    | 'vehicle'
    | 'trade'
    | 'sale'
    | 'follow_up'
    | 'quote';
};


export const Reasons = [
  { emoji: '❓', label: 'Consulta', value: 'inquiry' },
  { emoji: '💳', label: 'Financiación', value: 'financing' },
  { emoji: '🚘', label: 'Vehículo', value: 'vehicle' },
  { emoji: '🔄', label: 'Parte de pago', value: 'trade' },
  { emoji: '✅', label: 'Cierre de venta', value: 'sale' },
  { emoji: '⏳', label: 'Seguimiento', value: 'follow_up' },
  { emoji: '📝', label: 'Presupuesto', value: 'quote' },
];


export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  promoPrice?: number;
  engine: string;
  transmission: string;
  fuelType: string;
  power: string;
  mileage: number;
  condition: '0km' | 'Usado';
  category: string;
  description: string;
  images: string[];
  stock?: number;
  featured?: boolean;
  availableForTestDrive?: boolean;
};

export type VehiclesAction =
  | { type: 'ADD_VEHICLE'; payload: Vehicle }
  | { type: 'REMOVE_VEHICLE'; payload: string }
  | { type: 'UPDATE_VEHICLE'; payload: Vehicle }
  | { type: 'SET_VEHICLES'; payload: Vehicle[] };



export const vehicles: Vehicle[] = [
  {
    id: 'vw-golf-2024',
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2024,
    price: 12500000,
    promoPrice: 11500000,
    engine: '1.4 TSI',
    transmission: 'Automática',
    fuelType: 'Nafta',
    power: '150 CV',
    mileage: 0,
    condition: '0km',
    category: 'Hatchback',
    description: 'El nuevo Golf 2024 combina diseño elegante con tecnología de punta y excelente rendimiento.',
    images: [
      'https://cdn.nexoauto.com/images/vw-golf-front.jpg',
      'https://cdn.nexoauto.com/images/vw-golf-side.jpg'
    ],
    stock: 5,
    featured: true,
    availableForTestDrive: true
  },
  {
    id: 'fiat-cronos-2023-usado',
    brand: 'Fiat',
    model: 'Cronos',
    year: 2023,
    price: 8500000,
    engine: '1.3 Firefly',
    transmission: 'Manual',
    fuelType: 'Nafta',
    power: '99 CV',
    mileage: 12000,
    condition: 'Usado',
    category: 'Sedan',
    description: 'Versátil y económico, ideal para la ciudad con bajo consumo y buena capacidad de baúl.',
    images: [
      'https://cdn.nexoauto.com/images/fiat-cronos-2023.jpg'
    ],
    stock: 1,
    availableForTestDrive: false
  },
  // Podés seguir con más modelos...
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

export type VehicleType =
  | 'SUV'
  | 'Sedan'
  | 'Hatchback'
  | 'Pick-up'
  | 'Utilitario'
  | 'Familiar'
  | 'Deportivo';

export type Transmission = 'Manual' | 'Automática';

export type FuelType = 'Nafta' | 'Diésel' | 'Híbrido' | 'Eléctrico';

export type Year = '2020' | '2021' | '2022' | '2023' | '2024' | '2025';

export type Brand =
  | 'Fiat'
  | 'Peugeot'
  | 'Chevrolet'
  | 'Volkswagen'
  | 'Otra';

export type Budget = '<5M' | '5-8M' | '8-12M' | '>12M ARS';

export type CarCondition = 'Solo 0km' | 'Solo usados' | 'Ambos';

export type SavingsPlan =
  | 'Tiene uno activo'
  | 'Tuvo uno caído'
  | 'Nunca tuvo';

export type VehicleUse =
  | 'Personal'
  | 'Trabajo'
  | 'Familia'
  | 'Viajes'
  | 'Otro';

export type Urgency =
  | 'Inmediata'
  | 'Próximo mes'
  | 'Explorando';
