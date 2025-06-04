export interface ProductionLine {
    id: string;           // Unique line identifier (e.g., "LINE-1")
    name: string;         // Display name (e.g., "Tableting Line 1")
    description?: string;
    location?: string;    // Physical location
    status?: 'active' | 'inactive' | 'maintenance';
    capacity?: number;    // Maximum capacity
    uom?: string;         // Default unit of measure for this line
  }