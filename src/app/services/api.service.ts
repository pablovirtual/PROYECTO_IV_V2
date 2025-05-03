// En services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl; // Obtiene la URL de la API desde el archivo de entorno

  constructor(private http: HttpClient) { }

  // Método para comprobar la conexión
  testConnection(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}