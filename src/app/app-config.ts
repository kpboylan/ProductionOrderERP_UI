// src/app/config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AppConfig {
  apiUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: AppConfig | null = null;

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<AppConfig> {
    return this.http.get<AppConfig>('assets/config.json');
  }

  get apiUrl(): string {
    if (!this.config) {
      throw new Error('Configuration not loaded');
    }
    return this.config.apiUrl;
  }

  set configData(config: AppConfig) {
    this.config = config;
  }
}
