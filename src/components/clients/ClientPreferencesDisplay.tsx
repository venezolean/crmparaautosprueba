import React from 'react';
import type { ClientPreferences } from '../../types';

interface Props {
  preferences: ClientPreferences;
}

export default function ClientPreferencesDisplay({ preferences }: Props) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Tipo de vehículo</p>
          <p>{preferences.vehicleType.join(', ')}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Transmisión</p>
          <p>{preferences.transmission.join(', ')}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Combustible</p>
          <p>{preferences.fuelType.join(', ')}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Marca</p>
          <p>{preferences.brand.join(', ')}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Presupuesto</p>
          <p>{preferences.budget}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">Urgencia</p>
          <p>{preferences.urgency}</p>
        </div>
      </div>
    </div>
  );
}