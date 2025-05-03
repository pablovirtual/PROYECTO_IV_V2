import { Asesor } from './auth.model';

// Modelo para mensajes individuales
export interface MensajeChat {
  id: number;
  emisor_id: number;
  receptor_id: number;
  mensaje: string;
  leido: boolean;
  created_at?: string;
  updated_at?: string;
  emisor?: Asesor; // Para cuando se incluya la relación
  receptor?: Asesor; // Para cuando se incluya la relación
}

// Para la gestión de conversaciones
export interface ConversacionRequest {
  emisor_id: number;
  receptor_id: number;
}

// Para crear un nuevo mensaje
export interface NuevoMensajeRequest {
  emisor_id: number;    // ID del asesor que envía el mensaje
  receptor_id: number;  // ID del asesor que recibe el mensaje
  mensaje: string;      // Contenido del mensaje
  leido?: boolean;      // Opcional, por defecto será false
}

// Para marcar mensajes como leídos
export interface MarcarLeidoRequest {
  emisor_id: number;    // ID del asesor que envió los mensajes
  receptor_id: number;  // ID del asesor actual que está leyendo los mensajes
}

// Respuesta genérica de la API
export interface ApiResponse<T> {
  status: string;
  message?: string;
  data: T;
}

// Respuesta de un mensaje individual
export interface MensajeResponse {
  status: string;       // 'success' si todo va bien
  message: string;      // Mensaje informativo
  data: MensajeChat;    // Objeto con los datos del mensaje creado
}

// Respuesta al obtener mensajes de una conversación
export interface ConversacionResponse {
  status: string;
  data: MensajeChat[];  // Array con todos los mensajes entre los dos usuarios
}

// Modelo para una conversación (lista de mensajes)
export interface Conversacion {
  id: number;
  ultimoMensaje?: MensajeChat;
  participante: Asesor;
  mensajesNoLeidos: number;
}

// Para crear un nuevo mensaje de contacto
export interface ContactoRequest {
  nombre: string;       // Nombre de la persona que contacta
  email: string;        // Email de la persona que contacta
  asunto: string;       // Asunto del mensaje
  mensaje: string;      // Contenido del mensaje
  usuario_id?: number;  // ID del usuario que envía el mensaje (opcional)
  receptor_id?: number; // ID del usuario que recibirá el mensaje (opcional)
}
