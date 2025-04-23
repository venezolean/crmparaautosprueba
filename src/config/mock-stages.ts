import { COLORS } from './colors';
import type { ColorKey } from './colors';


export const stages: Stage[] = [
    { id: 'lead', name: 'Leaded', color: COLORS.yellow.bg , chartColor: COLORS.yellow.hex},
    { id: 'contact', name: 'Contacto', color: COLORS.blue.bg , chartColor: COLORS.blue.hex },
    { id: 'test_drive', name: 'Test Drive', color: COLORS.purple.bg , chartColor: COLORS.purple.hex },
    { id: 'negotiation', name: 'Negociación', color: COLORS.orange.bg , chartColor: COLORS.orange.hex },
    { id: 'closed', name: 'Cerradoo', color: COLORS.green.bg , chartColor: COLORS.green.hex }
  ];

  type ColorValue = (typeof COLORS)[ColorKey]['bg'];
type ChartColor = (typeof COLORS)[ColorKey]['hex'];

export type Stage = {
  id: string;
  name: string;
  color: ColorValue;
  chartColor: ChartColor;
};