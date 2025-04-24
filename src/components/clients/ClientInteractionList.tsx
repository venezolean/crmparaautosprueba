import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import type { ClientInteraction } from '../../types';
import { interactionIcons } from '../../constants/interactions';
import { getStageColor } from '../../utils/colors';

interface Props {
  interactions: ClientInteraction[];
}

export default function ClientInteractionList({ interactions }: Props) {
  return (
    <div className="space-y-3">
      {interactions.map((interaction, index) => {
        const date = new Date(interaction.date);
        const stageColor = getStageColor(interaction.stage);
        
        return (
          <div
            key={interaction.id || index}
            className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0 flex space-x-2">
              {interaction.type.map((type) => {
                const Icon = interactionIcons[type];
                return Icon ? (
                  <Icon 
                    key={type} 
                    className={clsx(
                      "w-5 h-5",
                      type === 'call' && "text-green-500",
                      type === 'whatsapp' && "text-green-600",
                      type === 'email' && "text-blue-500",
                      type === 'visit' && "text-purple-500",
                      type === 'web' && "text-gray-500"
                    )} 
                  />
                ) : null;
              })}
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-sm font-medium text-gray-900">
                  {format(date, "d 'de' MMMM, HH:mm", { locale: es })}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <span 
                  className={clsx(
                    "text-sm px-2 py-1 rounded-full",
                    `bg-${stageColor.bg} text-${stageColor.text}`
                  )}
                >
                  {interaction.stage}
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