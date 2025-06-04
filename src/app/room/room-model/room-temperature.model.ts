export interface RoomTemperature {
    timestamp: string;
    roomId: string;
    batchId: string;
    temperature: number;
    isAnomaly: boolean;
    score: number;
    pValue: number;
    batchNumber: string;
    roomName: string;
  }