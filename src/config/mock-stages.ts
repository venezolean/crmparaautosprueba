import { COLORS } from './colors';


export const stages: Stage[] = [
    { id: 'lead', name: 'Leaded', color: 'bg-yellow-500', chartColor: '#F59E0B' },
    { id: 'contact', name: 'Contacto', color: 'bg-blue-500', chartColor: '#3B82F6' },
    { id: 'test_drive', name: 'Test Drive', color: 'bg-purple-500', chartColor: '#8B5CF6' },
    { id: 'negotiation', name: 'Negociación', color: 'bg-orange-500', chartColor: '#F97316' },
    { id: 'closed', name: 'Cerradoo', color: 'bg-green-500', chartColor: '#10B981' }
  ];

  export type Stage = {
    id: string;
    name: string;
    color: string;
    chartColor: string;
  };
  