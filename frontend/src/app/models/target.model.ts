export interface Target {
  id: string;
  name: string;
  heading: number;
  timestamp: string;
  classification: 'hostile' | 'friendly';
} 