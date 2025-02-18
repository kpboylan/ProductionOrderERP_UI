export interface Material {
    materialID: number;
    materialType: number;
    materialName: string;
    description: string;
    currentStock: number;
    uomId: number;
    uomCode: string;
    materialTypeAbbreviation: string;
    active: boolean;
  }