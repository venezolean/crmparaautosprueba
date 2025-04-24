import React from 'react';
import clsx from 'clsx';
import { preferenceOptions } from '../../constants/preferenceOptions';

interface Props {
  title: string;
  category: keyof typeof preferenceOptions;
  options: string[];
  selected: string[];
  onToggle: (category: keyof typeof preferenceOptions, value: string) => void;
}

export default function PreferenceSection({
  title,
  category,
  options,
  selected,
  onToggle
}: Props) {
  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <button
            key={option}
            onClick={() => onToggle(category, option)}
            className={clsx(
              "px-3 py-1 rounded-full text-sm font-medium transition-colors",
              selected.includes(option)
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}