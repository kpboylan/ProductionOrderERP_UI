import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoomTemperature } from '../room-model/room-temperature.model';
import { RoomHumidity } from '../room-model/room-humidity.model';

@Injectable({
    providedIn: 'root',
  })
  export class RoomService {
    private apiUrl = 'https://localhost:7283/api/Room/';
  
    constructor(private http: HttpClient) {}
  
    getRoomTemperatures(roomId: string, batchId: string, isAnomaly: boolean): Observable<RoomTemperature[]> {
      let params = new HttpParams()
        .set('RoomId', roomId)
        .set('BatchId', batchId)
        .set('IsAnomaly', isAnomaly.toString());
  
      return this.http.get<RoomTemperature[]>(this.apiUrl + 'roomTempList', { params });
    }

    getRoomHumidity(roomId: string, batchId: string, isSpike: boolean): Observable<RoomHumidity[]> {
      let params = new HttpParams()
        .set('RoomId', roomId)
        .set('BatchId', batchId)
        .set('IsSpike', isSpike.toString());
  
      return this.http.get<RoomHumidity[]>(this.apiUrl + 'roomHumidityList', { params });
    }
  }