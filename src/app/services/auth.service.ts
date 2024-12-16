import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  // Método que obtiene el id del estudiante
  getEstudianteId(): number {
    // Implementa la lógica de autenticación para obtener el ID del estudiante
    return 1; // Este es un ejemplo, reemplázalo por la lógica real
  }
}
