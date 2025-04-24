import { stageColors, urgencyColors } from '../constants/colors';
import type { StageType, UrgencyLevel } from '../types';

export function getStageColor(stage: StageType) {
  return stageColors[stage] || stageColors.lead;
}

export function getUrgencyColor(urgency: UrgencyLevel) {
  return urgencyColors[urgency] || urgencyColors.Explorando;
}