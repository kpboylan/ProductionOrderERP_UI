export interface RoomHumidity {
    timestamp: string;
    roomId: string;
    batchId: string;
    humidity: number;
    isSpike: boolean;
    score: number;
    pValue: number;
    batchNumber: string;
    roomName: string;
  }