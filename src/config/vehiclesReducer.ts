import { Vehicle } from ".";
import { VehiclesAction } from ".";

export const vehiclesReducer = (state: Vehicle[], action: VehiclesAction): Vehicle[] => {
    switch (action.type) {
      case 'ADD_VEHICLE':
        return [...state, action.payload];
      case 'REMOVE_VEHICLE':
        return state.filter(v => v.id !== action.payload);
      case 'UPDATE_VEHICLE':
        return state.map(v => v.id === action.payload.id ? action.payload : v);
      case 'SET_VEHICLES':
        return action.payload;
      default:
        return state;
    }
  };
  