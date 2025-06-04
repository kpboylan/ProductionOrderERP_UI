import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdOrderService{
    constructor(private http: HttpClient){}

    private apiUrl = 'https://localhost:7283/api/Material/UOM';

    getUOM(): Observable<UOM[]> {
        return this.http.get<UOM[]>(this.apiUrl);
    }
}

export interface UOM {
    uomid: number;
    uomCode: string;
  }