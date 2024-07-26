import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl =
    'https://api-heart-git-main-iancaplacimos-projects.vercel.app';
  constructor(private http: HttpClient) {}

  createUser(user: { username: string; email: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/create-user`, user);
  }

  updateUser(
    id: number,
    user: {
      username: string;
      email: string;
      password: string;
    }
  ): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-user/${id}`, user);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-user/${id}`);
  }
}
