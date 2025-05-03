import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { MensajeChat, Conversacion, NuevoMensajeRequest, MarcarLeidoRequest } from '../../models/chat.model';
import { Asesor } from '../../models/auth.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule, 
    NavBarComponent, 
    HttpClientModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit, OnDestroy {
  // Usuario actual (asesor logueado)
  currentUser: Asesor | null = null;
  
  // Lista de conversaciones
  conversaciones: Conversacion[] = [];
  
  // Conversación activa 
  conversacionActiva?: Conversacion;
  
  // Mensajes de la conversación activa
  mensajes: MensajeChat[] = [];
  
  // Nuevo mensaje a enviar
  nuevoMensaje: string = '';
  
  // Control de carga
  cargando: boolean = false;
  enviandoMensaje: boolean = false;
  
  // Variables para formularios de prueba
  testReceptorId: number = 0;
  testMensaje: string = '';
  testParticipanteId: number = 0;
  testEmisorId: number = 0;
  // Nuevos campos para el formulario de contacto
  testNombre: string = '';
  testEmail: string = '';
  testAsunto: string = '';
  enviandoTestMensaje: boolean = false;
  cargandoTestMensajes: boolean = false;
  marcandoTestLeido: boolean = false;
  testResultado: any = null;
  
  // Para la gestión de suscripciones
  private subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    // Obtenemos el usuario actual
    this.currentUser = this.authService.getCurrentUser();
    
    if (this.currentUser) {
      // Cargar las conversaciones del usuario
      this.cargarConversaciones();
      
      // Suscripción para actualizar mensajes en tiempo real (si implementas websockets)
      this.subscriptions.add(
        this.chatService.nuevosMensajes$.subscribe(mensaje => {
          this.procesarNuevoMensaje(mensaje);
        })
      );
    }
  }

  ngOnDestroy(): void {
    // Limpieza de suscripciones
    this.subscriptions.unsubscribe();
  }

  /**
   * Carga la lista de conversaciones del usuario
   */
  cargarConversaciones(): void {
    if (!this.currentUser) return;

    this.cargando = true;
    this.chatService.obtenerConversaciones(this.currentUser.id)
      .subscribe({
        next: (conversaciones) => {
          this.conversaciones = conversaciones;
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al cargar conversaciones:', error);
          this.cargando = false;
        }
      });
  }

  /**
   * Selecciona una conversación para mostrar sus mensajes
   */
  seleccionarConversacion(conversacion: Conversacion): void {
    this.conversacionActiva = conversacion;
    this.cargarMensajesDeConversacion(conversacion);
  }

  /**
   * Carga los mensajes de una conversación específica
   */
  cargarMensajesDeConversacion(conversacion: Conversacion): void {
    if (!this.currentUser) return;

    this.cargando = true;
    this.chatService.obtenerMensajes(this.currentUser.id, conversacion.participante.id)
      .subscribe({
        next: (mensajes) => {
          this.mensajes = mensajes;
          this.marcarMensajesComoLeidos(conversacion.participante.id);
          this.cargando = false;
          
          // Desplazar al final para ver el último mensaje
          this.scrollToBottom();
        },
        error: (error) => {
          console.error('Error al cargar mensajes:', error);
          this.cargando = false;
        }
      });
  }

  /**
   * Marca los mensajes de la conversación actual como leídos
   */
  marcarMensajesComoLeidos(emisorId: number): void {
    if (!this.currentUser) return;
    
    // Creamos el objeto request con el formato correcto
    const marcarLeidoRequest: MarcarLeidoRequest = {
      emisor_id: emisorId,
      receptor_id: this.currentUser.id
    };
    
    this.chatService.marcarComoLeidos(marcarLeidoRequest)
      .subscribe({
        next: () => {
          // Actualizar la UI para reflejar que los mensajes están leídos
          if (this.conversacionActiva) {
            this.conversacionActiva.mensajesNoLeidos = 0;
            
            // Actualizar la vista de mensajes
            this.mensajes = this.mensajes.map(m => {
              if (m.emisor_id === emisorId && m.receptor_id === this.currentUser?.id) {
                return { ...m, leido: true };
              }
              return m;
            });
            
            // Actualizar contador en la lista de conversaciones
            const conversacionIndex = this.conversaciones.findIndex(
              c => c.participante.id === emisorId
            );
            
            if (conversacionIndex !== -1) {
              this.conversaciones[conversacionIndex].mensajesNoLeidos = 0;
            }
          }
        },
        error: (error) => {
          console.error('Error al marcar mensajes como leídos:', error);
        }
      });
  }

  /**
   * Envía un nuevo mensaje en la conversación activa
   */
  enviarMensaje(): void {
    if (!this.nuevoMensaje.trim() || !this.currentUser || !this.conversacionActiva) return;

    this.enviandoMensaje = true;
    
    const mensaje: NuevoMensajeRequest = {
      emisor_id: this.currentUser.id,
      receptor_id: this.conversacionActiva.participante.id,
      mensaje: this.nuevoMensaje.trim()
    };

    // Agregando datos de contacto requeridos por el servicio
    const datosContacto = {
      nombre: this.currentUser.nombre || 'Usuario',
      email: this.currentUser.email || 'usuario@ejemplo.com',
      asunto: `Mensaje para ${this.conversacionActiva.participante.nombre}`
    };

    this.chatService.enviarMensaje(mensaje, datosContacto)
      .subscribe({
        next: (mensajeEnviado) => {
          // Agregar el mensaje a la lista de mensajes
          this.mensajes.push(mensajeEnviado);
          
          // Limpiar el campo de mensaje
          this.nuevoMensaje = '';
          
          // Actualizar la conversación
          if (this.conversacionActiva) {
            this.conversacionActiva.ultimoMensaje = mensajeEnviado;
          }
          
          this.enviandoMensaje = false;
          
          // Desplazar al final para ver el último mensaje
          this.scrollToBottom();
        },
        error: (error) => {
          console.error('Error al enviar mensaje:', error);
          this.enviandoMensaje = false;
        }
      });
  }

  /**
   * Inicia una nueva conversación con un asesor
   */
  iniciarNuevaConversacion(asesor: Asesor): void {
    if (!this.currentUser) return;

    // Verificar si ya existe una conversación con este asesor
    const conversacionExistente = this.conversaciones.find(
      c => c.participante.id === asesor.id
    );

    if (conversacionExistente) {
      this.seleccionarConversacion(conversacionExistente);
      return;
    }

    // Crear una nueva conversación
    const nuevaConversacion: Conversacion = {
      id: 0, // Se asignará correctamente al guardar
      participante: asesor,
      mensajesNoLeidos: 0
    };

    // Establecer como conversación activa
    this.conversacionActiva = nuevaConversacion;
    this.conversaciones.push(nuevaConversacion);
    this.mensajes = [];
  }
  
  /**
   * Procesa un nuevo mensaje recibido (por ejemplo, vía WebSocket)
   */
  procesarNuevoMensaje(mensaje: MensajeChat): void {
    // Si el mensaje es para el usuario actual y está viendo esa conversación, marcarlo como leído
    if (mensaje.receptor_id === this.currentUser?.id) {
      const esConversacionActiva = this.conversacionActiva?.participante.id === mensaje.emisor_id;
      
      // Actualizar la lista de mensajes si el usuario está viendo esta conversación
      if (esConversacionActiva) {
        // Añadir el mensaje a la lista actual
        this.mensajes.push(mensaje);
        
        // Marcar como leído porque el usuario está viendo la conversación
        const marcarLeidoRequest: MarcarLeidoRequest = {
          emisor_id: mensaje.emisor_id,
          receptor_id: this.currentUser.id
        };
        this.chatService.marcarComoLeidos(marcarLeidoRequest).subscribe();
        
        // Desplazar al final para ver el nuevo mensaje
        this.scrollToBottom();
      }
      
      // Actualizar conversaciones o crear una nueva si no existe
      this.actualizarConversacionConMensaje(mensaje);
    }
  }
  
  /**
   * Actualiza una conversación con un nuevo mensaje
   */
  private actualizarConversacionConMensaje(mensaje: MensajeChat): void {
    if (!this.currentUser) return;
    
    // Determinar el ID del otro participante
    const otroParticipanteId = mensaje.emisor_id === this.currentUser.id 
      ? mensaje.receptor_id 
      : mensaje.emisor_id;
    
    // Buscar si ya existe la conversación
    const conversacionIndex = this.conversaciones.findIndex(
      c => c.participante.id === otroParticipanteId
    );
    
    if (conversacionIndex > -1) {
      // Actualizar conversación existente
      this.conversaciones[conversacionIndex].ultimoMensaje = mensaje;
      
      // Incrementar contador de no leídos si es un mensaje recibido
      if (mensaje.emisor_id === otroParticipanteId && !mensaje.leido) {
        this.conversaciones[conversacionIndex].mensajesNoLeidos++;
      }
      
      // Mover la conversación al principio de la lista
      if (conversacionIndex > 0) {
        const conversacion = this.conversaciones.splice(conversacionIndex, 1)[0];
        this.conversaciones.unshift(conversacion);
      }
    } else {
      // TODO: Si es una nueva conversación, obtener datos del participante y crear nueva entrada
      this.cargarConversaciones(); // Alternativa: recargar todas
    }
  }
  
  /**
   * Desplaza la vista de mensajes al final
   */
  private scrollToBottom(): void {
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }
  
  /**
   * Formatea la fecha para mostrarla en el chat
   */
  formatearFecha(fecha?: string): string {
    if (!fecha) return '';
    
    const date = new Date(fecha);
    const hoy = new Date();
    
    // Si es hoy, mostrar solo la hora
    if (date.toDateString() === hoy.toDateString()) {
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }
    
    // Si es de este año, mostrar día y mes
    if (date.getFullYear() === hoy.getFullYear()) {
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
    }
    
    // Si es de otro año, mostrar fecha completa
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  /**
   * Prueba el envío de un nuevo mensaje
   */
  probarEnviarMensaje(): void {
    if (!this.currentUser) return;
    
    this.enviandoTestMensaje = true;
    this.testResultado = null;
    
    const mensaje: NuevoMensajeRequest = {
      emisor_id: this.currentUser.id,
      receptor_id: this.testReceptorId,
      mensaje: this.testMensaje
    };
    
    // Añadir los datos del formulario de contacto
    const datosContacto = {
      nombre: this.testNombre,
      email: this.testEmail,
      asunto: this.testAsunto
    };
    
    this.chatService.enviarMensaje(mensaje, datosContacto)
      .subscribe({
        next: (resultado) => {
          this.testResultado = resultado;
          this.enviandoTestMensaje = false;
          console.log('Mensaje enviado con éxito:', resultado);
          // Limpiar el mensaje después de enviarlo
          this.testMensaje = '';
        },
        error: (error) => {
          console.error('Error al enviar mensaje de prueba:', error);
          this.testResultado = error;
          this.enviandoTestMensaje = false;
        }
      });
  }
  
  /**
   * Prueba la obtención de mensajes de una conversación
   */
  probarObtenerMensajes(): void {
    if (!this.currentUser) return;
    
    this.cargandoTestMensajes = true;
    this.testResultado = null;
    
    this.chatService.obtenerMensajes(this.currentUser.id, this.testParticipanteId)
      .subscribe({
        next: (mensajes) => {
          this.testResultado = mensajes;
          this.cargandoTestMensajes = false;
          console.log('Mensajes obtenidos con éxito:', mensajes);
        },
        error: (error) => {
          console.error('Error al obtener mensajes de prueba:', error);
          this.testResultado = error;
          this.cargandoTestMensajes = false;
        }
      });
  }
  
  /**
   * Prueba marcar mensajes como leídos
   */
  probarMarcarLeido(): void {
    if (!this.currentUser) return;
    
    this.marcandoTestLeido = true;
    this.testResultado = null;
    
    // Creamos el objeto request según la nueva estructura
    const marcarLeidoRequest: MarcarLeidoRequest = {
      emisor_id: this.testEmisorId,
      receptor_id: this.currentUser.id
    };
    
    // Llamamos al método con el objeto request
    this.chatService.marcarComoLeidos(marcarLeidoRequest)
      .subscribe({
        next: (resultado) => {
          this.testResultado = resultado || { status: 'success', message: 'Mensajes marcados como leídos' };
          this.marcandoTestLeido = false;
          console.log('Mensajes marcados como leídos con éxito');
        },
        error: (error) => {
          console.error('Error al marcar mensajes como leídos:', error);
          this.testResultado = error;
          this.marcandoTestLeido = false;
        }
      });
  }
}
