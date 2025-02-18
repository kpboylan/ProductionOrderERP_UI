import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserType {
  userTypeID: number;
  type: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserTypeService {
  private apiUrl = 'https://localhost:7283/api/User/userTypes'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all UserTypes
  getUserTypes(): Observable<UserType[]> {
    return this.http.get<UserType[]>(this.apiUrl);
  }
}