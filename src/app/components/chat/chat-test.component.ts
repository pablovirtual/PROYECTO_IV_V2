import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NuevoMensajeRequest } from '../../models/chat.model';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-test',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ChatService],
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header bg-primary text-white">
          <h5 class="mb-0">Prueba de Chat API</h5>
        </div>
        <div class="card-body">
          <form (ngSubmit)="enviarMensaje()" #messageForm="ngForm">
            <div class="mb-3">
              <label for="emisorId" class="form-label">ID del Emisor:</label>
              <input type="number" class="form-control" id="emisorId" 
                     [(ngModel)]="emisorId" name="emisorId" required>
            </div>
            
            <div class="mb-3">
              <label for="receptorId" class="form-label">ID del Receptor:</label>
              <input type="number" class="form-control" id="receptorId" 
                     [(ngModel)]="receptorId" name="receptorId" required>
            </div>
            
            <div class="mb-3">
              <label for="mensaje" class="form-label">Mensaje:</label>
              <textarea class="form-control" id="mensaje" rows="3"
                        [(ngModel)]="mensaje" name="mensaje" required></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary" [disabled]="!messageForm.valid || enviando">
              <span *ngIf="!enviando">Enviar</span>
              <span *ngIf="enviando">Enviando...</span>
            </button>
          </form>
          
          <div class="mt-4" *ngIf="resultado">
            <h6>Resultado:</h6>
            <pre class="bg-light p-3 rounded">{{ resultado | json }}</pre>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ChatTestComponent {
  emisorId: number = 1;
  receptorId: number = 2;
  mensaje: string = '';
  enviando: boolean = false;
  resultado: any = null;

  constructor(private chatService: ChatService) {}

  enviarMensaje(): void {
    this.enviando = true;
    
    const mensajeRequest: NuevoMensajeRequest = {
      emisor_id: this.emisorId,
      receptor_id: this.receptorId,
      mensaje: this.mensaje
    };
    
    // Añadiendo los datos de contacto requeridos por el servicio
    const datosContacto = {
      nombre: `Usuario ${this.emisorId}`,
      email: `usuario${this.emisorId}@ejemplo.com`,
      asunto: `Mensaje de prueba para Usuario ${this.receptorId}`
    };
    
    this.chatService.enviarMensaje(mensajeRequest, datosContacto)
      .subscribe({
        next: (response) => {
          this.resultado = response;
          this.enviando = false;
          this.mensaje = ''; // Limpiar el campo de mensaje
        },
        error: (error) => {
          this.resultado = error;
          this.enviando = false;
        }
      });
  }
}
