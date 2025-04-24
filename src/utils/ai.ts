import type { Client, ClientInteraction } from '../types';

export function generateClientSuggestions(client: Client): string[] {
  const suggestions: string[] = [];

  // Check last interaction
  const lastInteraction = client.interactions[client.interactions.length - 1];
  if (lastInteraction) {
    const daysSinceLastInteraction = getDaysSince(lastInteraction.date);
    if (daysSinceLastInteraction > 7) {
      suggestions.push(`${client.name} no ha sido contactado en los últimos ${daysSinceLastInteraction} días.`);
    }
  }

  // Check preferences match
  if (client.preferences.urgency === 'Inmediata') {
    suggestions.push(`Cliente con urgencia inmediata - Priorizar seguimiento.`);
  }

  // Budget suggestions
  if (client.preferences.budget === '>12M ARS') {
    suggestions.push('Cliente con alto presupuesto - Considerar opciones premium.');
  }

  return suggestions;
}

function getDaysSince(date: string): number {
  const diff = new Date().getTime() - new Date(date).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}