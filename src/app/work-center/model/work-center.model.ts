export interface WorkCenter {
    id: string;           // Unique identifier (e.g., "WC-101")
    name: string;         // Display name (e.g., "Primary Manufacturing")
    type?: string;        // Type of work center
    supervisor?: string;  // Responsible person
    status?: 'active' | 'inactive';
    productionLines?: string[]; // Associated production line IDs
  }