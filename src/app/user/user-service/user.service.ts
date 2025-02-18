import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../user/user-model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'https://localhost:7283/api/User'; 


  constructor(private http: HttpClient) { }

  getUsers(includeInactive: boolean): Observable<User[]> {
    console.log('Include inactive: ', includeInactive);
    //return this.http.get<User[]>(this.apiUrl + '/all');
    return this.http.get<User[]>(this.apiUrl + '/all');
  }

  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  updateUser(userId: number, user: User): Observable<void> {
    const url = `${this.apiUrl}/${userId}`;
    console.log('URL in service: ', url);
    return this.http.put<void>(url, user);
  }

  getUserById(userId: number): Observable<User> {
    let url = this.apiUrl + '/getUser?userId=' + userId;
    return this.http.get<User>(url);
  }
}