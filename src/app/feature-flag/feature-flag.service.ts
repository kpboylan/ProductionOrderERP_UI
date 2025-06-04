import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {

    private readonly storageKey = 'cachedFeatureFlags';
    private flagsSubject = new BehaviorSubject<Record<string, boolean>>({});
    flags$ = this.flagsSubject.asObservable();
    private loaded = false;

    constructor(private http: HttpClient) {
        // Load cached flags from localStorage if present
        const cached = localStorage.getItem(this.storageKey);
        if (cached) {
        try {
            const parsed = JSON.parse(cached);
            this.flagsSubject.next(parsed);
            this.loaded = true;
        } catch {
            console.warn('Failed to parse cached feature flags');
        }
        }
    }

      getFeatureFlags(): Observable<Record<string, boolean>> {
            if (this.loaded) {
            return this.flagsSubject.asObservable(); // Already loaded
            }

            return this.http.get<any[]>('https://localhost:7283/api/FeatureFlag/getAll').pipe(
            map((flags: any[]) => {
                const map: Record<string, boolean> = {};
                flags.forEach(f => (map[f.name] = f.isEnabled));
                return map;
            }),
            tap(flagMap => {
                localStorage.setItem(this.storageKey, JSON.stringify(flagMap));
                this.flagsSubject.next(flagMap);
                this.loaded = true;
                console.log('Feature flags loaded from API:', flagMap);
            }),
            catchError(err => {
                console.error('Failed to load feature flags', err);
                this.flagsSubject.next({});
                return of({});
            })
            );
        }

    isFeatureEnabled(featureName: string): boolean {
        return this.flagsSubject.getValue()[featureName] === true;
    }

    clearFlags(): void {
        localStorage.removeItem(this.storageKey);
        this.flagsSubject.next({});
        this.loaded = false;
    }
}