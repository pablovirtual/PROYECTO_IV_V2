import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, Asesor, LogoutResponse } from '../models/auth.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Asesor | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Cargar usuario almacenado si existe
    this.loadStoredUser();
    console.log('AuthService inicializado, estado de login:', this.isLoggedIn());
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    const token = localStorage.getItem('token');
    
    console.log('loadStoredUser - token:', token ? 'Existe' : 'No existe');
    console.log('loadStoredUser - storedUser:', storedUser ? 'Existe' : 'No existe');
    
    if (storedUser && token) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this.isLoggedInSubject.next(true);
        console.log('Usuario y token cargados correctamente:', user);
      } catch (e) {
        console.error('Error al parsear el usuario almacenado:', e);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
        this.isLoggedInSubject.next(false);
      }
    } else {
      console.log('No hay usuario Y token almacenados');
      this.currentUserSubject.next(null);
      this.isLoggedInSubject.next(false);
    }
  }

  private hasToken(): boolean {
    const token = localStorage.getItem('token');
    console.log('hasToken - token existe:', !!token);
    return !!token;
  }

  // Método público para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.hasToken();
  }
  
  // Método para obtener el usuario actual
  getCurrentUser(): Asesor | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<LoginResponse> {
    console.log('Intentando login con email:', email);
    const loginRequest: LoginRequest = { email, password };
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, loginRequest)
      .pipe(
        tap(response => {
          console.log('Respuesta completa de login:', response);
          
          // La API devuelve access_token según el modelo
          if (response && response.access_token) {
            // Guardar token
            console.log('Guardando token:', response.access_token);
            localStorage.setItem('token', response.access_token);
            
            // Verificación de que el token se guarde correctamente en localStorage
            const tokenGuardado = localStorage.getItem('token');
            if (tokenGuardado !== response.access_token) {
              console.error('Error al guardar token en localStorage:', tokenGuardado);
            } else {
              console.log('Token guardado correctamente en localStorage:', tokenGuardado);
            }
            
            // Guardamos la información del usuario que viene en la respuesta
            const user = response.user;
            
            console.log('Guardando información de usuario:', user);
            // Guardar información del usuario
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            // Actualizar observables
            this.currentUserSubject.next(user);
            this.isLoggedInSubject.next(true);
            console.log('Estado de autenticación actualizado a:', true);
            console.log('Verificación de token guardado:', localStorage.getItem('token'));
            console.log('Verificación de usuario guardado:', localStorage.getItem('currentUser'));
          } else {
            console.error('Respuesta de login no contiene token:', response);
          }
        }),
        catchError(error => {
          console.error('Error durante el login:', error);
          return throwError(() => new Error(error.error?.message || 'Error en la autenticación'));
        })
      );
  }

  logout(): Observable<LogoutResponse> {
    console.log('Intentando logout');
    // Solo hacer la llamada a la API si el usuario está autenticado
    if (this.hasToken()) {
      return this.http.post<LogoutResponse>(`${environment.apiUrl}/logout`, null)
        .pipe(
          tap(_ => {
            console.log('Logout exitoso desde API');
            this.clearAuthData();
          }),
          catchError(error => {
            console.error('Error durante el logout:', error);
            // Incluso si hay error, limpiar los datos locales
            this.clearAuthData();
            return throwError(() => new Error(error.error?.message || 'Error en el cierre de sesión'));
          })
        );
    } else {
      // Si no hay token, solo limpiar datos locales
      this.clearAuthData();
      console.log('No había token, se han limpiado los datos localmente');
      return new Observable<LogoutResponse>(subscriber => {
        subscriber.next({ status: 'success', message: 'Sesión cerrada localmente' });
        subscriber.complete();
      });
    }
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    console.log('Datos de autenticación borrados');
  }

  // Método público para limpiar el token (equivalente a clearAuthData pero sin navegación)
  clearToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    console.log('Token borrado manualmente');
  }

  // Helper para obtener el token actual
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  // Método para forzar una recarga del estado de autenticación desde localStorage
  refreshAuthState(): void {
    console.log('Forzando recarga del estado de autenticación');
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('currentUser');
    
    console.log('refreshAuthState - token:', token ? 'Existe' : 'No existe');
    console.log('refreshAuthState - storedUser:', storedUser ? 'Existe' : 'No existe');
    
    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this.isLoggedInSubject.next(true);
        console.log('Estado de autenticación actualizado correctamente a través de refreshAuthState');
        
        // Verificación adicional
        console.log('Después de refreshAuthState - isLoggedIn:', this.isLoggedIn());
        console.log('Después de refreshAuthState - getCurrentUser:', this.getCurrentUser());
      } catch (e) {
        console.error('Error al recargar estado de autenticación:', e);
      }
    }
  }
}
