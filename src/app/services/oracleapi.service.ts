import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OracleapiService {

  private rutaDb = 'http://localhost:3000/asistencia';

  constructor(private http: HttpClient) { }

  // Obtener la lista de asistencias
  getAsistencia(): Observable<any> {
    return this.http.get<any>(this.rutaDb);
  }

  // Insertar nueva asistencia
  insertAsistencia(asistencia: any): Observable<any> {
    return this.http.post<any>(this.rutaDb, asistencia);
  }
}
