import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

// Interceptor para manejar errores HTTP
const httpErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('Error en solicitud HTTP:', error);
      
      // Puedes personalizar el manejo de diferentes tipos de errores aquí
      if (error.status === 401) {
        console.log('Error de autenticación - Redirigiendo a login');
      } else if (error.status === 403) {
        console.log('Error de permisos - No autorizado');
      } else if (error.status === 404) {
        console.log('Recurso no encontrado');
      } else {
        console.log('Error de servidor: ', error.message);
      }
      
      return throwError(() => error);
    })
  );
};

// Interceptor para autenticación
const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  // Verificar si hay un token en localStorage
  const token = localStorage.getItem('token');
  
  console.log('AuthInterceptor - URL:', req.url);
  console.log('AuthInterceptor - Token disponible:', !!token);
  
  // Si hay un token disponible, agregarlo a los headers
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('AuthInterceptor - Añadiendo token a la solicitud');
    return next(authReq);
  }
  
  // Si no hay token, continuar con la solicitud sin modificar
  console.log('AuthInterceptor - Sin token, enviando solicitud original');
  return next(req);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([httpErrorInterceptor, authInterceptor])),
    provideClientHydration()
  ]
};