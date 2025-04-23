// src/config/colors.ts

export const COLORS = {
    yellow: {  
      bg: 'bg-yellow-500',
      hex: '#F59E0B'
    },
    blue: {
      bg: 'bg-blue-500',
      hex: '#3B82F6'
    },
    purple: {
      bg: 'bg-purple-500',
      hex: '#8B5CF6'
    },
    orange: {
      bg: 'bg-orange-500',
      hex: '#F97316'
    },
    green: {
      bg: 'bg-green-500',
      hex: '#10B981'
    },
    red: {
      bg: 'bg-red-500',
      hex: '#EF4444'
    },
    gray: {
      bg: 'bg-gray-500',
      hex: '#6B7280'
    }
  } as const;
  
  export const colorOptions = (Object.keys(COLORS) as ColorKey[]).map(key => ({
    name: key[0].toUpperCase() + key.slice(1),
    value: COLORS[key].bg,
    chartColor: COLORS[key].hex
  }));
  


  export type ColorKey = keyof typeof COLORS;
  