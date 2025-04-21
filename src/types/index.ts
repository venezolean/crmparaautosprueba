export interface ClientInteraction {
  id: string;
  date: string;
  type: string[];
  reason: string;
  vehicle: string;
  stage: string;
  notes?: string;
}

export interface Client {
  id: string;
  name: string;
  dni: string;
  phone: string;
  email: string;
  address: string;
  work_info: string;
  preferences: {
    vehicleType: string[];
    transmission: string[];
    fuelType: string[];
    yearRange: string[];
    brand: string[];
    budget: string;
    acceptsTrade: boolean;
    carCondition: string;
    savingsPlan: string;
    vehicleUse: string[];
    urgency: string;
    location: string;
  };
  interactions: ClientInteraction[];
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Opportunity {
  id: string;
  client_id: string;
  seller_id: string;
  stage: string;
  estimated_value: number;
  next_action: string;
  notes: string;
  created_at: Date;
}

export interface SalesMetrics {
  id: string;
  seller_id: string;
  total_sales: number;
  conversion_rate: number;
  response_time: number;
  avg_sale_value: number;
  report_date: Date;
}

export interface EmailCampaign {
  id: string;
  title: string;
  content: string;
  target_stage: string[];
  send_to_all: boolean;
  created_by: string;
  created_at: Date;
}

export interface WhatsAppFlow {
  id: string;
  name: string;
  template: string;
  target_stage: string[];
  created_by: string;
  created_at: Date;
}