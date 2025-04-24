// Client Types
export interface ClientInteraction {
  id: string;
  date: string;
  type: InteractionType[];
  reason: ReasonType;
  vehicle: string;
  stage: StageType;
  notes?: string;
}

export interface ClientPreferences {
  vehicleType: VehicleType[];
  transmission: TransmissionType[];
  fuelType: FuelType[];
  yearRange: YearRange[];
  brand: BrandType[];
  budget: BudgetRange;
  acceptsTrade: boolean;
  carCondition: CarCondition;
  savingsPlan: SavingsPlanStatus;
  vehicleUse: VehicleUseType[];
  urgency: UrgencyLevel;
  location: string;
}

export interface Client {
  id: string;
  name: string;
  dni: string;
  phone: string;
  email: string;
  address: string;
  work_info: string;
  preferences: ClientPreferences;
  interactions: ClientInteraction[];
}

// Enum Types
export type InteractionType = 'call' | 'whatsapp' | 'email' | 'visit' | 'web';
export type ReasonType = 'inquiry' | 'financing' | 'vehicle' | 'trade' | 'sale' | 'follow_up' | 'quote';
export type StageType = 'lead' | 'contact' | 'test_drive' | 'negotiation' | 'closed';
export type VehicleType = 'SUV' | 'Sedan' | 'Hatchback' | 'Pick-up' | 'Utilitario' | 'Familiar' | 'Deportivo';
export type TransmissionType = 'Manual' | 'Automática';
export type FuelType = 'Nafta' | 'Diésel' | 'Híbrido' | 'Eléctrico';
export type YearRange = '2020' | '2021' | '2022' | '2023' | '2024' | '2025';
export type BrandType = 'Fiat' | 'Peugeot' | 'Chevrolet' | 'Volkswagen' | 'Otra';
export type BudgetRange = '<5M' | '5-8M' | '8-12M' | '>12M ARS';
export type CarCondition = 'Solo 0km' | 'Solo usados' | 'Ambos';
export type SavingsPlanStatus = 'Tiene uno activo' | 'Tuvo uno caído' | 'Nunca tuvo';
export type VehicleUseType = 'Personal' | 'Trabajo' | 'Familia' | 'Viajes' | 'Otro';
export type UrgencyLevel = 'Inmediata' | 'Próximo mes' | 'Explorando';

// State Types
export interface ClientsState {
  clients: Client[];
  selectedClientId: string | null;
  showForm: boolean;
  showNewInteraction: boolean;
  showAIModal: boolean;
  searchTerm: string;
  editingPreferences: boolean;
  tempPreferences: ClientPreferences | null;
  showPreferences: boolean;
  showInteractions: boolean;
  loading: boolean;
  error: string | null;
}

// Action Types
export type ClientsAction =
  | { type: 'SET_CLIENTS'; payload: Client[] }
  | { type: 'SELECT_CLIENT'; payload: string | null }
  | { type: 'TOGGLE_FORM' }
  | { type: 'TOGGLE_NEW_INTERACTION' }
  | { type: 'TOGGLE_AI_MODAL' }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'START_EDITING_PREFERENCES'; payload: ClientPreferences }
  | { type: 'SAVE_PREFERENCES'; payload: { clientId: string; preferences: ClientPreferences } }
  | { type: 'CANCEL_EDITING_PREFERENCES' }
  | { type: 'TOGGLE_PREFERENCES' }
  | { type: 'TOGGLE_INTERACTIONS' }
  | { type: 'ADD_INTERACTION'; payload: { clientId: string; interaction: ClientInteraction } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };