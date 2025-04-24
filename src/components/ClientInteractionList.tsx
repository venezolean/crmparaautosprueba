import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Phone, MessageSquare, Mail, Building2, Globe, ChevronRight } from 'lucide-react';
import type { ClientInteraction } from '../types';
import { initialReasons } from '../config'; // 🔁 Cambiado desde Reason a initialReasons

interface Props {
  interactions: ClientInteraction[];
}

const interactionIcons = {
  call: Phone,
  whatsapp: MessageSquare,
  email: Mail,
  visit: Building2,
  web: Globe,
};

// ✅ Corrección: usamos initialReasons en lugar del tipo Reason
const reasonEmojis: Record<string, string> = Object.fromEntries(
  initialReasons.map(({ value, emoji }) => [value, emoji])
);

export default function ClientInteractionList({ interactions }: Props) {
  return (
    <div className="space-y-3">
      {interactions.map((interaction, index) => {
        const date = new Date(interaction.date);
        
        return (
          <div
            key={interaction.id || index}
            className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0 flex space-x-2">
              {interaction.type.map((type) => {
                const Icon = interactionIcons[type as keyof typeof interactionIcons];
                return Icon ? <Icon key={type} className="w-5 h-5 text-gray-400" /> : null;
              })}
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-gray-900">
                  {format(date, "d 'de' MMMM, HH:mm", { locale: es })}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {reasonEmojis[interaction.reason]} {interaction.stage}
                </span>
              </div>
              
              {interaction.vehicle && (
                <p className="text-sm text-gray-600 mb-1">
                  Vehículo: {interaction.vehicle}
                </p>
              )}
              
              {interaction.notes && (
                <p className="text-sm text-gray-600 mt-2">
                  {interaction.notes}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
