import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ContactoRequest, NuevoMensajeRequest } from '../../models/chat.model';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBarComponent, HttpClientModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  // Modelo para el formulario de contacto
  contacto: ContactoRequest = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  };

  // Estado del formulario
  enviando: boolean = false;
  enviado: boolean = false;
  error: any = null;

  constructor(private chatService: ChatService) {}

  /**
   * Envía el formulario de contacto
   */
  enviarFormulario(): void {
    this.enviando = true;
    this.error = null;
    this.enviado = false;

    const mensajeRequest: NuevoMensajeRequest = {
      emisor_id: 0, // Para formulario de contacto público, podemos usar 0 o un ID específico
      receptor_id: 0, // Para un buzón general o un ID de administrador específico
      mensaje: this.contacto.mensaje
    };

    this.chatService.enviarMensaje(mensajeRequest, {
      nombre: this.contacto.nombre,
      email: this.contacto.email,
      asunto: this.contacto.asunto
    }).subscribe({
      next: (response: any) => {
        console.log('Mensaje enviado con éxito:', response);
        this.enviando = false;
        this.enviado = true;
        
        // Limpiar el formulario después de enviar
        this.contacto = {
          nombre: '',
          email: '',
          asunto: '',
          mensaje: ''
        };
      },
      error: (err: any) => {
        console.error('Error al enviar mensaje:', err);
        this.error = err;
        this.enviando = false;
      }
    });
  }
}
