import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000'; // URL base para a API

  constructor(private http: HttpClient) {}

  createUser(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-user`, user); // URL corrigida
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`); // URL corrigida
  }

  updateUser(
    id: number,
    user: { name: string; email: string; password: string }
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-user/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-user/${id}`);
  }
}
