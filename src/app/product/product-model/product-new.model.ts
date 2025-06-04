export interface ProductNew {
    code: string;        // Unique product code (e.g., "PROD-001")
    name: string;        // Product name (e.g., "Aspirin 500mg Tablets")
    description?: string; // Optional description
    uom?: string;        // Default unit of measure (e.g., "tablets", "kg")
    batchManaged?: boolean; // If batch tracking is required
    active?: boolean;     // If the product is active for production
}