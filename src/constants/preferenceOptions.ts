import type {
  VehicleType,
  TransmissionType,
  FuelType,
  YearRange,
  BrandType,
  BudgetRange,
  CarCondition,
  SavingsPlanStatus,
  VehicleUseType,
  UrgencyLevel,
} from '../types';

export const preferenceOptions = {
  vehicleType: [
    'SUV',
    'Sedan',
    'Hatchback',
    'Pick-up',
    'Utilitario',
    'Familiar',
    'Deportivo',
  ] as VehicleType[],

  transmission: ['Manual', 'Automática'] as TransmissionType[],

  fuelType: ['Nafta', 'Diésel', 'Híbrido', 'Eléctrico'] as FuelType[],

  yearRange: ['2020', '2021', '2022', '2023', '2024', '2025'] as YearRange[],

  brand: ['Fiat', 'Peugeot', 'Chevrolet', 'Volkswagen', 'Otra'] as BrandType[],

  budget: ['<5M', '5-8M', '8-12M', '>12M ARS'] as BudgetRange[],

  carCondition: ['Solo 0km', 'Solo usados', 'Ambos'] as CarCondition[],

  savingsPlan: [
    'Tiene uno activo',
    'Tuvo uno caído',
    'Nunca tuvo',
  ] as SavingsPlanStatus[],

  vehicleUse: ['Personal', 'Trabajo', 'Familia', 'Viajes', 'Otro'] as VehicleUseType[],

  urgency: ['Inmediata', 'Próximo mes', 'Explorando'] as UrgencyLevel[],
};