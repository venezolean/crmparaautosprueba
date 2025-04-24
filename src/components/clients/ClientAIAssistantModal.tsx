import React from 'react';
import { Bot, X, Check } from 'lucide-react';
import clsx from 'clsx';

interface Props {
  isOpen: boolean;
  suggestions: string[];
  onClose: () => void;
  onUseSuggestion?: (suggestion: string) => void;
}

export default function ClientAIAssistantModal({
  isOpen,
  suggestions,
  onClose,
  onUseSuggestion
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Bot className="w-6 h-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold">Asistente IA</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={clsx(
                  "bg-blue-50 p-4 rounded-lg border border-blue-100",
                  "flex items-start justify-between group"
                )}
              >
                <p className="text-blue-800 flex-grow">{suggestion}</p>
                {onUseSuggestion && (
                  <button
                    onClick={() => onUseSuggestion(suggestion)}
                    className="ml-3 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}