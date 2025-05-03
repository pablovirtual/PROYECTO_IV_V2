// Solicitud de login
export interface LoginRequest {
  email: string;
  password: string;
}

// Respuesta de login
export interface LoginResponse {
  status: string;
  message: string;
  access_token: string;
  token_type: string;
  user: Asesor;
}

// Interface del Asesor (como se devuelve en la API)
export interface Asesor {
  id: number;
  nombre: string;
  email: string;
  especialidad: string;
  descripcion: string;
  imagen_perfil: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}

// Respuesta de logout
export interface LogoutResponse {
  status: string;
  message: string;
}
