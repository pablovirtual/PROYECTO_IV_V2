import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map, tap, catchError, throwError } from 'rxjs';
import { 
  MensajeChat, 
  ConversacionRequest, 
  NuevoMensajeRequest, 
  MarcarLeidoRequest,
  ApiResponse, 
  MensajeResponse,
  ConversacionResponse,
  Conversacion,
  ContactoRequest
} from '../models/chat.model';
import { Asesor } from '../models/auth.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  // Subject para emitir nuevos mensajes (se usaría con WebSockets)
  private nuevosMensajesSubject = new Subject<MensajeChat>();
  public nuevosMensajes$ = this.nuevosMensajesSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    // Aquí se implementaría la conexión a WebSockets para mensajes en tiempo real
    // this.iniciarConexionWebSocket();
  }

  /**
   * Envía un nuevo mensaje de contacto
   */
  enviarMensaje(mensaje: NuevoMensajeRequest, datosContacto: { nombre: string, email: string, asunto: string }): Observable<MensajeChat> {
    // Verificar si el usuario está autenticado
    if (!localStorage.getItem('token')) {
      console.error('Error: No hay token de autenticación');
      return throwError(() => new Error('Usuario no autenticado'));
    }
    
    console.log('ChatService - Enviando mensaje:', mensaje);
    console.log('ChatService - Token autenticación:', localStorage.getItem('token'));
    
    // Convertir el formato NuevoMensajeRequest a ContactoRequest
    const contactoRequest: ContactoRequest = {
      mensaje: mensaje.mensaje,
      usuario_id: mensaje.emisor_id,
      receptor_id: mensaje.receptor_id,
      nombre: datosContacto.nombre,
      email: datosContacto.email,
      asunto: datosContacto.asunto
    };
    
    console.log('ChatService - Formato convertido para /api/contacto:', contactoRequest);
    
    // Actualizando a la ruta correcta según la API: /api/contacto
    return this.http.post<MensajeResponse>(`${environment.apiUrl}/contacto`, contactoRequest)
      .pipe(
        map(response => {
          console.log('Respuesta del servidor:', response);
          return response.data;
        }),
        tap(mensajeEnviado => {
          // Emitimos el mensaje enviado para actualizar la interfaz
          this.nuevosMensajesSubject.next(mensajeEnviado);
        }),
        catchError(error => {
          console.error('Error en la petición:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtiene los mensajes entre dos usuarios
   */
  obtenerMensajes(emisorId: number, receptorId: number): Observable<MensajeChat[]> {
    const request: ConversacionRequest = {
      emisor_id: emisorId,
      receptor_id: receptorId
    };

    // Actualizando a la ruta más probable: /api/mensajes
    return this.http.post<ConversacionResponse>(`${environment.apiUrl}/mensajes`, request)
      .pipe(
        map(response => {
          console.log('Respuesta de obtenerMensajes:', response);
          return response.data || [];
        }),
        catchError(error => {
          console.error('Error al obtener mensajes:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Marca los mensajes como leídos
   */
  marcarComoLeidos(request: MarcarLeidoRequest): Observable<any> {
    // Actualizando a la ruta más probable: /api/mensajes/leidos
    return this.http.post<ApiResponse<void>>(`${environment.apiUrl}/mensajes/leidos`, request)
      .pipe(
        tap(response => {
          console.log('Mensajes marcados como leídos:', response);
        }),
        catchError(error => {
          console.error('Error al marcar mensajes como leídos:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Obtiene todas las conversaciones del usuario actual
   */
  obtenerConversaciones(usuarioId: number): Observable<Conversacion[]> {
    // Actualizando a la ruta más probable: /api/conversaciones
    return this.http.get<ApiResponse<any[]>>(`${environment.apiUrl}/conversaciones/${usuarioId}`)
      .pipe(
        map(response => {
          console.log('Respuesta de obtenerConversaciones:', response);
          if (!response.data) return [];

          // Transformar la respuesta de la API al formato de nuestro modelo
          return response.data.map((item: any) => {
            // Determinamos quién es el otro participante (no el usuario actual)
            const participante = item.usuario1_id === usuarioId ? item.usuario2 : item.usuario1;
            
            return {
              id: item.id,
              participante: participante as Asesor,
              ultimoMensaje: item.ultimo_mensaje,
              mensajesNoLeidos: item.no_leidos || 0
            } as Conversacion;
          });
        }),
        catchError(error => {
          console.error('Error al obtener conversaciones:', error);
          return throwError(() => error);
        })
      );
  }

  /**
   * Emite un mensaje recibido (usado con WebSockets)
   */
  recibirMensaje(mensaje: MensajeChat): void {
    this.nuevosMensajesSubject.next(mensaje);
  }

  /**
   * Obtiene la lista de asesores disponibles para chat
   */
  obtenerAsesoresDisponibles(): Observable<Asesor[]> {
    return this.http.get<ApiResponse<Asesor[]>>(`${environment.apiUrl}/asesores`)
      .pipe(
        map(response => response.data || [])
      );
  }

  // Este método sería parte de una implementación de WebSockets
  // private iniciarConexionWebSocket(): void {
  //   // Implementación de WebSockets para chat en tiempo real
  //   // Echo.private('chat.{userId}')
  //   //  .listen('MensajeEnviado', (e: {mensaje: MensajeChat}) => {
  //   //    this.recibirMensaje(e.mensaje);
  //   //  });
  // }
}
