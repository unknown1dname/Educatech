import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiJsonService {
  private urlApi = 'https://jsonplaceholder.typicode.com/';
  private recursoApi = 'users';

  constructor(private http: HttpClient) {}

  // Obtener datos desde la API JSON
  obtenerDatos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlApi}${this.recursoApi}/`);
  }
}
