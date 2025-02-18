import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<any> {
    return this.http.get('/assets/config.json'); 
  }

  getConfig() {
    return this.config;
  }

  getApiUrl() {
    return this.config?.apiUrl;
  }

  getAppName() {
    return this.config?.appName;
  }

  setConfig(config: any) {
    this.config = config;
  }
}