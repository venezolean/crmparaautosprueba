import React from 'react';
import type { ClientPreferences } from '../../types';
import { preferenceOptions } from '../../config';
import PreferenceSection from '../PreferenceSection';

interface Props {
  preferences: ClientPreferences;
  onTogglePreference: (category: keyof typeof preferenceOptions, value: string) => void;
}

export default function ClientPreferencesEditor({ preferences, onTogglePreference }: Props) {
  return (
    <div className="space-y-4">
      <PreferenceSection
        title="Tipo de vehículo"
        category="vehicleType"
        options={preferenceOptions.vehicleType}
        selected={preferences.vehicleType}
        onToggle={onTogglePreference}
      />
      <PreferenceSection
        title="Transmisión"
        category="transmission"
        options={preferenceOptions.transmission}
        selected={preferences.transmission}
        onToggle={onTogglePreference}
      />
      <PreferenceSection
        title="Combustible"
        category="fuelType"
        options={preferenceOptions.fuelType}
        selected={preferences.fuelType}
        onToggle={onTogglePreference}
      />
      <PreferenceSection
        title="Año de interés"
        category="yearRange"
        options={preferenceOptions.yearRange}
        selected={preferences.yearRange}
        onToggle={onTogglePreference}
      />
      <PreferenceSection
        title="Marca preferida"
        category="brand"
        options={preferenceOptions.brand}
        selected={preferences.brand}
        onToggle={onTogglePreference}
      />
      <PreferenceSection
        title="Uso del vehículo"
        category="vehicleUse"
        options={preferenceOptions.vehicleUse}
        selected={preferences.vehicleUse}
        onToggle={onTogglePreference}
      />
    </div>
  );
}