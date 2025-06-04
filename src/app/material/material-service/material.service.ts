import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Material } from '../material-model/material.model';
import { ConfigService } from 'src/app/config.service';

@Injectable({
    providedIn: 'root',
  })
  export class MaterialService {
    private apiUrlSubject = new BehaviorSubject<string>('');
    apiUrl$ = this.apiUrlSubject.asObservable();

    private useMessageQueueSubject = new BehaviorSubject<boolean>(false);
    useMessageQueue$ = this.useMessageQueueSubject.asObservable(); 

    constructor(private http: HttpClient, private configService: ConfigService) {
      this.configService.loadConfig().subscribe((config) => {
        const apiUrl = config.apiUrl + 'Material';
        const useMessageQueue = config.useMessageQueue;
        console.log('apiUrl: ', apiUrl);
        console.log('useMessageQueue: ', useMessageQueue);
        this.apiUrlSubject.next(apiUrl);
        this.useMessageQueueSubject.next(useMessageQueue);
      });
    }

        getMaterials(): Observable<Material[]> {
          return this.apiUrl$.pipe(
            switchMap((apiUrl) => {
              if (!apiUrl) {
                throw new Error('API URL is not set. Configuration not loaded yet.');
              }
              return this.http.get<Material[]>(apiUrl + '/all');
            })
          );
        }

        getActiveMaterials(): Observable<Material[]> {
          return this.apiUrl$.pipe(
            switchMap((apiUrl) => {
              if (!apiUrl) {
                throw new Error('API URL is not set. Configuration not loaded yet.');
              }
              return this.http.get<Material[]>(apiUrl + '/active');
            })
          );
        }

        getMaterialById(materialId: number): Observable<Material> {
          return this.apiUrl$.pipe(
            switchMap((apiUrl) => {
              if (!apiUrl) {
                throw new Error('API URL is not set. Configuration not loaded yet.');
              }
              const url = apiUrl + '/getMaterial?materialId=' + materialId;
              return this.http.get<Material>(url);
            })
          );
        }

        createMaterial(material: any): Observable<any> {
          return combineLatest([this.useMessageQueue$, this.apiUrl$]).pipe(
            switchMap(([useMessageQueue, apiUrl]) => {
              if (!apiUrl) {
                throw new Error('API URL is not set. Configuration not loaded yet.');
              }
        
              if (useMessageQueue) {
                // Add the material to a queue with RabbitMQ
                console.log('Using message queue for creating material');
                return this.http.post(apiUrl + '/rabbitMqCreate', material);
              } 
              else {
                // Add the material to the DB with API repository
                console.log('Using direct HTTP call for creating material');
                return this.http.post(apiUrl, material);
              }
            })
          );
        }

        updateMaterial(materialId: number, material: Material): Observable<any> {
          return combineLatest([this.useMessageQueue$, this.apiUrl$]).pipe(
            switchMap(([useMessageQueue, apiUrl]) => {
              if (!apiUrl) {
                throw new Error('API URL is not set. Configuration not loaded yet.');
              }
      
              if (useMessageQueue) {
                // Use message queue logic here
                console.log('Using message queue for updating material');
                return this.http.put<void>(apiUrl + '/rabbitMqUpdate', material);
              } 
              else {
                // Use direct HTTP call logic here
                console.log('Using direct HTTP call for updating material');
                const url = `${apiUrl}/${materialId}`;
                console.log('Updating Material data: ', material);
                return this.http.put<void>(url, material);
              }
            })
          );
        }
      
        getMaterialTypes(): Observable<MaterialType[]> {
          return this.apiUrl$.pipe(
            switchMap((apiUrl) => {
              if (!apiUrl) {
                throw new Error('API URL is not set. Configuration not loaded yet.');
              }
              return this.http.get<MaterialType[]>(apiUrl + '/materialTypes');
            })
          );
        }
      
        getUOM(): Observable<UOM[]> {
          return this.apiUrl$.pipe(
            switchMap((apiUrl) => {
              if (!apiUrl) {
                throw new Error('API URL is not set. Configuration not loaded yet.');
              }
              return this.http.get<UOM[]>(apiUrl + '/UOM');
            })
          );
        }
  }

  export interface MaterialType {
    materialTypeID: number;
    materialTypeAbbreviation: string;
  }
  export interface UOM {
    uomid: number;
    uomCode: string;
  }